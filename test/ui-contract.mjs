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
await import("../dist/bambu-printer-card.js");

const chart = document.createElement("bambu-print-chart");
chart.start = 0;
chart.end = 3_600_000;
chart.context = { language: "en-US" };
chart.buckets = [
  { t: 0, power: 312, current: 1.36 },
  { t: 1_800_000, power: 104, current: 0.45 },
];
document.body.append(chart);
await chart.updateComplete;
let label = chart.shadowRoot.querySelector("svg").getAttribute("aria-label");
assert.match(label, /Highest plotted power 312 watts/);
assert.match(label, /Highest plotted current 1.36 amps/);
assert.doesNotMatch(label, /500 watts|2 amps/);

chart.buckets = [
  { t: 0, power: null, current: 0 },
  { t: 1_800_000, power: NaN, current: 0 },
];
await chart.updateComplete;
label = chart.shadowRoot.querySelector("svg").getAttribute("aria-label");
assert.match(label, /Power unavailable/);
assert.match(label, /Highest plotted current 0 amps/);
assert.doesNotMatch(label, /NaN|power 0 watts/);
chart.remove();

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
await win.happyDOM.close();
console.log("PASS: chart data summaries and editor switch accessibility");
