// Synthetic accessibility contracts. No Home Assistant or printer is contacted.
import assert from "node:assert/strict";
import { Window } from "happy-dom";

const win = new Window({ url: "http://localhost/" });
for (const key of [
  "window", "document", "Document", "DocumentFragment", "customElements",
  "HTMLElement", "HTMLDialogElement", "HTMLTemplateElement", "SVGElement",
  "Element", "Node", "ShadowRoot", "Event", "CustomEvent", "MouseEvent",
  "KeyboardEvent", "CSSStyleSheet", "getComputedStyle", "location",
]) {
  if (win[key] !== undefined) globalThis[key] = win[key];
}
globalThis.requestAnimationFrame = (callback) => setTimeout(() => callback(Date.now()), 0);
const { hass: fixtureHass, cardConfig } = await import("../preview/states.js");
await import("../dist/bambu-printer-card.js");
const tick = (ms = 30) => new Promise((resolve) => setTimeout(resolve, ms));

// The power chart is the shared ha-card-ui chart, fed with stub overview data.
const card = document.createElement("bambu-printer-card");
card.setConfig({ ...cardConfig, show_camera: false, show_ams: false });
card.hass = {
  ...fixtureHass,
  callApi: async () => [],
  callService: () => { throw new Error("Unexpected device action"); },
};
document.body.append(card);
await tick();
const HOUR = 3_600_000;
const start = Date.UTC(2026, 10, 3, 10);
const bucket = (points) => Array.from({ length: 12 }, (_, index) => ({
  t: start + index * 300_000,
  v: points[index] ?? null,
}));
const overview = (power, current) => ({
  loadedAt: start + HOUR, chartStart: start, chartEnd: start + HOUR,
  chartPower: bucket(power), chartCurrent: bucket(current),
  sessions: [], quotes: new Map(), powerSeries: [], priceSeries: [], energySeries: [],
});
const panel = () => card.shadowRoot.querySelector(".chart-panel");
// The shared formatters put a narrow no-break space before the unit, as on the other cards.
const unit = (texts) => texts.map((text) => text.replace(/ /g, "\u202f"));
const readout = () => panel().querySelector(".family-chart-readout")?.textContent.replace(/\s+/g, " ").trim();
card.overview = overview(
  [100, 104, 312, 290, 250, 240, 230, 220, 210, 200, 120, 104],
  [0.45, 0.45, 1.36, 1.2, 1.1, 1, 1, 1, 1, 0.9, 0.5, 0.45],
);
await card.updateComplete;
let slider = panel().querySelector("svg.family-chart");
let desc = slider.querySelector("desc").textContent;
assert.match(desc, /Highest plotted power 312 watts/);
assert.match(desc, /Highest plotted current 1.36 amps/);
assert.doesNotMatch(desc, /400 watts|2 amps|NaN/, "the summary names plotted peaks, not axis bounds");
assert.equal(slider.getAttribute("role"), "slider");
assert.equal(slider.getAttribute("aria-label"), "Power and current");
assert.equal(slider.getAttribute("aria-valuemax"), "11");
assert.equal(slider.getAttribute("viewBox").split(" ")[3], "120", "the overview chart is 120 px high");
assert.equal(panel().querySelector(".family-chart-gap-note"), null, "no gap note without gaps");
// Power is the right axis in watts, current the left axis in amps, units inside the labels.
const axis = (selector) => [...panel().querySelectorAll(selector)].map((node) => node.textContent.trim());
assert.deepEqual(axis(".family-chart-axis:not(.family-chart-axis-left)").map((text) => text.replace(/\s+/g, " ")), ["0 W", "100 W", "200 W", "300 W", "400 W"]);
assert.ok(axis(".family-chart-axis:not(.family-chart-axis-left)").every((text) => /\d\s*W$/.test(text)));
assert.ok(axis(".family-chart-axis-left").every((text) => /\d\s*A$/.test(text)));
// Axis and readout use formatHassNumber like the weather and price charts: a narrow
// no-break space before the unit, and every label with the step's decimals.
assert.deepEqual(axis(".family-chart-axis:not(.family-chart-axis-left)"), unit(["0 W", "100 W", "200 W", "300 W", "400 W"]));
assert.deepEqual(axis(".family-chart-axis-left"), unit(["0.0 A", "0.4 A", "0.8 A", "1.2 A", "1.6 A"]));
assert.deepEqual(
  [...panel().querySelectorAll(".family-chart-readout strong")].map((node) => node.textContent.trim()),
  unit(["104 W", "0.45 A"]),
);
// No timeLabel: the readout time is the library default, formatHassDateTime without the year.
const { formatHassDateTime } = await import("@bitosome/ha-card-ui");
assert.equal(
  panel().querySelector(".family-chart-readout span").textContent.trim(),
  formatHassDateTime(card.hass, start + 11 * 300_000, { year: false }),
);
assert.equal(panel().querySelectorAll(".family-chart-now").length, 0, "the window ends at the read time");
// Keyboard: Home and End move the readout; the launcher comes before the slider in tab order.
slider.dispatchEvent(new KeyboardEvent("keydown", { key: "Home", bubbles: true, cancelable: true }));
await card.updateComplete;
assert.equal(panel().querySelector("svg.family-chart").getAttribute("aria-valuenow"), "0");
assert.match(readout(), /100 W\s*0\.45 A$/);
// Escape gives up the manual pick and follows the latest bucket again.
panel().querySelector("svg.family-chart").dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true, cancelable: true }));
await card.updateComplete;
assert.equal(panel().querySelector("svg.family-chart").getAttribute("aria-valuenow"), "11");
assert.match(readout(), /104 W\s*0\.45 A$/);
panel().querySelector("svg.family-chart").dispatchEvent(new KeyboardEvent("keydown", { key: "Home", bubbles: true, cancelable: true }));
await card.updateComplete;
panel().querySelector("svg.family-chart").dispatchEvent(new KeyboardEvent("keydown", { key: "End", bubbles: true, cancelable: true }));
await card.updateComplete;
assert.equal(panel().querySelector("svg.family-chart").getAttribute("aria-valuenow"), "11");
assert.match(readout(), /104 W\s*0\.45 A$/);
const focusable = [...panel().querySelectorAll("button, [tabindex]")];
assert.deepEqual(focusable.map((node) => node.matches("button.chart-head") ? "launcher" : node.getAttribute("role")), ["launcher", "slider"]);

