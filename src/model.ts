/**
 * Pure data/formatting helpers for the Bambu Lab printer card.
 *
 * Nothing here talks to a device, a service or a sibling repository. The card
 * turns Home Assistant state/history into an honest presentation model; all
 * cost values are estimates derived from recorded power and tariff samples.
 */
import type {
  AmsTray,
  AmsUnit,
  CardConfig,
  ChartBucket,
  ExternalSpool,
  HassEntity,
  HistoryState,
  HomeAssistant,
  PrintSession,
  PrinterEntities,
  PrinterStatus,
  Quote,
  SeriesPoint,
  StatePoint,
} from "./types";

export const MIN_SESSION_MS = 60_000;
export const BLIP_MS = 120_000;
export const MAX_POWER_GAP_MS = 60 * 60_000;
export const MAX_ENERGY_GAP_MS = 6 * 60 * 60_000;
export const MAX_HISTORY_DAYS = 30;
export const DEFAULT_HISTORY_DAYS = 7;

const UNAVAILABLE = new Set(["unavailable", "unknown", "none", "null", ""]);

export function isUnavailable(value: string | null | undefined): boolean {
  return value == null || UNAVAILABLE.has(String(value).trim().toLowerCase());
}

export function asNumber(value: unknown): number | null {
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || UNAVAILABLE.has(trimmed.toLowerCase())) return null;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
}

export function entityNumber(entity: HassEntity | null | undefined): number | null {
  return entity ? asNumber(entity.state) : null;
}

export function available(entity: HassEntity | null | undefined): boolean {
  return !!entity && !isUnavailable(entity.state);
}

export function unitOf(entity: HassEntity | null | undefined): string {
  return String(entity?.attributes.unit_of_measurement ?? "");
}

export function powerValue(state: string, unit: string): number | null {
  const value = asNumber(state);
  if (value === null) return null;
  const normalized = unit.toLowerCase();
  if (normalized === "kw" || normalized.includes("kilowatt")) return value * 1000;
  if (normalized === "mw" || normalized.includes("milliwatt")) return value / 1000;
  return value;
}

export function energyValue(state: string, unit: string): number | null {
  const value = asNumber(state);
  if (value === null) return null;
  const normalized = unit.toLowerCase();
  if (
    normalized === "wh" ||
    normalized.includes("watt-hour") ||
    normalized.includes("watt hour")
  ) {
    return value / 1000;
  }
  if (normalized === "mwh" || normalized.includes("megawatt")) return value * 1000;
  return value;
}

export function priceValue(state: string, unit: string): number | null {
  const value = asNumber(state);
  if (value === null) return null;
  const normalized = unit.toLowerCase();
  if (normalized.includes("/mwh") || normalized.includes("per mwh")) {
    return value / 1000;
  }
  if (
    normalized.includes("c/kwh") ||
    normalized.includes("cent/kwh") ||
    normalized.includes("¢/kwh")
  ) {
    return value / 100;
  }
  return value;
}

export function currentValue(state: string, unit: string): number | null {
  const value = asNumber(state);
  if (value === null) return null;
  return unit.toLowerCase() === "ma" ? value / 1000 : value;
}

export function powerWatts(entity: HassEntity | null | undefined): number | null {
  return entity ? powerValue(entity.state, unitOf(entity)) : null;
}

export function energyKwh(entity: HassEntity | null | undefined): number | null {
  return entity ? energyValue(entity.state, unitOf(entity)) : null;
}

/** Price in currency per kWh, tolerating common metric and tariff variants. */
export function pricePerKwh(entity: HassEntity | null | undefined): number | null {
  return entity ? priceValue(entity.state, unitOf(entity)) : null;
}

export function currentAmps(entity: HassEntity | null | undefined): number | null {
  return entity ? currentValue(entity.state, unitOf(entity)) : null;
}

export function voltageVolts(entity: HassEntity | null | undefined): number | null {
  return entityNumber(entity);
}

export function resolveCurrency(
  price: HassEntity | null | undefined,
  override?: string,
): string | undefined {
  if (override) return override.toUpperCase();
  const unit = unitOf(price);
  const code = unit.match(/\b([A-Z]{3})\b/);
  if (code) return code[1];
  if (unit.includes("€")) return "EUR";
  if (unit.includes("$")) return "USD";
  if (unit.includes("£")) return "GBP";
  if (unit.toLowerCase().includes("kr")) return "SEK";
  return undefined;
}

export function currencySymbol(currency: string | undefined): string {
  switch (currency) {
    case "EUR":
      return "€";
    case "USD":
      return "$";
    case "GBP":
      return "£";
    case "SEK":
      return "kr";
    case "NOK":
      return "kr";
    case "DKK":
      return "kr";
    case "PLN":
      return "zł";
    default:
      return currency || "";
  }
}

// ---------------------------------------------------------------------------
// Status
// ---------------------------------------------------------------------------

const STATUS_ALIASES: Record<string, PrinterStatus> = {
  running: "printing",
  printing: "printing",
  print: "printing",
  prepare: "preparing",
  preparing: "preparing",
  slicing: "preparing",
  init: "preparing",
  initializing: "preparing",
  pause: "paused",
  paused: "paused",
  finish: "finished",
  finished: "finished",
  completed: "finished",
  complete: "finished",
  success: "finished",
  failed: "failed",
  failure: "failed",
  error: "failed",
  idle: "idle",
  ready: "idle",
  standby: "idle",
  offline: "offline",
  disconnected: "offline",
  unavailable: "unavailable",
  unknown: "unknown",
};

