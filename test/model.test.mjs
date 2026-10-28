// Pure model/cost-accounting tests. No Home Assistant or printer is contacted.
import assert from "node:assert/strict";
import {
  addLiveSample,
  buildChartBuckets,
  deriveSessions,
  formatCurrency,
  formatNumber,
  formatPrice,
  formatEnergy,
  formatCurrent,
  formatClock,
  formatTime,
  formatDateTime,
  localeContext,
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

check("tariff changes cannot hide stale power or manufacture energy", () => {
  const hour = 3_600_000;
  const session = { start: 0, end: 3 * hour };
  const power = [{ t: 0, v: 1000 }];
  const prices = Array.from({ length: 12 }, (_, index) => ({
    t: index * hour / 4, v: 0.2,
  }));
  const quote = quotePower(session, power, prices);
  assert.ok(Math.abs(quote.energy - 1) < 1e-9);
  assert.ok(Math.abs(quote.cost - 0.2) < 1e-9);
  assert.equal(quote.complete, false);
  assert.equal(quote.gaps, true);
  assert.equal(quotePower({ start: 2 * hour, end: 3 * hour }, power, prices).energy, 0);
});

check("power gaps shorter than a minute still mark cost partial", () => {
  const quote = quotePower({ start: 0, end: 120000 }, [
    { t: 0, v: 600 }, { t: 30000, v: null }, { t: 60000, v: 600 },
  ], [{ t: 0, v: 0.2 }]);
  assert.equal(quote.complete, false);
  assert.ok(Math.abs(quote.energy - 0.015) < 1e-9);
});

check("cumulative deltas split tariffs instead of repricing the whole delta", () => {
  const hour = 3_600_000;
  const quote = quoteEnergy({ start: 0, end: hour }, [
    { t: 0, v: 10 }, { t: hour, v: 11 },
  ], [{ t: 0, v: 0.1 }, { t: hour / 2, v: 0.3 }]);
  assert.ok(Math.abs(quote.energy - 1) < 1e-9);
  assert.ok(Math.abs(quote.cost - 0.2) < 1e-9);
  assert.equal(quote.complete, true);
});

check("cumulative estimates clip print boundaries without counting standby", () => {
  const hour = 3_600_000;
  const quote = quoteEnergy({ start: hour / 4, end: 3 * hour / 4 }, [
    { t: 0, v: 10 }, { t: hour, v: 11 },
  ], [{ t: 0, v: 0.2 }]);
  assert.ok(Math.abs(quote.energy - 0.5) < 1e-9);
  assert.ok(Math.abs(quote.cost - 0.1) < 1e-9);
  assert.equal(quote.complete, true);
});

check("a missing cumulative tail stays partial instead of being free", () => {
  const hour = 3_600_000;
  const quote = quoteEnergy({ start: 0, end: hour }, [
    { t: 0, v: 10 }, { t: hour / 2, v: 10.5 },
  ], [{ t: 0, v: 0.2 }]);
  assert.ok(Math.abs(quote.energy - 0.5) < 1e-9);
  assert.equal(quote.gaps, true);
  assert.equal(quote.complete, false);
  assert.equal(quoteEnergy({ start: 0, end: hour }, [{ t: 0, v: 10 }], []).complete, false);
});

check("meter reset and unknown readings never bridge a cumulative interval", () => {
  const minute = 60_000;
  const quote = quoteEnergy({ start: 0, end: 4 * minute }, [
    { t: 0, v: 10 }, { t: minute, v: null }, { t: 2 * minute, v: 11 },
    { t: 3 * minute, v: 0 }, { t: 4 * minute, v: 0.1 },
  ], [{ t: 0, v: 0.2 }]);
  assert.equal(quote.energy, 0.1);
  assert.equal(quote.complete, false);
});

check("meter staleness is measured between meter readings despite tariff changes", () => {
  const hour = 3_600_000;
  const quote = quoteEnergy({ start: 0, end: 8 * hour }, [
    { t: 0, v: 10 }, { t: 8 * hour, v: 12 },
  ], Array.from({ length: 8 }, (_, index) => ({ t: index * hour, v: 0.2 })));
  assert.equal(quote.energy, 0);
  assert.equal(quote.complete, false);
});

check("negative tariffs and unavailable tariff intervals retain their meaning", () => {
  const hour = 3_600_000;
  const quote = quoteEnergy({ start: 0, end: hour }, [
    { t: 0, v: 10 }, { t: hour, v: 11 },
  ], [{ t: 0, v: -0.2 }, { t: hour / 2, v: null }]);
  assert.ok(Math.abs(quote.energy - 1) < 1e-9);
  assert.ok(Math.abs(quote.cost + 0.1) < 1e-9);
  assert.ok(Math.abs(quote.unpricedEnergy - 0.5) < 1e-9);
  assert.equal(quote.complete, false);
});

check("missing live power marks partial even with regular updates", () => {
  const accumulated = addLiveSample({
    energy: 0, cost: 0, unpricedEnergy: 0, lastAt: 1,
    lastPower: null, lastPrice: 0.2, gaps: false,
  }, 10001, 600, 0.2);
  assert.equal(accumulated.energy, 0);
  assert.equal(liveQuote(accumulated).complete, false);
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

check("HA numeric preferences override UI language consistently", () => {
  assert.equal(formatNumber(1234.5, 1, { locale: "en-US", numberFormat: "decimal_comma" }), "1.234,5");
  assert.equal(formatNumber(1234.5, 1, { locale: "de-DE", numberFormat: "comma_decimal" }), "1,234.5");
  assert.match(formatNumber(1234.5, 1, { numberFormat: "space_comma" }), /^1[\s\u202f]234,5$/);
  assert.match(formatNumber(1234.5, 1, { numberFormat: "quote_decimal" }), /^1['’]234\.5$/);
  assert.equal(formatNumber(1234.5, 1, { locale: "de-DE", numberFormat: "none" }), "1234.5");
  assert.equal(formatNumber(1234.5, 1, { locale: "de-DE", numberFormat: "language" }), "1.234,5");
  assert.equal(formatNumber(1234.5, 1, { locale: "invalid_locale", numberFormat: "system" }), new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 }).format(1234.5));
});

check("money, tariff and unit values use the same numeric preference", () => {
  const context = { locale: "en-US", numberFormat: "decimal_comma", currency: "EUR" };
  assert.match(formatCurrency(1234.5, context), /1\.234,50/);
  assert.equal(formatCurrency(1234.5, { ...context, currency: undefined }), "1.234,50");
  assert.equal(formatPrice(-0.125, context), "-0,125");
  assert.equal(formatEnergy(0.005, context), "<0,01 kWh");
  assert.equal(formatCurrent(1.25, context), "1,25 A");
});

check("explicit 12/24 hour preferences apply to clock and dated times", () => {
  const afternoon = t("2026-10-27T15:30:00Z");
  const context = { locale: "en-US", timeZone: "UTC", timeFormat: "24" };
  assert.equal(formatTime(afternoon, context), "15:30");
  assert.equal(formatClock(afternoon, context), "15:30");
  assert.match(formatDateTime(afternoon, context), /15:30/);
  assert.equal(formatClock(t("2026-10-27T00:00:00Z"), context), "00:00");
  assert.match(formatClock(afternoon, { ...context, timeFormat: "12" }), /03:30\s*PM/);
  assert.equal(formatClock(afternoon, { ...context, locale: "de-DE", timeFormat: "language" }), "15:30");
});

check("HA server/local timezone preference resolves without losing timezone", () => {
  const hass = {
    locale: { language: "en-US", time_zone: "server", number_format: "none", time_format: "24" },
    config: { time_zone: "Europe/Tallinn" },
  };
  const server = localeContext(hass, undefined, "EUR");
  assert.equal(server.timeZone, "Europe/Tallinn");
  assert.equal(server.numberFormat, "none");
  assert.equal(server.timeFormat, "24");
  assert.equal(formatClock(t("2026-10-27T15:30:00Z"), server), "17:30");
  const local = localeContext({ ...hass, locale: { ...hass.locale, time_zone: "local" } }, undefined, "EUR");
  assert.equal(local.timeZone, undefined);
  const explicit = localeContext({ ...hass, locale: { ...hass.locale, time_zone: "Europe/London" } }, undefined, "EUR");
  assert.equal(explicit.timeZone, "Europe/London");
});

check("system clock preference selects browser hour cycle, keeps display language", () => {
  const afternoon = t("2026-10-27T15:30:00Z");
  const cycle = new Intl.DateTimeFormat(undefined, { hour: "numeric" }).resolvedOptions().hourCycle;
  const context = { locale: "en-US", timeZone: "UTC", timeFormat: "system" };
  assert.equal(formatClock(afternoon, context), formatClock(afternoon, { ...context, timeFormat: cycle === "h11" || cycle === "h12" ? "12" : "24" }));
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

check("external switches are optional, trimmed and restricted to distinct switches", () => {
  assert.equal(validateConfig({ printer_entity: "sensor.demo" }).printer_power_entity, undefined);
  const config = validateConfig({ printer_entity: "sensor.demo", printer_power_entity: " switch.printer ", air_purifier_entity: "switch.purifier" });
  assert.equal(config.printer_power_entity, "switch.printer");
  assert.equal(config.air_purifier_entity, "switch.purifier");
  assert.throws(() => validateConfig({ printer_entity: "sensor.demo", printer_power_entity: "light.printer" }), /switch entity/);
  assert.throws(() => validateConfig({ printer_entity: "sensor.demo", air_purifier_entity: true }), /string/);
  assert.throws(() => validateConfig({ printer_entity: "sensor.demo", printer_power_entity: "switch.same", air_purifier_entity: " switch.same " }), /different switch/);
});

console.log(`\n${passed} model checks passed.`);