// Plug noise just below zero is drawn at zero and never stretches the watt axis.
card.overview = overview(
  [-0.3, 0, 312, 290, -20, 240, 230, 220, 210, 200, 120, 104],
  [-0.01, 0.45, 1.36, 1.2, 1.1, 1, 1, 1, 1, 0.9, 0.5, 0.45],
);
await card.updateComplete;
assert.deepEqual(axis(".family-chart-axis:not(.family-chart-axis-left)"), unit(["0 W", "100 W", "200 W", "300 W", "400 W"]));
assert.equal(axis(".family-chart-axis-left")[0], "0.0\u202fA");
assert.match(panel().querySelector("svg.family-chart desc").textContent, /Highest plotted power 312 watts/);
// A missing bucket mid-series splits the line and shows the gap note.
card.overview = overview(
  [100, 104, null, 290, 250, 240, 230, 220, 210, 200, 120, 104],
  [0.45, 0.45, null, 1.2, 1.1, 1, 1, 1, 1, 0.9, 0.5, 0.45],
);
await card.updateComplete;
assert.equal(panel().querySelector(".family-chart-gap-note")?.textContent.trim(), "Gaps mean missing data");
// At kilowatt scale the axis switches to kW like the readout does.
card.overview = overview(
  [9000, 12000, 13000, 13000, 12000, 11000, 10000, 9000, 8000, 7000, 6000, 13000],
  [40, 52, 56, 56, 52, 48, 44, 40, 36, 30, 26, 56],
);
await card.updateComplete;
assert.deepEqual(axis(".family-chart-axis:not(.family-chart-axis-left)"), unit(["0 kW", "4 kW", "8 kW", "12 kW", "16 kW"]));
assert.match(readout(), /13 kW\s*56 A$/);

