/**
 * A small, dependency-free power/current chart.
 *
 * It renders in its own shadow root and measures its width so SVG units stay
 * close to CSS pixels: labels remain crisp and the line weights stay stable
 * across a phone and a wide dashboard card.
 */
import { LitElement, css, html, nothing, svg } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  formatClock,
  formatNumber,
  type FormatContext,
} from "./model";
import type { ChartBucket } from "./types";

const PAD = { left: 38, right: 36, top: 18, bottom: 22 };

function niceMax(value: number, minimum: number): number {
  if (!Number.isFinite(value) || value <= 0) return minimum;
  const padded = value * 1.12;
  const magnitude = Math.pow(10, Math.floor(Math.log10(padded)));
  const normalized = padded / magnitude;
  const step = normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10;
  return Math.max(minimum, step * magnitude);
}

interface Segment {
  line: string;
  area: string;
  points: { x: number; y: number }[];
}

@customElement("bambu-print-chart")
export class BambuPrintChart extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-width: 0;
      color: var(--primary-text-color, #1b1b1b);
    }
    .legend {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 12px;
      padding: 0 2px 4px;
      color: var(--secondary-text-color);
      font-size: 11px;
      line-height: 1.4;
    }
    .legend span {
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }
    .legend i {
      width: 14px;
      height: 3px;
      border-radius: 999px;
      display: inline-block;
    }
    .legend .power i {
      background: var(--status-active-color, #42a5f5);
    }
    .legend .current i {
      background: var(--status-warn-color, #ff9800);
    }
    .legend .gap {
      margin-left: auto;
      opacity: 0.75;
    }
    svg {
      display: block;
      width: 100%;
      height: auto;
      overflow: visible;
    }
    .grid {
      stroke: var(--divider-color, rgba(0, 0, 0, 0.08));
      stroke-width: 1;
    }
    .axis {
      fill: var(--secondary-text-color, #6b6b6b);
      font-size: 10px;
      font-family: var(--ha-font-family-body, sans-serif);
    }
    .axis.unit {
      font-size: 9px;
      opacity: 0.75;
    }
    .power-area {
      fill: var(--status-active-color, #42a5f5);
      fill-opacity: 0.13;
      stroke: none;
    }
    .power-line {
      fill: none;
      stroke: var(--status-active-color, #42a5f5);
      stroke-width: 2;
      stroke-linejoin: round;
      stroke-linecap: round;
    }
    .current-line {
      fill: none;
      stroke: var(--status-warn-color, #ff9800);
      stroke-width: 1.5;
      stroke-linejoin: round;
      stroke-linecap: round;
      opacity: 0.9;
    }
    .empty {
      display: grid;
      place-items: center;
      min-height: 110px;
      padding: 16px;
      color: var(--secondary-text-color);
      font-size: 12px;
      text-align: center;
    }
    @media (prefers-reduced-motion: reduce) {
      * {
        transition: none !important;
        animation: none !important;
      }
    }
  `;

  @property({ attribute: false }) buckets: ChartBucket[] = [];
  @property({ attribute: false }) start = 0;
  @property({ attribute: false }) end = 0;
  @property({ attribute: false }) context: FormatContext = {};
  @property({ type: Number }) height = 120;
  @property({ type: Boolean }) compact = false;
  @state() private width = 360;

  private observer?: ResizeObserver;

  connectedCallback(): void {
    super.connectedCallback();
    if (typeof ResizeObserver !== "undefined") {
      this.observer = new ResizeObserver((entries) => {
        const next = entries[0]?.contentRect.width;
        if (next && Math.abs(next - this.width) > 1) this.width = next;
      });
      this.observer.observe(this);
    }
  }

  disconnectedCallback(): void {
    this.observer?.disconnect();
    this.observer = undefined;
    super.disconnectedCallback();
  }

  private segments(
    value: (bucket: ChartBucket) => number | null,
    x: (time: number) => number,
    y: (value: number) => number,
    baseline: number,
  ): Segment[] {
    const result: Segment[] = [];
    let current: { x: number; y: number }[] = [];
    const flush = () => {
      if (!current.length) return;
      const line = current
        .map((point, index) => `${index ? "L" : "M"}${point.x.toFixed(1)},${point.y.toFixed(1)}`)
        .join("");
      const first = current[0];
      const last = current[current.length - 1];
      const area = `M${first.x.toFixed(1)},${baseline.toFixed(1)}${current
        .map((point) => `L${point.x.toFixed(1)},${point.y.toFixed(1)}`)
        .join("")}L${last.x.toFixed(1)},${baseline.toFixed(1)}Z`;
      result.push({ line, area, points: current });
      current = [];
    };
    for (const bucket of this.buckets) {
      const valueAt = value(bucket);
      if (valueAt === null || !Number.isFinite(valueAt)) {
        flush();
        continue;
      }
      current.push({ x: x(bucket.t), y: y(valueAt) });
    }
    flush();
    return result;
  }

  render() {
    const width = Math.max(240, Math.round(this.width || 360));
    const height = Math.max(96, this.height);
    const start = this.start;
    const end = this.end;
    const hasPower = this.buckets.some(
      (bucket) => bucket.power !== null && Number.isFinite(bucket.power),
    );
    const hasCurrent = this.buckets.some(
      (bucket) => bucket.current !== null && Number.isFinite(bucket.current),
    );
    if (!this.buckets.length || !(end > start) || (!hasPower && !hasCurrent)) {
      return html`<div class="empty">No recorded power data for this period.</div>`;
    }

    const chartWidth = width - PAD.left - PAD.right;
    const chartHeight = height - PAD.top - PAD.bottom;
    // Axis bounds include headroom; they are not measured peaks. Describe the
    // plotted samples separately, preserving missing data as unavailable.
    const peak = (key: "power" | "current"): number | null => {
      const values = this.buckets
        .map((bucket) => bucket[key])
        .filter((value): value is number => value !== null && Number.isFinite(value));
      return values.length ? Math.max(...values) : null;
    };
    const peakPower = peak("power");
    const peakCurrent = peak("current");
    const maxPower = niceMax(peakPower ?? 0, 100);
    const maxCurrent = niceMax(peakCurrent ?? 0, 1);
    const summary = [
      `Power and current for the last ${formatNumber((end - start) / 3_600_000, 1, this.context)} hours.`,
      peakPower === null
        ? "Power unavailable."
        : `Highest plotted power ${formatNumber(peakPower, 0, this.context)} watts.`,
      peakCurrent === null
        ? "Current unavailable."
        : `Highest plotted current ${formatNumber(peakCurrent, 2, this.context)} amps.`,
    ].join(" ");
    const x = (time: number) =>
      PAD.left + ((time - start) / (end - start)) * chartWidth;
    const yPower = (value: number) =>
      PAD.top + (1 - Math.max(0, value) / maxPower) * chartHeight;
    const yCurrent = (value: number) =>
      PAD.top + (1 - Math.max(0, value) / maxCurrent) * chartHeight;
    const baseline = PAD.top + chartHeight;
    const powerSegments = this.segments(
      (bucket) => bucket.power,
      x,
      yPower,
      baseline,
    );
    const currentSegments = this.segments(
      (bucket) => bucket.current,
      x,
      yCurrent,
      baseline,
    );

    const times = this.compact
      ? [start, start + (end - start) / 2, end]
      : [start, start + (end - start) / 3, start + (2 * (end - start)) / 3, end];
    const labelAnchor = (index: number) =>
      index === 0 ? "start" : index === times.length - 1 ? "end" : "middle";

    return html`
      <div class="legend">
        <span class="power"><i></i>Power</span>
        <span class="current"><i></i>Current</span>
        ${this.buckets.some(
          (bucket) => bucket.power === null && bucket.current === null,
        )
          ? html`<span class="gap">gaps where data is missing</span>`
          : nothing}
      </div>
      <svg
        viewBox="0 0 ${width} ${height}"
        role="img"
        aria-label=${summary}
      >
        ${[0, 0.5, 1].map(
          (fraction) => svg`<line
            class="grid"
            x1=${PAD.left}
            x2=${width - PAD.right}
            y1=${PAD.top + chartHeight * fraction}
            y2=${PAD.top + chartHeight * fraction}
          ></line>`,
        )}
        ${powerSegments.map(
          (segment) => svg`<path class="power-area" d=${segment.area}></path>`,
        )}
        ${powerSegments.map(
          (segment) => svg`<path class="power-line" d=${segment.line}></path>`,
        )}
        ${currentSegments.map(
          (segment) => svg`<path class="current-line" d=${segment.line}></path>`,
        )}
        <text class="axis" x=${PAD.left - 6} y=${PAD.top + 4} text-anchor="end">
          ${formatNumber(maxPower, 0, this.context)}
        </text>
        <text class="axis" x=${PAD.left - 6} y=${baseline + 4} text-anchor="end">
          0
        </text>
        <text class="axis unit" x=${PAD.left - 6} y=${PAD.top + 15} text-anchor="end">
          W
        </text>
        <text
          class="axis"
          x=${width - PAD.right + 6}
          y=${PAD.top + 4}
          text-anchor="start"
        >
          ${formatNumber(maxCurrent, 1, this.context)}
        </text>
        <text
          class="axis"
          x=${width - PAD.right + 6}
          y=${baseline + 4}
          text-anchor="start"
        >
          0
        </text>
        <text
          class="axis unit"
          x=${width - PAD.right + 6}
          y=${PAD.top + 15}
          text-anchor="start"
        >
          A
        </text>
        ${times.map(
          (time, index) => svg`<text
            class="axis"
            x=${x(time)}
            y=${height - 5}
            text-anchor=${labelAnchor(index)}
          >
            ${formatClock(time, this.context)}
          </text>`,
        )}
      </svg>
    `;
  }
}
