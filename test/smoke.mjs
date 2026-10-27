// Offline smoke tests for the Bambu Lab printer card.
//
// The bundle is exercised with happy-dom, a synthetic Home Assistant object and
// the same synthetic Recorder history used by the local preview. No printer,
// HA instance or network service is contacted.
import { Window } from "happy-dom";

const win = new Window({ url: "http://localhost/" });
for (const key of [
  "window",
  "document",
  "Document",
  "DocumentFragment",
  "customElements",
  "HTMLElement",
  "HTMLDialogElement",
  "HTMLTemplateElement",
  "SVGElement",
  "Element",
  "Node",
  "ShadowRoot",
  "Event",
  "CustomEvent",
  "MouseEvent",
  "KeyboardEvent",
  "CSSStyleSheet",
  "getComputedStyle",
  "location",
]) {
  try {
    if (win[key] !== undefined) globalThis[key] = win[key];
  } catch {
    // Some globals are read-only in Node.
  }
}
globalThis.requestAnimationFrame = (callback) =>
  setTimeout(() => callback(Date.now()), 0);

class HaCameraStream extends win.HTMLElement {}
if (!win.customElements.get("ha-camera-stream")) {
  win.customElements.define("ha-camera-stream", HaCameraStream);
}
win.loadCardHelpers = async () => ({
  async createCardElement() {
    return win.document.createElement("div");
  },
});

const { hass: previewHass, cardConfig } = await import("../preview/states.js");
await import("../dist/bambu-printer-card.js");

const serviceCalls = [];
const hass = {
  ...previewHass,
  async callService(...args) {
    serviceCalls.push(args);
    throw new Error("The card must not call services while displaying data.");
  },
};

let passed = 0;
let failed = 0;
const check = (name, condition, detail = "") => {
  if (condition) {
    passed++;
    console.log(`PASS: ${name}`);
  } else {
    failed++;
    console.error(`FAIL: ${name}${detail ? ` — ${detail}` : ""}`);
  }
};
const tick = (ms = 60) => new Promise((resolve) => setTimeout(resolve, ms));
const text = (node) => node?.textContent?.replace(/\s+/g, " ").trim() || "";

const card = document.createElement("bambu-printer-card");
card.setConfig(cardConfig);
document.body.append(card);
card.hass = hass;
await tick(1400);

const root = card.shadowRoot;
check("element registers", !!customElements.get("bambu-printer-card"));
check("renders a ha-card", !!root?.querySelector("ha-card"));
check(
  "header shows the printer and printing state",
  text(root?.querySelector(".family-title")) === "H2D" &&
    text(root?.querySelector(".status-chip")).includes("Printing"),
);
check(
  "hero shows the current task and progress",
  text(root?.querySelector(".hero-task")) === "Desk organizer" &&
    text(root?.querySelector(".hero-percent")) === "42%",
);
check(
  "hero exposes live print metrics",
  text(root?.querySelector(".hero-meta")).includes("Layer 78 / 210") &&
    text(root?.querySelector(".hero-meta")).includes("84.2 g"),
);
const metricText = [...(root?.querySelectorAll(".metric") || [])].map(text).join(" | ");
check(
  "metrics show bed, nozzle, chamber and power",
  metricText.includes("Bed") &&
    metricText.includes("220") &&
    metricText.includes("Chamber") &&
    metricText.includes("312"),
  metricText,
);
check(
  "telemetry shows power cost inputs",
  text(root?.querySelector(".telemetry")).includes("1.36 A") &&
    text(root?.querySelector(".telemetry")).includes("0.162") &&
    text(root?.querySelector(".telemetry")).includes("kWh"),
);
check(
  "camera tile renders the stream/snapshot surface",
  !!root?.querySelector(".camera-tile") &&
    !!root?.querySelector(".camera-frame") &&
    !!root?.querySelector(".camera-frame ha-camera-stream"),
);
check(
  "camera tile can switch between live and snapshot",
  root?.querySelectorAll(".camera-actions button").length === 2,
);
root?.querySelector(".camera-actions button:first-child")?.click();
await tick(60);
check(
  "snapshot mode replaces the live element without leaving the card",
  !!root?.querySelector(".camera-frame img.camera-image") &&
    !root?.querySelector(".camera-frame ha-camera-stream"),
);
root?.querySelector(".camera-actions button:first-child")?.click();
await tick(60);
check(
  "live mode restores the camera stream element",
  !!root?.querySelector(".camera-frame ha-camera-stream"),
);

