import {
  LitElement,
  html,
  nothing,
  type PropertyValues,
  type TemplateResult,
} from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";

import {
  FamilyFlowController,
  MediaZoomController,
  MediaFullscreenFallbackController,
  UI_ICONS,
  actionPill,
  buildGlow,
  designTokens,
  createMediaFullscreenAPI,
  ensureCameraStreamElements,
  isMediaFullscreen,
  notice,
  renderFamilyDialog,
  showEntityMoreInfo,
  stateChip,
  tileGlow,
  toggleMediaFullscreen,
} from "@bitosome/ha-card-ui";
import "./chart";
import "./accessory-controls";
import { cardStyles } from "./styles";
import {
  MAX_HISTORY_DAYS,
  MAX_POWER_GAP_MS,
  addLiveSample,
  asNumber,
  available,
  buildChartBuckets,
  clampHistoryDays,
  currencySymbol,
  currentAmps,
  currentValue,
  deriveSessions,
  energyKwh,
  energyValue,
  entityNumber,
  formatCurrency,
  formatCurrent,
  formatDateTime,
  formatDay,
  formatDuration,
  formatEnergy,
  formatEta,
  formatNumber,
  formatPercent,
  formatPower,
  formatPrice,
  formatRelative,
  formatTemperature,
  formatTime,
  formatVoltage,
  historyPath,
  hmsErrors,
  isActiveStatus,
  isPrintingStatus,
  isUnavailable,
  liveQuote,
  localeContext,
  normalizeStatus,
  parseHistory,
  percent,
  powerValue,
  powerWatts,
  pricePerKwh,
  priceValue,
  quoteSession,
  remainingMs,
  resolveCurrency,
  resolvePrinter,
  sessionFromStart,
  statusGlow,
  statusLabel,
  statusTone,
  toSeries,
  toStatePoints,
  unitOf,
  validateConfig,
  type LiveAccumulator,
  type Tone,
} from "./model";
import type {
  AmsTray,
  AmsUnit,
  CardConfig,
  ExternalSpool,
  HistoryData,
  HomeAssistant,
  OverviewData,
  PrintSession,
  PrinterEntities,
  PrinterStatus,
  Quote,
  SeriesPoint,
} from "./types";

const CARD_TAG = "bambu-printer-card";
const OVERVIEW_WINDOW_MS = 24 * 60 * 60 * 1000;
const CHART_BUCKET_MS = 5 * 60 * 1000;
const LIVE_SAMPLE_MIN_MS = 5_000;
const LIVE_MAX_GAP_MS = 120_000;
const REFRESH_INTERVAL_MS = 5 * 60 * 1000;

type MainPage = "overview";
type DialogPage = "history" | "details" | "preview" | "ams";

