// Ready-time regression: synthetic HA state only; no network/printer actions.
import assert from "node:assert/strict";
import { Window } from "happy-dom";
const win = new Window({ url: "http://localhost/" });
for (const key of ["window", "document", "Document", "DocumentFragment", "customElements", "HTMLElement", "HTMLDialogElement", "HTMLTemplateElement", "SVGElement", "Element", "Node", "ShadowRoot", "Event", "CustomEvent", "MouseEvent", "KeyboardEvent", "CSSStyleSheet", "getComputedStyle", "location"]) {
  try { if (win[key] !== undefined) globalThis[key] = win[key]; } catch {}
}
globalThis.requestAnimationFrame = (callback) => setTimeout(() => callback(Date.now()), 0);
const { hass: fixtureHass, cardConfig } = await import("../preview/states.js");
await import("../dist/bambu-printer-card.js");
const { formatReadyAt, localeContext } = await import("../test-build/model.js");

const prefix = cardConfig.printer_entity.replace(/^sensor\./, "").replace(/_print_status$/, "");
const ids = {
  status: cardConfig.printer_entity,
  remaining: `sensor.${prefix}_remaining_time`,
  end: `sensor.${prefix}_end_time`,
};
let commands = 0;
const baseHass = {
  ...fixtureHass,
  locale: { language: "en-GB", time_zone: "server", time_format: "24", number_format: "language" },
  config: { ...fixtureHass.config, time_zone: "Pacific/Auckland" },
  callApi: async () => [],
  callService: () => { commands++; throw new Error("Unexpected device action"); },
};
const context = localeContext(baseHass, cardConfig, undefined);
assert.equal(context.timeZone, "Pacific/Auckland", "server preference uses HA's configured zone");

const card = document.createElement("bambu-printer-card");
card.setConfig({ ...cardConfig, show_camera: false, show_ams: false });
document.body.append(card);

const setStates = async (changes) => {
  const states = { ...baseHass.states };
  for (const [id, patch] of Object.entries(changes)) {
    states[id] = { ...states[id], ...patch };
  }
  card.hass = { ...baseHass, states };
  await card.updateComplete;
  await new Promise((resolve) => setTimeout(resolve, 10));
};
const text = (selector) =>
  card.shadowRoot.querySelector(selector)?.textContent.replace(/\s+/g, " ").trim() ?? null;
const iso = (time) => new Date(time).toISOString();
let passed = 0;
const check = async (name, changes, verify) => {
  await setStates(changes);
  verify();
  assert.equal(commands, 0);
  passed++;
  console.log(`PASS: ${name}`);
};

const nativeEnd = Date.now() + 90 * 60_000;
await check(
  "running print shows remaining hours and the native end time in HA's zone",
  {
    [ids.status]: { state: "running" },
    [ids.remaining]: { state: "1.5", last_updated: iso(Date.now()) },
    [ids.end]: { state: iso(nativeEnd) },
  },
  () => {
    assert.equal(text(".hero-remaining"), "1 h 30 min left");
    const ready = card.shadowRoot.querySelector(".hero-ready");
    assert.ok(ready, "ready time is rendered");
    assert.equal(ready.tagName.toLowerCase(), "time");
    assert.equal(ready.getAttribute("datetime"), iso(nativeEnd));
    assert.equal(text(".hero-ready"), formatReadyAt(nativeEnd, Date.now(), context));
    assert.match(text(".hero-ready"), /^Ready (tomorrow )?\d\d:\d\d$/);
  },
);

const updated = Date.now();
await check(
  "ready time follows a changed remaining time when there is no native end time",
  {
    [ids.status]: { state: "running" },
    [ids.remaining]: { state: "26", last_updated: iso(updated) },
    [ids.end]: { state: "unknown" },
  },
  () => {
    const expected = updated + 26 * 3_600_000;
    assert.equal(text(".hero-remaining"), "26 h left");
    assert.equal(card.shadowRoot.querySelector(".hero-ready")?.getAttribute("datetime"), iso(expected));
    assert.equal(text(".hero-ready"), formatReadyAt(expected, Date.now(), context));
    assert.match(text(".hero-ready"), /^Ready (tomorrow|\w{3}) \d\d:\d\d$/);
  },
);

for (const [name, changes, remaining] of [
  ["paused print keeps remaining time but hides the ready time", { [ids.status]: { state: "pause" } }, "left"],
  ["preparing print hides the ready time", { [ids.status]: { state: "prepare" } }, "left"],
  ["unknown remaining time hides the ready time", { [ids.status]: { state: "running" }, [ids.remaining]: { state: "unknown" }, [ids.end]: { state: "unknown" } }, "— left"],
  ["unavailable remaining time hides the ready time", { [ids.status]: { state: "running" }, [ids.remaining]: { state: "unavailable" }, [ids.end]: { state: "unavailable" } }, "— left"],
  ["idle printer hides the ready time", { [ids.status]: { state: "idle" } }, null],
]) {
  await check(name, changes, () => {
    assert.equal(card.shadowRoot.querySelector(".hero-ready"), null);
    if (remaining) assert.ok(text(".hero-remaining")?.endsWith(remaining), text(".hero-remaining"));
    else assert.equal(card.shadowRoot.querySelector(".hero-remaining"), null);
  });
}

card.remove();
console.log(`\n${passed} ready-time checks passed.`);
