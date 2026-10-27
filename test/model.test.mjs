// Pure model/cost-accounting tests. No Home Assistant or printer is contacted.
import assert from "node:assert/strict";
import {
  addLiveSample,
  buildChartBuckets,
  deriveSessions,
  formatCurrency,
  formatDuration,
  historyPath,
  liveQuote,
  normalizeStatus,
  parseHistory,
  quoteEnergy,
  quotePower,
  resolvePrinter,
  statusLabel,
  toSeries,
  toStatePoints,
  validateConfig,
} from "../test-build/model.js";

const t = (iso) => Date.parse(iso);
const points = (rows) =>
  rows.map(([iso, state]) => ({ t: t(iso), state }));
const series = (rows) =>
  rows.map(([iso, value]) => ({
    t: t(iso),
    v: value === null ? null : Number(value),
  }));

let passed = 0;
const check = (name, fn) => {
  try {
    fn();
    passed++;
    console.log(`PASS: ${name}`);
  } catch (error) {
    console.error(`FAIL: ${name}`);
    throw error;
  }
};

check("status aliases stay explicit", () => {
  assert.equal(normalizeStatus("printing"), "printing");
  assert.equal(normalizeStatus("finish"), "finished");
  assert.equal(normalizeStatus("paused"), "paused");
  assert.equal(normalizeStatus("weird"), "unknown");
  assert.equal(statusLabel("paused"), "Paused");
});

check("print sessions survive pauses and reconnect blips", () => {
  const now = t("2026-10-27T12:30:00Z");
  const statuses = points([
    ["2026-10-27T09:00:00Z", "idle"],
    ["2026-10-27T10:00:00Z", "prepare"],
    ["2026-10-27T10:05:00Z", "running"],
    ["2026-10-27T11:00:00Z", "pause"],
    ["2026-10-27T10:30:00Z", "unavailable"],
    ["2026-10-27T10:31:00Z", "running"],
    ["2026-10-27T11:10:00Z", "running"],
    ["2026-10-27T12:00:00Z", "finish"],
    ["2026-10-27T12:01:00Z", "idle"],
  ]);
  const tasks = points([
    ["2026-10-27T09:55:00Z", "Benchy"],
    ["2026-10-27T12:00:00Z", "Benchy"],
  ]);
  const sessions = deriveSessions(statuses, tasks, now, t("2026-10-27T08:00:00Z"));
  assert.equal(sessions.length, 1);
  assert.equal(sessions[0].start, t("2026-10-27T10:00:00Z"));
  assert.equal(sessions[0].end, t("2026-10-27T12:00:00Z"));
  assert.equal(sessions[0].task, "Benchy");
  assert.equal(sessions[0].open, false);
  assert.equal(sessions[0].status, "finished");
});

check("a long offline period ends a session as partial", () => {
  const now = t("2026-10-27T13:00:00Z");
  const statuses = points([
    ["2026-10-27T10:00:00Z", "running"],
    ["2026-10-27T11:00:00Z", "offline"],
    ["2026-10-27T12:30:00Z", "idle"],
  ]);
  const sessions = deriveSessions(statuses, [], now, t("2026-10-27T08:00:00Z"));
  assert.equal(sessions.length, 1);
  assert.equal(sessions[0].end, t("2026-10-27T11:00:00Z"));
  assert.equal(sessions[0].partialEnd, true);
  assert.equal(sessions[0].status, "offline");
});

check("an active session remains open at now", () => {
  const now = t("2026-10-27T12:30:00Z");
  const statuses = points([
    ["2026-10-27T10:00:00Z", "running"],
    ["2026-10-27T12:00:00Z", "pause"],
  ]);
  const sessions = deriveSessions(statuses, [], now, t("2026-10-27T08:00:00Z"));
  assert.equal(sessions.length, 1);
  assert.equal(sessions[0].open, true);
  assert.equal(sessions[0].end, now);
  assert.equal(sessions[0].status, "paused");
});

check("short preview blips do not create print sessions", () => {
  const now = t("2026-10-27T12:00:00Z");
  const statuses = points([
    ["2026-10-27T07:12:54Z", "idle"],
    ["2026-10-27T07:12:59Z", "unavailable"],
    ["2026-10-27T07:13:00Z", "idle"],
  ]);
  assert.equal(
    deriveSessions(statuses, [], now, t("2026-10-27T07:00:00Z")).length,
    0,
  );
});