export function normalizeStatus(raw: string | null | undefined): PrinterStatus {
  const key = String(raw ?? "").trim().toLowerCase();
  return STATUS_ALIASES[key] ?? "unknown";
}

export function isActiveStatus(status: PrinterStatus): boolean {
  return status === "printing" || status === "preparing" || status === "paused";
}

export function isPrintingStatus(status: PrinterStatus): boolean {
  return status === "printing" || status === "preparing";
}

export function statusLabel(status: PrinterStatus): string {
  switch (status) {
    case "printing":
      return "Printing";
    case "preparing":
      return "Preparing";
    case "paused":
      return "Paused";
    case "finished":
      return "Finished";
    case "failed":
      return "Failed";
    case "idle":
      return "Idle";
    case "offline":
      return "Offline";
    case "unavailable":
      return "Unavailable";
    default:
      return "Unknown";
  }
}

export type Tone = "neutral" | "accent" | "success" | "warning" | "error";

export function statusTone(status: PrinterStatus): Tone {
  switch (status) {
    case "printing":
    case "preparing":
      return "accent";
    case "paused":
      return "warning";
    case "finished":
      return "success";
    case "failed":
      return "error";
    default:
      return "neutral";
  }
}

export interface StatusGlow {
  mode: "static" | "pulse" | "none";
  active: boolean;
  color: string;
}

export function statusGlow(status: PrinterStatus): StatusGlow {
  switch (status) {
    case "printing":
      return { mode: "pulse", active: true, color: "var(--status-active-color)" };
    case "preparing":
      return { mode: "static", active: true, color: "var(--status-active-color)" };
    case "paused":
      return { mode: "static", active: true, color: "var(--status-warn-color)" };
    case "finished":
      return { mode: "static", active: true, color: "var(--status-success-color)" };
    case "failed":
      return { mode: "static", active: true, color: "var(--status-alert-color)" };
    default:
      return { mode: "none", active: false, color: "transparent" };
  }
}

// ---------------------------------------------------------------------------
// Entity discovery
// ---------------------------------------------------------------------------

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function derivePrefix(
  printerEntity: string,
  override?: string,
): string | null {
  if (override) {
    return override.replace(/^(sensor|binary_sensor|camera|image|light)\./, "");
  }
  const match = /^sensor\.(.+)_print_status$/.exec(printerEntity);
  if (match) return match[1];
  const objectId = printerEntity.split(".")[1] || "";
  if (!objectId) return null;
  return objectId.replace(/_(print_)?status$/, "");
}