const moreInfoEvents = [];
card.addEventListener("hass-more-info", (event) => {
  moreInfoEvents.push(event.detail?.entityId);
});
root?.querySelector('[data-metric="chamber"]')?.click();
await tick(60);
check(
  "a temperature tile opens native entity details, not the full card dialog",
  moreInfoEvents.includes("sensor.h2d_demo_chamber_temperature") &&
    !root?.querySelector("dialog.family-dialog"),
);
root?.querySelector('[data-telemetry="current"]')?.click();
await tick(40);
check(
  "telemetry cells open their own entity details",
  moreInfoEvents.includes("sensor.demo_printer_current"),
);

check(
  "overview shows a compact AMS summary, not eight full trays",
  root?.querySelectorAll(".ams-summary-tile").length === 2 &&
    !root?.querySelector(".ams-card") &&
    text(root?.querySelector(".ams-summary-tile")).includes("Bambu PLA Basic"),
);
root?.querySelector(".ams-summary-tile")?.click();
await tick(100);
check(
  "the AMS page shows both units and all eight trays",
  root?.querySelectorAll(".ams-card").length === 2 &&
    root?.querySelectorAll(".tray").length === 8,
);
check(
  "the active tray is highlighted with its filament",
  text(root?.querySelector(".tray.active")).includes("Bambu PLA Basic") &&
    text(root?.querySelector(".tray.active")).includes("Active") &&
    text(root?.querySelector(".tray.active")).includes("97%"),
);
root?.querySelector('[data-nav="overview"]')?.click();
await tick(80);
check(
  "the bottom navigation returns to the overview",
  !!root?.querySelector(".metrics") &&
    !root?.querySelector(".ams-card") &&
    root?.querySelector('[data-nav="overview"]')?.getAttribute("aria-current") ===
      "page",
);

check(
  "bottom navigation exposes overview, AMS, history and details",
  root?.querySelectorAll("[data-nav]").length === 4 &&
    text(root?.querySelector('[data-nav="ams"]')).includes("AMS") &&
    text(root?.querySelector('[data-nav="history"]')).includes("History") &&
    text(root?.querySelector('[data-nav="details"]')).includes("Details"),
);

// Clickable model preview ------------------------------------------------
root?.querySelector("button.hero-art")?.click();
await tick(100);
let previewDialog = root?.querySelector("dialog.family-dialog");
check(
  "the print preview opens a full image dialog",
  !!previewDialog &&
    previewDialog.open === true &&
    text(previewDialog).includes("Print preview") &&
    !!previewDialog.querySelector("img.preview-large"),
);
previewDialog?.querySelector(".family-icon-button[title='Close']")?.click();
await tick(80);
const costText = text(root?.querySelector(".cost-value"));
check(
  "current print cost is estimated from recorder power",
  /€\s?0\.\d\d/.test(costText) && costText.startsWith("≈"),
  costText,
);
check(
  "24 h chart renders power and current",
  !!root?.querySelector("bambu-print-chart")?.shadowRoot?.querySelector("svg"),
);
check("no printer or HA service was called", serviceCalls.length === 0);

// History dialog -----------------------------------------------------------
root?.querySelector(".cost-button")?.click();
await tick(1000);
let dialog = root?.querySelector("dialog.family-dialog");
check("history dialog opens as a native dialog", !!dialog && dialog.open === true);
const historyText = text(dialog);
check(
  "history summary shows cost, energy and print count",
  historyText.includes("Print history") &&
    historyText.includes("Total cost") &&
    historyText.includes("Electricity used") &&
    historyText.includes("3 prints in 7 days"),
  historyText.slice(0, 250),
);
check(
  "history lists recorded print sessions",
  historyText.includes("Desk organizer") &&
    historyText.includes("Phone stand") &&
    historyText.includes("Bracket"),
);
check(
  "history records include per-print cost and energy",
  /€\s?0\.\d\d/.test(historyText) && historyText.includes("kWh"),
);
check(
  "history chart uses the same 24 h chart element",
  !!dialog?.querySelector("bambu-print-chart"),
);
dialog?.querySelector(".family-icon-button[title='Close']")?.click();
await tick(100);
check("history dialog closes", !root?.querySelector("dialog.family-dialog"));