check("power cost follows the tariff at each interval", () => {
  const session = {
    start: t("2026-10-27T10:00:00Z"),
    end: t("2026-10-27T12:00:00Z"),
  };
  const power = series([
    ["2026-10-27T10:00:00Z", 0],
    ["2026-10-27T10:00:10Z", 1000],
    ["2026-10-27T11:00:00Z", 500],
    ["2026-10-27T12:00:00Z", 0],
  ]);
  const price = series([
    ["2026-10-27T10:00:00Z", 0.1],
    ["2026-10-27T11:00:00Z", 0.2],
  ]);
  const quote = quotePower(session, power, price);
  assert.ok(Math.abs(quote.energy - (1000 * 3590 / 3600 / 1000 + 500 / 1000)) < 0.001);
  assert.ok(Math.abs(quote.cost - (1000 * 3590 / 3600 / 1000 * 0.1 + 500 / 1000 * 0.2)) < 0.001);
  assert.ok(Math.abs(quote.averagePrice - quote.cost / quote.energy) < 0.0001);
  assert.equal(quote.complete, true);
});

check("missing power is reported as a gap, not integrated silently", () => {
  const session = {
    start: t("2026-10-27T10:00:00Z"),
    end: t("2026-10-27T12:00:00Z"),
  };
  const power = series([
    ["2026-10-27T10:00:00Z", 1000],
    ["2026-10-27T11:00:00Z", null],
    ["2026-10-27T11:05:00Z", 1000],
    ["2026-10-27T12:00:00Z", 0],
  ]);
  const price = series([["2026-10-27T10:00:00Z", 0.1]]);
  const quote = quotePower(session, power, price);
  assert.equal(quote.gaps, true);
  assert.equal(quote.complete, false);
});

check("missing tariffs are unpriced energy, not zero cost", () => {
  const session = {
    start: t("2026-10-27T10:00:00Z"),
    end: t("2026-10-27T10:10:00Z"),
  };
  const power = series([
    ["2026-10-27T10:00:00Z", 600],
    ["2026-10-27T10:10:00Z", 0],
  ]);
  const quote = quotePower(session, power, []);
  assert.ok(quote.energy > 0);
  assert.equal(quote.cost, 0);
  assert.equal(quote.unpricedEnergy, quote.energy);
  assert.equal(quote.complete, false);
  assert.equal(quote.averagePrice, null);
});

check("energy fallback costs cumulative deltas", () => {
  const session = {
    start: t("2026-10-27T10:00:00Z"),
    end: t("2026-10-27T12:00:00Z"),
  };
  const energy = series([
    ["2026-10-27T10:00:00Z", 1],
    ["2026-10-27T11:00:00Z", 1.5],
    ["2026-10-27T12:00:00Z", 2],
  ]);
  const price = series([
    ["2026-10-27T10:00:00Z", 0.1],
    ["2026-10-27T11:00:00Z", 0.2],
  ]);
  const quote = quoteEnergy(session, energy, price);
  assert.ok(Math.abs(quote.energy - 1) < 1e-9);
  assert.ok(Math.abs(quote.cost - (0.5 * 0.1 + 0.5 * 0.2)) < 1e-9);
});

check("live samples accumulate and cap stale gaps", () => {
  let accumulator = {
    energy: 0,
    cost: 0,
    unpricedEnergy: 0,
    lastAt: t("2026-10-27T10:00:00Z"),
    lastPower: 1000,
    lastPrice: 0.2,
    gaps: false,
  };
  accumulator = addLiveSample(
    accumulator,
    t("2026-10-27T10:02:00Z"),
    1000,
    0.2,
  );
  assert.ok(Math.abs(accumulator.energy - 1000 * 120 / 3600 / 1000) < 1e-9);
  assert.ok(Math.abs(accumulator.cost - 1000 * 120 / 3600 / 1000 * 0.2) < 1e-9);
  const stale = addLiveSample(accumulator, t("2026-10-27T11:00:00Z"), 1000, 0.2);
  assert.equal(stale.gaps, true);
  assert.equal(liveQuote(stale).complete, false);
});

check("chart buckets carry sample-and-hold values", () => {
  const buckets = buildChartBuckets(
    series([
      ["2026-10-27T10:00:00Z", 100],
      ["2026-10-27T10:10:00Z", 200],
    ]),
    series([["2026-10-27T10:00:00Z", 1]]),
    t("2026-10-27T10:00:00Z"),
    t("2026-10-27T10:15:00Z"),
    5 * 60_000,
  );
  assert.equal(buckets.length, 3);
  assert.equal(buckets[0].power, 100);
  assert.equal(buckets[1].power, 100);
  assert.equal(buckets[2].power, 200);
  assert.equal(buckets[2].current, 1);
});

