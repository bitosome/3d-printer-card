// Synthetic service/state interactions only. No Home Assistant or physical plug is contacted.
import assert from "node:assert/strict";
import { Window } from "happy-dom";
const win = new Window({ url: "http://localhost/" });
for (const key of ["window", "document", "Document", "DocumentFragment", "customElements", "HTMLElement", "HTMLDialogElement", "HTMLTemplateElement", "SVGElement", "Element", "Node", "ShadowRoot", "Event", "CustomEvent", "MouseEvent", "KeyboardEvent", "CSSStyleSheet", "getComputedStyle", "location"]) {
  if (win[key] !== undefined) globalThis[key] = win[key];
}
await import("../test-build/accessory-controls.js");
const element = document.createElement("printer-accessory-controls");
const calls = [];
let service = async () => {};
const entity = (id, state) => ({ entity_id: id, state, attributes: {} });
let hass = {
  states: { "switch.printer": entity("switch.printer", "on"), "switch.purifier": entity("switch.purifier", "off") },
  async callService(...args) { calls.push(args); return service(...args); },
};
element.hass = hass;
document.body.append(element);
const settle = async () => { await element.updateComplete; await new Promise(resolve => setTimeout(resolve, 1)); await element.updateComplete; };
const root = element.shadowRoot;
const button = kind => root.querySelector(`[data-accessory="${kind}"]`);
const action = label => [...root.querySelectorAll("dialog button")].find(node => node.textContent.trim() === label);
const updateState = async (id, value) => {
  hass = { ...hass, states: { ...hass.states, [id]: entity(id, value) } };
  element.hass = hass;
  await settle();
};
await settle();
assert.equal(root.querySelector("button"), null);
assert.equal(element.hasAttribute("configured"), false);
element.printerPowerEntity = "switch.printer";
element.airPurifierEntity = "switch.purifier";
element.printerStatus = "printing";
await settle();
assert.equal(element.hasAttribute("configured"), true);
assert.equal(button("printer").getAttribute("role"), "switch");
assert.equal(button("printer").getAttribute("aria-checked"), "true");
assert.equal(button("purifier").getAttribute("aria-checked"), "false");
console.log("PASS: optional accessory switches expose reported states, with no empty layout");

button("printer").focus(); button("printer").click(); await settle();
assert.equal(calls.length, 0);
assert.match(root.querySelector("dialog").textContent, /print is in progress or paused/);
assert.ok(root.querySelector('dialog ha-icon').icon === "mdi:close");
action("Cancel").click(); await settle();
assert.equal(root.querySelector("dialog"), null);
assert.equal(root.activeElement, button("printer"));
button("printer").click(); await settle();
root.querySelector('dialog [title="Close"]').click(); await settle();
assert.equal(calls.length, 0);
console.log("PASS: printer power-off requires confirmation; Cancel and X send nothing and restore focus");

button("printer").click(); await settle();
const confirm = action("Turn off printer"); confirm.click(); confirm.click(); await settle();
assert.deepEqual(calls, [["switch", "turn_off", { entity_id: "switch.printer" }]]);
assert.equal(root.querySelector("dialog"), null);
assert.equal(button("printer").disabled, true);
assert.equal(button("printer").getAttribute("aria-checked"), "true");
assert.match(button("printer").textContent, /Updating/);
await updateState("switch.printer", "off");
assert.equal(button("printer").disabled, false);
assert.equal(button("printer").getAttribute("aria-checked"), "false");
console.log("PASS: confirmed power-off sends one explicit command and waits for reported state");

element.printerStatus = "offline";
button("printer").click(); await settle();
assert.deepEqual(calls.at(-1), ["switch", "turn_on", { entity_id: "switch.printer" }]);
assert.equal(root.querySelector("dialog"), null);
await updateState("switch.printer", "on");
button("purifier").click(); await settle();
assert.deepEqual(calls.at(-1), ["switch", "turn_on", { entity_id: "switch.purifier" }]);
await updateState("switch.purifier", "on");
button("purifier").click(); await settle();
assert.deepEqual(calls.at(-1), ["switch", "turn_off", { entity_id: "switch.purifier" }]);
await updateState("switch.purifier", "off");
console.log("PASS: printer can turn on while offline; purifier toggles use explicit services without confirmation");

button("printer").click(); await settle();
element.printerPowerEntity = "switch.other"; await settle();
assert.equal(root.querySelector("dialog"), null);
assert.equal(button("printer").disabled, true);
assert.match(button("printer").textContent, /Unavailable/);
element.printerPowerEntity = "switch.printer"; await settle();
button("printer").click(); await settle();
await updateState("switch.printer", "off");
assert.equal(root.querySelector("dialog"), null);
await updateState("switch.printer", "on");
button("printer").click(); await settle();
await updateState("switch.printer", "unavailable");
assert.equal(action("Turn off printer").disabled, true);
action("Cancel").click(); await settle();
await updateState("switch.printer", "unknown");
assert.equal(button("printer").disabled, true);
assert.equal(button("printer").hasAttribute("aria-checked"), false);
await updateState("switch.printer", "on");
console.log("PASS: changed target, external power-off and unavailable states cannot execute stale confirmation");

service = async () => { throw new Error("Not permitted"); };
const countBeforeFailure = calls.length;
button("purifier").click(); await settle();
assert.equal(calls.length, countBeforeFailure + 1);
assert.equal(button("purifier").disabled, false);
assert.equal(button("purifier").getAttribute("aria-checked"), "false");
assert.match(root.querySelector('[role="alert"]').textContent, /Not permitted/);
console.log("PASS: service failures keep the true state and expose a dismissible error");

const realSetTimeout = globalThis.setTimeout;
let timeout;
globalThis.setTimeout = (callback, delay, ...args) => delay === 15_000 ? (timeout = callback, 999) : realSetTimeout(callback, delay, ...args);
let resolveService;
service = () => new Promise(resolve => { resolveService = resolve; });
button("purifier").click(); await settle();
assert.equal(button("purifier").disabled, true);
assert.equal(typeof timeout, "function");
timeout(); await settle();
assert.equal(button("purifier").disabled, false);
assert.match(root.querySelector('[role="alert"]').textContent, /has not confirmed/);
const countAfterTimeout = calls.length;
resolveService(); await settle();
assert.equal(calls.length, countAfterTimeout);
assert.match(root.querySelector('[role="alert"]').textContent, /has not confirmed/);
globalThis.setTimeout = realSetTimeout;
console.log("PASS: lost response has bounded pending, no automatic retry, and late completion cannot erase uncertainty");

service = () => new Promise(resolve => { resolveService = resolve; });
button("purifier").click(); await settle();
element.remove(); resolveService(); await settle();
document.body.append(element); await settle();
assert.equal(button("purifier").disabled, false);
assert.equal(root.querySelector("dialog"), null);
element.airPurifierEntity = "switch.printer"; await settle();
assert.equal(button("purifier"), null);
console.log("PASS: detach cleans pending work and duplicate printer target cannot bypass confirmation");
element.remove();
await win.happyDOM.close();