// Details dialog -----------------------------------------------------------
root?.querySelector('[data-nav="details"]')?.click();
await tick(500);
dialog = root?.querySelector("dialog.family-dialog");
const detailsText = text(dialog);
check("details dialog opens", !!dialog && dialog.open === true);
check(
  "details identify the card as read-only",
  detailsText.includes("Printer details") &&
    detailsText.includes("Read-only printer telemetry") &&
    detailsText.includes("never sends a printer command"),
);
check(
  "details show print job, elapsed time and formatted material data",
  detailsText.includes("Print job") &&
    detailsText.includes("Elapsed") &&
    detailsText.includes("1h") &&
    detailsText.includes("Textured plate") &&
    detailsText.includes("Standard"),
  detailsText.slice(0, 250),
);
check(
  "details group machine and AMS telemetry without hiding it",
  detailsText.includes("Machine") &&
    detailsText.includes("AMS") &&
    !!dialog?.querySelector("details.group.collapsible"),
);
check("no services were called from the details dialog", serviceCalls.length === 0);
dialog?.querySelector(".family-icon-button[title='Close']")?.click();
await tick(100);

// Offline state ------------------------------------------------------------
const statusId = cardConfig.printer_entity;
const offlineStates = {
  ...hass.states,
  [statusId]: { ...hass.states[statusId], state: "offline" },
};
card.hass = { ...hass, states: offlineStates };
await tick(400);
check(
  "offline status is explicit, not stale printing data",
  text(root?.querySelector(".status-chip")).includes("Offline") &&
    text(root?.querySelector(".notices")).toLowerCase().includes("offline"),
);

// Unavailable state --------------------------------------------------------
const unavailableStates = {
  ...hass.states,
  [statusId]: { ...hass.states[statusId], state: "unavailable" },
};
card.hass = { ...hass, states: unavailableStates };
await tick(400);
check(
  "unavailable status is explicit",
  text(root?.querySelector(".status-chip")).includes("Unavailable") &&
    text(root?.querySelector(".notices")).toLowerCase().includes("offline"),
);

// Missing printer entity ---------------------------------------------------
const missing = document.createElement("bambu-printer-card");
missing.setConfig({ ...cardConfig, printer_entity: "sensor.does_not_exist" });
document.body.append(missing);
missing.hass = hass;
await tick(120);
check(
  "a missing entity is explained instead of rendering stale data",
  text(missing.shadowRoot?.querySelector(".setup")).includes(
    "Printer entity not found",
  ) &&
    text(missing.shadowRoot?.querySelector(".setup")).includes(
      "sensor.does_not_exist",
    ),
);

const unconfigured = document.createElement("bambu-printer-card");
unconfigured.setConfig({ history_days: 7 });
document.body.append(unconfigured);
unconfigured.hass = hass;
await tick(120);
check(
  "an unconfigured card explains how to connect a printer",
  text(unconfigured.shadowRoot?.querySelector(".setup")).includes(
    "Connect a printer",
  ),
);

check("no printer or HA service was called in any state", serviceCalls.length === 0);

// Visual editor ------------------------------------------------------------
const editor = await customElements.get("bambu-printer-card").getConfigElement();
editor.config = cardConfig;
editor.hass = hass;
document.body.append(editor);
await tick(120);
const editorText = text(editor.shadowRoot?.querySelector(".editor"));
check(
  "the visual editor exposes the printer, sensors and cost options",
  editorText.includes("Printer status entity") &&
    editorText.includes("Printer power sensor") &&
    editorText.includes("Electricity price sensor") &&
    editorText.includes("History window") &&
    editorText.includes("Show live camera"),
  editorText.slice(0, 250),
);
editor.remove();

card.remove();
missing.remove();
unconfigured.remove();
await tick(20);

console.log(`\n${passed} smoke checks passed, ${failed} failed.`);
if (failed) process.exitCode = 1;
