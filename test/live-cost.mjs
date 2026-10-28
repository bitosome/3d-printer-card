// Synthetic timestamps and Recorder responses; no network or device actions.
import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";
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
await import(process.env.PRINTER_TEST_BUNDLE
  ? pathToFileURL(process.env.PRINTER_TEST_BUNDLE).href
  : "../dist/bambu-printer-card.js");

const nativeNow = Date.now;
const base = nativeNow();
let now = base;
Date.now = () => now;
const stamp = (time) => new Date(time).toISOString();
const entity = (id, state, time, unit) => ({
  entity_id: id, state: String(state), last_changed: stamp(time),
  last_updated: stamp(time), attributes: unit ? { unit_of_measurement: unit } : {},
});
const powerId = "sensor.synthetic_power";
const priceId = "sensor.synthetic_price";
const statusId = "sensor.synthetic_print_status";
function inputs(power = 100, price = 0.1, powerAt = base, priceAt = base) {
  return {
    printer: entity(statusId, "running", base - 60_000),
    start: entity("sensor.synthetic_start_time", stamp(base - 60_000), base - 60_000),
    power: entity(powerId, power, powerAt, "W"),
    price: entity(priceId, price, priceAt, "€/kWh"),
  };
}
function fixture() {
  now = base;
  const card = document.createElement("bambu-printer-card");
  card.setConfig({ printer_entity: statusId, power_entity: powerId, price_entity: priceId, show_camera: false, show_ams: false });
  card.printer = inputs();
  card.liveStart = base - 60_000;
  card.liveReady = true;
  card.live = { energy: 0, cost: 0, unpricedEnergy: 0, lastAt: base, lastPower: 100, lastPrice: 0.1, gaps: false };
  card.hass = { states: {}, callApi: async () => [], callService() { throw new Error("Unexpected device action"); } };
  return card;
}
function near(actual, expected, name) {
  assert.ok(Math.abs(actual - expected) < 1e-12, `${name}: expected ${expected}, got ${actual}`);
}
const kwh = (wattMs) => wattMs / 3_600_000_000;
function change(card, time, printer) {
  now = time;
  card.printer = printer;
  card.handleLive(printer);
}
function history() {
  return [
    [entity(powerId, 100, base - 60_000, "W")],
    [entity(priceId, 0.1, base - 60_000, "€/kWh")],
  ];
}
let checks = 0;
async function test(name, callback) {
  const card = fixture();
  await callback(card);
  card.remove();
  checks++;
  console.log(`PASS: ${name}`);
}
try {
  await test("tariff changes inside five seconds are applied at their own timestamp", (card) => {
    change(card, base + 4000, inputs(100, 0.3, base, base + 2000));
    near(card.live.cost, kwh(100 * 2000 * 0.1 + 100 * 2000 * 0.3), "cost");
    near(card.live.energy, kwh(100 * 4000), "energy");
  });
  await test("separate power and tariff timestamps split the live interval correctly", (card) => {
    change(card, base + 4000, inputs(200, 0.2, base + 3000, base + 1000));
    near(card.live.cost, kwh(100 * 1000 * 0.1 + 100 * 2000 * 0.2 + 200 * 1000 * 0.2), "cost");
    near(card.live.energy, kwh(100 * 3000 + 200 * 1000), "energy");
  });
  await test("unavailable price and power preserve unpriced consumption and missing coverage", (card) => {
    change(card, base + 4000, inputs("unavailable", "unavailable", base + 3000, base + 2000));
    near(card.live.cost, kwh(100 * 2000 * 0.1), "priced cost");
    near(card.live.unpricedEnergy, kwh(100 * 1000), "unpriced energy");
    assert.equal(card.live.gaps, true);
  });
  await test("recent transitions cannot disguise a long unobserved live gap", (card) => {
    change(card, base + 180_000, inputs(200, 0.3, base + 120_000, base + 60_000));
    assert.equal(card.live.energy, 0);
    assert.equal(card.live.cost, 0);
    assert.equal(card.live.gaps, true);
    assert.equal(card.live.lastAt, base + 180_000);
  });
  await test("history seeding uses held cutoff values before later sensor transitions", (card) => {
    now = base + 5000;
    card.printer = inputs(200, 0.3, base + 2000, base + 3000);
    card.seedFromHistory({ start: base - 60_000, end: base, open: true }, {
      chartEnd: base,
      powerSeries: [{ t: base - 60_000, v: 100 }],
      priceSeries: [{ t: base - 60_000, v: 0.1 }], energySeries: [],
    });
    near(card.live.cost, kwh(100 * 62_000 * 0.1 + 200 * 1000 * 0.1 + 200 * 2000 * 0.3), "seeded cost");
    assert.equal(card.live.gaps, true, "unrecorded tail remains provisional");
  });
  await test("delayed Recorder response does not apply response-time values backwards", async (card) => {
    let resolve;
    card.hass.callApi = () => new Promise((done) => { resolve = done; });
    const pending = card.seedLive(base - 60_000);
    now = base + 5000;
    card.printer = inputs(200, 0.3, base + 2000, base + 3000);
    resolve(history());
    await pending;
    near(card.live.cost, kwh(100 * 62_000 * 0.1 + 200 * 1000 * 0.1 + 200 * 2000 * 0.3), "delayed seed cost");
    assert.equal(card.live.gaps, true);
  });
  await test("missing Recorder inputs do not become zero-cost historical consumption", (card) => {
    now = base + 5000;
    card.printer = inputs(200, 0.3, base + 2000, base + 3000);
    card.seedFromHistory({ start: base - 60_000, end: base, open: true }, {
      chartEnd: base, powerSeries: [], priceSeries: [], energySeries: [],
    });
    near(card.live.energy, kwh(200 * 3000), "known tail energy");
    near(card.live.unpricedEnergy, kwh(200 * 1000), "unpriced tail");
    assert.equal(card.live.gaps, true);
  });
  await test("stale powered Recorder and current samples remain missing until observed again", (card) => {
    now = base + 5000;
    card.printer = inputs(100, 0.1, base - 2 * 3_600_000, base - 60_000);
    card.seedFromHistory({ start: base - 60_000, end: base, open: true }, {
      chartEnd: base,
      powerSeries: [{ t: base - 2 * 3_600_000, v: 100 }],
      priceSeries: [{ t: base - 60_000, v: 0.1 }], energySeries: [],
    });
    assert.equal(card.live.energy, 0);
    assert.equal(card.live.lastPower, null);
    assert.equal(card.live.gaps, true);
    const fresh = inputs(100, 0.1, base - 2 * 3_600_000, base - 60_000);
    fresh.power.last_updated = stamp(base + 7000);
    change(card, base + 8000, fresh);
    near(card.live.energy, kwh(100 * 1000), "energy since fresh observation");
  });
  await test("Recorder lag is provisional when current input already changed before cutoff", (card) => {
    now = base + 1000;
    card.printer = inputs(200, 0.1, base - 1000, base - 60_000);
    card.seedFromHistory({ start: base - 60_000, end: base, open: true }, {
      chartEnd: base,
      powerSeries: [{ t: base - 60_000, v: 100 }],
      priceSeries: [{ t: base - 60_000, v: 0.1 }], energySeries: [],
    });
    assert.equal(card.live.gaps, true);
  });
  await test("Recorder reconciliation clears a previously provisional seed tail", async (card) => {
    card.live.gaps = true;
    card.hass.callApi = async () => history();
    await card.seedLive(base - 60_000);
    near(card.live.cost, kwh(100 * 60_000 * 0.1), "reconciled cost");
    assert.equal(card.live.gaps, false);
  });
  console.log(`\n${checks} live cost checks passed.`);
} finally {
  Date.now = nativeNow;
  await win.happyDOM.close();
}
