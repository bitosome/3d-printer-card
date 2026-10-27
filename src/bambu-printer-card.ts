import {
  LitElement,
  html,
  nothing,
  type PropertyValues,
  type TemplateResult,
} from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ref } from "lit/directives/ref.js";
import {
  FamilyFlowController,
  UI_ICONS,
  actionPill,
  buildGlow,
  designTokens,
  notice,
  renderFamilyDialog,
  showEntityMoreInfo,
  tileGlow,
} from "@bitosome/ha-card-ui";
import "./chart";
import { cardStyles } from "./styles";
import {
  MAX_HISTORY_DAYS,
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
  CardConfig,
  ExternalSpool,
  HistoryData,
  HomeAssistant,
  OverviewData,
  PrintSession,
  PrinterEntities,
  PrinterStatus,
  Quote,
} from "./types";

const CARD_TAG = "bambu-printer-card";
const OVERVIEW_WINDOW_MS = 24 * 60 * 60 * 1000;
const CHART_BUCKET_MS = 5 * 60 * 1000;
const LIVE_SAMPLE_MIN_MS = 5_000;
const REFRESH_INTERVAL_MS = 5 * 60 * 1000;

type DialogPage = "history" | "details";

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
  @state() private imageFailed = false;

  private flow = new FamilyFlowController<DialogPage>(this);
  private overviewRequested = false;
  private overviewGeneration = 0;
  private liveGeneration = 0;
  private historyGeneration = 0;
  private lastStatus: PrinterStatus | null = null;
  private lastCoverUrl = "";
  private cameraLoadStarted = false;
  private cameraFrameEl?: HTMLElement;
  private refreshTimer?: ReturnType<typeof setInterval>;
  private finishTimer?: ReturnType<typeof setTimeout>;
  private lastHistoryLoad = 0;

  setConfig(config: CardConfig): void {
    const next = validateConfig(config);
    const previous = JSON.stringify(this.config);
    this.config = next;
    if (previous === JSON.stringify(next)) return;
    this.flow.forceClose(false);
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
    this.cameraLoadStarted = false;
    this.cameraLive = true;
    this.clearFinishTimer();
    if (this.hass) this.handleHass();
    this.requestUpdate();
  }

  getCardSize(): number {
    return 14;
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
    this.startRefreshTimer();
  }

  firstUpdated(): void {
    void this.ensureCameraElements();
  }

  disconnectedCallback(): void {
    document.removeEventListener("visibilitychange", this.onVisibility);
    this.stopRefreshTimer();
    this.clearFinishTimer();
    this.overviewGeneration++;
    this.liveGeneration++;
    this.historyGeneration++;
    this.cameraFrameEl = undefined;
    super.disconnectedCallback();
  }

  protected updated(changed: PropertyValues): void {
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
    const unit = unitOf(this.printer?.price);
    if (unit) return unit;
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
    if (!this.hass || !this.config) return;
    if (!this.config.printer_entity) {
      this.printer = null;
      return;
    }
    const next = resolvePrinter(this.hass.states, this.config);
    if (!next) {
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
        now - this.live.lastAt >= LIVE_SAMPLE_MIN_MS
      ) {
        this.live = addLiveSample(this.live, now, power, price);
      }
      return;
    }

    if (this.liveStart !== null) {
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
    this.live = {
      energy: quote.energy,
      cost: quote.cost,
      unpricedEnergy: quote.unpricedEnergy,
      lastAt: data.chartEnd,
      lastPower: powerWatts(this.printer?.power),
      lastPrice: pricePerKwh(this.printer?.price),
      gaps: quote.gaps,
    };
    this.liveReady = true;
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
      this.live = {
        energy: quote.energy,
        cost: quote.cost,
        unpricedEnergy: quote.unpricedEnergy,
        lastAt: end,
        lastPower: powerWatts(this.printer?.power),
        lastPrice: pricePerKwh(this.printer?.price),
        gaps: quote.gaps,
      };
      this.liveReady = true;
    } catch {
      if (generation !== this.liveGeneration) return;
      this.liveReady = true;
      if (this.live) this.live = { ...this.live, gaps: true };
    }
  }

  private scheduleOverviewRefresh(delay: number): void {
    this.clearFinishTimer();
    this.finishTimer = setTimeout(() => {
      this.finishTimer = undefined;
      if (this.isConnected) void this.loadOverview(true);
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
    const data = this.history ?? this.overview;
    return data?.quotes.get(session.start) ?? null;
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

  private async ensureCameraElements(): Promise<void> {
    if (
      this.cameraLoadStarted ||
      !this.config?.show_camera ||
      !this.printer?.camera
    ) {
      return;
    }
    this.cameraLoadStarted = true;
    const helpers = (window as unknown as { loadCardHelpers?: () => Promise<unknown> })
      .loadCardHelpers;
    if (typeof helpers === "function") {
      try {
        const loaded = (await helpers()) as {
          createCardElement?: (config: Record<string, unknown>) => Promise<unknown>;
        };
        await loaded.createCardElement?.({
          type: "picture-entity",
          entity: this.printer.camera.entity_id,
          camera_view: "live",
        });
      } catch {
        // The still image remains as a fallback.
      }
    }
    if (typeof customElements === "undefined") return;
    if (customElements.get("ha-camera-stream")) {
      this.cameraReady = true;
      return;
    }
    try {
      await customElements.whenDefined("ha-camera-stream");
      this.cameraReady = true;
    } catch {
      // Leave the snapshot fallback in place.
    }
  }

  private fullscreen(): void {
    const element = this.cameraFrameEl;
    if (element?.requestFullscreen) {
      void element.requestFullscreen().catch(() => undefined);
    }
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
    const history = page === "history";
    return renderFamilyDialog(this.flow, {
      title: history ? "Print history" : "Printer details",
      content: history ? this.renderHistory() : this.renderDetails(),
      footer: history ? this.renderHistoryFooter() : undefined,
      wide: true,
      long: true,
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
          <span class="status-chip" data-tone=${tone}>
            <span class="status-dot" aria-hidden="true"></span>
            ${printer ? statusLabel(status) : this.config?.printer_entity ? "Unavailable" : "Setup"}
          </span>
        </div>
        <div class="family-subtitle">${subtitle}</div>
      </div>
      <div class="header-actions">
        <button
          class="family-icon-button header-history"
          type="button"
          title="Print history"
          aria-label="Open print history"
          aria-haspopup="dialog"
          @click=${(event: MouseEvent) =>
            this.openDialog("history", event.currentTarget as HTMLElement)}
        >
          <ha-icon .icon=${UI_ICONS.history} aria-hidden="true"></ha-icon>
        </button>
        <button
          class="family-icon-button"
          type="button"
          title="Printer details"
          aria-label="Open printer details"
          aria-haspopup="dialog"
          @click=${(event: MouseEvent) =>
            this.openDialog("details", event.currentTarget as HTMLElement)}
        >
          <ha-icon .icon=${UI_ICONS.details} aria-hidden="true"></ha-icon>
        </button>
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
      return exists
        ? this.renderSetup(
            "Entity prefix not recognised",
            `The entity ${this.config.printer_entity} exists, but the related Bambu entities could not be derived. Set entity_prefix to the part before _print_status, for example h2d_0123456789abcdef.`,
            true,
          )
        : this.renderSetup(
            "Printer entity not found",
            `Home Assistant does not currently expose ${this.config.printer_entity}. Check the Bambu Lab integration, or select another print status sensor in the editor.`,
            true,
          );
    }
    return html`
      ${this.renderOverviewGrid()} ${this.renderMetrics()}
      ${this.renderTelemetry()} ${this.renderChart()} ${this.renderAms()}
    `;
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
            ? `${formatNumber(entityNumber(printer.printWeight), 1)} g`
            : null,
          printer.printLength && available(printer.printLength)
            ? `${formatNumber(entityNumber(printer.printLength), 1)} m`
            : null,
          printer.speedProfile && available(printer.speedProfile)
            ? String(printer.speedProfile.state)
            : null,
        ].filter((value): value is string => !!value)
      : hasLast && last
        ? [
            formatDuration(last.end - last.start),
            quote ? formatEnergy(quote.energy) : null,
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
        ? this.cost(quote.cost)
        : active
          ? "Estimating…"
          : hasLast
            ? "No estimate"
            : "—";
    const costNote = !this.costConfigured
      ? "Add a power and price sensor in the editor."
      : quote
        ? `${formatEnergy(quote.energy)} · ${
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
                      ${formatNumber(progress, 0)}<small>%</small>
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
          <div class="hero-art" aria-hidden="true">
            ${cover && !this.imageFailed
              ? html`<img
                  src=${cover}
                  alt=""
                  loading="lazy"
                  @error=${() => {
                    this.imageFailed = true;
                  }}
                />`
              : html`<ha-icon icon="mdi:printer-3d-nozzle-outline"></ha-icon>`}
          </div>
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
    const live =
      this.cameraLive && this.cameraReady && available(camera);
    return html`<section
      class="camera-tile family-surface"
      aria-label="Printer camera"
    >
      <div class="camera-frame" ${ref((el) => {
        this.cameraFrameEl = el as HTMLElement | undefined;
      })}>
        ${live
          ? html`<ha-camera-stream
              .hass=${this.hass}
              .stateObj=${camera}
              .controls=${false}
              .muted=${true}
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
              <ha-icon icon="mdi:camera-off-outline" aria-hidden="true"></ha-icon>
              <span>Camera unavailable</span>
            </div>`
          : nothing}
        <div class="camera-overlay">
          ${live
            ? html`<span class="live-pill"
                ><span class="status-dot" aria-hidden="true"></span>Live</span
              >`
            : picture
              ? html`<span class="live-pill snapshot-pill">Snapshot</span>`
              : html`<span></span>`}
          <div class="camera-actions">
            ${picture || live
              ? html`<button
                  class="camera-fullscreen"
                  type="button"
                  title=${live ? "Show camera snapshot" : "Show live stream"}
                  aria-label=${live ? "Show camera snapshot" : "Show live camera stream"}
                  aria-pressed=${String(!live)}
                  @click=${() => {
                    this.cameraLive = !this.cameraLive;
                  }}
                >
                  <ha-icon
                    .icon=${live ? "mdi:image-outline" : "mdi:video-outline"}
                    aria-hidden="true"
                  ></ha-icon>
                </button>`
              : nothing}
            <button
              class="camera-fullscreen"
              type="button"
              title="Full screen camera"
              aria-label="Open camera full screen"
              @click=${() => this.fullscreen()}
            >
              <ha-icon icon="mdi:fullscreen" aria-hidden="true"></ha-icon>
            </button>
          </div>
        </div>
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
  ): TemplateResult {
    return html`<button
      class="metric family-metric family-surface"
      type="button"
      aria-haspopup="dialog"
      aria-label=${`${label}: ${value} ${unit}. Open printer details`}
      @click=${(event: MouseEvent) =>
        this.openDialog("details", event.currentTarget as HTMLElement)}
    >
      <span class="metric-head"
        ><ha-icon .icon=${icon} aria-hidden="true"></ha-icon
        ><span>${label}</span></span
      >
      <span class="family-metric-value ${unavailable ? "missing" : ""}"
        >${unavailable ? "Unavailable" : value}${!unavailable && unit
          ? html`<small>${unit}</small>`
          : nothing}</span
      >
      <span class="metric-sub">${sub}</span>
    </button>`;
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
        : target !== null && target > 0
          ? `Target ${formatNumber(target, digits, this.formatContext)} ${unitOf(targetEntity) || unit}`
          : "No target",
      unavailable,
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
          "Real Electricity Price",
          price === null,
        ),
      );
    }
    return html`<div class="metrics family-metrics">${metrics}</div>`;
  }

  private renderTelemetry(): TemplateResult | typeof nothing {
    const printer = this.printer as PrinterEntities;
    const cells: TemplateResult[] = [];
    const current = currentAmps(printer.current);
    if (printer.current) {
      cells.push(html`<div class="telemetry-cell">
        <span class="telemetry-label">Current</span>
        <span class="telemetry-value">${formatCurrent(current)}</span>
      </div>`);
    }
    const voltage = asNumber(printer.voltage?.state);
    if (printer.voltage) {
      cells.push(html`<div class="telemetry-cell">
        <span class="telemetry-label">Voltage</span>
        <span class="telemetry-value">${formatVoltage(voltage)}</span>
      </div>`);
    }
    if (printer.price) {
      const price = pricePerKwh(printer.price);
      cells.push(html`<div class="telemetry-cell">
        <span class="telemetry-label">Electricity price</span>
        <span class="telemetry-value"
          >${formatPrice(price, this.formatContext)} ${this.priceUnit}</span
        >
      </div>`);
    }
    const quote = this.currentQuote();
    if (quote) {
      cells.push(html`<div class="telemetry-cell">
        <span class="telemetry-label"
          >${isActiveStatus(this.status) ? "Energy · this print" : "Energy · last print"}</span
        >
        <span class="telemetry-value">${formatEnergy(quote.energy)}</span>
      </div>`);
    }
    if (!cells.length) return nothing;
    return html`<div class="telemetry family-surface">${cells}</div>`;
  }

  private renderChart(): TemplateResult | typeof nothing {
    const printer = this.printer as PrinterEntities;
    if (!printer.power && !printer.current) return nothing;
    const power = powerWatts(printer.power);
    const current = currentAmps(printer.current);
    const sub = [
      power !== null ? formatPower(power) : null,
      current !== null ? formatCurrent(current) : null,
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
      remain !== null ? `${formatNumber(remain, 0)}%` : null,
      options.active ? "Active" : null,
    ].filter((value): value is string => !!value);
    const aria = [
      options.label,
      options.empty ? "empty" : options.name,
      remain !== null ? `${formatNumber(remain, 0)} percent remaining` : null,
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
            entityNumber(unit.temperature),
          );
          const humidity = formatPercent(entityNumber(unit.humidity));
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
          aria-label=${`${label}: ${value}. Open history`}
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
        <span class="eyebrow">Read-only printer telemetry</span>
        <p>
          This card reads Home Assistant entities and recorder history. It does
          not pause, stop or start a print, and it never sends a printer command.
        </p>
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
          progress === null ? "—" : formatPercent(progress),
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
            ? `${formatNumber(entityNumber(printer.printWeight), 1)} ${unitOf(printer.printWeight) || "g"}`
            : "—",
          printer.printWeight?.entity_id,
        ),
        this.dataRow(
          "Filament length",
          printer.printLength
            ? `${formatNumber(entityNumber(printer.printLength), 1)} ${unitOf(printer.printLength) || "m"}`
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
          `${formatTemperature(entityNumber(printer.bed))}${entityNumber(printer.bedTarget) !== null && (entityNumber(printer.bedTarget) ?? 0) > 0 ? ` → ${formatTemperature(entityNumber(printer.bedTarget))}` : ""}`,
          printer.bed?.entity_id,
        ),
        this.dataRow(
          "Chamber",
          `${formatTemperature(entityNumber(printer.chamber))}${entityNumber(printer.chamberTarget) !== null && (entityNumber(printer.chamberTarget) ?? 0) > 0 ? ` → ${formatTemperature(entityNumber(printer.chamberTarget))}` : ""}`,
          printer.chamber?.entity_id,
        ),
        printer.leftNozzle
          ? this.dataRow(
              "Left nozzle",
              `${formatTemperature(entityNumber(printer.leftNozzle))} → ${formatTemperature(entityNumber(printer.leftNozzleTarget))}`,
              printer.leftNozzle.entity_id,
            )
          : nothing,
        printer.rightNozzle
          ? this.dataRow(
              "Right nozzle",
              `${formatTemperature(entityNumber(printer.rightNozzle))} → ${formatTemperature(entityNumber(printer.rightNozzleTarget))}`,
              printer.rightNozzle.entity_id,
            )
          : nothing,
        printer.nozzle
          ? this.dataRow(
              "Nozzle (reported)",
              `${formatTemperature(entityNumber(printer.nozzle))} → ${formatTemperature(entityNumber(printer.nozzleTarget))}`,
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
        this.dataRow("Part cooling", formatPercent(entityNumber(printer.coolingFan)), printer.coolingFan?.entity_id),
        this.dataRow("Auxiliary", formatPercent(entityNumber(printer.auxFan)), printer.auxFan?.entity_id),
        this.dataRow("Chamber", formatPercent(entityNumber(printer.chamberFan)), printer.chamberFan?.entity_id),
        this.dataRow("Heatbreak", formatPercent(entityNumber(printer.heatbreakFan)), printer.heatbreakFan?.entity_id),
      ])}
      ${this.group("Power & cost", [
        this.dataRow(
          "Current print cost",
          quote ? this.cost(quote.cost) : "—",
        ),
        this.dataRow("Energy", quote ? formatEnergy(quote.energy) : "—"),
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
        this.dataRow("Power", formatPower(powerWatts(printer.power)), printer.power?.entity_id),
        this.dataRow("Current", formatCurrent(currentAmps(printer.current)), printer.current?.entity_id),
        this.dataRow("Voltage", formatVoltage(asNumber(printer.voltage?.state)), printer.voltage?.entity_id),
        this.dataRow(
          "Plug energy total",
          printer.energy ? formatEnergy(energyKwh(printer.energy)) : "—",
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
            `${unit.trays.filter((tray) => !tray.empty).length} loaded · ${formatTemperature(entityNumber(unit.temperature))} · ${formatPercent(entityNumber(unit.humidity))}${unit.active ? " · active" : ""}${unit.drying ? " · drying" : ""}`,
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
          <strong class="stat-value">${formatEnergy(totalEnergy)}</strong>
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
              ),
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
                ${quoted.map(({ session, quote }) =>
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
            >${quote ? formatEnergy(quote.energy) : "No energy sensor"} ·
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
              ${formatEnergy(quote.unpricedEnergy)} had no recorded tariff.
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
