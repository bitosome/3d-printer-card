// Deferred Recorder requests exercise detach/reconnect and stale-result safety.
// Synthetic data only: no network, HA service or printer is contacted.
import assert from "node:assert/strict";
import { Window } from "happy-dom";

const win = new Window({ url: "http://localhost/" });
for (const key of [
  "window", "document", "Document", "DocumentFragment", "customElements",
  "HTMLElement", "HTMLDialogElement", "HTMLTemplateElement", "SVGElement",
  "Element", "Node", "ShadowRoot", "Event", "CustomEvent", "MouseEvent",
  "KeyboardEvent", "CSSStyleSheet", "getComputedStyle", "location",
]) {
  try { if (win[key] !== undefined) globalThis[key] = win[key]; } catch {}
}
globalThis.requestAnimationFrame = (callback) => setTimeout(() => callback(Date.now()), 0);
await import("../dist/bambu-printer-card.js");

const pause = () => new Promise((resolve) => setTimeout(resolve, 10));
async function eventually(predicate, message) {
  const until = Date.now() + 1500;
  while (!predicate() && Date.now() < until) await pause();
  assert.ok(predicate(), message);
}
const text = (node) => node?.textContent?.replace(/\s+/g, " ").trim() || "";
const now = Date.now();
const stamp = (t) => new Date(t).toISOString();
const entity = (entity_id, state, attributes = {}) => ({
  entity_id, state, attributes, last_changed: stamp(now), last_updated: stamp(now),
});
const statusId = "sensor.synthetic_print_status";
const config = {
  type: "custom:bambu-printer-card", printer_entity: statusId,
  power_entity: "sensor.synthetic_power", price_entity: "sensor.synthetic_price",
  show_camera: false, show_ams: false,
};
const states = {
  [statusId]: entity(statusId, "idle"),
  "sensor.synthetic_task_name": entity("sensor.synthetic_task_name", "Current fixture"),
  "sensor.synthetic_power": entity("sensor.synthetic_power", "0", { unit_of_measurement: "W" }),
  "sensor.synthetic_price": entity("sensor.synthetic_price", "0.1", { unit_of_measurement: "€/kWh" }),
};
function history(task) {
  const point = (id, state, t) => ({ entity_id: id, state, last_changed: stamp(t), last_updated: stamp(t), attributes: states[id]?.attributes || {} });
  const start = now - 30 * 60_000;
  return [
    [point(statusId, "idle", start - 60_000), point(statusId, "running", start), point(statusId, "finish", start + 10 * 60_000)],
    [point("sensor.synthetic_task_name", task, start - 60_000)],
    [point("sensor.synthetic_power", "100", start - 60_000), point("sensor.synthetic_power", "0", start + 10 * 60_000)],
    [point("sensor.synthetic_price", "0.1", start - 60_000)],
  ];
}
function fixture() {
  const calls = [];
  const serviceCalls = [];
  const hass = {
    states, language: "en", locale: { language: "en", number_format: "comma_decimal", time_format: "24" },
    config: { time_zone: "Europe/Tallinn" },
    callApi(method, path) {
      assert.equal(method, "GET");
      assert.ok(path.startsWith("history/period/"));
      return new Promise((resolve, reject) => calls.push({ resolve, reject, path }));
    },
    callService(...args) { serviceCalls.push(args); throw new Error("Unexpected device command"); },
  };
  const card = document.createElement("bambu-printer-card");
  card.setConfig(config);
  card.hass = hass;
  document.body.append(card);
  return { card, calls, serviceCalls, hass };
}
let failures = 0;
async function test(name, callback) {
  const f = fixture();
  try {
    await eventually(() => f.calls.length === 1, "initial Recorder request");
    await callback(f);
    assert.deepEqual(f.serviceCalls, [], "displaying/reconnecting never calls services");
    console.log(`PASS: ${name}`);
  } catch (error) {
    failures++;
    console.error(`FAIL: ${name}: ${error.message}`);
  } finally {
    f.card.remove();
    for (const call of f.calls) call.resolve([]);
    await pause();
  }
}

await test("pending overview resumes after same-instance reconnect", async ({ card, calls }) => {
  card.remove();
  document.body.append(card); // Same hass reference, no state update to trigger a rescue.
  await eventually(() => calls.length === 2, "reconnect must issue a fresh overview request");
  calls[0].resolve(history("Obsolete overview"));
  await pause();
  assert.ok(!text(card.shadowRoot).includes("Obsolete overview"));
  calls[1].resolve(history("Recovered overview"));
  await eventually(() => text(card.shadowRoot?.querySelector(".hero-task")) === "Recovered overview", "fresh result must be rendered");
});

