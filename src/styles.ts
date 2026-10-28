import { css } from "lit";
import {
  componentStyles,
  dialogStyles,
  familyStyles,
  glowStyles,
  headerStyles,
  metricStyles,
  mediaDialogStyles,
  navigationStyles,
  telemetryStyles,
} from "@bitosome/ha-card-ui";

export const cardStyles = [
  familyStyles,
  headerStyles,
  metricStyles,
  navigationStyles,
  telemetryStyles,
  dialogStyles,
  mediaDialogStyles,
  glowStyles,
  componentStyles,
  css`
    :host {
      display: block;
      color: var(--primary-text-color, #1b1b1b);
      font-family: var(--family-font);
      scroll-margin-top: 56px;
    }
    :host([hidden]) {
      display: none;
    }
    * {
      box-sizing: border-box;
    }
    ha-card {
      display: block;
      padding: 12px;
      background: var(--family-surface);
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.08));
      border-radius: var(--ha-card-border-radius, 24px);
      /* Bound the activation halo at the dashboard card, never at a tile. */
      overflow: clip;
    }
    .outer {
      container-type: inline-size;
      min-width: 0;
    }
    .root {
      display: grid;
      gap: var(--large-gap);
      min-width: 0;
    }
    .panel {
      display: grid;
      gap: var(--large-gap);
      min-width: 0;
    }
    button {
      font: inherit;
      color: inherit;
      border: 0;
      cursor: pointer;
      touch-action: manipulation;
      -webkit-tap-highlight-color: transparent;
    }
    button:disabled {
      cursor: default;
      opacity: 0.45;
    }
    button:focus-visible,
    summary:focus-visible {
      outline: 3px solid var(--primary-color, var(--status-active-color));
      outline-offset: 3px;
    }
    ha-icon {
      display: inline-flex;
      width: 22px;
      height: 22px;
      --mdc-icon-size: 22px;
      flex: 0 0 22px;
    }

    /* Header ------------------------------------------------------------- */
    .family-brand {
      background: color-mix(in srgb, var(--primary-color) 11%, transparent);
      color: var(--primary-color);
    }
    .family-title-row {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 6px 8px;
      min-width: 0;
    }
    .family-title { margin: 0; }
    .status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: currentColor;
      flex: 0 0 6px;
    }
    .live-pill .status-dot {
      animation: statusPulse 2.4s ease-in-out infinite;
    }
    @keyframes statusPulse {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0.35;
      }
    }

    /* Notices ------------------------------------------------------------ */
    .notices {
      display: grid;
      gap: 8px;
    }

    /* Overview ----------------------------------------------------------- */
    .overview-grid {
      display: grid;
      gap: var(--large-gap);
      min-width: 0;
    }
    @container (min-width: 560px) {
      .overview-grid {
        grid-template-columns: minmax(0, 1.12fr) minmax(0, 1fr);
        align-items: stretch;
      }
    }
    .hero-wrap {
      min-width: 0;
    }
    .hero {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      gap: 0;
      padding: 20px;
      height: 100%;
      border-radius: var(--tile-border-radius, 16px);
    }
    .hero-top {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 10px;
      align-items: start;
      min-width: 0;
    }
    .hero-copy {
      min-width: 0;
    }
    .eyebrow {
      display: flex;
      align-items: center;
      gap: 6px;
      color: var(--secondary-text-color);
      font-size: 11.5px;
      font-weight: 650;
      line-height: 1.3;
    }
    .hero-task {
      margin: 5px 0 0;
      font-size: 21px;
      font-weight: 700;
      letter-spacing: -0.03em;
      line-height: 1.25;
      overflow-wrap: anywhere;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .hero-task.muted {
      color: var(--secondary-text-color);
      font-weight: 600;
      font-size: 18px;
    }
    .hero-progress-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 8px;
      margin-top: 12px;
    }
    .hero-percent {
      font-size: clamp(34px, 10cqw, 46px);
      line-height: 1;
      font-weight: 550;
      letter-spacing: -0.055em;
      font-variant-numeric: tabular-nums;
      color: var(--hero-accent, var(--status-active-color));
    }
    .hero-percent small {
      font-size: 16px;
      font-weight: 600;
      letter-spacing: 0;
      margin-left: 1px;
      opacity: 0.7;
    }
    .hero-eta {
      color: var(--secondary-text-color);
      font-size: 11.5px;
      line-height: 1.35;
      text-align: right;
      overflow-wrap: anywhere;
    }
    .progress-track {
      height: 7px;
      margin-top: 9px;
      border-radius: 999px;
      background: color-mix(
        in srgb,
        var(--primary-text-color) 8%,
        transparent
      );
      overflow: hidden;
    }
    .progress-track > span {
      display: block;
      height: 100%;
      border-radius: inherit;
      background: var(--hero-accent, var(--status-active-color));
      transition: width 0.35s ease;
    }
    .hero-meta {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 4px 12px;
      margin-top: 9px;
      color: var(--secondary-text-color);
      font-size: 11.5px;
      line-height: 1.45;
      font-variant-numeric: tabular-nums;
    }
    .hero-meta span {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      min-width: 0;
      overflow-wrap: anywhere;
    }
    .hero-art {
      position: relative;
      width: 84px;
      height: 84px;
      flex: 0 0 84px;
      border-radius: 14px;
      overflow: hidden;
      background: color-mix(
        in srgb,
        var(--primary-text-color) 5%,
        transparent
      );
      border: 1px solid
        color-mix(in srgb, var(--primary-text-color) 8%, transparent);
      display: grid;
      place-items: center;
      color: var(--secondary-text-color);
    }
    .hero-art img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.2s ease;
    }
    button.hero-art {
      padding: 0;
      cursor: pointer;
    }
    .hero-art-expand {
      position: absolute;
      right: 5px;
      bottom: 5px;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      color: #fff;
      background: rgba(5, 8, 12, 0.58);
      backdrop-filter: blur(4px);
    }
    .hero-art-expand ha-icon {
      width: 13px;
      height: 13px;
      --mdc-icon-size: 13px;
      opacity: 1;
    }
    @media (hover: hover) {
      button.hero-art:hover img {
        transform: scale(1.04);
      }
    }
    .hero-art > ha-icon {
      width: 28px;
      height: 28px;
      --mdc-icon-size: 28px;
      opacity: 0.65;
    }
    .cost-panel {
      margin-top: auto;
      padding-top: 14px;
    }
    .cost-button {
      display: grid;
      grid-template-columns: 34px minmax(0, 1fr) 18px;
      align-items: center;
      gap: 10px;
      width: 100%;
      min-height: 58px;
      padding: 10px;
      border-radius: 13px;
      background: color-mix(
        in srgb,
        var(--primary-text-color) 4%,
        transparent
      );
      text-align: start;
    }
    @media (hover: hover) {
    .cost-button:hover {
      background: color-mix(
        in srgb,
        var(--primary-text-color) 7%,
        transparent
      );
    }
    }
    .cost-icon {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      color: var(--status-active-color);
      background: color-mix(
        in srgb,
        var(--status-active-color) 12%,
        transparent
      );
    }
    .cost-icon ha-icon {
      width: 19px;
      height: 19px;
      --mdc-icon-size: 19px;
    }
    .cost-copy {
      min-width: 0;
      display: grid;
      gap: 1px;
    }
    .cost-label {
      font-size: 12px;
      color: var(--secondary-text-color);
      line-height: 1.3;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .cost-value {
      font-size: 17px;
      font-weight: 650;
      letter-spacing: -0.02em;
      line-height: 1.25;
      font-variant-numeric: tabular-nums;
    }
    .cost-value.muted {
      font-size: 13px;
      font-weight: 600;
      color: var(--secondary-text-color);
      letter-spacing: 0;
    }
    .cost-note {
      font-size: 12px;
      color: var(--secondary-text-color);
      line-height: 1.35;
      overflow-wrap: anywhere;
    }
    .cost-chevron {
      width: 18px;
      height: 18px;
      --mdc-icon-size: 18px;
      color: var(--secondary-text-color);
      opacity: 0.7;
    }

    /* Camera ------------------------------------------------------------- */
    .camera-tile {
      position: relative;
      z-index: 1;
      padding: 8px;
      border-radius: var(--tile-border-radius, 16px);
      min-width: 0;
    }
    .camera-frame {
      position: relative;
      aspect-ratio: 16 / 9;
      width: 100%;
      overflow: hidden;
      border-radius: 12px;
      background: #0b0e14;
    }
    .camera-frame:is(:fullscreen, :-webkit-full-screen) {
      width: 100vw;
      height: 100vh;
      height: 100dvh;
      aspect-ratio: auto;
      border-radius: 0;
    }
    .camera-frame:is(:fullscreen, :-webkit-full-screen) .camera-overlay {
      inset: max(8px, var(--safe-area-inset-top, 0px), env(safe-area-inset-top, 0px)) max(8px, var(--safe-area-inset-right, 0px), env(safe-area-inset-right, 0px)) auto max(8px, var(--safe-area-inset-left, 0px), env(safe-area-inset-left, 0px));
    }
    .camera-viewport,
    .camera-media {
      position: absolute;
      inset: 0;
      overflow: hidden;
    }
    .camera-media {
      transform-origin: center;
    }
    .camera-expanded .camera-viewport {
      touch-action: none;
    }
    .family-dialog.media .camera-tile {
      height: 100%;
      padding: 0;
      border-radius: 0;
    }
    .family-dialog.media .camera-frame {
      height: 100%;
      aspect-ratio: auto;
      border-radius: 0;
    }
    .camera-expanded .camera-image {
      object-fit: contain;
    }
    .camera-zoom-reset {
      position: absolute;
      bottom: max(8px, var(--safe-area-inset-bottom, 0px), env(safe-area-inset-bottom, 0px));
      left: max(8px, var(--safe-area-inset-left, 0px), env(safe-area-inset-left, 0px));
      z-index: 2;
      min-width: 44px;
      min-height: 44px;
      padding: 0 12px;
      border-radius: 12px;
      color: #fff;
      background: rgba(5, 8, 12, 0.72);
      font: inherit;
      font-weight: 650;
    }
    .camera-frame ha-camera-stream,
    .camera-frame ha-web-rtc-player,
    .camera-frame .camera-image {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border: 0;
    }
    .camera-placeholder {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      gap: 8px;
      padding: 16px;
      text-align: center;
      color: rgba(255, 255, 255, 0.62);
      background:
        radial-gradient(
          circle at 50% 35%,
          rgba(66, 165, 245, 0.18),
          transparent 60%
        ),
        linear-gradient(160deg, #141a24, #090b10);
      font-size: 11.5px;
      line-height: 1.5;
    }
    .camera-placeholder ha-icon {
      width: 30px;
      height: 30px;
      --mdc-icon-size: 30px;
      opacity: 0.65;
    }
    .camera-overlay {
      position: absolute;
      inset: 8px 8px auto 8px;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 8px;
      pointer-events: none;
      z-index: 2;
    }
    .live-pill {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      min-height: 24px;
      padding: 3px 8px;
      border-radius: 999px;
      background: rgba(5, 8, 12, 0.72);
      color: #fff;
      font-size: 12px;
      font-weight: 650;
      letter-spacing: 0.01em;
      backdrop-filter: blur(6px);
    }
    .live-pill .status-dot {
      background: var(--status-alert-color, #e53935);
    }
    .snapshot-pill {
      color: rgba(255, 255, 255, 0.86);
      font-weight: 600;
    }
    .camera-actions {
      display: flex;
      align-items: center;
      gap: 6px;
      pointer-events: auto;
    }
    .camera-fullscreen {
      pointer-events: auto;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      color: #fff;
      background: rgba(5, 8, 12, 0.6);
      backdrop-filter: blur(6px);
    }
    .camera-fullscreen ha-icon {
      width: 21px;
      height: 21px;
      --mdc-icon-size: 21px;
    }
    .camera-caption {
      position: absolute;
      inset: auto 8px 8px 8px;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      pointer-events: none;
      color: rgba(255, 255, 255, 0.72);
      font-size: 12px;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
    }

    /* Metrics ------------------------------------------------------------ */
    .metrics {
      --family-metric-columns: 2;
    }
    @container (min-width: 560px) {
      .metrics {
        --family-metric-columns: 4;
      }
    }
    /* Shared metric geometry, with one printer-specific target/hint row. */
    .metric { text-align: start; }
    .metric-sub {
      font-size: 12px;
      line-height: 1.35;
      color: var(--secondary-text-color);
      font-variant-numeric: tabular-nums;
      overflow-wrap: anywhere;
    }

    /* Telemetry ---------------------------------------------------------- */
    .telemetry { --family-telemetry-columns: 2; }
    .telemetry-cell:nth-child(2n) { border-inline-end: 0; }
    @container (min-width: 560px) {
      .telemetry { --family-telemetry-columns: 4; }
      .telemetry-cell:nth-child(2) { border-inline-end: 1px solid var(--divider-color); }
    }

    /* Chart -------------------------------------------------------------- */
    .chart-panel {
      position: relative;
      z-index: 1;
      padding: 10px 10px 6px;
      border-radius: var(--tile-border-radius, 16px);
      min-width: 0;
    }
    .chart-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      width: 100%;
      min-height: 44px;
      padding: 2px 4px 4px;
      background: transparent;
      text-align: start;
    }
    .chart-head-copy {
      display: grid;
      gap: 2px;
      min-width: 0;
    }
    .chart-title {
      font-size: 12.5px;
      font-weight: 650;
      line-height: 1.3;
      letter-spacing: -0.01em;
    }
    .chart-sub {
      font-size: 11px;
      color: var(--secondary-text-color);
      line-height: 1.35;
      font-variant-numeric: tabular-nums;
      overflow-wrap: anywhere;
    }
    .chart-head ha-icon {
      color: var(--secondary-text-color);
      width: 20px;
      height: 20px;
      --mdc-icon-size: 20px;
      flex: 0 0 20px;
    }
    .chart-skeleton {
      height: 120px;
      border-radius: 10px;
      margin-bottom: 4px;
      background: linear-gradient(
        100deg,
        color-mix(in srgb, var(--primary-text-color) 4%, transparent) 30%,
        color-mix(in srgb, var(--primary-text-color) 8%, transparent) 50%,
        color-mix(in srgb, var(--primary-text-color) 4%, transparent) 70%
      );
      background-size: 200% 100%;
      animation: chartShimmer 1.6s ease-in-out infinite;
    }
    @keyframes chartShimmer {
      0% {
        background-position: 130% 0;
      }
      100% {
        background-position: -30% 0;
      }
    }
    .chart-error {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      min-height: 60px;
      padding: 10px 8px;
      color: var(--secondary-text-color);
      font-size: 11.5px;
      line-height: 1.5;
    }
    .text-button {
      min-height: 44px;
      padding: 8px 10px;
      border-radius: 10px;
      background: transparent;
      color: var(--primary-color, var(--status-active-color));
      font-size: 12px;
      font-weight: 600;
    }

    /* AMS ---------------------------------------------------------------- */
    .ams-section {
      display: grid;
      gap: 10px;
      min-width: 0;
    }
    .section-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 2px 6px 0;
      min-width: 0;
    }
    .section-title h2,
    .section-title h3 {
      margin: 0;
      font-size: 15px;
      font-weight: 650;
      letter-spacing: -0.02em;
      line-height: 1.3;
    }
    .section-chip {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      min-height: 24px;
      padding: 3px 8px;
      border-radius: 999px;
      color: var(--secondary-text-color);
      background: color-mix(
        in srgb,
        var(--primary-text-color) 6%,
        transparent
      );
      font-size: 12px;
      font-weight: 600;
      line-height: 1.3;
      white-space: nowrap;
    }
    .ams-grid {
      display: grid;
      gap: var(--large-gap);
      min-width: 0;
    }
    @container (min-width: 560px) {
      .ams-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        align-items: start;
      }
    }
    .ams-card {
      position: relative;
      z-index: 1;
      padding: 13px;
      border-radius: var(--tile-border-radius, 16px);
      min-width: 0;
    }
    .ams-head {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 5px 8px;
      min-width: 0;
    }
    .ams-name {
      font-size: 13px;
      font-weight: 650;
      line-height: 1.3;
    }
    .ams-state {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      color: var(--status-active-color);
      font-size: 10px;
      font-weight: 650;
      line-height: 1.3;
    }
    .ams-state .status-dot {
      width: 5px;
      height: 5px;
      flex: 0 0 5px;
    }
    .ams-env {
      margin-left: auto;
      color: var(--secondary-text-color);
      font-size: 12px;
      line-height: 1.35;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }
    .ams-drying {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      min-height: 22px;
      margin-top: 7px;
      padding: 2px 7px;
      border-radius: 999px;
      color: var(--status-warn-color);
      background: color-mix(
        in srgb,
        var(--status-warn-color) 11%,
        transparent
      );
      font-size: 10px;
      font-weight: 600;
      line-height: 1.3;
    }
    .trays {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 7px;
      margin-top: 10px;
    }
    .tray {
      position: relative;
      display: grid;
      grid-template-columns: 26px minmax(0, 1fr);
      align-items: center;
      gap: 8px;
      min-height: 64px;
      padding: 8px;
      border-radius: 11px;
      border: 1px solid
        color-mix(in srgb, var(--primary-text-color) 6%, transparent);
      background: color-mix(
        in srgb,
        var(--primary-text-color) 2.5%,
        transparent
      );
      text-align: start;
      color: inherit;
      min-width: 0;
    }
    .tray.active {
      border-color: color-mix(
        in srgb,
        var(--status-active-color) 52%,
        transparent
      );
      background: color-mix(
        in srgb,
        var(--status-active-color) 7%,
        transparent
      );
    }
    .tray.empty {
      opacity: 0.55;
    }
    @media (hover: hover) {
    .tray:hover {
      background: color-mix(
        in srgb,
        var(--primary-text-color) 6%,
        transparent
      );
    }
    }
    .tray-swatch {
      width: 26px;
      height: 26px;
      border-radius: 7px;
      border: 1px solid rgba(0, 0, 0, 0.18);
      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.16);
      flex: 0 0 26px;
      background-color: color-mix(
        in srgb,
        var(--primary-text-color) 12%,
        transparent
      );
    }
    .tray-swatch.none {
      background-image: repeating-linear-gradient(
        45deg,
        transparent 0 4px,
        rgba(127, 127, 127, 0.25) 4px 6px
      );
    }
    .tray-copy {
      display: grid;
      gap: 2px;
      min-width: 0;
    }
    .tray-name {
      font-size: 11.5px;
      font-weight: 600;
      line-height: 1.3;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .tray-meta {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 10px;
      line-height: 1.35;
      color: var(--secondary-text-color);
      font-variant-numeric: tabular-nums;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .tray-meta .active-label {
      color: var(--status-active-color);
      font-weight: 650;
    }
    .tray-bar {
      grid-column: 1 / -1;
      height: 3px;
      margin-top: 1px;
      border-radius: 999px;
      overflow: hidden;
      background: color-mix(
        in srgb,
        var(--primary-text-color) 8%,
        transparent
      );
    }
    .tray-bar > span {
      display: block;
      height: 100%;
      border-radius: inherit;
      background: color-mix(
        in srgb,
        var(--primary-text-color) 38%,
        transparent
      );
    }
    .external-card {
      padding: 13px;
    }
    .external-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 7px;
      margin-top: 10px;
    }

    /* AMS summary and page ---------------------------------------------- */
    .ams-summary {
      display: grid;
      gap: 8px;
      min-width: 0;
    }
    .ams-all {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      min-height: 44px;
      padding: 8px 6px 8px 10px;
      border-radius: 9px;
      background: transparent;
      color: var(--primary-color, var(--status-active-color));
      font-size: 11.5px;
      font-weight: 600;
    }
    .ams-all ha-icon {
      width: 18px;
      height: 18px;
      --mdc-icon-size: 18px;
    }
    .ams-summary-grid {
      display: grid;
      gap: 8px;
      min-width: 0;
    }
    @container (min-width: 560px) {
      .ams-summary-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
    .ams-summary-tile {
      position: relative;
      z-index: 1;
      display: grid;
      gap: 7px;
      min-height: 92px;
      padding: 12px;
      border: 1px solid
        color-mix(in srgb, var(--primary-text-color) 6%, transparent);
      border-radius: var(--tile-border-radius, 14px);
      text-align: start;
      color: inherit;
      cursor: pointer;
    }
    @media (hover: hover) {
      .ams-summary-tile:hover {
        background: color-mix(
          in srgb,
          var(--primary-text-color) 5%,
          var(--family-tile)
        );
      }
    }
    .ams-summary-head {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 5px 8px;
      min-width: 0;
    }
    .ams-summary-head .ams-name {
      font-size: 12.5px;
    }
    .ams-summary-tray {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
    }
    .ams-summary-tray .tray-swatch {
      width: 24px;
      height: 24px;
      flex: 0 0 24px;
      border-radius: 7px;
    }
    .ams-summary-copy {
      display: grid;
      gap: 1px;
      min-width: 0;
    }
    .ams-summary-copy strong {
      font-size: 11.5px;
      font-weight: 600;
      line-height: 1.3;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .ams-summary-copy small {
      color: var(--secondary-text-color);
      font-size: 10px;
      line-height: 1.35;
      font-variant-numeric: tabular-nums;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .ams-summary-dots {
      display: flex;
      align-items: center;
      gap: 5px;
      min-width: 0;
    }
    .ams-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.2);
      background-color: color-mix(
        in srgb,
        var(--primary-text-color) 12%,
        transparent
      );
      flex: 0 0 10px;
    }
    .ams-dot.none {
      background-image: repeating-linear-gradient(
        45deg,
        transparent 0 2px,
        rgba(127, 127, 127, 0.3) 2px 4px
      );
    }
    .ams-dot.active {
      outline: 2px solid var(--status-active-color);
      outline-offset: 1px;
    }
    .ams-dot.empty {
      opacity: 0.35;
    }
    .ams-summary-loaded {
      margin-left: auto;
      color: var(--secondary-text-color);
      font-size: 10px;
      line-height: 1.3;
      white-space: nowrap;
    }
    .ams-page {
      display: grid;
      gap: 10px;
      min-width: 0;
    }

    /* Image preview ------------------------------------------------------ */
    .preview-dialog {
      display: grid;
      gap: 10px;
      min-width: 0;
    }
    .preview-large {
      display: block;
      width: 100%;
      height: auto;
      max-height: 70vh;
      object-fit: contain;
      border-radius: 12px;
      background: color-mix(
        in srgb,
        var(--primary-text-color) 4%,
        transparent
      );
    }
    .preview-caption {
      margin: 0;
      color: var(--secondary-text-color);
      font-size: 11.5px;
      line-height: 1.5;
      overflow-wrap: anywhere;
    }

    /* Dialog ------------------------------------------------------------- */
    .family-dialog-body {
      container-type: inline-size;
    }
    .modal-content {
      display: grid;
      gap: var(--large-gap);
      min-width: 0;
    }
    .dialog-intro {
      display: grid;
      justify-items: start;
      gap: 6px;
      padding: 0 4px;
    }
    .dialog-intro p {
      margin: 0;
      font-size: 12px;
      line-height: 1.6;
      color: var(--secondary-text-color);
    }
    .group {
      padding: 16px;
      border-radius: var(--tile-border-radius, 16px);
      min-width: 0;
    }
    .group h3 {
      margin: 0 0 10px;
      font-size: 12.5px;
      font-weight: 650;
      line-height: 1.3;
    }
    .rows {
      display: grid;
      gap: 0;
    }
    .data-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      width: 100%;
      min-height: 44px;
      padding: 7px 0;
      border-bottom: 1px solid
        color-mix(in srgb, var(--primary-text-color) 7%, transparent);
      background: transparent;
      text-align: start;
      color: inherit;
      font-size: 12px;
      line-height: 1.45;
    }
    .data-row:last-child {
      border-bottom: 0;
    }
    .data-row span {
      color: var(--secondary-text-color);
      min-width: 0;
      overflow-wrap: anywhere;
    }
    .data-row b {
      text-align: right;
      font-weight: 550;
      max-width: 62%;
      overflow-wrap: anywhere;
      font-variant-numeric: tabular-nums;
    }
    .data-row ha-icon {
      width: 16px;
      height: 16px;
      --mdc-icon-size: 16px;
      flex: 0 0 16px;
      color: var(--secondary-text-color);
      opacity: 0.6;
    }
    .hint {
      margin: 0;
      padding: 0 6px;
      font-size: 11.5px;
      line-height: 1.6;
      color: var(--secondary-text-color);
    }
    .hint strong {
      color: var(--primary-text-color);
      font-weight: 600;
    }
    .stat-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }
    .stat {
      display: grid;
      gap: 4px;
      min-height: 82px;
      padding: 12px;
      border-radius: 12px;
      background: color-mix(
        in srgb,
        var(--primary-text-color) 3%,
        transparent
      );
      border: 1px solid
        color-mix(in srgb, var(--primary-text-color) 6%, transparent);
      min-width: 0;
    }
    .stat-label {
      font-size: 12px;
      line-height: 1.3;
      color: var(--secondary-text-color);
    }
    .stat-value {
      align-self: end;
      font-size: 20px;
      font-weight: 650;
      letter-spacing: -0.03em;
      line-height: 1.15;
      font-variant-numeric: tabular-nums;
      overflow-wrap: anywhere;
    }
    .stat-sub {
      font-size: 10px;
      line-height: 1.3;
      color: var(--secondary-text-color);
    }
    .history-chart {
      padding: 10px;
      border-radius: var(--tile-border-radius, 16px);
      min-width: 0;
    }
    .history-chart-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 2px 4px 6px;
    }
    .history-chart-head strong {
      font-size: 12.5px;
      font-weight: 650;
    }
    .history-chart-head span {
      color: var(--secondary-text-color);
      font-size: 12px;
    }
    .history-list {
      display: grid;
      gap: 8px;
      min-width: 0;
    }
    .print-record {
      border-radius: 12px;
      border: 1px solid
        color-mix(in srgb, var(--primary-text-color) 7%, transparent);
      background: color-mix(
        in srgb,
        var(--primary-text-color) 2.5%,
        transparent
      );
      overflow: hidden;
    }
    .print-record[data-tone="accent"] {
      --record-tone: var(--status-active-color);
    }
    .print-record[data-tone="success"] {
      --record-tone: var(--status-success-color);
    }
    .print-record[data-tone="warning"] {
      --record-tone: var(--status-warn-color);
    }
    .print-record[data-tone="error"] {
      --record-tone: var(--status-alert-color);
    }
    .print-record summary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      min-height: 60px;
      padding: 10px 12px;
      cursor: pointer;
      list-style: none;
    }
    .print-record summary::-webkit-details-marker {
      display: none;
    }
    .record-copy,
    .record-value {
      display: grid;
      gap: 2px;
      min-width: 0;
    }
    .record-copy {
      flex: 1;
    }
    .record-copy strong {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12.5px;
      font-weight: 650;
      line-height: 1.35;
      overflow-wrap: anywhere;
    }
    .record-copy strong .status-dot {
      width: 6px;
      height: 6px;
      flex: 0 0 6px;
      background: var(--record-tone, var(--secondary-text-color));
    }
    .record-copy small,
    .record-value small {
      font-size: 12px;
      line-height: 1.4;
      color: var(--secondary-text-color);
      font-variant-numeric: tabular-nums;
      overflow-wrap: anywhere;
    }
    .record-value {
      text-align: right;
      flex: 0 0 auto;
    }
    .record-value strong {
      font-size: 14px;
      font-weight: 650;
      line-height: 1.3;
      font-variant-numeric: tabular-nums;
    }
    .record-details {
      display: grid;
      gap: 5px;
      padding: 0 12px 12px;
      border-top: 1px solid
        color-mix(in srgb, var(--primary-text-color) 7%, transparent);
      color: var(--secondary-text-color);
      font-size: 11px;
      line-height: 1.5;
    }
    .record-details p {
      margin: 6px 0 0;
    }
    .record-details .warn {
      color: var(--status-warn-color);
    }
    .record-details .error {
      color: var(--status-alert-color);
    }
    .empty-state {
      display: grid;
      gap: 8px;
      padding: 18px;
      border-radius: var(--tile-border-radius, 16px);
      text-align: center;
      background: color-mix(
        in srgb,
        var(--primary-text-color) 3%,
        transparent
      );
      color: var(--secondary-text-color);
      font-size: 12px;
      line-height: 1.6;
    }
    .empty-state strong {
      color: var(--primary-text-color);
      font-size: 13px;
      font-weight: 650;
    }
    .dialog-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      width: 100%;
      flex-wrap: wrap;
    }
    .dialog-footer small {
      color: var(--secondary-text-color);
      font-size: 12px;
      line-height: 1.4;
    }
    .family-dialog-header h2 {
      overflow-wrap: anywhere;
    }
    .family-dialog-header h2:focus,
    .family-dialog-header h2:focus-visible {
      outline: none;
    }
    .group.collapsible {
      padding: 0;
    }
    .group.collapsible > summary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      min-height: 52px;
      padding: 0 16px;
      list-style: none;
      cursor: pointer;
    }
    .group.collapsible > summary::-webkit-details-marker {
      display: none;
    }
    .group.collapsible > summary h3 {
      margin: 0;
    }
    .group.collapsible > summary ha-icon {
      width: 20px;
      height: 20px;
      --mdc-icon-size: 20px;
      color: var(--secondary-text-color);
      transition: transform 0.2s ease;
    }
    .group.collapsible[open] > summary {
      border-bottom: 1px solid
        color-mix(in srgb, var(--primary-text-color) 7%, transparent);
    }
    .group.collapsible[open] > summary ha-icon {
      transform: rotate(180deg);
    }
    .group.collapsible > .rows {
      padding: 0 16px 12px;
    }

    /* Setup / error ------------------------------------------------------ */
    .setup {
      display: grid;
      gap: 10px;
      padding: 24px 18px;
      text-align: center;
      justify-items: center;
    }
    .setup ha-icon {
      width: 34px;
      height: 34px;
      --mdc-icon-size: 34px;
      color: var(--secondary-text-color);
    }
    .setup h2 {
      margin: 0;
      font-size: 18px;
      letter-spacing: -0.02em;
    }
    .setup p {
      margin: 0;
      max-width: 44ch;
      color: var(--secondary-text-color);
      font-size: 12px;
      line-height: 1.65;
    }
    .setup code {
      font-size: 11px;
      padding: 2px 5px;
      border-radius: 5px;
      background: color-mix(
        in srgb,
        var(--primary-text-color) 7%,
        transparent
      );
    }

    /* Responsive --------------------------------------------------------- */
    @container (max-width: 420px) {
      .hero {
        padding: 16px;
      }
      .hero-art {
        width: 68px;
        height: 68px;
        flex-basis: 68px;
      }
      .cost-label {
        white-space: normal;
      }
      .stat-value {
        font-size: 18px;
      }
    }
    @container (max-width: 340px) {
      .hero-art {
        width: 56px;
        height: 56px;
        flex-basis: 56px;
      }
      .hero-task {
        font-size: 19px;
      }
      .hero-percent {
        font-size: 34px;
      }
      .trays,
      .external-grid {
        grid-template-columns: minmax(0, 1fr);
      }
      .tray {
        min-height: 58px;
      }
      .data-row b {
        max-width: 55%;
      }
      .stat-grid {
        grid-template-columns: minmax(0, 1fr);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        animation: none !important;
        transition: none !important;
        scroll-behavior: auto !important;
      }
    }
  `,
];