check("history transport maps minimal responses by entity id", () => {
  const response = [
    [
      {
        entity_id: "sensor.power",
        state: "100",
        last_changed: "2026-10-27T10:00:00Z",
      },
      { state: "200", last_changed: "2026-10-27T10:10:00Z" },
    ],
  ];
  const parsed = parseHistory(response, ["sensor.power"]);
  assert.equal(parsed.get("sensor.power").length, 2);
  const path = historyPath(["sensor.power"], 0, 3_600_000);
  assert.match(path, /history\/period\//);
  assert.match(path, /minimal_response/);
  assert.match(path, /no_attributes/);
});

check("entity discovery groups two AMS units and external spools", () => {
  const states = {
    "sensor.h2d_abc_print_status": { entity_id: "sensor.h2d_abc_print_status", state: "idle", attributes: {} },
    "sensor.h2d_abc_printer_name": { entity_id: "sensor.h2d_abc_printer_name", state: "H2D", attributes: {} },
    "sensor.h2d_abc_ams_1_tray_1": {
      entity_id: "sensor.h2d_abc_ams_1_tray_1",
      state: "Bambu PLA Basic",
      attributes: { slot: 1, active: true, color: "#C12E1FFF", cols: ["#C12E1FFF"], name: "Bambu PLA Basic", type: "PLA", remain: 97, empty: false },
    },
    "sensor.h2d_abc_ams_2_tray_1": {
      entity_id: "sensor.h2d_abc_ams_2_tray_1",
      state: "Bambu ASA",
      attributes: { slot: 1, color: "#FFFFFFFF", name: "Bambu ASA", type: "ASA", remain: 0, remain_enabled: false, empty: false },
    },
    "sensor.h2d_abc_ams_1_temperature": { entity_id: "sensor.h2d_abc_ams_1_temperature", state: "24.5", attributes: { unit_of_measurement: "°C" } },
    "sensor.h2d_abc_externalspool_external_spool": {
      entity_id: "sensor.h2d_abc_externalspool_external_spool",
      state: "?",
      attributes: { empty: true, name: "?" },
    },
    "sensor.h2d_abc_active_tray": {
      entity_id: "sensor.h2d_abc_active_tray",
      state: "Bambu PLA Basic",
      attributes: { ams_index: 0, tray_index: 0 },
    },
  };
  const printer = resolvePrinter(states, { printer_entity: "sensor.h2d_abc_print_status" });
  assert.ok(printer);
  assert.equal(printer.prefix, "h2d_abc");
  assert.equal(printer.ams.length, 2);
  assert.equal(printer.ams[0].trays[0].active, true);
  assert.equal(printer.ams[0].trays[0].color, "#c12e1f");
  assert.equal(printer.ams[1].trays[0].remainEnabled, false);
  assert.equal(printer.external[0].empty, true);
});

check("configuration clamps history days and rejects bad currency", () => {
  const config = validateConfig({
    printer_entity: "sensor.p",
    history_days: 999,
    currency: "EUR",
  });
  assert.equal(config.history_days, 30);
  assert.equal(config.show_camera, true);
  assert.throws(() => validateConfig({ printer_entity: "sensor.p", currency: "EURO" }));
});

check("formatting stays readable", () => {
  assert.match(formatCurrency(0.42, { currency: "EUR", locale: "en-US" }), /0\.42/);
  assert.equal(formatDuration(90 * 60_000), "1h 30m");
  assert.equal(formatDuration(42 * 1000), "1m");
});

check("state points sort and collapse duplicate timestamps", () => {
  const parsed = toStatePoints([
    { state: "running", last_changed: "2026-10-27T10:10:00Z" },
    { state: "prepare", last_changed: "2026-10-27T10:00:00Z" },
    { state: "paused", last_changed: "2026-10-27T10:10:00Z" },
  ]);
  assert.deepEqual(parsed.map((p) => p.state), ["prepare", "paused"]);
});

check("numeric series keeps unavailable as a gap", () => {
  const parsed = toSeries([
    { state: "100", last_changed: "2026-10-27T10:00:00Z" },
    { state: "unavailable", last_changed: "2026-10-27T10:10:00Z" },
  ]);
  assert.equal(parsed[0].v, 100);
  assert.equal(parsed[1].v, null);
});

console.log(`\n${passed} model checks passed.`);
