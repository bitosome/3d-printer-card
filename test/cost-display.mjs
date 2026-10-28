// Cost cache regression: synthetic HA state only; no network/printer actions.
import assert from "node:assert/strict";
import { Window } from "happy-dom";
const win = new Window({ url: "http://localhost/" });
for (const key of ["window", "document", "Document", "DocumentFragment", "customElements", "HTMLElement", "HTMLDialogElement", "HTMLTemplateElement", "SVGElement", "Element", "Node", "ShadowRoot", "Event", "CustomEvent", "MouseEvent", "KeyboardEvent", "CSSStyleSheet", "getComputedStyle", "location"]) {
  try { if (win[key] !== undefined) globalThis[key] = win[key]; } catch {}
}
globalThis.requestAnimationFrame = (callback) => setTimeout(() => callback(Date.now()), 0);
const { hass: fixtureHass, cardConfig } = await import("../preview/states.js");
await import("../dist/bambu-printer-card.js");
const card = document.createElement("bambu-printer-card");
let commands = 0;
card.setConfig({ ...cardConfig, show_camera: false, show_ams: false });
card.hass = {
  ...fixtureHass,
  states: { ...fixtureHass.states, [cardConfig.printer_entity]: { ...fixtureHass.states[cardConfig.printer_entity], state: "finish" } },
  callApi: async () => [],
  callService: () => { commands++; throw new Error("Unexpected device action"); },
};
document.body.append(card);
await new Promise((resolve) => setTimeout(resolve, 30));
const session = { start: Date.now() - 3_600_000, end: Date.now(), status: "finished", open: false, task: "Synthetic completed print", partialStart: false, partialEnd: false };
const quote = (cost) => ({ cost, energy: 1, pricedEnergy: 1, unpricedEnergy: 0, averagePrice: cost, gaps: false, complete: true });
const data = (chartEnd, loadedAt, cost, includeSession = true) => ({
  chartStart: session.start, chartEnd, loadedAt, sessions: [session], buckets: [],
  powerSeries: [], energySeries: [], priceSeries: [],
  quotes: new Map(includeSession ? [[session.start, quote(cost)]] : []),
});
async function check(name, overview, history, expected) {
  card.overview = overview;
  card.history = history;
  await card.updateComplete;
  const value = card.shadowRoot.querySelector(".cost-value")?.textContent.replace(/\s+/g, " ").trim();
  assert.ok(value?.includes(expected), `${name}: ${value}`);
  assert.equal(commands, 0);
  console.log(`PASS: ${name}`);
}
const older = session.end - 1800_000;
await check("fresh completed overview replaces old in-progress history cost", data(session.end, 2, 0.4), data(older, 1, 0.2), "0.40");
await check("newer history quote remains authoritative", data(session.end, 2, 0.4), data(session.end + 1000, 3, 0.6), "0.60");
await check("missing session in history falls back to overview", data(session.end, 2, 0.4), data(session.end + 1000, 3, 0.6, false), "0.40");
await check("late older response cannot replace newer observations", data(session.end, 2, 0.4), data(older, 99, 0.2), "0.40");

// Finish while History is loading: its old response must not restore an open
// print, and the visible modal must refresh without being reopened.
const requests = [];
card.hass = { ...card.hass, callApi: (method, path) => {
  assert.equal(method, "GET");
  return new Promise((resolve) => requests.push({ path, resolve }));
} };
card.flow.open("history");
const pending = card.loadHistory(true);
assert.equal(requests.length, 1);
card.scheduleOverviewRefresh(0);
await new Promise((resolve) => setTimeout(resolve, 30));
assert.equal(requests.length, 3, "completion refreshes overview and visible history");
requests[0].resolve([]);
await pending;
assert.equal(card.history.quotes.get(session.start).cost, 0.2, "obsolete result is ignored");
assert.equal(card.historyLoading, true, "obsolete request cannot clear the new loading state");
for (const request of requests.slice(1)) request.resolve([]);
await new Promise((resolve) => setTimeout(resolve, 30));
assert.equal(card.historyLoading, false);
assert.equal(card.history.sessions.length, 0, "fresh history replaces the previous snapshot");
assert.equal(commands, 0);
console.log("PASS: completion refreshes visible history and rejects pending older results");

card.flow.close();
card.scheduleOverviewRefresh(0);
assert.equal(card.lastHistoryLoad, 0, "closed History is invalidated for its next open");
await new Promise((resolve) => setTimeout(resolve, 30));
assert.equal(requests.length, 4, "closed history does not fetch unnecessarily");
requests[3].resolve([]);
await new Promise((resolve) => setTimeout(resolve, 30));
console.log("PASS: completion invalidates closed history without fetching it");
card.remove();
await win.happyDOM.close();