function parseTime(value: unknown): number | null {
  if (typeof value !== "string" || !value.trim()) return null;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function humanize(value: string | null | undefined): string {
  if (!value || isUnavailable(value)) return "—";
  const clean = value.replace(/_/g, " ").trim();
  return clean ? clean.charAt(0).toUpperCase() + clean.slice(1) : "—";
}

function heroAccent(status: PrinterStatus): string {
  switch (status) {
    case "paused":
      return "var(--status-warn-color)";
    case "finished":
      return "var(--status-success-color)";
    case "failed":
      return "var(--status-alert-color)";
    default:
      return "var(--status-active-color)";
  }
}

function swatchStyle(colors: string[]): string {
  if (!colors.length) return "";
  if (colors.length === 1) return `background-color:${colors[0]}`;
  return `background-image:linear-gradient(135deg,${colors.join(",")})`;
}

function coverageNote(quote: Quote | null): string {
  if (!quote) return "";
  if (quote.gaps) return " · partial";
  if (quote.unpricedEnergy > 0) return " · unpriced period";
  return "";
}

@customElement(CARD_TAG)
export class BambuPrinterCard extends LitElement {
  static styles = [designTokens, cardStyles];

  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private config?: CardConfig;
  @state() private page: MainPage = "overview";
  @state() private printer: PrinterEntities | null = null;
  @state() private overview: OverviewData | null = null;
  @state() private overviewLoading = false;
  @state() private overviewError = "";
  @state() private history: HistoryData | null = null;
  @state() private historyLoading = false;
  @state() private historyError = "";
  @state() private live: LiveAccumulator | null = null;
  @state() private liveStart: number | null = null;
  @state() private liveReady = false;
  @state() private cameraReady = false;
  @state() private cameraLive = true;
  @state() private cameraFullscreen = false;
  @state() private cameraLoadError = false;
  @state() private cameraExpanding = false;
  @state() private imageFailed = false;

  private cameraZoom = new MediaZoomController(this, {
    enabled: () => this.cameraFullscreen,
  });
  private cameraFallback = new MediaFullscreenFallbackController(this, {
    onChange: (active) => {
      this.cameraFullscreen = active;
      this.cameraZoom.reset();
    },
  });
  private flow = new FamilyFlowController<DialogPage>(this);
  private cameraExpansion = 0;
  private overviewRequested = false;
  private overviewGeneration = 0;
  private liveGeneration = 0;
  private historyGeneration = 0;
  private lastStatus: PrinterStatus | null = null;
  private lastCoverUrl = "";
  private cameraLoadStarted = false;
  private cameraLoadKey = "";
  private cameraGeneration = 0;
  private refreshTimer?: ReturnType<typeof setInterval>;
  private finishTimer?: ReturnType<typeof setTimeout>;
  private lastHistoryLoad = 0;

  setConfig(config: CardConfig): void {
    const next = validateConfig(config);
    const previous = JSON.stringify(this.config);
    this.config = next;
    if (previous === JSON.stringify(next)) return;
    this.flow.forceClose(false);
    this.closeCamera();
    this.overviewGeneration++;
    this.liveGeneration++;
    this.historyGeneration++;
    this.overviewRequested = false;
    this.overview = null;
    this.overviewError = "";
    this.overviewLoading = false;
    this.history = null;
    this.historyError = "";
    this.historyLoading = false;
    this.live = null;
    this.liveStart = null;
    this.liveReady = false;
    this.printer = null;
    this.lastStatus = null;
    this.lastCoverUrl = "";
    this.imageFailed = false;
    this.cameraGeneration++;
    this.cameraLoadStarted = false;
    this.cameraReady = false;
    this.cameraLoadError = false;
    this.cameraExpanding = false;
    this.cameraExpansion++;
    this.cameraZoom.reset();
    this.cameraLive = true;
    this.page = "overview";
    this.clearFinishTimer();
    if (this.hass && this.isConnected) this.handleHass();
    this.requestUpdate();
  }

  getCardSize(): number {
    return this.page === "overview" ? 14 : 8;
  }

  getGridOptions(): { columns: number; min_columns: number; rows: string } {
    return { columns: 12, min_columns: 6, rows: "auto" };
  }

  static async getConfigElement(): Promise<HTMLElement> {
    await import("./editor");
    return document.createElement("bambu-printer-card-editor");
  }

  static getStubConfig(): CardConfig {
    return {
      type: `custom:${CARD_TAG}`,
      printer_entity: "",
      history_days: 7,
      show_camera: true,
    };
  }

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener("visibilitychange", this.onVisibility);
    document.addEventListener("fullscreenchange", this.onFullscreenChange);
    document.addEventListener("webkitfullscreenchange", this.onFullscreenChange);
    this.startRefreshTimer();
    this.handleHass();
  }

  firstUpdated(): void {
    void this.ensureCameraElements();
  }

  disconnectedCallback(): void {
    document.removeEventListener("visibilitychange", this.onVisibility);
    document.removeEventListener("fullscreenchange", this.onFullscreenChange);
    document.removeEventListener("webkitfullscreenchange", this.onFullscreenChange);
    this.closeCamera();
    this.cameraExpansion++;
    this.cameraExpanding = false;
    this.cameraZoom.reset();
    this.cameraFullscreen = false;
    this.stopRefreshTimer();
    this.clearFinishTimer();
    this.overviewGeneration++;
    this.liveGeneration++;
    this.historyGeneration++;
    this.overviewLoading = false;
    this.historyLoading = false;
    this.overviewRequested = false;
    this.live = null;
    this.liveStart = null;
    this.liveReady = false;
    this.cameraGeneration++;
    this.cameraLoadStarted = false;
    super.disconnectedCallback();
  }

  protected updated(changed: PropertyValues): void {
    if (!this.isConnected) return;
    if (changed.has("hass") || changed.has("config")) this.handleHass();
    if (
      this.flow.current === "history" &&
      !this.history &&
      !this.historyLoading &&
      !this.historyError
    ) {
      void this.loadHistory();
    }
  }

  // -------------------------------------------------------------------------
  // State and entity plumbing
  // -------------------------------------------------------------------------

  private get formatContext() {
    return localeContext(
      this.hass,
      this.config,
      resolveCurrency(this.printer?.price, this.config?.currency),
    );
  }

  private get currencyCode(): string | undefined {
    return (
      this.config?.currency ||
      resolveCurrency(this.printer?.price, this.config?.currency)
    );
  }

  private get priceUnit(): string {
    // Numeric prices are normalized to currency/kWh by the model.
    // Never display the original MWh or cents unit beside that value.
    const symbol = currencySymbol(this.currencyCode);
    return symbol ? `${symbol}/kWh` : "/kWh";
  }

  private cost(value: number | null | undefined): string {
    return `≈ ${formatCurrency(value, this.formatContext)}`;
  }

  private statusOf(printer: PrinterEntities | null): PrinterStatus {
    const raw = normalizeStatus(printer?.printer.state);
    // A stale "idle"/"running" state with an offline printer is not live data.
    if (printer?.online?.state === "off" && raw !== "unavailable") {
      return "offline";
    }
    return raw;
  }

  private get status(): PrinterStatus {
    return this.statusOf(this.printer);
  }

  private handleHass(): void {
    if (!this.isConnected || !this.hass || !this.config) return;
    if (!this.config.printer_entity) {
      this.printer = null;
      return;
    }
    const next = resolvePrinter(this.hass.states, this.config);
    if (next?.camera?.entity_id !== this.printer?.camera?.entity_id) {
      this.closeCamera();
      this.cameraGeneration++;
      this.cameraLoadStarted = false;
      this.cameraReady = false;
    }
    if (!next) {
      if (this.printer) {
        this.overviewGeneration++;
        this.historyGeneration++;
        this.liveGeneration++;
        this.overviewLoading = false;
        this.historyLoading = false;
        this.overviewRequested = false;
        this.overview = null;
        this.history = null;
        this.live = null;
        this.liveStart = null;
        this.liveReady = false;
      }
      this.printer = null;
      return;
    }
    this.printer = next;
    this.resetImageFailure(next);
    this.ensureCameraElements();
    if (!this.overviewRequested) {
      this.overviewRequested = true;
      void this.loadOverview();
    }
    this.handleLive(next);
  }

  private resetImageFailure(printer: PrinterEntities): void {
    const url = this.coverUrl(printer);
    if (url && url !== this.lastCoverUrl) {
      this.lastCoverUrl = url;
      if (this.imageFailed) this.imageFailed = false;
    }
  }

  private coverUrl(printer = this.printer): string {
    const value = printer?.coverImage?.attributes?.entity_picture;
    return typeof value === "string" ? value : "";
  }

  private sensorStart(printer: PrinterEntities): number | null {
    const value = parseTime(printer.start?.state);
    const now = Date.now();
    if (value !== null && value <= now + 60_000 && value > now - 30 * 86_400_000) {
      return value;
    }
    return null;
  }

  private printStart(printer: PrinterEntities): number | null {
    const sensor = this.sensorStart(printer);
    if (sensor !== null) return sensor;
    const open = this.overview?.sessions.find((session) => session.open);
    return open?.start ?? null;
  }

  private handleLive(printer: PrinterEntities): void {
    const status = this.statusOf(printer);
    const wasActive = this.lastStatus !== null && isActiveStatus(this.lastStatus);
    this.lastStatus = status;

    if (isActiveStatus(status)) {
      const start =
        this.printStart(printer) ??
        (this.liveStart !== null ? this.liveStart : Date.now());
      if (
        this.liveStart === null ||
        Math.abs(this.liveStart - start) > 90_000
      ) {
        this.startLive(start);
      }
      const power = powerWatts(printer.power);
      const price = pricePerKwh(printer.price);
      const now = Date.now();
      if (this.live && !this.live.lastAt) {
        this.live = {
          ...this.live,
          lastAt: now,
          lastPower: power,
          lastPrice: price,
        };
      } else if (
        this.live &&
        this.live.lastAt > 0 &&
        (now - this.live.lastAt >= LIVE_SAMPLE_MIN_MS ||
          power !== this.live.lastPower || price !== this.live.lastPrice)
      ) {
        this.advanceLive(now, printer);
      }
      return;
    }

    if (this.liveStart !== null) {
      this.liveGeneration++;
      this.liveStart = null;
      this.live = null;
      this.liveReady = false;
      this.scheduleOverviewRefresh(2500);
    } else if (
      wasActive &&
      (status === "finished" || status === "failed" || status === "idle")
    ) {
      this.scheduleOverviewRefresh(2500);
    }
  }

  private startLive(start: number): void {
    this.liveGeneration++;
    this.liveStart = start;
    this.liveReady = false;
    this.live = {
      energy: 0,
      cost: 0,
      unpricedEnergy: 0,
      lastAt: Date.now(),
      lastPower: powerWatts(this.printer?.power),
      lastPrice: pricePerKwh(this.printer?.price),
      gaps: false,
    };
    const session = this.overview?.sessions.find(
      (item) => item.open && Math.abs(item.start - start) <= 90_000,
    );
    if (
      session &&
      this.overview &&
      this.overview.chartStart <= start + 5 * 60_000 &&
      this.overview.chartEnd >= start
    ) {
      this.seedFromHistory(session, this.overview);
      return;
    }
    if (this.overviewLoading) return;
    void this.seedLive(start);
  }

  /** Apply changed inputs at their HA state timestamps, not the next UI tick. */
  private advanceLive(now: number, printer: PrinterEntities): void {
    if (!this.live || now < this.live.lastAt) return;
    const reportedPower = powerWatts(printer.power);
    const observedPowerAt = parseTime(printer.power?.last_updated) ?? parseTime(printer.power?.last_changed);
    const power = reportedPower !== null && reportedPower > 2 &&
      observedPowerAt !== null && now - observedPowerAt > MAX_POWER_GAP_MS
      ? null : reportedPower;
    const price = pricePerKwh(printer.price);
    const from = this.live.lastAt;
    // Splitting a long unattended interval at a recent tariff timestamp must
    // not turn an unobserved gap into apparently measured consumption.
    if (now - from > LIVE_MAX_GAP_MS) {
      this.live = addLiveSample(this.live, now, power, price, LIVE_MAX_GAP_MS);
      return;
    }
    const events: { t: number; kind: "power" | "price"; value: number | null }[] = [];
    const changedAt = (entity: PrinterEntities["power"]) => {
      const stamp = parseTime(entity?.last_changed) ?? parseTime(entity?.last_updated);
      const observed = parseTime(entity?.last_updated);
      const recoveredPower = entity === printer.power && this.live?.lastPower === null &&
        (stamp === null || stamp < from) && observed !== null && observed > from;
      return recoveredPower ? Math.min(now, observed) :
        stamp === null ? now : Math.max(from, Math.min(now, stamp));
    };
    if (power !== this.live.lastPower) {
      events.push({ t: changedAt(printer.power), kind: "power", value: power });
    }
    if (price !== this.live.lastPrice) {
      events.push({ t: changedAt(printer.price), kind: "price", value: price });
    }
    for (const event of events.sort((a, b) => a.t - b.t)) {
      this.live = addLiveSample(
        this.live, event.t,
        event.kind === "power" ? event.value : this.live.lastPower,
        event.kind === "price" ? event.value : this.live.lastPrice,
        LIVE_MAX_GAP_MS,
      );
    }
    this.live = addLiveSample(this.live, now, power, price, LIVE_MAX_GAP_MS);
  }

  private installLiveSeed(
    quote: Quote,
    cutoff: number,
    power: SeriesPoint[],
    price: SeriesPoint[],
  ): void {
    const held = (series: SeriesPoint[], isPower = false) => {
      let sample: SeriesPoint | undefined;
      for (const point of series) {
        if (point.t > cutoff) break;
        sample = point;
      }
      if (isPower && sample?.v !== null && sample?.v !== undefined && sample.v > 2 &&
        cutoff - sample.t > MAX_POWER_GAP_MS) return null;
      return sample?.v ?? null;
    };
    this.live = {
      energy: quote.energy,
      cost: quote.cost,
      unpricedEnergy: quote.unpricedEnergy,
      lastAt: cutoff,
      lastPower: held(power, true),
      lastPrice: held(price),
      gaps: quote.gaps,
    };
    if (this.printer) {
      // Recorder stops at the request cutoff. A later current state gives its
      // latest transition, but cannot prove there were no intervening changes.
      // Keep that provisional tail marked partial until Recorder reconciles it.
      const inputsDiffer = powerWatts(this.printer.power) !== this.live.lastPower ||
        pricePerKwh(this.printer.price) !== this.live.lastPrice;
      const changedAfterCutoff = [this.printer.power, this.printer.price].some(
        (entity) => (parseTime(entity?.last_changed) ?? parseTime(entity?.last_updated) ?? cutoff) > cutoff,
      );
      this.advanceLive(Date.now(), this.printer);
      if ((inputsDiffer || changedAfterCutoff) && this.live) this.live = { ...this.live, gaps: true };
    }
    this.liveReady = true;
  }

  private seedFromHistory(
    session: PrintSession,
    data: OverviewData | HistoryData,
  ): void {
    const quote = quoteSession(
      session,
      data.powerSeries,
      data.energySeries,
      data.priceSeries,
    );
    this.installLiveSeed(quote, data.chartEnd, data.powerSeries, data.priceSeries);
  }

  private async seedLive(start: number): Promise<void> {
    if (!this.hass || !this.config || !this.printer) return;
    const generation = ++this.liveGeneration;
    const powerId = this.printer.power?.entity_id;
    const priceId = this.printer.price?.entity_id;
    const energyId = this.printer.energy?.entity_id;
    const ids = [powerId, priceId, energyId].filter(
      (id): id is string => !!id,
    );
    if (!ids.length) {
      this.liveReady = true;
      if (this.live) this.live = { ...this.live, gaps: true };
      return;
    }
    const end = Date.now();
    const windowStart = start - 5 * 60_000;
    try {
      const response = await this.hass.callApi<unknown>(
        "GET",
        historyPath(ids, windowStart, end),
      );
      if (
        generation !== this.liveGeneration ||
        this.liveStart !== start ||
        !isActiveStatus(this.status)
      ) {
        return;
      }
      const map = parseHistory(response, ids);
      const powerSeries = powerId
        ? toSeries(
            map.get(powerId),
            (state) => powerValue(state, unitOf(this.printer?.power)),
          )
        : [];
      const priceSeries = priceId
        ? toSeries(
            map.get(priceId),
            (state) => priceValue(state, unitOf(this.printer?.price)),
          )
        : [];
      const energySeries = energyId
        ? toSeries(
            map.get(energyId),
            (state) => energyValue(state, unitOf(this.printer?.energy)),
          )
        : [];
      const quote = quoteSession(
        { start, end },
        powerSeries,
        energySeries,
        priceSeries,
      );
      this.installLiveSeed(quote, end, powerSeries, priceSeries);
    } catch {
      if (generation !== this.liveGeneration) return;
      this.liveReady = true;
      if (this.live) this.live = { ...this.live, gaps: true };
    }
  }

  private scheduleOverviewRefresh(delay: number): void {
    this.clearFinishTimer();
    // Requests started before the status transition must not restore an
    // unfinished quote after completion. Keep displayed data while refreshing.
    this.overviewGeneration++;
    this.historyGeneration++;
    this.overviewLoading = false;
    this.historyLoading = false;
    this.lastHistoryLoad = 0;
    this.finishTimer = setTimeout(() => {
      this.finishTimer = undefined;
      if (!this.isConnected) return;
      void this.loadOverview(true);
      if (this.flow.current === "history") void this.loadHistory(true);
    }, delay);
  }

  private clearFinishTimer(): void {
    if (this.finishTimer !== undefined) {
      clearTimeout(this.finishTimer);
      this.finishTimer = undefined;
    }
  }

  private startRefreshTimer(): void {
    if (this.refreshTimer !== undefined) return;
    this.refreshTimer = setInterval(() => this.onTick(), REFRESH_INTERVAL_MS);
  }

  private stopRefreshTimer(): void {
    if (this.refreshTimer !== undefined) {
      clearInterval(this.refreshTimer);
      this.refreshTimer = undefined;
    }
  }

  private onTick(): void {
    if (!this.isConnected || document.hidden) return;
    if (isActiveStatus(this.status) && this.liveStart !== null) {
      void this.seedLive(this.liveStart);
      return;
    }
    if (
      this.overview &&
      Date.now() - this.overview.loadedAt > 10 * 60_000 &&
      !this.overviewLoading
    ) {
      void this.loadOverview(true);
    }
  }

  private onVisibility = (): void => {
    if (document.hidden || !this.isConnected) return;
    if (isActiveStatus(this.status) && this.liveStart !== null) {
      void this.seedLive(this.liveStart);
    } else if (
      this.overview &&
      Date.now() - this.overview.loadedAt > 10 * 60_000 &&
      !this.overviewLoading
    ) {
      void this.loadOverview(true);
    }
  };

  // -------------------------------------------------------------------------
  // Recorder data
  // -------------------------------------------------------------------------

  private historyIds(): { ids: string[]; status: string; task?: string } {
    const printer = this.printer;
    if (!printer || !this.config) return { ids: [], status: "" };
    const entries: [string | undefined, string][] = [
      [printer.printer.entity_id, "status"],
      [printer.task?.entity_id, "task"],
      [printer.power?.entity_id, "power"],
      [printer.current?.entity_id, "current"],
      [printer.price?.entity_id, "price"],
      [printer.energy?.entity_id, "energy"],
    ];
    const ids = entries
      .map(([id]) => id)
      .filter((id): id is string => typeof id === "string" && !!id);
    return {
      ids,
      status: printer.printer.entity_id,
      task: printer.task?.entity_id,
    };
  }

  private seriesFromHistory(
    map: Map<string, import("./types").HistoryState[]>,
    ids: { status: string; task?: string },
  ): {
    statusPoints: import("./types").StatePoint[];
    taskPoints: import("./types").StatePoint[];
    powerSeries: import("./types").SeriesPoint[];
    currentSeries: import("./types").SeriesPoint[];
    priceSeries: import("./types").SeriesPoint[];
    energySeries: import("./types").SeriesPoint[];
  } {
    const printer = this.printer;
    const powerUnit = unitOf(printer?.power);
    const currentUnit = unitOf(printer?.current);
    const priceUnit = unitOf(printer?.price);
    const energyUnit = unitOf(printer?.energy);
    return {
      statusPoints: toStatePoints(map.get(ids.status)),
      taskPoints: ids.task ? toStatePoints(map.get(ids.task)) : [],
      powerSeries: printer?.power
        ? toSeries(map.get(printer.power.entity_id), (state) =>
            powerValue(state, powerUnit),
          )
        : [],
      currentSeries: printer?.current
        ? toSeries(map.get(printer.current.entity_id), (state) =>
            currentValue(state, currentUnit),
          )
        : [],
      priceSeries: printer?.price
        ? toSeries(map.get(printer.price.entity_id), (state) =>
            priceValue(state, priceUnit),
          )
        : [],
      energySeries: printer?.energy
        ? toSeries(map.get(printer.energy.entity_id), (state) =>
            energyValue(state, energyUnit),
          )
        : [],
    };
  }

  private sessionsFor(
    statusPoints: import("./types").StatePoint[],
    taskPoints: import("./types").StatePoint[],
    windowStart: number,
    end: number,
  ): PrintSession[] {
    const sessions = deriveSessions(statusPoints, taskPoints, end, windowStart);
    const status = this.status;
    if (!isActiveStatus(status)) return sessions;
    const actual =
      this.printer !== null ? this.sensorStart(this.printer) : null;
    const open = sessions.find((session) => session.open);
    if (open) {
      // The recorder window can start after a long print. The Bambu start-time
      // sensor gives the real start; keep the history point otherwise.
      if (actual !== null && actual < open.start - 90_000) {
        open.start = actual;
        open.partialStart = false;
      }
    } else {
      const start = actual ?? this.liveStart ?? end - 60 * 60_000;
      const task = this.printer?.task
        ? String(this.printer.task.state)
        : undefined;
      sessions.push(sessionFromStart(start, end, status, task));
    }
    return sessions;
  }

  private quotesFor(sessions: PrintSession[]): Map<number, Quote> {
    const quotes = new Map<number, Quote>();
    const printer = this.printer;
    if (!printer) return quotes;
    const data = this.overview;
    if (!data) return quotes;
    for (const session of sessions) {
      quotes.set(
        session.start,
        quoteSession(
          session,
          data.powerSeries,
          data.energySeries,
          data.priceSeries,
        ),
      );
    }
    return quotes;
  }

  private async loadOverview(force = false): Promise<void> {
    if (!this.hass || !this.config || !this.printer) return;
    if (this.overviewLoading) return;
    if (
      !force &&
      this.overview &&
      Date.now() - this.overview.loadedAt < 60_000
    ) {
      return;
    }
    const generation = ++this.overviewGeneration;
    const { ids, status: statusId, task: taskId } = this.historyIds();
    if (!ids.length) return;
    this.overviewLoading = true;
    this.overviewError = "";
    const end = Date.now();
    const start = end - OVERVIEW_WINDOW_MS;
    try {
      const response = await this.hass.callApi<unknown>(
        "GET",
        historyPath(ids, start, end),
      );
      if (generation !== this.overviewGeneration) return;
      const map = parseHistory(response, ids);
      const series = this.seriesFromHistory(map, {
        status: statusId,
        task: taskId,
      });
      const statusPoints = series.statusPoints.length
        ? series.statusPoints
        : [{ t: end, state: this.statusOf(this.printer) }];
      const taskPoints = series.taskPoints.length
        ? series.taskPoints
        : this.printer.task
          ? [{ t: end, state: this.printer.task.state }]
          : [];
      const sessions = this.sessionsFor(statusPoints, taskPoints, start, end);
      const data: OverviewData = {
        loadedAt: Date.now(),
        chartStart: start,
        chartEnd: end,
        buckets: buildChartBuckets(
          series.powerSeries,
          series.currentSeries,
          start,
          end,
          CHART_BUCKET_MS,
        ),
        sessions,
        quotes: new Map(),
        powerSeries: series.powerSeries,
        priceSeries: series.priceSeries,
        energySeries: series.energySeries,
      };
      for (const session of sessions) {
        data.quotes.set(
          session.start,
          quoteSession(
            session,
            data.powerSeries,
            data.energySeries,
            data.priceSeries,
          ),
        );
      }
      this.overview = data;
      this.syncLiveFromOverview();
    } catch (error) {
      if (generation !== this.overviewGeneration) return;
      this.overviewError =
        error instanceof Error
          ? error.message
          : "Home Assistant history is unavailable.";
      if (isActiveStatus(this.status) && this.liveStart !== null) {
        void this.seedLive(this.liveStart);
      }
    } finally {
      if (generation === this.overviewGeneration) this.overviewLoading = false;
    }
  }

  private syncLiveFromOverview(): void {
    if (!this.overview || !this.printer) return;
    if (isActiveStatus(this.status) && this.liveStart !== null) {
      const session = this.overview.sessions.find(
        (item) => item.open && Math.abs(item.start - this.liveStart!) <= 90_000,
      );
      if (
        session &&
        this.overview.chartStart <= this.liveStart + 5 * 60_000 &&
        (!this.liveReady || !this.live?.energy)
      ) {
        this.seedFromHistory(session, this.overview);
      } else if (!this.liveReady) {
        void this.seedLive(this.liveStart);
      }
      return;
    }
    if (this.liveStart !== null) {
      this.liveStart = null;
      this.live = null;
      this.liveReady = false;
    }
  }

  private async loadHistory(force = false): Promise<void> {
    if (!this.hass || !this.config || !this.printer) return;
    if (this.historyLoading) return;
    if (!force && this.history && Date.now() - this.lastHistoryLoad < 60_000) {
      return;
    }
    const generation = ++this.historyGeneration;
    const { ids, status: statusId, task: taskId } = this.historyIds();
    if (!ids.length) {
      this.historyError = "No recorder entities are configured for this card.";
      return;
    }
    this.historyLoading = true;
    this.historyError = "";
    const days = clampHistoryDays(this.config.history_days);
    const end = Date.now();
    const start = end - days * 86_400_000;
    try {
      const response = await this.hass.callApi<unknown>(
        "GET",
        historyPath(ids, start, end),
      );
      if (generation !== this.historyGeneration) return;
      const map = parseHistory(response, ids);
      const series = this.seriesFromHistory(map, {
        status: statusId,
        task: taskId,
      });
      const statusPoints = series.statusPoints.length
        ? series.statusPoints
        : [{ t: end, state: this.statusOf(this.printer) }];
      const taskPoints = series.taskPoints.length
        ? series.taskPoints
        : this.printer.task
          ? [{ t: end, state: this.printer.task.state }]
          : [];
      const sessions = this.sessionsFor(statusPoints, taskPoints, start, end);
      const quotes = new Map<number, Quote>();
      let totalCost = 0;
      let totalEnergy = 0;
      let pricedSessions = 0;
      for (const session of sessions) {
        const quote = quoteSession(
          session,
          series.powerSeries,
          series.energySeries,
          series.priceSeries,
        );
        quotes.set(session.start, quote);
        const live =
          session.open && this.live && this.liveStart === session.start
            ? this.live
            : null;
        const cost = live ? liveQuote(live).cost : quote.cost;
        const energy = live ? liveQuote(live).energy : quote.energy;
        totalCost += cost;
        totalEnergy += energy;
        if (quote.pricedEnergy > 0) pricedSessions++;
      }
      const data: HistoryData = {
        loadedAt: Date.now(),
        chartStart: Math.max(start, end - OVERVIEW_WINDOW_MS),
        chartEnd: end,
        buckets: buildChartBuckets(
          series.powerSeries,
          series.currentSeries,
          Math.max(start, end - OVERVIEW_WINDOW_MS),
          end,
          CHART_BUCKET_MS,
        ),
        sessions,
        quotes,
        powerSeries: series.powerSeries,
        priceSeries: series.priceSeries,
        energySeries: series.energySeries,
        days,
        totalCost,
        totalEnergy,
        pricedSessions,
      };
      this.history = data;
      this.lastHistoryLoad = Date.now();
      if (
        isActiveStatus(this.status) &&
        this.liveStart !== null &&
        !this.liveReady
      ) {
        const session = sessions.find(
          (item) => item.open && Math.abs(item.start - this.liveStart!) <= 90_000,
        );
        if (session) this.seedFromHistory(session, data);
      }
    } catch (error) {
      if (generation !== this.historyGeneration) return;
      this.historyError =
        error instanceof Error
          ? error.message
          : "Home Assistant history is unavailable.";
    } finally {
      if (generation === this.historyGeneration) this.historyLoading = false;
    }
  }

  private latestSession(): PrintSession | null {
    const sessions = this.overview?.sessions;
    if (!sessions?.length) return null;
    const sorted = [...sessions].sort((a, b) => a.start - b.start);
    return sorted[sorted.length - 1] ?? null;
  }

  private lastCompletedSession(): PrintSession | null {
    const sessions = this.overview?.sessions;
    if (!sessions?.length) return null;
    const sorted = [...sessions]
      .filter((session) => !session.open)
      .sort((a, b) => a.start - b.start);
    return sorted[sorted.length - 1] ?? null;
  }

  private quoteFor(session: PrintSession | null): Quote | null {
    if (!session) return null;
    if (
      session.open &&
      this.live &&
      this.liveStart !== null &&
      Math.abs(this.liveStart - session.start) <= 90_000
    ) {
      return liveQuote(this.live);
    }
    // Opening History must not pin the hero to an old in-progress quote.
    // Compare observation cutoffs (not response arrival time), and fall back
    // when a newer dataset does not contain this session.
    const candidates = [this.overview, this.history]
      .filter((data): data is OverviewData | HistoryData =>
        !!data && data.quotes.has(session.start),
      )
      .sort((a, b) => b.chartEnd - a.chartEnd || b.loadedAt - a.loadedAt);
    return candidates[0]?.quotes.get(session.start) ?? null;
  }

  private currentQuote(): Quote | null {
    if (isActiveStatus(this.status)) {
      if (!this.liveReady) return null;
      return this.live ? liveQuote(this.live) : null;
    }
    return this.quoteFor(this.lastCompletedSession());
  }

  private currentSession(): PrintSession | null {
    if (!isActiveStatus(this.status)) return this.lastCompletedSession();
    return (
      this.overview?.sessions.find(
        (session) =>
          session.open &&
          this.liveStart !== null &&
          Math.abs(session.start - this.liveStart) <= 90_000,
      ) ??
      this.latestSession()
    );
  }

  // -------------------------------------------------------------------------
  // Camera
  // -------------------------------------------------------------------------

  private get cameraUsesWebRtc(): boolean {
    const type = this.printer?.camera?.attributes?.frontend_stream_type;
    return typeof type === "string" && type.toLowerCase() === "web_rtc";
  }

  private async ensureCameraElements(): Promise<void> {
    if (
      !this.config?.show_camera ||
      !this.printer?.camera
    ) {
      return;
    }
    const cameraId = this.printer.camera.entity_id;
    const tag = this.cameraUsesWebRtc
      ? "ha-web-rtc-player"
      : "ha-camera-stream";
    const key = `${cameraId}:${tag}`;
    if (this.cameraLoadStarted && this.cameraLoadKey === key) return;
    if (this.cameraLoadKey !== key) this.cameraZoom.reset();
    this.cameraLoadKey = key;
    this.cameraLoadStarted = true;
    this.cameraReady = false;
    const generation = ++this.cameraGeneration;
    this.cameraLoadError = false;
    try {
      await ensureCameraStreamElements(cameraId, tag);
      if (generation === this.cameraGeneration && this.isConnected) this.cameraReady = true;
    } catch {
      if (generation === this.cameraGeneration && this.isConnected) this.cameraLoadError = true;
    }
  }

  private retryCamera = (): void => {
    this.cameraLoadStarted = false;
    void this.ensureCameraElements();
  };

  private closeCamera(): void {
    this.cameraExpansion++;
    this.cameraExpanding = false;
    this.cameraFallback.close(false);
    this.cameraZoom.reset();
    const frame = this.shadowRoot?.querySelector(".camera-frame");
    const api = createMediaFullscreenAPI(document);
    if (frame && isMediaFullscreen(api, frame)) void api.exit().catch(() => undefined);
  }

  private onFullscreenChange = (): void => {
    const frame = this.shadowRoot?.querySelector(".camera-frame");
    const active = this.cameraFallback.active || (!!frame && isMediaFullscreen(createMediaFullscreenAPI(document), frame));
    if (active !== this.cameraFullscreen) this.cameraZoom.reset();
    this.cameraFullscreen = active;
  };

  private async expandCamera(opener: HTMLElement): Promise<void> {
    if (this.cameraExpanding) return;
    if (this.cameraFallback.active) {
      this.cameraFallback.close();
      return;
    }
    const generation = this.flow.generation;
    const expansion = ++this.cameraExpansion;
    const frame = this.shadowRoot?.querySelector<HTMLElement>(".camera-frame");
    if (!frame) return;
    this.cameraExpanding = true;
    const api = createMediaFullscreenAPI(document);
    const handled = await toggleMediaFullscreen(api, frame);
    if (expansion === this.cameraExpansion) this.cameraExpanding = false;
    if (!this.isConnected || expansion !== this.cameraExpansion || generation !== this.flow.generation) {
      if (isMediaFullscreen(api, frame)) await api.exit().catch(() => undefined);
      return;
    }
    this.onFullscreenChange();
    if (!handled && !api.isFullscreen && !this.flow.active) this.cameraFallback.open(frame, opener);
  }

  // -------------------------------------------------------------------------
  // Dialogs and actions
  // -------------------------------------------------------------------------

  private openDialog(page: DialogPage, opener?: HTMLElement): void {
    if (this.flow.current === page) return;
    if (this.flow.active) this.flow.push(page);
    else this.flow.open(page, opener);
    if (page === "history") {
      void this.loadHistory();
    }
  }

  private moreInfo(entityId?: string | null): void {
    if (!entityId || !this.hass?.states[entityId]) return;
    if (this.flow.active) {
      this.flow.handoff(() => showEntityMoreInfo(this, entityId));
    } else {
      showEntityMoreInfo(this, entityId);
    }
  }

  private renderDialog() {
    const page = this.flow.current;
    if (!page) return nothing;
    const titles: Record<DialogPage, string> = {
      ams: "AMS",
      history: "Print history",
      details: "Printer details",
      preview: "Print preview",
    };
    const history = page === "history";
    return renderFamilyDialog(this.flow, {
      title: titles[page],
      content:
        !this.printer
          ? notice({ message: "Printer data is unavailable. It will return when the entity reconnects.", tone: "warning" })
          : page === "ams"
          ? this.renderAmsPage()
          : page === "history"
          ? this.renderHistory()
          : page === "details"
            ? this.renderDetails()
            : this.renderPreview(),
      footer: history ? this.renderHistoryFooter() : undefined,
      wide: true,
      long: history,
    });
  }

  private renderHistoryFooter() {
    const updated = this.history
      ? `Updated ${formatRelative(this.history.loadedAt)}`
      : this.historyLoading
        ? "Reading recorder history…"
        : "Recorder history";
    return html`<div class="dialog-footer">
      <small>${updated}</small>
      ${actionPill({
        label: this.historyLoading ? "Refreshing…" : "Refresh",
        icon: UI_ICONS.history,
        onClick: () => void this.loadHistory(true),
        pending: this.historyLoading,
        pendingLabel: "Refreshing…",
      })}
    </div>`;
  }

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  render() {
    if (!this.config) return nothing;
    return html`
      <ha-card>
        <div class="outer">
          <div class="root family-tile-group">
            ${this.renderHeader()} ${this.renderNotices()}
            ${this.renderBody()}
          </div>
        </div>
      </ha-card>
      ${this.renderDialog()}
    `;
  }

  private showPage(page: MainPage): void {
    if (this.flow.active) this.flow.close();
    this.closeCamera();
    this.page = page;
    this.requestUpdate();
  }

  private renderNav(): TemplateResult | typeof nothing {
    if (!this.printer) return nothing;
    const items: {
      page: MainPage | "ams" | "history" | "details";
      label: string;
      icon: string;
      dialog?: boolean;
    }[] = [
      { page: "overview", label: "Overview", icon: "mdi:home-outline" },
      { page: "ams", label: "AMS", icon: "mdi:palette-swatch-outline", dialog: true },
      { page: "history", label: "History", icon: UI_ICONS.history, dialog: true },
      { page: "details", label: "Details", icon: UI_ICONS.details, dialog: true },
    ];
    const visible = this.config?.show_ams === false
      ? items.filter((item) => item.page !== "ams")
      : items;
    return html`<nav
      class="family-navigation"
      aria-label="Printer sections"
      style=${`--family-nav-columns:${visible.length}`}
    >
      ${visible.map(
        (item) => html`<button
          type="button"
          data-nav=${item.page}
          aria-current=${!item.dialog && this.page === item.page
            ? "page"
            : "false"}
          aria-haspopup=${item.dialog ? "dialog" : nothing}
          @click=${(event: MouseEvent) => {
            if (item.dialog) {
              this.openDialog(
                item.page as DialogPage,
                event.currentTarget as HTMLElement,
              );
            } else {
              this.showPage(item.page as MainPage);
            }
          }}
        >
          <ha-icon .icon=${item.icon} aria-hidden="true"></ha-icon>${item.label}
        </button>`,
      )}
    </nav>`;
  }

  private latestUpdate(printer: PrinterEntities): number | null {
    let latest: number | null = null;
    for (const entity of [
      printer.power,
      printer.progress,
      printer.nozzle,
      printer.bed,
      printer.chamber,
      printer.printer,
    ]) {
      const value = parseTime(entity?.last_updated);
      if (value !== null && (latest === null || value > latest)) latest = value;
    }
    return latest;
  }

  private renderHeader(): TemplateResult {
    const printer = this.printer;
    const status = this.status;
    const name = printer?.name || this.config?.name || "3D printer";
    const lastUpdated = printer ? this.latestUpdate(printer) : null;
    const subtitle = printer
      ? `Bambu Lab${lastUpdated ? " · updated " + formatRelative(lastUpdated) : ""}`
      : "Bambu Lab printer";
    const tone: Tone = printer
      ? statusTone(status)
      : this.hass?.states[this.config?.printer_entity ?? ""]
        ? "error"
        : "neutral";
    return html`<header class="family-header">
      <div class="family-brand">
        <ha-icon icon="mdi:printer-3d-nozzle" aria-hidden="true"></ha-icon>
      </div>
      <div class="family-identity">
        <div class="family-title-row">
          <h1 class="family-title">${name}</h1>
          ${stateChip({
            label: printer ? statusLabel(status) : this.config?.printer_entity ? "Unavailable" : "Setup",
            tone,
          })}
        </div>
        <div class="family-subtitle">${subtitle}</div>
      </div>
    </header>`;
  }

  private renderNotices(): TemplateResult | typeof nothing {
    if (!this.printer) return nothing;
    const printer = this.printer;
    const status = this.status;
    const notices: TemplateResult[] = [];
    const online = printer.online;
    const offline =
      status === "offline" ||
      status === "unavailable" ||
      (online && online.state === "off");
    if (offline) {
      notices.push(
        notice({
          message:
            status === "unavailable"
              ? "The printer is unavailable or offline. Readings may be stale and cost tracking is paused."
              : "The printer is offline. Readings may be stale and cost tracking is paused.",
          tone: "warning",
        }),
      );
    }
    if (printer.printError?.state === "on") {
      notices.push(
        notice({
          message: "The printer reports a print error. Check the printer display or Bambu Handy.",
          tone: "error",
          action: {
            label: "Details",
            onClick: () => this.openDialog("details"),
          },
        }),
      );
    }
    const errors = hmsErrors(printer.hms);
    if (errors.length) {
      const first = errors[0];
      const more =
        errors.length > 1 ? ` (+${errors.length - 1} more HMS message${errors.length > 2 ? "s" : ""})` : "";
      notices.push(
        notice({
          message: `HMS · ${first.message}${more}`,
          tone: first.severity === "fatal" ? "error" : "warning",
          action: {
            label: "Details",
            onClick: () => this.openDialog("details"),
          },
        }),
      );
    }
    if (printer.door?.state === "on" && isPrintingStatus(status)) {
      notices.push(
        notice({
          message: "The enclosure door is open while printing.",
          tone: "warning",
        }),
      );
    }
    if (!notices.length) return nothing;
    return html`<div class="notices">${notices}</div>`;
  }

  private renderBody(): TemplateResult {
    if (!this.config?.printer_entity) {
      return this.renderSetup(
        "Connect a printer",
        "Select the Bambu Lab print status sensor in the card editor. The card discovers temperatures, AMS units, camera, images and power entities from the same entity prefix.",
        false,
      );
    }
    if (!this.printer) {
      const exists = !!this.hass?.states[this.config.printer_entity];
      return html`${this.renderAccessories()}${exists
        ? this.renderSetup(
            "Entity prefix not recognised",
            `The entity ${this.config.printer_entity} exists, but the related Bambu entities could not be derived. Set entity_prefix to the part before _print_status, for example h2d_0123456789abcdef.`,
            true,
          )
        : this.renderSetup(
            "Printer entity not found",
            `Home Assistant does not currently expose ${this.config.printer_entity}. Check the Bambu Lab integration, or select another print status sensor in the editor.`,
            true,
          )}`;
    }
    return html`<main class="panel" aria-label=${`${this.page} panel`}>
        ${this.renderOverviewPage()}
      </main>
      ${this.renderNav()}`;
  }

  private renderAccessories(): TemplateResult {
    return html`<printer-accessory-controls
      .hass=${this.hass}
      .printerPowerEntity=${this.config?.printer_power_entity}
      .airPurifierEntity=${this.config?.air_purifier_entity}
      .printerStatus=${this.status}
    ></printer-accessory-controls>`;
  }

  private renderOverviewPage(): TemplateResult {
    return html`
      ${this.renderOverviewGrid()} ${this.renderAccessories()} ${this.renderMetrics()}
      ${this.renderTelemetry()} ${this.renderChart()} ${this.renderAmsSummary()}
    `;
  }

  private renderAmsPage(): TemplateResult {
    if (this.config?.show_ams === false) {
      return html`<div class="empty-state">
        <strong>AMS is hidden</strong>
        <span>Set <code>show_ams: true</code> in the card editor to show AMS units.</span>
      </div>`;
    }
    const ams = this.renderAms();
    return html`<div class="ams-page">
      ${ams === nothing
        ? html`<div class="empty-state">
            <strong>No AMS detected</strong>
            <span
              >This printer has not reported an AMS unit. Loaded external spools
              would appear here.</span
            >
          </div>`
        : ams}
      <p class="hint">
        Tap a tray for its Home Assistant entity details. Remaining filament is
        reported by the AMS; a 0% estimate is not the same as an empty tray.
      </p>
    </div>`;
  }

  private renderSetup(
    title: string,
    message: string,
    error: boolean,
  ): TemplateResult {
    return html`<section class="setup">
      <ha-icon
        .icon=${error ? "mdi:alert-circle-outline" : "mdi:printer-3d-nozzle-outline"}
        aria-hidden="true"
      ></ha-icon>
      <h2>${title}</h2>
      <p>${message}</p>
      <p>
        Configure it in Home Assistant's card editor, or use
        <code>printer_entity</code> in YAML.
      </p>
    </section>`;
  }

  private renderOverviewGrid(): TemplateResult {
    const camera = this.printer?.camera;
    const showCamera = !!this.config?.show_camera && !!camera;
    return html`<div class="overview-grid">
      ${this.renderHero()} ${showCamera ? this.renderCamera() : nothing}
    </div>`;
  }

  private renderHero(): TemplateResult {
    const printer = this.printer as PrinterEntities;
    const status = this.status;
    const active = isActiveStatus(status);
    const last = this.lastCompletedSession();
    const hasLast = !active && !!last;
    const progress = active
      ? percent(entityNumber(printer.progress))
      : hasLast && last?.status === "finished"
        ? 100
        : 0;
    const quote = this.currentQuote();
    const task = active
      ? String(printer.task?.state || last?.task || "Current print")
      : hasLast
        ? String(last?.task || "Print")
        : "";
    const eyebrow = active
      ? status === "printing"
        ? "Now printing"
        : status === "preparing"
          ? "Preparing"
          : "Paused"
      : status === "finished" && hasLast
        ? "Last print finished"
        : hasLast
          ? "Last print"
          : status === "offline" || status === "unavailable"
            ? "Printer offline"
            : "Ready to print";
    const eta = active
      ? `ETA ${formatEta(remainingMs(printer.remaining))}`
      : hasLast && last
        ? `Finished ${formatTime(last.end, this.formatContext)}`
        : status === "offline" || status === "unavailable"
          ? "Last known readings"
          : "Waiting for a print";
    const meta = active
      ? [
          printer.currentLayer && printer.totalLayers
            ? `Layer ${printer.currentLayer.state} / ${printer.totalLayers.state}`
            : null,
          printer.printWeight && available(printer.printWeight)
            ? `${formatNumber(entityNumber(printer.printWeight), 1, this.formatContext)} g`
            : null,
          printer.printLength && available(printer.printLength)
            ? `${formatNumber(entityNumber(printer.printLength), 1, this.formatContext)} m`
            : null,
          printer.speedProfile && available(printer.speedProfile)
            ? String(printer.speedProfile.state)
            : null,
        ].filter((value): value is string => !!value)
      : hasLast && last
        ? [
            formatDuration(last.end - last.start),
            quote ? formatEnergy(quote.energy, this.formatContext) : null,
            last.partialEnd ? "connection lost" : null,
          ].filter((value): value is string => !!value)
        : [
            status === "offline" || status === "unavailable"
              ? "Offline"
              : "Online",
            printer.serial || null,
          ].filter((value): value is string => !!value);
    const costLabel = active
      ? "Electricity cost · this print"
      : hasLast
        ? "Electricity cost · last print"
        : "Electricity cost";
    const costValue = !this.costConfigured
      ? "Not tracked"
      : quote
        ? quote.energy <= 0 && quote.gaps
          ? "No estimate"
          : quote.pricedEnergy <= 0 && quote.unpricedEnergy > 0
            ? "Unpriced"
            : this.cost(quote.cost)
        : active
          ? "Estimating…"
          : hasLast
            ? "No estimate"
            : "—";
    const costNote = !this.costConfigured
      ? "Add a power and price sensor in the editor."
      : quote
        ? `${formatEnergy(quote.energy, this.formatContext)} · ${
            quote.averagePrice !== null
              ? `avg ${formatPrice(quote.averagePrice, this.formatContext)} ${this.priceUnit}`
              : "no priced energy"
          }${coverageNote(quote)}`
        : active
          ? "Reading recorder history for this print."
          : "Open history to see earlier prints.";
    const glowInfo = statusGlow(status);
    const glow = buildGlow(
      {
        weak: `color-mix(in srgb, ${glowInfo.color} 7%, transparent)`,
        strong: `color-mix(in srgb, ${glowInfo.color} 13%, transparent)`,
      },
      glowInfo.mode,
      glowInfo.active,
    );
    const cover = this.coverUrl(printer);
    return html`<div class="hero-wrap family-tile-wrap">
      ${tileGlow(glow)}
      <section
        class="hero family-surface family-tile-face"
        style=${`--hero-accent:${heroAccent(status)}`}
        aria-label=${`${eyebrow}: ${task || "no active print"}`}
      >
        <div class="hero-top">
          <div class="hero-copy">
            <span class="eyebrow">${eyebrow}</span>
            <h2 class="hero-task ${task ? "" : "muted"}">
              ${task || "No active print"}
            </h2>
            ${active || hasLast
              ? html`<div class="hero-progress-row">
                    <strong class="hero-percent">
                      ${formatNumber(progress, 0, this.formatContext)}<small>%</small>
                    </strong>
                    <span class="hero-eta">${eta}</span>
                  </div>
                  <div
                    class="progress-track"
                    role="progressbar"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow=${progress}
                    aria-label="Print progress"
                  >
                    <span style=${`width:${progress}%`}></span>
                  </div>`
              : nothing}
            <div class="hero-meta">
              ${meta.length
                ? meta.map((value) => html`<span>${value}</span>`)
                : html`<span>${eta}</span>`}
            </div>
          </div>
          ${cover && !this.imageFailed
            ? html`<button
                class="hero-art"
                type="button"
                title="Open print preview"
                aria-label="Open print preview"
                aria-haspopup="dialog"
                @click=${(event: MouseEvent) =>
                  this.openDialog("preview", event.currentTarget as HTMLElement)}
              >
                <img
                  src=${cover}
                  alt=""
                  loading="lazy"
                  @error=${() => {
                    this.imageFailed = true;
                  }}
                />
                <span class="hero-art-expand" aria-hidden="true">
                  <ha-icon icon="mdi:arrow-expand" aria-hidden="true"></ha-icon>
                </span>
              </button>`
            : html`<div class="hero-art" aria-hidden="true">
                <ha-icon icon="mdi:printer-3d-nozzle-outline"></ha-icon>
              </div>`}
        </div>
        <div class="cost-panel">
          <button
            class="cost-button"
            type="button"
            aria-haspopup="dialog"
            aria-label=${`Electricity cost: ${costValue}. ${costNote} Open print cost history.`}
            @click=${(event: MouseEvent) =>
              this.openDialog("history", event.currentTarget as HTMLElement)}
          >
            <span class="cost-icon"
              ><ha-icon icon="mdi:flash-outline" aria-hidden="true"></ha-icon
            ></span>
            <span class="cost-copy">
              <span class="cost-label">${costLabel}</span>
              <strong class="cost-value ${quote ? "" : "muted"}"
                >${costValue}</strong
              >
              <span class="cost-note">${costNote}</span>
            </span>
            <ha-icon
              class="cost-chevron"
              .icon=${UI_ICONS.next}
              aria-hidden="true"
            ></ha-icon>
          </button>
        </div>
      </section>
    </div>`;
  }

  private get costConfigured(): boolean {
    return !!(
      this.config?.price_entity &&
      (this.config?.power_entity || this.config?.energy_entity)
    );
  }

  private renderCamera(): TemplateResult {
    const camera = this.printer?.camera;
    if (!camera) return html``;
    const picture =
      typeof camera.attributes?.entity_picture === "string"
        ? camera.attributes.entity_picture
        : "";
    const webRtc = this.cameraUsesWebRtc;
    const live =
      this.cameraLive && this.cameraReady && available(camera);
    const loading =
      this.cameraLive && !this.cameraReady && !this.cameraLoadError && available(camera);
    return html`<section
      class="camera-tile family-surface"
      aria-label="Printer camera"
    >
      <div class="camera-frame ${this.cameraFullscreen ? "camera-expanded" : ""}">
        <div class="camera-viewport"
          @touchstart=${this.cameraZoom.touchStart}
          @touchmove=${this.cameraZoom.touchMove}
          @touchend=${this.cameraZoom.touchEnd}
          @touchcancel=${this.cameraZoom.touchEnd}
          @click=${{ handleEvent: (event: Event) => this.cameraZoom.consumeClick(event), capture: true }}
        >
        <div class="camera-media" style=${`transform:${this.cameraZoom.transform}`}>
        ${live
          ? webRtc
            ? html`<ha-web-rtc-player
                .hass=${this.hass}
                .entityid=${camera.entity_id}
                .controls=${false}
                .muted=${true}
                .fitMode=${this.cameraFullscreen ? "contain" : "cover"}
                autoplay
                playsinline
              ></ha-web-rtc-player>`
            : html`<ha-camera-stream
                .hass=${this.hass}
                .stateObj=${camera}
                .controls=${false}
                .muted=${true}
                .fitMode=${this.cameraFullscreen ? "contain" : "cover"}
              ></ha-camera-stream>`
          : picture
            ? html`<img
                class="camera-image"
                src=${picture}
                alt="Printer camera snapshot"
              />`
            : nothing}
        ${!live && !picture
          ? html`<div class="camera-placeholder">
              <ha-icon
                .icon=${loading
                  ? "mdi:camera-outline"
                  : "mdi:camera-off-outline"}
                aria-hidden="true"
              ></ha-icon>
              <span>${loading ? "Loading camera…" : "Camera unavailable"}</span>
            </div>`
          : nothing}
        </div>
        </div>
        <div class="camera-overlay">
          ${live
            ? html`<span class="live-pill"
                ><span class="status-dot" aria-hidden="true"></span>Live</span
              >`
            : picture
              ? html`<span class="live-pill snapshot-pill">Snapshot</span>`
              : html`<span></span>`}
          <div class="camera-actions">
            ${this.cameraLoadError && this.cameraLive ? html`<button
              class="camera-fullscreen"
              type="button"
              title="Retry live stream"
              aria-label="Retry live stream"
              @click=${this.retryCamera}
            ><ha-icon icon="mdi:reload" aria-hidden="true"></ha-icon></button>` : nothing}
            ${picture || live
              ? html`<button
                  class="camera-fullscreen"
                  type="button"
                  title=${this.cameraLive ? "Show camera snapshot" : "Show live stream"}
                  aria-label=${this.cameraLive ? "Show camera snapshot" : "Show live camera stream"}
                  aria-pressed=${String(!this.cameraLive)}
                  @click=${() => {
                    this.cameraLive = !this.cameraLive;
                    this.cameraZoom.reset();
                    if (this.cameraLive && this.cameraLoadError) this.retryCamera();
                  }}
                >
                  <ha-icon
                    .icon=${this.cameraLive ? "mdi:image-outline" : "mdi:video-outline"}
                    aria-hidden="true"
                  ></ha-icon>
                </button>`
              : nothing}
            <button
              class="camera-fullscreen"
              type="button"
              title=${this.cameraFullscreen ? "Exit full screen" : "Expand camera"}
              aria-label=${this.cameraFullscreen ? "Exit full screen" : "Expand camera"}
              ?disabled=${this.cameraExpanding}
              @click=${(event: MouseEvent) => void this.expandCamera(event.currentTarget as HTMLElement)}
            >
              <ha-icon .icon=${this.cameraFullscreen ? "mdi:fullscreen-exit" : "mdi:fullscreen"} aria-hidden="true"></ha-icon>
            </button>
          </div>
        </div>
        ${this.cameraFullscreen && this.cameraZoom.state.scale > 1
          ? html`<button class="camera-zoom-reset" type="button"
              aria-label="Reset zoom" title="Reset zoom"
              @click=${() => this.cameraZoom.reset()}>
              ${formatNumber(this.cameraZoom.state.scale, 1, this.formatContext)}×
            </button>` : nothing}
      </div>
    </section>`;
  }

  private metric(
    label: string,
    icon: string,
    value: string,
    unit: string,
    sub: string,
    unavailable = false,
    entityId?: string | null,
  ): TemplateResult {
    const content = html`<span class="family-metric-top"
        ><ha-icon .icon=${icon} aria-hidden="true"></ha-icon
        ><span class="family-metric-label">${label}</span></span
      >
      <span class="family-metric-value ${unavailable ? "missing" : ""}"
        >${unavailable ? "Unavailable" : value}${!unavailable && unit
          ? html`<small>${unit}</small>`
          : nothing}</span
      >
      ${sub && !unavailable ? html`<span class="metric-sub">${sub}</span>` : nothing}`;
    const interactive = !!entityId && !!this.hass?.states[entityId];
    return interactive
      ? html`<button
          class="metric family-metric family-surface"
          type="button"
          data-metric=${label.toLowerCase()}
          aria-haspopup="dialog"
          aria-label=${`${label}: ${unavailable ? "unavailable" : `${value} ${unit}`}. Open entity details`}
          @click=${() => this.moreInfo(entityId)}
        >
          ${content}
        </button>`
      : html`<div
          class="metric family-metric family-surface"
          data-metric=${label.toLowerCase()}
        >
          ${content}
        </div>`;
  }

  private temperatureMetric(
    label: string,
    icon: string,
    valueEntity: PrinterEntities["bed"],
    targetEntity: PrinterEntities["bedTarget"],
    digits = 0,
  ): TemplateResult {
    const value = entityNumber(valueEntity);
    const target = entityNumber(targetEntity);
    const unit = unitOf(valueEntity) || "°C";
    const unavailable = !available(valueEntity) || value === null;
    return this.metric(
      label,
      icon,
      unavailable ? "—" : formatNumber(value, digits, this.formatContext),
      unavailable ? "" : unit,
      unavailable
        ? "Unavailable"
        : target === null
          ? targetEntity ? "Target unavailable" : ""
          : target > 0
            ? `Target ${formatNumber(target, digits, this.formatContext)} ${unitOf(targetEntity) || unit}`
            : "No target",
      unavailable,
      valueEntity?.entity_id,
    );
  }

  private renderMetrics(): TemplateResult {
    const printer = this.printer as PrinterEntities;
    const metrics: TemplateResult[] = [];
    metrics.push(
      this.temperatureMetric(
        "Bed",
        "mdi:radiator",
        printer.bed,
        printer.bedTarget,
      ),
    );
    const nozzle = printer.nozzle ?? printer.leftNozzle;
    const nozzleTarget = printer.nozzleTarget ?? printer.leftNozzleTarget;
    if (nozzle || printer.leftNozzle || printer.rightNozzle) {
      metrics.push(
        this.temperatureMetric(
          "Nozzle",
          "mdi:printer-3d-nozzle-heat",
          nozzle,
          nozzleTarget,
          0,
        ),
      );
    }
    if (printer.chamber) {
      metrics.push(
        this.temperatureMetric(
          "Chamber",
          "mdi:thermometer-lines",
          printer.chamber,
          printer.chamberTarget,
          0,
        ),
      );
    }
    if (printer.power) {
      const power = powerWatts(printer.power);
      metrics.push(
        this.metric(
          "Power",
          "mdi:flash",
          power === null ? "—" : formatNumber(power, 0, this.formatContext),
          power === null ? "" : "W",
          power === null
            ? "Unavailable"
            : isPrintingStatus(this.status)
              ? "Printing load"
              : "Printer load",
          power === null,
          printer.power.entity_id,
        ),
      );
    } else if (printer.price) {
      const price = pricePerKwh(printer.price);
      metrics.push(
        this.metric(
          "Price",
          "mdi:currency-eur",
          price === null ? "—" : formatPrice(price, this.formatContext),
          price === null ? "" : this.priceUnit,
          "Electricity price",
          price === null,
          printer.price.entity_id,
        ),
      );
    }
    return html`<div class="metrics family-metrics">${metrics}</div>`;
  }

  private telemetryCell(
    key: string,
    label: string,
    value: string,
    options: { entityId?: string | null; onClick?: () => void } = {},
  ): TemplateResult {
    const content = html`<span class="telemetry-label family-telemetry-label">${label}</span>
      <span class="telemetry-value family-telemetry-value">${value}</span>`;
    if (options.entityId && this.hass?.states[options.entityId]) {
      return html`<button
        class="telemetry-cell family-telemetry-cell"
        type="button"
        data-telemetry=${key}
        aria-haspopup="dialog"
        aria-label=${`${label}: ${value}. Open entity details`}
        @click=${() => this.moreInfo(options.entityId)}
      >
        ${content}
      </button>`;
    }
    if (options.onClick) {
      return html`<button
        class="telemetry-cell family-telemetry-cell"
        type="button"
        data-telemetry=${key}
        aria-haspopup="dialog"
        aria-label=${`${label}: ${value}. Open print history`}
        @click=${options.onClick}
      >
        ${content}
      </button>`;
    }
    return html`<div class="telemetry-cell family-telemetry-cell" data-telemetry=${key}>${content}</div>`;
  }

  private renderTelemetry(): TemplateResult | typeof nothing {
    const printer = this.printer as PrinterEntities;
    const cells: TemplateResult[] = [];
    if (printer.current) {
      cells.push(
        this.telemetryCell(
          "current",
          "Current",
          formatCurrent(currentAmps(printer.current), this.formatContext),
          { entityId: printer.current.entity_id },
        ),
      );
    }
    if (printer.voltage) {
      cells.push(
        this.telemetryCell(
          "voltage",
          "Voltage",
          formatVoltage(asNumber(printer.voltage.state), this.formatContext),
          { entityId: printer.voltage.entity_id },
        ),
      );
    }
    if (printer.price) {
      cells.push(
        this.telemetryCell(
          "price",
          "Electricity price",
          `${formatPrice(pricePerKwh(printer.price), this.formatContext)} ${this.priceUnit}`,
          { entityId: printer.price.entity_id },
        ),
      );
    }
    const quote = this.currentQuote();
    if (quote) {
      cells.push(
        this.telemetryCell(
          "energy",
          isActiveStatus(this.status) ? "Energy · this print" : "Energy · last print",
          formatEnergy(quote.energy, this.formatContext),
          { onClick: () => this.openDialog("history") },
        ),
      );
    }
    if (!cells.length) return nothing;
    return html`<div class="telemetry family-telemetry family-surface">${cells}</div>`;
  }

  private renderChart(): TemplateResult | typeof nothing {
    const printer = this.printer as PrinterEntities;
    if (!printer.power && !printer.current) return nothing;
    const power = powerWatts(printer.power);
    const current = currentAmps(printer.current);
    const sub = [
      power !== null ? formatPower(power, this.formatContext) : null,
      current !== null ? formatCurrent(current, this.formatContext) : null,
    ]
      .filter((value): value is string => !!value)
      .join(" · ");
    return html`<section class="chart-panel family-surface">
      <button
        class="chart-head"
        type="button"
        aria-haspopup="dialog"
        aria-label="Open power and current history"
        @click=${(event: MouseEvent) =>
          this.openDialog("history", event.currentTarget as HTMLElement)}
      >
        <span class="chart-head-copy">
          <span class="chart-title">Power · 24 h</span>
          <span class="chart-sub">${sub || "Recorded printer load"}</span>
        </span>
        <ha-icon .icon=${UI_ICONS.history} aria-hidden="true"></ha-icon>
      </button>
      ${this.overview
        ? html`<bambu-print-chart
            .buckets=${this.overview.buckets}
            .start=${this.overview.chartStart}
            .end=${this.overview.chartEnd}
            .context=${this.formatContext}
            .height=${120}
            .compact=${true}
          ></bambu-print-chart>`
        : this.overviewLoading
          ? html`<div class="chart-skeleton" aria-label="Loading power history"></div>`
          : html`<div class="chart-error">
              <span>${this.overviewError || "No recorded power history yet."}</span>
              <button
                class="text-button"
                type="button"
                @click=${() => void this.loadOverview(true)}
              >
                Retry
              </button>
            </div>`}
    </section>`;
  }

  private spoolButton(options: {
    id: string;
    label: string;
    name: string;
    type: string;
    colors: string[];
    remain: number | null;
    remainEnabled: boolean;
    empty: boolean;
    active: boolean;
  }): TemplateResult {
    const remain =
      options.remainEnabled && options.remain !== null && options.remain >= 0
        ? Math.min(100, options.remain)
        : null;
    const meta = [
      options.empty ? "No filament" : options.type || null,
      remain !== null ? `${formatNumber(remain, 0, this.formatContext)}%` : null,
      options.active ? "Active" : null,
    ].filter((value): value is string => !!value);
    const aria = [
      options.label,
      options.empty ? "empty" : options.name,
      remain !== null ? `${formatNumber(remain, 0, this.formatContext)} percent remaining` : null,
      options.active ? "active" : null,
    ]
      .filter((value): value is string => !!value)
      .join(", ");
    return html`<button
      class="tray ${options.active ? "active" : ""} ${options.empty ? "empty" : ""}"
      type="button"
      title=${aria}
      aria-label=${`${aria}. Open filament details`}
      @click=${() => this.moreInfo(options.id)}
    >
      <span
        class="tray-swatch ${options.colors.length ? "" : "none"}"
        style=${swatchStyle(options.colors)}
        aria-hidden="true"
      ></span>
      <span class="tray-copy">
        <span class="tray-name">${options.name}</span>
        <span class="tray-meta">${meta.join(" · ")}</span>
      </span>
      ${remain !== null
        ? html`<span class="tray-bar" aria-hidden="true"
            ><span style=${`width:${remain}%`}></span
          ></span>`
        : nothing}
    </button>`;
  }

  private trayButton(tray: AmsTray, unitLabel: string): TemplateResult {
    return this.spoolButton({
      id: tray.id,
      label: `${unitLabel} tray ${tray.slot}`,
      name: tray.name,
      type: tray.type,
      colors: tray.colors,
      remain: tray.remain,
      remainEnabled: tray.remainEnabled,
      empty: tray.empty,
      active: tray.active,
    });
  }

  private amsSummaryTile(unit: AmsUnit): TemplateResult {
    const focus =
      unit.trays.find((tray) => tray.active) ??
      [...unit.trays]
        .filter((tray) => !tray.empty)
        .sort((a, b) => (b.remain ?? -1) - (a.remain ?? -1))[0] ??
      null;
    const loaded = unit.trays.filter((tray) => !tray.empty).length;
    const environment = [
      unit.temperature
        ? formatTemperature(entityNumber(unit.temperature), this.formatContext)
        : null,
      unit.humidity ? formatPercent(entityNumber(unit.humidity), this.formatContext) : null,
    ]
      .filter((value): value is string => !!value)
      .join(" · ");
    const remain =
      focus && focus.remainEnabled && focus.remain !== null
        ? `${formatNumber(focus.remain, 0, this.formatContext)}%`
        : null;
    const meta = focus
      ? [focus.type || null, remain, focus.active ? "Active" : null]
          .filter((value): value is string => !!value)
          .join(" · ")
      : "No active tray";
    return html`<button
      class="ams-summary-tile family-surface"
      type="button"
      aria-label=${`Open ${unit.label} details`}
      aria-haspopup="dialog"
      @click=${(event: MouseEvent) => this.openDialog("ams", event.currentTarget as HTMLElement)}
    >
      <span class="ams-summary-head">
        <span class="ams-name">${unit.label}</span>
        ${unit.active
          ? html`<span class="ams-state"
              ><span class="status-dot" aria-hidden="true"></span>Active</span
            >`
          : nothing}
        ${environment ? html`<span class="ams-env">${environment}</span>` : nothing}
      </span>
      <span class="ams-summary-tray">
        <span
          class="tray-swatch ${focus?.colors.length ? "" : "none"}"
          style=${swatchStyle(focus?.colors ?? [])}
          aria-hidden="true"
        ></span>
        <span class="ams-summary-copy">
          <strong>${focus ? focus.name : "No filament loaded"}</strong>
          <small>${meta}</small>
        </span>
      </span>
      <span class="ams-summary-dots" aria-hidden="true">
        ${unit.trays.map(
          (tray) => html`<span
            class="ams-dot ${tray.active ? "active" : ""} ${tray.empty
              ? "empty"
              : ""} ${tray.colors.length ? "" : "none"}"
            style=${swatchStyle(tray.colors)}
            title=${tray.name}
          ></span>`,
        )}
        <span class="ams-summary-loaded">${loaded}/${unit.trays.length} loaded</span>
      </span>
    </button>`;
  }

  private externalSummaryTile(spools: ExternalSpool[]): TemplateResult {
    const focus =
      spools.find((spool) => spool.active) ??
      [...spools]
        .filter((spool) => !spool.empty)
        .sort((a, b) => (b.remain ?? -1) - (a.remain ?? -1))[0] ??
      spools[0];
    const loaded = spools.filter((spool) => !spool.empty).length;
    return html`<button
      class="ams-summary-tile family-surface"
      type="button"
      aria-label="Open external spool details"
      aria-haspopup="dialog"
      @click=${(event: MouseEvent) => this.openDialog("ams", event.currentTarget as HTMLElement)}
    >
      <span class="ams-summary-head">
        <span class="ams-name">External</span>
        ${focus?.active
          ? html`<span class="ams-state"
              ><span class="status-dot" aria-hidden="true"></span>Active</span
            >`
          : nothing}
        <span class="ams-env">${loaded}/${spools.length} loaded</span>
      </span>
      <span class="ams-summary-tray">
        <span
          class="tray-swatch ${focus?.colors.length ? "" : "none"}"
          style=${swatchStyle(focus?.colors ?? [])}
          aria-hidden="true"
        ></span>
        <span class="ams-summary-copy">
          <strong>${focus && !focus.empty ? focus.name : "No filament loaded"}</strong>
          <small>${focus && !focus.empty ? [focus.type, focus.remain].filter(Boolean).join(" · ") : "External spool"}</small>
        </span>
      </span>
    </button>`;
  }

  private renderAmsSummary(): TemplateResult | typeof nothing {
    if (!this.config?.show_ams || !this.printer) return nothing;
    const units = this.printer.ams;
    const external = this.printer.external.filter(
      (spool) => !spool.empty || spool.active,
    );
    if (!units.length && !external.length) return nothing;
    return html`<section class="ams-summary">
      <div class="section-title">
        <h2>AMS</h2>
        <button
          class="ams-all"
          type="button"
          aria-haspopup="dialog"
      @click=${(event: MouseEvent) => this.openDialog("ams", event.currentTarget as HTMLElement)}
        >
          All trays<ha-icon .icon=${UI_ICONS.next} aria-hidden="true"></ha-icon>
        </button>
      </div>
      <div class="ams-summary-grid">
        ${units.map((unit) => this.amsSummaryTile(unit))}
        ${external.length ? this.externalSummaryTile(external) : nothing}
      </div>
    </section>`;
  }

  private renderAms(): TemplateResult | typeof nothing {
    if (!this.config?.show_ams || !this.printer) return nothing;
    const units = this.printer.ams;
    const external = this.printer.external;
    const visibleExternal = external.filter(
      (spool) => !spool.empty || spool.active,
    );
    if (!units.length && !visibleExternal.length) return nothing;
    const slots = units.reduce((total, unit) => total + unit.trays.length, 0);
    const summary =
      units.length > 0
        ? `${units.length} unit${units.length > 1 ? "s" : ""} · ${slots} slot${slots === 1 ? "" : "s"}`
        : "External filament";
    return html`<section class="ams-section">
      <div class="section-title">
        <h2>AMS</h2>
        <span class="section-chip">${summary}</span>
      </div>
      <div class="ams-grid">
        ${units.map((unit) => {
          const temperature = formatTemperature(
            entityNumber(unit.temperature), this.formatContext,
          );
          const humidity = formatPercent(entityNumber(unit.humidity), this.formatContext);
          const environment = [
            unit.temperature ? temperature : null,
            unit.humidity ? humidity : null,
          ]
            .filter((value): value is string => !!value)
            .join(" · ");
          return html`<section
            class="ams-card family-surface"
            aria-label=${unit.label}
          >
            <div class="ams-head">
              <span class="ams-name">${unit.label}</span>
              ${unit.active
                ? html`<span class="ams-state"
                    ><span class="status-dot" aria-hidden="true"></span
                    >Active</span
                  >`
                : nothing}
              ${environment
                ? html`<span class="ams-env">${environment}</span>`
                : nothing}
            </div>
            ${unit.drying
              ? html`<span class="ams-drying"
                  ><ha-icon
                    icon="mdi:hair-dryer-outline"
                    aria-hidden="true"
                  ></ha-icon
                  >Drying${unit.dryingRemaining && unit.dryingRemaining > 0
                    ? ` · ${formatDuration(unit.dryingRemaining * 60_000)}`
                    : ""}</span
                >`
              : nothing}
            <div class="trays">
              ${unit.trays.map((tray) => this.trayButton(tray, unit.label))}
            </div>
          </section>`;
        })}
        ${visibleExternal.length
          ? html`<section
              class="ams-card family-surface external-card"
              aria-label="External filament"
            >
              <div class="ams-head">
                <span class="ams-name"
                  >${visibleExternal.length > 1
                    ? "External spools"
                    : "External spool"}</span
                >
                <span class="ams-env"
                  >${visibleExternal.filter((spool) => spool.active).length
                    ? "Active"
                    : "Loaded"}</span
                >
              </div>
              <div class="external-grid">
                ${visibleExternal.map((spool) => this.externalButton(spool))}
              </div>
            </section>`
          : nothing}
      </div>
    </section>`;
  }

  private externalButton(spool: ExternalSpool): TemplateResult {
    return this.spoolButton({
      id: spool.id,
      label: spool.label,
      name: spool.name,
      type: spool.type,
      colors: spool.colors,
      remain: spool.remain,
      remainEnabled: spool.remainEnabled,
      empty: spool.empty,
      active: spool.active,
    });
  }

  // -------------------------------------------------------------------------
  // Details dialog
  // -------------------------------------------------------------------------

  private dataRow(
    label: string,
    value: string,
    entityId?: string | null,
  ): TemplateResult {
    const content = html`<span>${label}</span><b>${value}</b>`;
    return entityId && this.hass?.states[entityId]
      ? html`<button
          class="data-row"
          type="button"
          aria-haspopup="dialog"
          aria-label=${`${label}: ${value}. Open entity details`}
          @click=${() => this.moreInfo(entityId)}
        >
          ${content}<ha-icon .icon=${UI_ICONS.next} aria-hidden="true"></ha-icon>
        </button>`
      : html`<div class="data-row">${content}</div>`;
  }

  private group(
    title: string,
    rows: (TemplateResult | typeof nothing)[],
    options: { collapsed?: boolean } = {},
  ): TemplateResult | typeof nothing {
    const content = rows.filter((row) => row !== nothing);
    if (!content.length) return nothing;
    if (options.collapsed) {
      return html`<details class="group family-surface collapsible">
        <summary>
          <h3>${title}</h3>
          <ha-icon .icon=${UI_ICONS.expand} aria-hidden="true"></ha-icon>
        </summary>
        <div class="rows">${content}</div>
      </details>`;
    }
    return html`<section class="group family-surface">
      <h3>${title}</h3>
      <div class="rows">${content}</div>
    </section>`;
  }

  private renderPreview(): TemplateResult {
    const cover = this.coverUrl();
    const task = this.printer?.task?.state;
    return html`<div class="preview-dialog">
      ${cover && !this.imageFailed
        ? html`<img
            class="preview-large"
            src=${cover}
            alt="Print preview"
            @error=${() => {
              this.imageFailed = true;
            }}
          />`
        : html`<div class="empty-state">
            <strong>Print preview unavailable</strong>
            <span>The Bambu cover image is not available for this print.</span>
          </div>`}
      <p class="preview-caption">
        ${task || "Print preview"}
      </p>
    </div>`;
  }

  private renderDetails(): TemplateResult {
    const printer = this.printer as PrinterEntities;
    const quote = this.currentQuote();
    const task = printer.task?.state || "—";
    const progress = entityNumber(printer.progress);
    const start = parseTime(printer.start?.state);
    const end = parseTime(printer.end?.state);
    const now = Date.now();
    const active = isActiveStatus(this.status);
    const elapsed = start
      ? formatDuration((active ? now : end ?? now) - start)
      : "—";
    const planned = start && end ? formatDuration(end - start) : null;
    const errors = hmsErrors(printer.hms);
    const rawObjects = printer.printableObjects?.attributes?.objects;
    const objectNames =
      rawObjects && typeof rawObjects === "object"
        ? Object.values(rawObjects as Record<string, unknown>)
            .filter((value): value is string => typeof value === "string" && !!value)
        : [];
    const objects = objectNames.length
      ? objectNames.join(", ")
      : printer.printableObjects?.state ?? "—";
    return html`<div class="modal-content">
      <div class="dialog-intro">

        ${actionPill({
          label: "View print history",
          icon: UI_ICONS.history,
          onClick: () => this.openDialog("history"),
        })}
      </div>
      ${this.group("Print job", [
        this.dataRow("State", statusLabel(this.status), printer.printer.entity_id),
        this.dataRow("Task", String(task), printer.task?.entity_id),
        this.dataRow("Stage", humanize(printer.stage?.state), printer.stage?.entity_id),
        this.dataRow(
          "Progress",
          progress === null ? "—" : formatPercent(progress, this.formatContext),
          printer.progress?.entity_id,
        ),
        this.dataRow(
          "Layer",
          printer.currentLayer && printer.totalLayers
            ? `${printer.currentLayer.state} / ${printer.totalLayers.state}`
            : "—",
          printer.currentLayer?.entity_id,
        ),
        this.dataRow("Started", formatDateTime(start, this.formatContext), printer.start?.entity_id),
        this.dataRow("Ends", formatDateTime(end, this.formatContext), printer.end?.entity_id),
        this.dataRow("Elapsed", elapsed),
        this.dataRow(
          "Weight",
          printer.printWeight
            ? `${formatNumber(entityNumber(printer.printWeight), 1, this.formatContext)} ${unitOf(printer.printWeight) || "g"}`
            : "—",
          printer.printWeight?.entity_id,
        ),
        this.dataRow(
          "Filament length",
          printer.printLength
            ? `${formatNumber(entityNumber(printer.printLength), 1, this.formatContext)} ${unitOf(printer.printLength) || "m"}`
            : "—",
          printer.printLength?.entity_id,
        ),
        this.dataRow("Bed type", humanize(printer.bedType?.state), printer.bedType?.entity_id),
        this.dataRow("Speed profile", humanize(printer.speedProfile?.state), printer.speedProfile?.entity_id),
        this.dataRow("Print source", humanize(printer.printType?.state), printer.printType?.entity_id),
        this.dataRow("File", printer.gcodeFile?.state ?? "—", printer.gcodeFile?.entity_id),
        this.dataRow("Objects", objects, printer.printableObjects?.entity_id),
        planned
          ? this.dataRow(active ? "Estimated total" : "Total time", planned)
          : nothing,
      ])}
      ${this.group("Temperatures", [
        this.dataRow(
          "Bed",
          `${formatTemperature(entityNumber(printer.bed), this.formatContext)}${entityNumber(printer.bedTarget) !== null && (entityNumber(printer.bedTarget) ?? 0) > 0 ? ` → ${formatTemperature(entityNumber(printer.bedTarget), this.formatContext)}` : ""}`,
          printer.bed?.entity_id,
        ),
        this.dataRow(
          "Chamber",
          `${formatTemperature(entityNumber(printer.chamber), this.formatContext)}${entityNumber(printer.chamberTarget) !== null && (entityNumber(printer.chamberTarget) ?? 0) > 0 ? ` → ${formatTemperature(entityNumber(printer.chamberTarget), this.formatContext)}` : ""}`,
          printer.chamber?.entity_id,
        ),
        printer.leftNozzle
          ? this.dataRow(
              "Left nozzle",
              `${formatTemperature(entityNumber(printer.leftNozzle), this.formatContext)} → ${formatTemperature(entityNumber(printer.leftNozzleTarget), this.formatContext)}`,
              printer.leftNozzle.entity_id,
            )
          : nothing,
        printer.rightNozzle
          ? this.dataRow(
              "Right nozzle",
              `${formatTemperature(entityNumber(printer.rightNozzle), this.formatContext)} → ${formatTemperature(entityNumber(printer.rightNozzleTarget), this.formatContext)}`,
              printer.rightNozzle.entity_id,
            )
          : nothing,
        printer.nozzle
          ? this.dataRow(
              "Nozzle (reported)",
              `${formatTemperature(entityNumber(printer.nozzle), this.formatContext)} → ${formatTemperature(entityNumber(printer.nozzleTarget), this.formatContext)}`,
              printer.nozzle.entity_id,
            )
          : nothing,
        printer.nozzleSize
          ? this.dataRow(
              "Nozzle size",
              `${printer.nozzleSize.state} ${unitOf(printer.nozzleSize) || "mm"}`,
              printer.nozzleSize.entity_id,
            )
          : nothing,
      ])}
      ${this.group("Fans", [
        this.dataRow("Part cooling", formatPercent(entityNumber(printer.coolingFan), this.formatContext), printer.coolingFan?.entity_id),
        this.dataRow("Auxiliary", formatPercent(entityNumber(printer.auxFan), this.formatContext), printer.auxFan?.entity_id),
        this.dataRow("Chamber", formatPercent(entityNumber(printer.chamberFan), this.formatContext), printer.chamberFan?.entity_id),
        this.dataRow("Heatbreak", formatPercent(entityNumber(printer.heatbreakFan), this.formatContext), printer.heatbreakFan?.entity_id),
      ])}
      ${this.group("Power & cost", [
        this.dataRow(
          "Current print cost",
          quote ? this.cost(quote.cost) : "—",
        ),
        this.dataRow("Energy", quote ? formatEnergy(quote.energy, this.formatContext) : "—"),
        this.dataRow(
          "Average tariff",
          quote?.averagePrice !== null && quote
            ? `${formatPrice(quote.averagePrice, this.formatContext)} ${this.priceUnit}`
            : "—",
        ),
        this.dataRow(
          "Tariff now",
          printer.price
            ? `${formatPrice(pricePerKwh(printer.price), this.formatContext)} ${this.priceUnit}`
            : "—",
          printer.price?.entity_id,
        ),
        this.dataRow("Power", formatPower(powerWatts(printer.power), this.formatContext), printer.power?.entity_id),
        this.dataRow("Current", formatCurrent(currentAmps(printer.current), this.formatContext), printer.current?.entity_id),
        this.dataRow("Voltage", formatVoltage(asNumber(printer.voltage?.state), this.formatContext), printer.voltage?.entity_id),
        this.dataRow(
          "Plug energy total",
          printer.energy ? formatEnergy(energyKwh(printer.energy), this.formatContext) : "—",
          printer.energy?.entity_id,
        ),
      ])}
      ${this.group("Machine", [
        this.dataRow("Online", printer.online?.state ?? "—", printer.online?.entity_id),
        this.dataRow("Door", printer.door?.state === "on" ? "Open" : printer.door?.state === "off" ? "Closed" : "—", printer.door?.entity_id),
        this.dataRow("Filament sensor", printer.filament?.state === "on" ? "Filament present" : printer.filament?.state === "off" ? "No filament" : "—", printer.filament?.entity_id),
        this.dataRow("Firmware update", printer.firmware?.state === "on" ? "Available" : printer.firmware?.state === "off" ? "Up to date" : "—", printer.firmware?.entity_id),
        this.dataRow("Wi-Fi signal", printer.wifi ? `${printer.wifi.state} ${unitOf(printer.wifi)}` : "—", printer.wifi?.entity_id),
        this.dataRow("IP address", printer.ip?.state ?? "—", printer.ip?.entity_id),
        this.dataRow("Serial", printer.serial ?? "—", printer.printer.entity_id),
        this.dataRow("MQTT mode", humanize(printer.mqttMode?.state), printer.mqttMode?.entity_id),
        this.dataRow("SD card", humanize(printer.sdCard?.state), printer.sdCard?.entity_id),
        this.dataRow("Tool module", humanize(printer.toolModule?.state), printer.toolModule?.entity_id),
        this.dataRow("Developer LAN", printer.lanMode?.state === "on" ? "On" : printer.lanMode?.state === "off" ? "Off" : "—", printer.lanMode?.entity_id),
        this.dataRow(
          "Total usage (reported)",
          printer.totalUsage
            ? `${printer.totalUsage.state} ${unitOf(printer.totalUsage)}`
            : "—",
          printer.totalUsage?.entity_id,
        ),
        this.dataRow("Chamber light", printer.chamberLight?.state ?? "—", printer.chamberLight?.entity_id),
        this.dataRow("Heatbed light", printer.heatbedLight?.state ?? "—", printer.heatbedLight?.entity_id),
      ], { collapsed: true })}
      ${this.group("AMS", [
        ...printer.ams.map((unit) =>
          this.dataRow(
            unit.label,
            `${unit.trays.filter((tray) => !tray.empty).length} loaded · ${formatTemperature(entityNumber(unit.temperature), this.formatContext)} · ${formatPercent(entityNumber(unit.humidity), this.formatContext)}${unit.active ? " · active" : ""}${unit.drying ? " · drying" : ""}`,
          ),
        ),
        ...printer.external.map((spool) =>
          this.dataRow(
            spool.label,
            spool.empty ? "Empty" : `${spool.name}${spool.active ? " · active" : ""}`,
            spool.id,
          ),
        ),
      ], { collapsed: true })}
      ${this.group(
        "HMS messages",
        errors.length
          ? errors.map((error) =>
              this.dataRow(
                error.severity ? error.severity : "Message",
                `${error.message}${error.code ? ` · ${error.code}` : ""}`,
              ),
            )
          : [
              this.dataRow(
                "Status",
                printer.hms
                  ? "No active HMS messages"
                  : "HMS entity not available",
                printer.hms?.entity_id,
              ),
            ],
        { collapsed: errors.length === 0 },
      )}
      <p class="hint">
        Readings are reported by the Bambu Lab integration. HMS, fan and
        temperature values can lag the printer display. Cost is an estimate from
        recorded power and tariff history, not a billing meter.
      </p>
    </div>`;
  }

  // -------------------------------------------------------------------------
  // History dialog
  // -------------------------------------------------------------------------

  private renderHistory(): TemplateResult {
    const data = this.history;
    const fallback = this.overview;
    const sessions = [...(data?.sessions ?? fallback?.sessions ?? [])].sort(
      (a, b) => b.start - a.start,
    );
    const quotes = data?.quotes ?? fallback?.quotes;
    const quoteFor = (session: PrintSession): Quote | null => {
      if (!session) return null;
      if (
        session.open &&
        this.live &&
        this.liveStart !== null &&
        Math.abs(this.liveStart - session.start) <= 90_000
      ) {
        return liveQuote(this.live);
      }
      return quotes?.get(session.start) ?? null;
    };
    const quoted = sessions.map((session) => ({
      session,
      quote: quoteFor(session),
    }));
    const totalCost = quoted.reduce(
      (total, item) => total + (item.quote?.cost ?? 0),
      0,
    );
    const totalEnergy = quoted.reduce(
      (total, item) => total + (item.quote?.energy ?? 0),
      0,
    );
    const priced = quoted.filter((item) => (item.quote?.pricedEnergy ?? 0) > 0);
    const average = priced.length
      ? priced.reduce((total, item) => total + (item.quote?.cost ?? 0), 0) /
        priced.length
      : null;
    const days = data?.days ?? this.config?.history_days ?? 7;
    const chart = data ?? fallback;
    const loading = this.historyLoading && !data;
    return html`<div class="modal-content">
      <div class="dialog-intro">
        <p>
          Estimated from printer power recorded by Home Assistant and the
          electricity price at the time of each print.
          ${this.config?.price_entity
            ? "The tariff sensor is used as recorded; this card adds no fees or VAT."
            : "No electricity price sensor is configured, so cost cannot be estimated; energy is still shown."}
        </p>
      </div>
      <div class="stat-grid">
        <div class="stat">
          <span class="stat-label">Total cost</span>
          <strong class="stat-value"
            >${this.costConfigured
              ? formatCurrency(totalCost, this.formatContext)
              : "—"}</strong
          >
          <span class="stat-sub"
            >${sessions.length} print${sessions.length === 1 ? "" : "s"} in
            ${days} day${days === 1 ? "" : "s"}</span
          >
        </div>
        <div class="stat">
          <span class="stat-label">Electricity used</span>
          <strong class="stat-value">${formatEnergy(totalEnergy, this.formatContext)}</strong>
          <span class="stat-sub"
            >${days} day recorder window</span
          >
        </div>
        <div class="stat">
          <span class="stat-label">Average per print</span>
          <strong class="stat-value"
            >${average !== null
              ? formatCurrency(average, this.formatContext)
              : "—"}</strong
          >
          <span class="stat-sub"
            >${priced.length} priced print${priced.length === 1 ? "" : "s"}</span
          >
        </div>
        <div class="stat">
          <span class="stat-label">Priced energy</span>
          <strong class="stat-value"
            >${formatEnergy(
              quoted.reduce(
                (total, item) => total + (item.quote?.pricedEnergy ?? 0),
                0,
              ), this.formatContext,
            )}</strong
          >
          <span class="stat-sub"
            >${quoted.some((item) => (item.quote?.gaps ?? false))
              ? "Some periods were not observed"
              : "Recorder samples"}</span
          >
        </div>
      </div>
      ${chart
        ? html`<section class="history-chart family-surface">
            <div class="history-chart-head">
              <strong>Power and current · 24 h</strong>
              <span>last 24 h</span>
            </div>
            <bambu-print-chart
              .buckets=${chart.buckets}
              .start=${chart.chartStart}
              .end=${chart.chartEnd}
              .context=${this.formatContext}
              .height=${160}
            ></bambu-print-chart>
          </section>`
        : nothing}
      <div class="section-title">
        <h3>Print sessions</h3>
        <span class="section-chip"
          >${loading ? "Loading…" : `${sessions.length} record${sessions.length === 1 ? "" : "s"}`}</span
        >
      </div>
      ${this.historyError
        ? html`<div class="empty-state">
            <strong>History could not be loaded</strong>
            <span>${this.historyError}</span>
            <div>
              ${actionPill({
                label: "Try again",
                icon: UI_ICONS.history,
                onClick: () => void this.loadHistory(true),
              })}
            </div>
          </div>`
        : loading
          ? html`<div class="empty-state">
              <strong>Reading recorder history…</strong>
              <span
                >Print sessions are derived from the Bambu print status and cost
                from recorded power and tariffs.</span
              >
            </div>`
          : sessions.length
            ? html`<div class="history-list">
                ${repeat(quoted, ({ session }) => session.start, ({ session, quote }) =>
                  this.renderRecord(session, quote),
                )}
              </div>`
            : html`<div class="empty-state">
                <strong>No print sessions in this window</strong>
                <span
                  >A session is recorded when the Bambu status moves to prepare
                  or running and ends at finish, failed or idle. The card uses
                  Home Assistant Recorder history only; prints older than the
                  recorder retention are not reconstructed.</span
                >
              </div>`}
      <p class="hint">
        Sessions that started before the recorder window are marked partial.
        Long telemetry gaps are skipped instead of being filled with stale
        power. Home Assistant Recorder retention (10 days by default) determines
        how far back this list can go; the card can request up to
        ${MAX_HISTORY_DAYS} days.
      </p>
    </div>`;
  }

  private renderRecord(session: PrintSession, quote: Quote | null): TemplateResult {
    const tone = statusTone(
      session.open ? (this.status === "paused" ? "paused" : "printing") : session.status,
    );
    const statusText = session.open
      ? this.status === "paused"
        ? "Paused"
        : "In progress"
      : statusLabel(session.status);
    const task = session.task || "Print";
    const cost =
      quote && quote.pricedEnergy > 0 && this.costConfigured
        ? this.cost(quote.cost)
        : this.costConfigured && quote && quote.energy > 0
          ? "Unpriced"
          : "—";
    return html`<details class="print-record" data-tone=${tone}>
      <summary>
        <span class="record-copy">
          <strong><span class="status-dot" aria-hidden="true"></span>${task}</strong>
          <small
            >${formatDay(session.start, this.formatContext)} ·
            ${formatClockSpan(session.start, session.end, this.formatContext)} ·
            ${formatDuration(session.end - session.start)}</small
          >
        </span>
        <span class="record-value">
          <strong>${cost}</strong>
          <small
            >${quote ? formatEnergy(quote.energy, this.formatContext) : "No energy sensor"} ·
            ${statusText}${session.partialStart || session.partialEnd
              ? " · partial"
              : ""}</small
          >
        </span>
      </summary>
      <div class="record-details">
        <p>
          Started ${formatDateTime(session.start, this.formatContext)}${session.open
            ? " · still in progress"
            : ` · ended ${formatDateTime(session.end, this.formatContext)}`}
        </p>
        ${quote?.averagePrice !== null && quote
          ? html`<p>
              Average tariff
              ${formatPrice(quote.averagePrice, this.formatContext)}
              ${this.priceUnit}
            </p>`
          : nothing}
        ${quote && quote.unpricedEnergy > 0
          ? html`<p>
              ${formatEnergy(quote.unpricedEnergy, this.formatContext)} had no recorded tariff.
            </p>`
          : nothing}
        ${quote?.gaps
          ? html`<p class="warn">
              Some time was not observed. This estimate is partial.
            </p>`
          : nothing}
        ${session.partialStart
          ? html`<p class="warn">
              The print started before the recorder window.
            </p>`
          : nothing}
        ${session.partialEnd
          ? html`<p class="warn">
              The printer stopped reporting before this session ended.
            </p>`
          : nothing}
        ${!this.costConfigured
          ? html`<p>
              Select a power (or energy) sensor and a price sensor in the card
              editor to estimate cost.
            </p>`
          : nothing}
      </div>
    </details>`;
  }
}

function formatClockSpan(
  start: number,
  end: number,
  context: ReturnType<typeof localeContext>,
): string {
  return `${formatTime(start, context)}–${formatTime(end, context)}`;
}


declare global {
  interface HTMLElementTagNameMap {
    "bambu-printer-card": BambuPrinterCard;
  }
}