card.overview = overview([null, NaN], [0, 0]);
await card.updateComplete;
desc = panel().querySelector("svg.family-chart desc").textContent;
assert.match(desc, /Power unavailable/);
assert.match(desc, /Highest plotted current 0 amps/);
assert.doesNotMatch(desc, /NaN|power 0 watts/);
assert.deepEqual(axis(".family-chart-axis:not(.family-chart-axis-left)"), [], "no invented watt labels");
assert.equal(panel().querySelectorAll('.family-chart-line[data-series="power"]').length, 0);
// Current alone still draws its line on the left amp axis.
assert.ok(panel().querySelectorAll('.family-chart-line[data-series="current"]').length > 0);
// A 0.25 A step keeps two decimals on every label, never 0.3 A or 0.8 A.
assert.deepEqual(axis(".family-chart-axis-left"), unit(["0.00 A", "0.25 A", "0.50 A", "0.75 A", "1.00 A"]));

// Recorder history: both series land on one 5-minute grid, carried forward from
// readings before the window, and a fresh overview drops a stale manual pick.
const NOW = Date.now();
const reading = (id, t, state) => ({ entity_id: id, state, last_changed: new Date(t).toISOString() });
card.hass = {
  ...card.hass,
  callApi: async () => [
    [reading("sensor.demo_printer_power", NOW - 25 * HOUR, "-0.4"), reading("sensor.demo_printer_power", NOW - HOUR, "200")],
    [reading("sensor.demo_printer_current", NOW - 26 * HOUR, "0.3"), reading("sensor.demo_printer_current", NOW - HOUR / 2, "0.9")],
  ],
};
card.overview = overview(
  [100, 104, 312, 290, 250, 240, 230, 220, 210, 200, 120, 104],
  [0.45, 0.45, 1.36, 1.2, 1.1, 1, 1, 1, 1, 0.9, 0.5, 0.45],
);
await card.updateComplete;
panel().querySelector("svg.family-chart").dispatchEvent(new KeyboardEvent("keydown", { key: "Home", bubbles: true, cancelable: true }));
await card.updateComplete;
assert.equal(panel().querySelector("svg.family-chart").getAttribute("aria-valuenow"), "0");
await card.loadOverview(true);
await card.updateComplete;
const { chartPower, chartCurrent } = card.overview;
assert.equal(chartPower.length, 288);
assert.deepEqual(chartPower.map((point) => point.t), chartCurrent.map((point) => point.t));
assert.ok(chartPower.every((point, index) => index === 0 || point.t - chartPower[index - 1].t === 300_000));
assert.equal(chartPower[0].v, -0.4, "carried forward from before the window");
assert.equal(chartCurrent[0].v, 0.3);
assert.equal(chartPower.at(-1).v, 200);
assert.equal(chartCurrent.at(-1).v, 0.9);
slider = panel().querySelector("svg.family-chart");
assert.equal(slider.getAttribute("aria-valuenow"), slider.getAttribute("aria-valuemax"), "fresh data follows now");
assert.match(readout(), /200 W\s*0\.9 A$/);
assert.equal(axis(".family-chart-axis:not(.family-chart-axis-left)")[0], "0\u202fW");

