/**
 * Power and current history on the shared ha-card-ui time-series chart.
 *
 * The card owns the recorder data, units and wording; the library owns the axes,
 * time labels, scrubbing and look, so this chart matches the weather and
 * electricity price charts. Labels use the library's Home Assistant formatters
 * like those cards: the default date-and-time label, and numbers with the unit
 * after a narrow no-break space ("300 W", "0.25 A").
 */
import {
  formatHassNumber,
  sampleAndHold,
  stepDecimals,
  type ChartSeries,
  type FormatHass,
  type NiceDomain,
  type TimeSeriesChartOptions,
} from "@bitosome/ha-card-ui";
import type { OverviewData, SeriesPoint } from "./types";

/** Recorder samples are held in 5-minute buckets; each bucket is one chart step. */
export const CHART_BUCKET_MS = 5 * 60 * 1000;

export type PowerChartVariant = "overview" | "history";

/** Chart height in px; the card's loading, error and empty states use the same height. */
export function powerChartHeight(variant: PowerChartVariant): number {
  return variant === "overview" ? 120 : 160;
}

/** Chart id and selection group; the card resets the selection when it installs fresh data. */
export function powerChartId(variant: PowerChartVariant): string {
  return `power-${variant}`;
}

/** The last reading before each bucket end, carried forward; missing readings stay null. */
export function powerChartBuckets(
  power: SeriesPoint[],
  current: SeriesPoint[],
  start: number,
  end: number,
): Pick<OverviewData, "chartPower" | "chartCurrent"> {
  const buckets = { start, end, bucketMs: CHART_BUCKET_MS };
  return {
    chartPower: sampleAndHold(power, buckets),
    chartCurrent: sampleAndHold(current, buckets),
  };
}

/**
 * A smart plug can report small negative noise around zero. The card has always
 * drawn load from zero up, so such a reading must not stretch the axis below zero.
 */
function atLeastZero(points: SeriesPoint[]): SeriesPoint[] {
  return points.map((point) =>
    point.v !== null && point.v < 0 ? { ...point, v: 0 } : point,
  );
}

/** Readout power, as the card's `formatPower`: whole watts, kW with one decimal from 10 kW. */
function powerValue(value: number, hass: FormatHass | undefined): string {
  return Math.abs(value) >= 10_000
    ? formatHassNumber(hass, value / 1000, { maximumFractionDigits: 1, unit: "kW" })
    : formatHassNumber(hass, value, { digits: 0, unit: "W" });
}

/** Axis labels switch to kW once the axis reaches 10 kW, so the axis and readout agree. */
function powerAxisLabel(value: number, axis: NiceDomain, hass: FormatHass | undefined): string {
  if (Math.max(Math.abs(axis.min), Math.abs(axis.max)) >= 10_000) {
    return formatHassNumber(hass, value / 1000, { digits: stepDecimals(axis.step / 1000), unit: "kW" });
  }
  return formatHassNumber(hass, value, { digits: stepDecimals(axis.step), unit: "W" });
}

function peak(points: SeriesPoint[]): number | null {
  const values = points
    .map((point) => point.v)
    .filter((value): value is number => value !== null && Number.isFinite(value));
  return values.length ? Math.max(...values) : null;
}

export function powerChartOptions(
  data: Pick<OverviewData, "chartStart" | "chartEnd" | "chartPower" | "chartCurrent">,
  hass: FormatHass | undefined,
  variant: PowerChartVariant,
): TimeSeriesChartOptions {
  const powerPoints = atLeastZero(data.chartPower);
  const currentPoints = atLeastZero(data.chartCurrent);
  const peakPower = peak(powerPoints);
  const peakCurrent = peak(currentPoints);
  // Axis bounds include headroom; they are not measured peaks. Describe the
  // plotted samples separately, preserving missing data as unavailable.
  const description = [
    `Power and current for the last ${formatHassNumber(hass, (data.chartEnd - data.chartStart) / 3_600_000, { maximumFractionDigits: 1 })} hours.`,
    peakPower === null
      ? "Power unavailable."
      : `Highest plotted power ${formatHassNumber(hass, peakPower, { digits: 0 })} watts.`,
    peakCurrent === null
      ? "Current unavailable."
      : `Highest plotted current ${formatHassNumber(hass, peakCurrent, { maximumFractionDigits: 2 })} amps.`,
  ].join(" ");
  const power: ChartSeries = {
    id: "power",
    label: "Power",
    points: powerPoints,
    curve: "step",
    intervalMs: CHART_BUCKET_MS,
    format: (value) => powerValue(value, hass),
  };
  // Current is a second series, not a warning: it keeps the neutral secondary colour.
  const current: ChartSeries = {
    id: "current",
    label: "Current",
    points: currentPoints,
    curve: "step",
    intervalMs: CHART_BUCKET_MS,
    axis: "secondary",
    emphasis: "secondary",
    format: (value) => formatHassNumber(hass, value, { maximumFractionDigits: 2, unit: "A" }),
  };
  // A sensor that is not configured (or never reported) gets no legend entry;
  // with neither, both stay so the chart shows its empty state.
  const series = [
    ...(peakPower !== null ? [power] : []),
    ...(peakCurrent !== null ? [current] : []),
  ];
  return {
    id: powerChartId(variant),
    label: "Power and current",
    description,
    series: series.length ? series : [power, current],
    domain: { start: data.chartStart, end: data.chartEnd },
    height: powerChartHeight(variant),
    // No timeLabel: the library default (formatHassDateTime without the year)
    // follows the HA profile's locale, time zone and 12/24 h clock.
    hass,
    axes: {
      primary: {
        includeZero: true,
        minSpan: 100,
        format: (value, axis) => powerAxisLabel(value, axis, hass),
      },
      secondary: {
        includeZero: true,
        minSpan: 1,
        // The step's decimals on every label: 0.00 A, 0.25 A, 0.50 A, never 0.3 A.
        format: (value, axis) =>
          formatHassNumber(hass, value, { digits: stepDecimals(axis.step), unit: "A" }),
      },
    },
    // The window ends at the moment the history was read.
    nowMarker: false,
    emptyMessage: "No recorded power data for this period.",
  };
}
