/**
 * Shared types for the Bambu Lab printer card.
 *
 * The card deliberately depends on Home Assistant entities only. It never
 * imports from the Bambu Lab integration or a sibling card, and never writes
 * to the printer.
 */

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed?: string;
  last_updated?: string;
}

export interface HassLocale {
  language?: string;
  /** HA sends "local" or "server"; an explicit IANA zone is also tolerated. */
  time_zone?: string;
  /** language, system, comma_decimal, decimal_comma, space_comma, quote_decimal, none. */
  number_format?: string;
  /** language, system, 12 or 24. */
  time_format?: string;
  date_format?: string;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  callApi<T>(method: string, path: string, data?: unknown): Promise<T>;
  callService(
    domain: string,
    service: string,
    data?: Record<string, unknown>,
  ): Promise<unknown>;
  locale?: HassLocale;
  language?: string;
  config?: { time_zone?: string; [key: string]: unknown };
  [key: string]: unknown;
}

export interface CardConfig {
  type?: string;
  /** Bambu Lab print status sensor, e.g. sensor.h2d_0123abc_print_status. */
  printer_entity: string;
  /** Optional entity prefix override; derived from printer_entity by default. */
  entity_prefix?: string;
  /** Optional display name override. */
  name?: string;
  /** Smart-plug / meter power sensor in W (preferred cost basis). */
  power_entity?: string;
  /** Smart-plug / meter cumulative energy sensor (fallback cost basis). */
  energy_entity?: string;
  current_entity?: string;
  voltage_entity?: string;
  /** Electricity price sensor in currency/kWh. */
  price_entity?: string;
  camera_entity?: string;
  /** Recorder history window for the print history view. 1-30 days. */
  history_days?: number;
  /** ISO 4217 currency code for cost display. Derived from price unit if omitted. */
  currency?: string;
  show_camera?: boolean;
  show_ams?: boolean;
}

export interface HistoryState {
  entity_id?: string;
  state: string;
  last_changed: string;
}

export interface StatePoint {
  t: number;
  state: string;
}

/** A numeric series point. `v` is null when HA reported unavailable/unknown. */
export interface SeriesPoint {
  t: number;
  v: number | null;
}

export interface ChartBucket {
  t: number;
  power: number | null;
  current: number | null;
}

export type PrinterStatus =
  | "printing"
  | "preparing"
  | "paused"
  | "finished"
  | "failed"
  | "idle"
  | "offline"
  | "unavailable"
  | "unknown";

export interface PrintSession {
  start: number;
  end: number;
  task?: string;
  status: PrinterStatus;
  open: boolean;
  /** The window began mid-session, so the real start is earlier. */
  partialStart: boolean;
  /** The session ended because the printer vanished, not because it finished. */
  partialEnd: boolean;
}

export interface Quote {
  energy: number;
  cost: number;
  pricedEnergy: number;
  unpricedEnergy: number;
  averagePrice: number | null;
  gaps: boolean;
  complete: boolean;
}

export interface AmsTray {
  id: string;
  slot: number;
  name: string;
  type: string;
  color: string;
  colors: string[];
  remain: number | null;
  remainEnabled: boolean;
  empty: boolean;
  active: boolean;
  nozzleMin: number | null;
  nozzleMax: number | null;
}

export interface AmsUnit {
  index: number;
  label: string;
  active: boolean;
  drying: boolean;
  dryingRemaining: number | null;
  temperature: HassEntity | null;
  humidity: HassEntity | null;
  trays: AmsTray[];
}

export interface ExternalSpool {
  id: string;
  index: number;
  label: string;
  name: string;
  type: string;
  color: string;
  colors: string[];
  remain: number | null;
  remainEnabled: boolean;
  empty: boolean;
  active: boolean;
}

export interface PrinterEntities {
  prefix: string;
  printer: HassEntity;
  name: string;
  serial: string | null;
  task: HassEntity | null;
  progress: HassEntity | null;
  stage: HassEntity | null;
  remaining: HassEntity | null;
  start: HassEntity | null;
  end: HassEntity | null;
  currentLayer: HassEntity | null;
  totalLayers: HassEntity | null;
  printWeight: HassEntity | null;
  printLength: HassEntity | null;
  bedType: HassEntity | null;
  speedProfile: HassEntity | null;
  printType: HassEntity | null;
  gcodeFile: HassEntity | null;
  printableObjects: HassEntity | null;
  bed: HassEntity | null;
  bedTarget: HassEntity | null;
  chamber: HassEntity | null;
  chamberTarget: HassEntity | null;
  nozzle: HassEntity | null;
  nozzleTarget: HassEntity | null;
  leftNozzle: HassEntity | null;
  leftNozzleTarget: HassEntity | null;
  leftNozzleType: HassEntity | null;
  leftNozzleSize: HassEntity | null;
  rightNozzle: HassEntity | null;
  rightNozzleTarget: HassEntity | null;
  rightNozzleType: HassEntity | null;
  rightNozzleSize: HassEntity | null;
  nozzleSize: HassEntity | null;
  coolingFan: HassEntity | null;
  auxFan: HassEntity | null;
  chamberFan: HassEntity | null;
  heatbreakFan: HassEntity | null;
  hms: HassEntity | null;
  printError: HassEntity | null;
  online: HassEntity | null;
  door: HassEntity | null;
  filament: HassEntity | null;
  camera: HassEntity | null;
  coverImage: HassEntity | null;
  chamberLight: HassEntity | null;
  heatbedLight: HassEntity | null;
  wifi: HassEntity | null;
  ip: HassEntity | null;
  mqttMode: HassEntity | null;
  sdCard: HassEntity | null;
  toolModule: HassEntity | null;
  firmware: HassEntity | null;
  lanMode: HassEntity | null;
  activeTray: HassEntity | null;
  totalUsage: HassEntity | null;
  ams: AmsUnit[];
  external: ExternalSpool[];
  power: HassEntity | null;
  energy: HassEntity | null;
  current: HassEntity | null;
  voltage: HassEntity | null;
  price: HassEntity | null;
}

export interface OverviewData {
  loadedAt: number;
  chartStart: number;
  chartEnd: number;
  buckets: ChartBucket[];
  sessions: PrintSession[];
  quotes: Map<number, Quote>;
  powerSeries: SeriesPoint[];
  priceSeries: SeriesPoint[];
  energySeries: SeriesPoint[];
}

export interface HistoryData extends OverviewData {
  days: number;
  totalCost: number;
  totalEnergy: number;
  pricedSessions: number;
}