// Before any data the loading, error and empty states keep the chart's height.
const stateHeight = () => {
  const body = panel().querySelector(".family-chart-skeleton, .family-chart-empty");
  return body?.getAttribute("style")?.match(/(?:min-)?height:\s*(\d+)px/)?.[1];
};
card.overview = null;
card.overviewLoading = true;
await card.updateComplete;
assert.ok(panel().querySelector(".family-chart-skeleton"));
assert.equal(stateHeight(), "120", "loading is as high as the overview chart");
card.overviewLoading = false;
card.overviewError = "Recorder offline";
await card.updateComplete;
assert.match(panel().querySelector(".family-chart-empty").textContent, /Could not load power history\. Recorder offline/);
assert.equal(stateHeight(), "120", "the error is as high as the overview chart");
card.overviewError = "";
await card.updateComplete;
assert.match(panel().querySelector(".family-chart-empty").textContent, /No recorded power history yet/);
assert.equal(stateHeight(), "120", "the empty state is as high as the overview chart");
// Loaded but empty data renders the controller's empty body at the same height.
card.overview = overview([], []);
card.overview.chartPower = [];
card.overview.chartCurrent = [];
await card.updateComplete;
assert.equal(stateHeight(), "120", "empty data is as high as the overview chart");
// The card defines no chart head or title overrides; the shared frame wraps them.
const printerCss = customElements.get("bambu-printer-card").elementStyles.at(-1).cssText;
assert.doesNotMatch(printerCss, /\.family-chart-(head|title)\b|\.chart-state\b/);
card.remove();

const Card = customElements.get("bambu-printer-card");
const editor = await Card.getConfigElement();
editor.setConfig({ type: "custom:bambu-printer-card", printer_entity: "sensor.printer_print_status" });
document.body.append(editor);
await editor.updateComplete;
const switches = [...editor.shadowRoot.querySelectorAll("ha-switch")];
assert.equal(switches.length, 2);
for (const control of switches) {
  assert.ok(control.getAttribute("aria-label"));
  const helper = editor.shadowRoot.getElementById(control.getAttribute("aria-describedby"));
  assert.ok(helper?.textContent.trim());
}
assert.equal(switches[0].getAttribute("aria-label"), "Show live camera");
assert.equal(switches[1].getAttribute("aria-label"), "Show AMS");
editor.remove();

// The hero glow extends below the hero tile; the plug row must stay on the face layer.
const cardCss = customElements.get("bambu-printer-card").elementStyles
  .map((sheet) => sheet.cssText).join("\n");
assert.match(cardCss, /printer-accessory-controls\s*\{[^}]*position:\s*relative;[^}]*z-index:\s*1;/);
// Card-owned CSS resolves status colour through the shared --family-* aliases only.
const ownCss = customElements.get("bambu-printer-card").elementStyles.at(-1).cssText;
assert.match(ownCss, /\.hero-percent/);
assert.doesNotMatch(ownCss, /--status-|--(success|warning|error)-color/);
assert.doesNotMatch(ownCss, /\.text-button|\.family-brand\s*\{/);
// Camera overlay and progress come from the shared library, not card-owned copies.
assert.doesNotMatch(ownCss, /\.(camera-overlay|live-pill|snapshot-pill|camera-actions|camera-fullscreen|camera-zoom-reset|camera-placeholder|camera-caption|progress-track)\b/);
assert.match(ownCss, /\.progress-meter\s*\{[^}]*--family-level-color:\s*var\(--hero-accent/);
assert.match(cardCss, /\.family-media-controls\s*\{/);
assert.match(cardCss, /\.family-level-meter\s*\{/);
// The shared design tokens still define --status-*; the chart and the card's own CSS must not use them.
const chartCss = customElements.get("bambu-printer-card").elementStyles
  .map((sheet) => sheet.cssText).find((text) => /\.family-chart-frame\s*\{/.test(text));
assert.ok(chartCss, "the shared chart styles are composed");
assert.doesNotMatch(`${chartCss}\n${ownCss}`, /--status-warn-color/, "current is a neutral series, not a warning");
assert.doesNotMatch(ownCss, /\.(history-chart|chart-skeleton)\b|chartShimmer/, "chart chrome comes from the shared library");
await win.happyDOM.close();
console.log("PASS: shared power chart summaries, axes, keyboard and editor switch accessibility");