await test("pending history is retryable after reconnect", async ({ card, calls }) => {
  calls[0].resolve(history("Overview fixture"));
  await eventually(() => !!card.shadowRoot?.querySelector('[data-nav="history"]'), "history launcher");
  card.shadowRoot.querySelector('[data-nav="history"]').click();
  await eventually(() => calls.length === 2, "history request");
  card.remove();
  document.body.append(card);
  await pause();
  card.shadowRoot.querySelector('[data-nav="history"]').click();
  // A reconnect may refresh overview as well; the history request has a 7-day range.
  await eventually(() => calls.slice(2).some((call) => call.path === calls[1].path || Date.parse(decodeURIComponent(call.path.split("/")[2].split("?")[0])) < now - 6 * 86_400_000), "history can load again after interrupted request");
  calls[1].reject(new Error("Obsolete history failure"));
  for (const call of calls.slice(2)) call.resolve(history("Recovered history"));
  await eventually(() => text(card.shadowRoot?.querySelector("dialog")).includes("Recovered history"), "new history result must be shown");
  assert.ok(!text(card.shadowRoot).includes("Obsolete history failure"));
});

await test("configuration change ignores old overview success", async ({ card, calls }) => {
  card.setConfig({ ...config, name: "New printer configuration" });
  await eventually(() => calls.length === 2, "new configuration loads its own history");
  calls[0].resolve(history("Obsolete success"));
  await pause();
  assert.ok(!text(card.shadowRoot).includes("Obsolete success"));
  calls[1].resolve(history("New configuration print"));
  await eventually(() => text(card.shadowRoot?.querySelector(".hero-task")) === "New configuration print", "new configuration result survives");
});

await test("configuration change ignores old overview failure", async ({ card, calls }) => {
  card.setConfig({ ...config, name: "Replacement configuration" });
  await eventually(() => calls.length === 2, "replacement request");
  calls[0].reject(new Error("Obsolete overview failure"));
  await pause();
  assert.ok(!text(card.shadowRoot).includes("Obsolete overview failure"));
  assert.ok(card.shadowRoot?.querySelector('[aria-label="Loading power history"]'), "old finally must not clear the replacement loading state");
  calls[1].resolve(history("Latest print"));
  await eventually(() => text(card.shadowRoot?.querySelector(".hero-task")) === "Latest print", "replacement resolves normally");
});

await test("replaced configuration keeps a new history flow safe from old failure", async ({ card, calls }) => {
  calls[0].resolve(history("Original overview"));
  await eventually(() => !!card.shadowRoot?.querySelector('[data-nav="history"]'), "history launcher");
  card.shadowRoot.querySelector('[data-nav="history"]').click();
  await eventually(() => calls.length === 2, "original history request");
  card.setConfig({ ...config, name: "Replacement history configuration" });
  await eventually(() => calls.length === 3, "replacement overview request");
  calls[2].resolve(history("Replacement overview"));
  await pause();
  card.shadowRoot.querySelector('[data-nav="history"]').click();
  await eventually(() => calls.length === 4, "replacement history request");
  calls[1].reject(new Error("Obsolete history error"));
  await pause();
  assert.ok(!text(card.shadowRoot).includes("Obsolete history error"));
  assert.ok(text(card.shadowRoot?.querySelector("dialog")).includes("Reading recorder history"), "old finally must not clear the newer history loading state");
  calls[3].resolve(history("Replacement history result"));
  await eventually(() => text(card.shadowRoot?.querySelector("dialog")).includes("Replacement history result"), "replacement history result reaches the current flow");
});

await test("missing printer invalidates pending history and recovers when restored", async ({ card, calls, hass }) => {
  const missingStates = { ...states };
  delete missingStates[statusId];
  card.hass = { ...hass, states: missingStates };
  await eventually(() => text(card.shadowRoot?.querySelector(".setup")).includes("Printer entity not found"), "entity removal is visible");
  calls[0].resolve(history("Obsolete missing-printer result"));
  await pause();
  card.hass = { ...hass, states: { ...states } };
  await eventually(() => calls.length === 2, "restored printer must request fresh history");
  assert.ok(!text(card.shadowRoot).includes("Obsolete missing-printer result"));
  calls[1].resolve(history("Restored printer result"));
  await eventually(() => text(card.shadowRoot?.querySelector(".hero-task")) === "Restored printer result", "restored printer shows current result");
  assert.ok(!text(card.shadowRoot).includes("Cannot read properties"));
});

console.log(`\n6 lifecycle checks, ${failures} failed.`);
await win.happyDOM.close();
if (failures) process.exitCode = 1;