function normalizedColor(value: unknown): string {
  const raw = typeof value === "string" ? value.trim() : "";
  if (!/^#[0-9a-f]{6,8}$/i.test(raw)) return "";
  const hex = raw.slice(0, 7).toLowerCase();
  return hex === "#000000" && raw.length === 9 && raw.endsWith("00") ? "" : hex;
}

function colorList(attributes: Record<string, unknown>): string[] {
  const colors = Array.isArray(attributes.cols)
    ? attributes.cols
        .map(normalizedColor)
        .filter((color): color is string => !!color)
    : [];
  if (colors.length) return colors;
  const single = normalizedColor(attributes.color);
  return single ? [single] : [];
}

function trayFromEntity(entity: HassEntity): AmsTray {
  const attrs = entity.attributes || {};
  const remainValue = asNumber(attrs.remain);
  const empty =
    attrs.empty === true ||
    isUnavailable(entity.state) ||
    entity.state.trim() === "?" ||
    String(attrs.name ?? "").trim() === "?";
  const colors = colorList(attrs);
  return {
    id: entity.entity_id,
    slot: asNumber(attrs.slot) ?? 0,
    name: empty ? "Empty" : String(attrs.name || entity.state || "Filament"),
    type: String(attrs.type || attrs.filament_id || ""),
    color: colors[0] || "",
    colors,
    remain: remainValue === null || remainValue < 0 ? null : Math.max(0, remainValue),
    remainEnabled: attrs.remain_enabled !== false,
    empty,
    active: attrs.active === true,
    nozzleMin: asNumber(attrs.nozzle_temp_min),
    nozzleMax: asNumber(attrs.nozzle_temp_max),
  };
}

export function resolvePrinter(
  states: Record<string, HassEntity>,
  config: CardConfig,
): PrinterEntities | null {
  const printer = config.printer_entity ? states[config.printer_entity] : undefined;
  if (!printer) return null;
  const prefix = derivePrefix(config.printer_entity, config.entity_prefix);
  if (!prefix) return null;
  const find = (domain: string, suffix: string, explicit?: string) =>
    (explicit ? states[explicit] : undefined) ??
    states[`${domain}.${prefix}_${suffix}`] ??
    null;

  const activeTray = find("sensor", "active_tray");
  const activeAmsIndex = asNumber(activeTray?.attributes?.ams_index);
  const activeSlotIndex = asNumber(activeTray?.attributes?.tray_index);

  const trayPattern = new RegExp(
    `^sensor\\.${escapeRegExp(prefix)}_ams_(\\d+)_tray_(\\d+)$`,
  );
  const units = new Map<number, AmsTray[]>();
  for (const id of Object.keys(states)) {
    const match = trayPattern.exec(id);
    if (!match) continue;
    const index = Number(match[1]);
    const tray = trayFromEntity(states[id]);
    tray.slot = Number(match[2]);
    if (activeAmsIndex !== null && activeSlotIndex !== null) {
      tray.active =
        tray.active || (index - 1 === activeAmsIndex && tray.slot - 1 === activeSlotIndex);
    }
    const list = units.get(index) ?? [];
    list.push(tray);
    units.set(index, list);
  }

  const ams: AmsUnit[] = [...units.entries()]
    .sort(([a], [b]) => a - b)
    .map(([index, trays]) => {
      const base = `ams_${index}`;
      return {
        index,
        label: `AMS ${index}`,
        active:
          states[`binary_sensor.${prefix}_${base}_active`]?.state === "on" ||
          trays.some((tray) => tray.active),
        drying: states[`binary_sensor.${prefix}_${base}_drying`]?.state === "on",
        dryingRemaining: asNumber(
          states[`sensor.${prefix}_${base}_remaining_drying_time`]?.state,
        ),
        temperature: states[`sensor.${prefix}_${base}_temperature`] ?? null,
        humidity: states[`sensor.${prefix}_${base}_humidity`] ?? null,
        trays: trays.sort((a, b) => a.slot - b.slot),
      };
    });

  const externalPattern = new RegExp(
    `^sensor\\.${escapeRegExp(prefix)}_externalspool(\\d*)_external_spool$`,
  );
  const external: ExternalSpool[] = [];
  for (const id of Object.keys(states).sort()) {
    const match = externalPattern.exec(id);
    if (!match) continue;
    const entity = states[id];
    const attrs = entity.attributes || {};
    const index = match[1] ? Number(match[1]) : 1;
    const colors = colorList(attrs);
    const empty =
      attrs.empty === true ||
      isUnavailable(entity.state) ||
      entity.state.trim() === "?" ||
      String(attrs.name ?? "").trim() === "?";
    external.push({
      id,
      index,
      label: index > 1 ? `External spool ${index}` : "External spool",
      name: empty ? "Empty" : String(attrs.name || entity.state || "Filament"),
      type: String(attrs.type || attrs.filament_id || ""),
      color: colors[0] || "",
      colors,
      remain: asNumber(attrs.remain),
      remainEnabled: attrs.remain_enabled !== false,
      empty,
      active:
        attrs.active === true ||
        states[`binary_sensor.${prefix}_externalspool${index > 1 ? index : ""}_active`]
          ?.state === "on",
    });
  }

  const nameEntity = find("sensor", "printer_name");
  const serialEntity = find("sensor", "serial_number");
  return {
    prefix,
    printer,
    name:
      config.name?.trim() ||
      (available(nameEntity) && String(nameEntity?.state).trim()) ||
      "3D printer",
    serial: available(serialEntity) ? String(serialEntity?.state) : null,
    task: find("sensor", "task_name"),
    progress: find("sensor", "print_progress"),
    stage: find("sensor", "current_stage"),
    remaining: find("sensor", "remaining_time"),
    start: find("sensor", "start_time"),
    end: find("sensor", "end_time"),
    currentLayer: find("sensor", "current_layer"),
    totalLayers: find("sensor", "total_layer_count"),
    printWeight: find("sensor", "print_weight"),
    printLength: find("sensor", "print_length"),
    bedType: find("sensor", "print_bed_type"),
    speedProfile: find("sensor", "speed_profile"),
    printType: find("sensor", "print_type"),
    gcodeFile: find("sensor", "gcode_file_downloaded"),
    printableObjects: find("sensor", "printable_objects"),
    bed: find("sensor", "bed_temperature"),
    bedTarget: find("sensor", "bed_target_temperature"),
    chamber: find("sensor", "chamber_temperature"),
    chamberTarget: find("sensor", "chamber_target_temperature"),
    nozzle: find("sensor", "nozzle_temperature"),
    nozzleTarget: find("sensor", "nozzle_target_temperature"),
    leftNozzle: find("sensor", "left_nozzle_temperature"),
    leftNozzleTarget: find("sensor", "left_nozzle_target_temperature"),
    leftNozzleType: find("sensor", "left_nozzle_type"),
    leftNozzleSize: find("sensor", "left_nozzle_size"),
    rightNozzle: find("sensor", "right_nozzle_temperature"),
    rightNozzleTarget: find("sensor", "right_nozzle_target_temperature"),
    rightNozzleType: find("sensor", "right_nozzle_type"),
    rightNozzleSize: find("sensor", "right_nozzle_size"),
    nozzleSize: find("sensor", "nozzle_size"),
    coolingFan: find("sensor", "cooling_fan_speed"),
    auxFan: find("sensor", "aux_fan_speed"),
    chamberFan: find("sensor", "chamber_fan_speed"),
    heatbreakFan: find("sensor", "heatbreak_fan_speed"),
    hms: find("binary_sensor", "hms_errors"),
    printError: find("binary_sensor", "print_error"),
    online: find("binary_sensor", "online"),
    door: find("binary_sensor", "enclosure_door"),
    filament: find("binary_sensor", "extruder_filament_state"),
    camera: find("camera", "camera", config.camera_entity),
    coverImage: find("image", "cover_image"),
    chamberLight: find("light", "chamber_light"),
    heatbedLight: find("light", "heatbed_light"),
    wifi: find("sensor", "wi_fi_signal"),
    ip: find("sensor", "ip_address"),
    mqttMode: find("sensor", "mqtt_connection_mode"),
    sdCard: find("sensor", "sd_card_status"),
    toolModule: find("sensor", "tool_module"),
    firmware: find("binary_sensor", "firmware_update"),
    lanMode: find("binary_sensor", "developer_lan_mode"),
    activeTray,
    totalUsage: find("sensor", "total_usage"),
    ams,
    external,
    power: config.power_entity ? states[config.power_entity] ?? null : null,
    energy: config.energy_entity ? states[config.energy_entity] ?? null : null,
    current: config.current_entity ? states[config.current_entity] ?? null : null,
    voltage: config.voltage_entity ? states[config.voltage_entity] ?? null : null,
    price: config.price_entity ? states[config.price_entity] ?? null : null,
  };
}

export interface HmsError {
  code: string;
  message: string;
  severity: string;
}

export function hmsErrors(entity: HassEntity | null): HmsError[] {
  if (!entity || entity.state !== "on") return [];
  const attributes = entity.attributes || {};
  const count = Math.max(0, asNumber(attributes.Count) ?? 0);
  const errors: HmsError[] = [];
  for (let index = 1; index <= count; index++) {
    const message = String(attributes[`${index}-Error`] ?? "").trim();
    if (!message) continue;
    errors.push({
      code: String(attributes[`${index}-Code`] ?? "").trim(),
      message,
      severity: String(attributes[`${index}-Severity`] ?? "").trim(),
    });
  }
  return errors;
}

// ---------------------------------------------------------------------------
// History transport helpers
// ---------------------------------------------------------------------------

export function historyPath(ids: string[], start: number, end: number): string {
  const params = [
    `filter_entity_id=${encodeURIComponent(ids.join(","))}`,
    `end_time=${encodeURIComponent(new Date(end).toISOString())}`,
    "minimal_response",
    "no_attributes",
  ];
  return `history/period/${encodeURIComponent(new Date(start).toISOString())}?${params.join("&")}`;
}

export function parseHistory(
  response: unknown,
  requested: string[],
): Map<string, HistoryState[]> {
  const result = new Map<string, HistoryState[]>();
  if (!Array.isArray(response)) return result;
  response.forEach((series, index) => {
    if (!Array.isArray(series) || series.length === 0) return;
    const first = series[0] as HistoryState | undefined;
    const id =
      (typeof first?.entity_id === "string" && first.entity_id) ||
      requested[index];
    if (!id) return;
    const points = series.filter(
      (point): point is HistoryState =>
        !!point &&
        typeof point === "object" &&
        typeof (point as HistoryState).state === "string" &&
        typeof (point as HistoryState).last_changed === "string",
    );
    if (points.length) result.set(id, points);
  });
  return result;
}

export function toStatePoints(series: HistoryState[] | undefined): StatePoint[] {
  if (!series?.length) return [];
  const points: StatePoint[] = [];
  for (const point of series) {
    const t = Date.parse(point.last_changed);
    if (!Number.isFinite(t)) continue;
    points.push({ t, state: point.state });
  }
  points.sort((a, b) => a.t - b.t);
  // Collapse duplicate timestamps, keeping the last reported state.
  return points.filter(
    (point, index) => index === points.length - 1 || point.t !== points[index + 1].t,
  );
}

export function toSeries(
  series: HistoryState[] | undefined,
  convert: (entityState: string) => number | null = (state) => asNumber(state),
): SeriesPoint[] {
  if (!series?.length) return [];
  const points: SeriesPoint[] = [];
  for (const point of series) {
    const t = Date.parse(point.last_changed);
    if (!Number.isFinite(t)) continue;
    points.push({
      t,
      v: isUnavailable(point.state) ? null : convert(point.state),
    });
  }
  points.sort((a, b) => a.t - b.t);
  return points.filter(
    (point, index) => index === points.length - 1 || point.t !== points[index + 1].t,
  );
}

export function lastAtOrBefore<T extends { t: number }>(
  points: T[],
  time: number,
): T | undefined {
  let low = 0;
  let high = points.length - 1;
  let found: T | undefined;
  while (low <= high) {
    const middle = (low + high) >> 1;
    if (points[middle].t <= time) {
      found = points[middle];
      low = middle + 1;
    } else {
      high = middle - 1;
    }
  }
  return found;
}

// ---------------------------------------------------------------------------
// Print sessions
// ---------------------------------------------------------------------------

function taskAt(tasks: StatePoint[], start: number): string | undefined {
  let value: string | undefined;
  let stamp = -Infinity;
  for (const task of tasks) {
    // The task sensor holds its last value while the printer is idle. Use the
    // latest value at or before the print start instead of losing the name when
    // the integration did not re-publish an unchanged task.
    if (task.t > start + 10 * 60_000) continue;
    const clean = task.state.trim();
    if (!clean || isUnavailable(clean) || clean === "?" || clean === "0") continue;
    if (task.t >= stamp) {
      value = clean;
      stamp = task.t;
    }
  }
  return value;
}

/**
 * Derive print sessions from Bambu print_status history.
 *
 * A session starts at prepare/running, survives pauses, and ends at
 * finish/failed/idle. A short unavailable/offline blip (integration reconnect)
 * does not split a print. A long one ends it as a partial record.
 */
export function deriveSessions(
  statuses: StatePoint[],
  tasks: StatePoint[],
  now: number,
  windowStart: number,
): PrintSession[] {
  if (!statuses.length) return [];
  const sessions: PrintSession[] = [];
  let open: PrintSession | undefined;

  const finish = (end: number, status: PrinterStatus, partialEnd = false) => {
    if (!open) return;
    open.end = Math.max(open.start, end);
    open.status = status;
    open.open = false;
    open.partialEnd = partialEnd;
    if (open.end - open.start >= MIN_SESSION_MS || status === "failed") {
      sessions.push(open);
    }
    open = undefined;
  };

  for (let index = 0; index < statuses.length; index++) {
    const point = statuses[index];
    const status = normalizeStatus(point.state);

    if (!open) {
      if (status === "printing" || status === "preparing") {
        open = {
          start: point.t,
          end: now,
          status,
          open: true,
          partialStart: point.t <= windowStart + 1000,
          partialEnd: false,
        };
      }
      continue;
    }

    if (status === "printing" || status === "preparing" || status === "paused") {
      open.status = status;
      continue;
    }

    if (status === "finished" || status === "failed" || status === "idle") {
      finish(point.t, status);
      continue;
    }

    if (status === "offline" || status === "unavailable" || status === "unknown") {
      const next = statuses[index + 1];
      const nextStatus = next ? normalizeStatus(next.state) : null;
      const short = !!next && next.t - point.t <= BLIP_MS;
      if (
        short &&
        nextStatus &&
        (nextStatus === "printing" ||
          nextStatus === "preparing" ||
          nextStatus === "paused" ||
          nextStatus === "finished" ||
          nextStatus === "failed")
      ) {
        // Reconnect blip: keep the current session open across it.
        continue;
      }
      finish(point.t, status, true);
      continue;
    }
  }

  if (open) {
    open.end = Math.max(open.start, now);
    open.open = true;
    sessions.push(open);
    open = undefined;
  }
  for (const session of sessions) session.task = taskAt(tasks, session.start);
  return sessions;
}

export function sessionFromStart(
  start: number,
  now: number,
  status: PrinterStatus,
  task?: string,
): PrintSession {
  return {
    start,
    end: Math.max(start, now),
    status,
    task,
    open: isActiveStatus(status),
    partialStart: true,
    partialEnd: false,
  };
}

// ---------------------------------------------------------------------------
// Cost integration
// ---------------------------------------------------------------------------

function emptyQuote(): Quote {
  return {
    energy: 0,
    cost: 0,
    pricedEnergy: 0,
    unpricedEnergy: 0,
    averagePrice: null,
    gaps: false,
    complete: true,
  };
}

function finalizeQuote(quote: Quote): Quote {
  quote.pricedEnergy = Math.max(0, quote.energy - quote.unpricedEnergy);
  quote.averagePrice =
    quote.pricedEnergy > 0.0000001 ? quote.cost / quote.pricedEnergy : null;
  quote.complete = !quote.gaps && quote.unpricedEnergy < 0.0000001;
  return quote;
}

/** Price observed energy at the tariff that applied during each subinterval.
 * The cursor advances once across the sorted tariff history, avoiding quadratic
 * scans for high-frequency smart-plug history.
 */
function energyPricer(quote: Quote, prices: SeriesPoint[]) {
  let index = 0;
  let price: number | null = null;
  return (start: number, end: number, energyPerMs: number) => {
    let at = start;
    while (index < prices.length && prices[index].t <= at) {
      price = prices[index++].v;
    }
    while (at < end) {
      const until = Math.min(end, prices[index]?.t ?? end);
      const energy = energyPerMs * (until - at);
      quote.energy += energy;
      if (price === null || !Number.isFinite(price)) {
        quote.unpricedEnergy += energy;
      } else {
        quote.cost += energy * price;
      }
      at = until;
      while (index < prices.length && prices[index].t <= at) {
        price = prices[index++].v;
      }
    }
  };
}

/**
 * Integrate sample-and-hold power (W) against step tariffs (currency/kWh).
 * Power freshness is measured from its own sample timestamp, never from a
 * tariff change. Unobserved/invalid intervals remain gaps, not free energy.
 */
export function quotePower(
  session: Pick<PrintSession, "start" | "end">,
  power: SeriesPoint[],
  price: SeriesPoint[],
): Quote {
  const quote = emptyQuote();
  const { start } = session;
  const end = Math.max(start, session.end);
  if (!(end > start)) return finalizeQuote(quote);
  const addEnergy = energyPricer(quote, price);
  let covered = 0;
  for (let index = 0; index < power.length; index++) {
    const sample = power[index];
    if (sample.t >= end) break;
    const from = Math.max(start, sample.t);
    const until = Math.min(end, power[index + 1]?.t ?? end);
    if (until <= from) continue;
    if (sample.v === null || !Number.isFinite(sample.v) || sample.v < 0) continue;
    const freshUntil = sample.v > 2
      ? Math.min(until, sample.t + MAX_POWER_GAP_MS)
      : until;
    if (freshUntil <= from) continue;
    addEnergy(from, freshUntil, sample.v / 3_600_000 / 1000);
    covered += freshUntil - from;
  }
  quote.gaps = covered < end - start;
  return finalizeQuote(quote);
}

/**
 * Estimate consumption between adjacent cumulative energy readings. Each
 * observed delta is allocated uniformly in time to clip print boundaries and
 * split tariff changes. Nothing is extrapolated beyond the last meter reading.
 * Resets, unavailable readings and long intervals are reported as gaps.
 */
export function quoteEnergy(
  session: Pick<PrintSession, "start" | "end">,
  energy: SeriesPoint[],
  price: SeriesPoint[],
): Quote {
  const quote = emptyQuote();
  const { start } = session;
  const end = Math.max(start, session.end);
  if (!(end > start)) return finalizeQuote(quote);
  const addEnergy = energyPricer(quote, price);
  let covered = 0;
  for (let index = 1; index < energy.length; index++) {
    const before = energy[index - 1];
    const after = energy[index];
    if (before.t >= end) break;
    const from = Math.max(start, before.t);
    const until = Math.min(end, after.t);
    const duration = after.t - before.t;
    if (until <= from || duration <= 0) continue;
    if (
      before.v === null || after.v === null ||
      !Number.isFinite(before.v) || !Number.isFinite(after.v) ||
      before.v < 0 || after.v < before.v || duration > MAX_ENERGY_GAP_MS
    ) continue;
    addEnergy(from, until, (after.v - before.v) / duration);
    covered += until - from;
  }
  quote.gaps = covered < end - start;
  return finalizeQuote(quote);
}

export function quoteSession(
  session: Pick<PrintSession, "start" | "end">,
  power: SeriesPoint[],
  energy: SeriesPoint[],
  price: SeriesPoint[],
): Quote {
  return power.length
    ? quotePower(session, power, price)
    : quoteEnergy(session, energy, price);
}

export interface LiveAccumulator {
  energy: number;
  cost: number;
  unpricedEnergy: number;
  lastAt: number;
  lastPower: number | null;
  lastPrice: number | null;
  gaps: boolean;
}

export function addLiveSample(
  accumulator: LiveAccumulator,
  now: number,
  power: number | null,
  price: number | null,
  maxGapMs = 120_000,
): LiveAccumulator {
  const next = { ...accumulator };
  if (accumulator.lastAt > 0) {
    const dt = now - accumulator.lastAt;
    if (dt > 0 && dt <= maxGapMs && accumulator.lastPower !== null &&
      Number.isFinite(accumulator.lastPower) && accumulator.lastPower >= 0) {
      const energy = (accumulator.lastPower * dt) / 3_600_000 / 1000;
      next.energy += energy;
      if (accumulator.lastPrice === null || !Number.isFinite(accumulator.lastPrice)) next.unpricedEnergy += energy;
      else next.cost += energy * accumulator.lastPrice;
    } else if (dt > 0) {
      next.gaps = true;
    }
  }
  next.lastAt = now;
  next.lastPower = power;
  next.lastPrice = price;
  return next;
}

export function liveQuote(accumulator: LiveAccumulator): Quote {
  return finalizeQuote({
    energy: accumulator.energy,
    cost: accumulator.cost,
    pricedEnergy: 0,
    unpricedEnergy: accumulator.unpricedEnergy,
    averagePrice: null,
    gaps: accumulator.gaps,
    complete: false,
  });
}

// ---------------------------------------------------------------------------
// Chart
// ---------------------------------------------------------------------------

export function buildChartBuckets(
  power: SeriesPoint[],
  current: SeriesPoint[],
  start: number,
  end: number,
  bucketMs: number,
): ChartBucket[] {
  const buckets: ChartBucket[] = [];
  if (!(end > start) || bucketMs <= 0) return buckets;
  const count = Math.max(1, Math.min(1440, Math.ceil((end - start) / bucketMs)));
  const width = (end - start) / count;

  const powerSorted = [...power].sort((a, b) => a.t - b.t);
  const currentSorted = [...current].sort((a, b) => a.t - b.t);
  let powerIndex = 0;
  let currentIndex = 0;
  let powerValue: number | null = null;
  let currentValue: number | null = null;

  while (powerIndex < powerSorted.length && powerSorted[powerIndex].t <= start) {
    powerValue = powerSorted[powerIndex].v;
    powerIndex++;
  }
  while (
    currentIndex < currentSorted.length &&
    currentSorted[currentIndex].t <= start
  ) {
    currentValue = currentSorted[currentIndex].v;
    currentIndex++;
  }

  for (let index = 0; index < count; index++) {
    const bucketStart = start + index * width;
    const bucketEnd = bucketStart + width;
    while (powerIndex < powerSorted.length && powerSorted[powerIndex].t < bucketEnd) {
      powerValue = powerSorted[powerIndex].v;
      powerIndex++;
    }
    while (
      currentIndex < currentSorted.length &&
      currentSorted[currentIndex].t < bucketEnd
    ) {
      currentValue = currentSorted[currentIndex].v;
      currentIndex++;
    }
    buckets.push({
      t: bucketStart,
      power: powerValue,
      current: currentValue,
    });
  }
  return buckets;
}

// ---------------------------------------------------------------------------
// Formatting
// ---------------------------------------------------------------------------

export interface FormatContext {
  locale?: string;
  timeZone?: string;
  currency?: string;
  numberFormat?: string;
  timeFormat?: string;
}

/** Match Home Assistant's number_format preference independently of language. */
function numericLocale(context: FormatContext): string | string[] | undefined {
  switch (context.numberFormat) {
    case "comma_decimal": return ["en-US", "en"];
    case "decimal_comma": return ["de", "es", "it"];
    case "space_comma": return ["fr", "sv", "cs"];
    case "quote_decimal": return "de-CH";
    case "none": return "en-US";
    case "system": return undefined;
    default: return context.locale || undefined;
  }
}

function numberFormat(
  context: FormatContext,
  options: Intl.NumberFormatOptions,
): Intl.NumberFormat {
  const resolved = context.numberFormat === "none"
    ? { ...options, useGrouping: false }
    : options;
  try {
    return new Intl.NumberFormat(numericLocale(context), resolved);
  } catch {
    return new Intl.NumberFormat(undefined, resolved);
  }
}

export function formatCurrency(
  value: number | null | undefined,
  context: FormatContext = {},
): string {
  if (value === null || value === undefined || !Number.isFinite(value)) return "—";
  if (!context.currency) return numberFormat(context, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
  const formatter = numberFormat(context, {
    style: "currency",
    currency: context.currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  if (value > 0 && value < 0.005) {
    return `<${formatter.format(0.01)}`;
  }
  return formatter.format(value);
}

export function formatPrice(
  value: number | null | undefined,
  context: FormatContext = {},
): string {
  if (value === null || value === undefined || !Number.isFinite(value)) return "—";
  const digits = Math.abs(value) < 1 ? 3 : 2;
  return numberFormat(context, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

export function formatNumber(
  value: number | null | undefined,
  digits = 1,
  context: FormatContext = {},
): string {
  if (value === null || value === undefined || !Number.isFinite(value)) return "—";
  return numberFormat(context, {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  }).format(value);
}

export function formatEnergy(
  value: number | null | undefined,
  context: FormatContext = {},
): string {
  if (value === null || value === undefined || !Number.isFinite(value)) return "—";
  if (value > 0 && value < 0.01) return `<${formatNumber(0.01, 2, context)} kWh`;
  return `${formatNumber(value, 2, context)} kWh`;
}

export function formatPower(value: number | null | undefined, context: FormatContext = {}): string {
  if (value === null || value === undefined || !Number.isFinite(value)) return "—";
  if (Math.abs(value) >= 10000) return `${formatNumber(value / 1000, 1, context)} kW`;
  return `${formatNumber(value, 0, context)} W`;
}

export function formatCurrent(value: number | null | undefined, context: FormatContext = {}): string {
  if (value === null || value === undefined || !Number.isFinite(value)) return "—";
  return `${formatNumber(value, 2, context)} A`;
}

export function formatVoltage(value: number | null | undefined, context: FormatContext = {}): string {
  if (value === null || value === undefined || !Number.isFinite(value)) return "—";
  return `${formatNumber(value, 0, context)} V`;
}

export function formatTemperature(value: number | null | undefined, context: FormatContext = {}): string {
  if (value === null || value === undefined || !Number.isFinite(value)) return "—";
  return `${formatNumber(value, 1, context)} °C`;
}

export function formatPercent(value: number | null | undefined, context: FormatContext = {}): string {
  if (value === null || value === undefined || !Number.isFinite(value)) return "—";
  return `${formatNumber(value, 0, context)}%`;
}

export function formatDuration(
  ms: number | null | undefined,
  short = true,
): string {
  if (ms === null || ms === undefined || !Number.isFinite(ms) || ms < 0) return "—";
  const totalMinutes = Math.round(ms / 60_000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;
  const pieces: string[] = [];
  if (days) pieces.push(`${days}d`);
  if (hours) pieces.push(`${hours}h`);
  if (minutes || (!days && !hours)) pieces.push(`${minutes}m`);
  if (short) return pieces.slice(0, 2).join(" ");
  return pieces.join(" ");
}

export function formatEta(ms: number | null | undefined): string {
  if (ms === null || ms === undefined || !Number.isFinite(ms) || ms <= 0) return "—";
  const totalMinutes = Math.round(ms / 60_000);
  if (totalMinutes < 1) return "<1 min";
  if (totalMinutes < 60) return `${totalMinutes} min`;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return minutes ? `${hours} h ${minutes} min` : `${hours} h`;
}

export function formatRelative(
  time: number | null | undefined,
  now = Date.now(),
): string {
  if (time === null || time === undefined || !Number.isFinite(time)) return "—";
  const delta = Math.max(0, now - time);
  if (delta < 45_000) return "just now";
  if (delta < 3_600_000) return `${Math.round(delta / 60_000)} min ago`;
  if (delta < 86_400_000) return `${Math.round(delta / 3_600_000)} h ago`;
  return `${Math.round(delta / 86_400_000)} d ago`;
}

/** Explicit 24-hour time uses 00:00, never the h24 variant's 24:00. */
function hourCycle(context: FormatContext): Intl.DateTimeFormatOptions["hourCycle"] {
  if (context.timeFormat === "12") return "h12";
  if (context.timeFormat === "24") return "h23";
  try {
    const locale = context.timeFormat === "system" ? undefined : context.locale;
    const cycle = new Intl.DateTimeFormat(locale, { hour: "numeric" })
      .resolvedOptions().hourCycle;
    return cycle === "h11" || cycle === "h12" ? "h12" : "h23";
  } catch {
    return undefined;
  }
}

function dateTime(
  time: number,
  context: FormatContext,
  options: Intl.DateTimeFormatOptions,
): string {
  if (!Number.isFinite(time)) return "—";
  const resolved = {
    ...options,
    timeZone: context.timeZone,
    ...(options.hour ? { hourCycle: hourCycle(context) } : {}),
  };
  try {
    return new Intl.DateTimeFormat(context.locale || undefined, resolved)
      .format(new Date(time));
  } catch {
    // A malformed custom locale must not discard an otherwise valid timezone.
    try {
      return new Intl.DateTimeFormat(undefined, resolved).format(new Date(time));
    } catch {
      return new Intl.DateTimeFormat(undefined, options).format(new Date(time));
    }
  }
}

export function formatTime(
  time: number | null | undefined,
  context: FormatContext = {},
): string {
  if (time === null || time === undefined) return "—";
  return dateTime(time, context, { hour: "2-digit", minute: "2-digit" });
}

export function formatDateTime(
  time: number | null | undefined,
  context: FormatContext = {},
): string {
  if (time === null || time === undefined) return "—";
  return dateTime(time, context, {
    month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

export function formatDay(time: number, context: FormatContext = {}): string {
  return dateTime(time, context, { weekday: "short", month: "short", day: "numeric" });
}

export function formatClock(time: number, context: FormatContext = {}): string {
  return formatTime(time, context);
}

export function secondsToDuration(value: number | null): number | null {
  return value === null ? null : value * 1000;
}

/** HA's remaining_time sensor is hours for the Bambu Lab integration. */
export function remainingMs(entity: HassEntity | null): number | null {
  const value = entityNumber(entity);
  if (value === null || value < 0) return null;
  const unit = unitOf(entity).toLowerCase();
  if (unit.includes("min")) return value * 60_000;
  if (unit.includes("s") && !unit.includes("h")) return value * 1000;
  return value * 3_600_000;
}

export function percent(value: number | null): number {
  if (value === null || !Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, value));
}

export function compareStrings(a: string, b: string): number {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

export function validateConfig(input: CardConfig): CardConfig {
  if (!input || typeof input !== "object") {
    throw new Error("This card needs a configuration object.");
  }
  if (input.printer_entity !== undefined && typeof input.printer_entity !== "string") {
    throw new Error("printer_entity must be an entity id.");
  }
  for (const key of [
    "entity_prefix",
    "name",
    "power_entity",
    "energy_entity",
    "current_entity",
    "voltage_entity",
    "price_entity",
    "camera_entity",
    "printer_power_entity",
    "air_purifier_entity",
    "currency",
  ] as const) {
    if (input[key] !== undefined && typeof input[key] !== "string") {
      throw new Error(`${key} must be a string.`);
    }
  }
  if (input.currency && !/^[A-Za-z]{3}$/.test(input.currency)) {
    throw new Error("currency must be a three-letter ISO 4217 code.");
  }
  for (const key of ["printer_power_entity", "air_purifier_entity"] as const) {
    const entityId = input[key]?.trim();
    if (entityId && !/^switch\.[a-z0-9_]+$/.test(entityId)) {
      throw new Error(`${key} must be a switch entity id.`);
    }
  }
  if (input.printer_power_entity?.trim() &&
      input.printer_power_entity.trim() === input.air_purifier_entity?.trim()) {
    throw new Error("Printer power and air purifier must use different switch entities.");
  }
  const config: CardConfig = {
    ...input,
    printer_entity: input.printer_entity?.trim() || "",
    history_days: clampHistoryDays(input.history_days),
    show_camera: input.show_camera !== false,
    show_ams: input.show_ams !== false,
    printer_power_entity: input.printer_power_entity?.trim() || undefined,
    air_purifier_entity: input.air_purifier_entity?.trim() || undefined,
  };
  return config;
}

export function clampHistoryDays(value: unknown): number {
  const number = asNumber(value);
  if (number === null) return DEFAULT_HISTORY_DAYS;
  return Math.max(1, Math.min(MAX_HISTORY_DAYS, Math.round(number)));
}

export function localeContext(
  hass: HomeAssistant | undefined,
  config: CardConfig | undefined,
  currency: string | undefined,
): FormatContext {
  const zone = hass?.locale?.time_zone;
  return {
    locale: hass?.locale?.language || hass?.language,
    numberFormat: hass?.locale?.number_format,
    timeFormat: hass?.locale?.time_format,
    timeZone: zone === "local"
      ? undefined
      : zone && zone !== "server"
        ? zone
        : typeof hass?.config?.time_zone === "string"
          ? hass.config.time_zone
          : undefined,
    currency: config?.currency || currency,
  };
}

export function domainOf(entityId: string): string {
  return entityId.split(".", 1)[0];
}
