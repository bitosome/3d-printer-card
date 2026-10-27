import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import {
  MAX_HISTORY_DAYS,
  clampHistoryDays,
  validateConfig,
} from "./model";
import type { CardConfig, HomeAssistant } from "./types";

@customElement("bambu-printer-card-editor")
export class BambuPrinterCardEditor extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--ha-font-family-body, sans-serif);
      color: var(--primary-text-color);
    }
    .editor {
      display: grid;
      gap: 16px;
      padding: 4px 0 10px;
    }
    .intro,
    .note {
      margin: 0;
      color: var(--secondary-text-color);
      font-size: 12px;
      line-height: 1.55;
    }
    .field {
      display: grid;
      gap: 6px;
      min-width: 0;
    }
    .field > label,
    .field-label {
      font-size: 13px;
      font-weight: 600;
      line-height: 1.35;
    }
    .field small {
      color: var(--secondary-text-color);
      font-size: 11px;
      line-height: 1.5;
    }
    ha-entity-picker {
      display: block;
      width: 100%;
    }
    input[type="text"],
    input[type="number"] {
      box-sizing: border-box;
      width: 100%;
      min-height: 44px;
      padding: 9px 12px;
      border: 1px solid var(--divider-color, #8883);
      border-radius: 8px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      font: inherit;
      font-size: 14px;
    }
    input:focus-visible {
      outline: 3px solid var(--primary-color);
      outline-offset: 1px;
    }
    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      min-height: 44px;
    }
    .row-copy {
      display: grid;
      gap: 3px;
      min-width: 0;
    }
    .row-copy strong {
      font-size: 13px;
      font-weight: 600;
    }
    .row-copy small {
      color: var(--secondary-text-color);
      font-size: 11px;
      line-height: 1.5;
    }
    .number-row {
      display: grid;
      grid-template-columns: 110px minmax(0, 1fr);
      align-items: center;
      gap: 12px;
    }
    .divider {
      height: 1px;
      background: var(--divider-color, #8883);
    }
  `;

  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ attribute: false }) config?: CardConfig;

  setConfig(config: CardConfig): void {
    this.config = { ...config };
  }

  private patchConfig(patch: Partial<CardConfig>): void {
    if (!this.config) return;
    let next: CardConfig;
    try {
      next = validateConfig({ ...this.config, ...patch });
    } catch {
      return;
    }
    this.config = next;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: next },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private picker(
    label: string,
    key: keyof CardConfig,
    domains: string[],
    helper?: string,
  ) {
    if (!this.config) return nothing;
    return html`<div class="field">
      <label for=${`picker-${key}`}>${label}</label>
      <ha-entity-picker
        id=${`picker-${key}`}
        .hass=${this.hass}
        .value=${String(this.config[key] ?? "")}
        .label=${label}
        .includeDomains=${domains}
        .allowCustomEntity=${true}
        @value-changed=${(event: CustomEvent<{ value: string }>) =>
          this.patchConfig({ [key]: event.detail.value } as Partial<CardConfig>)}
      ></ha-entity-picker>
      ${helper ? html`<small>${helper}</small>` : nothing}
    </div>`;
  }

  private toggle(
    label: string,
    helper: string,
    key: "show_camera" | "show_ams",
  ) {
    if (!this.config) return nothing;
    return html`<div class="row">
      <div class="row-copy">
        <strong>${label}</strong>
        <small>${helper}</small>
      </div>
      <ha-switch
        .checked=${this.config[key] !== false}
        @change=${(event: Event) =>
          this.patchConfig({
            [key]: (event.target as HTMLInputElement).checked,
          } as Partial<CardConfig>)}
      ></ha-switch>
    </div>`;
  }

  render() {
    if (!this.config) return nothing;
    const days = this.config.history_days ?? 7;
    return html`<div class="editor">
      <p class="intro">
        The printer sensor is the Bambu Lab print status entity. Temperatures,
        AMS units, camera and print images are discovered from the same entity
        prefix.
      </p>
      ${this.picker(
        "Printer status entity",
        "printer_entity",
        ["sensor"],
        "Usually sensor.<printer>_print_status.",
      )}
      ${this.picker(
        "Printer power sensor",
        "power_entity",
        ["sensor"],
        "Preferred cost basis. The card integrates recorded power against the tariff.",
      )}
      ${this.picker(
        "Printer energy sensor",
        "energy_entity",
        ["sensor"],
        "Used as a fallback when no power sensor is selected.",
      )}
      ${this.picker("Current sensor", "current_entity", ["sensor"])}
      ${this.picker("Voltage sensor", "voltage_entity", ["sensor"])}
      ${this.picker(
        "Electricity price sensor",
        "price_entity",
        ["sensor"],
        "A currency/kWh sensor, for example Real Electricity Price.",
      )}
      ${this.picker(
        "Camera entity",
        "camera_entity",
        ["camera"],
        "Leave empty to use camera.<prefix>_camera.",
      )}
      <div class="divider"></div>
      <div class="field">
        <label for="editor-name">Display name</label>
        <input
          id="editor-name"
          type="text"
          .value=${this.config.name ?? ""}
          placeholder="Use the printer name from Home Assistant"
          @change=${(event: Event) =>
            this.patchConfig({
              name: (event.target as HTMLInputElement).value.trim(),
            })}
        />
        <small>Optional. Falls back to the Bambu printer name sensor.</small>
      </div>
      <div class="field">
        <label for="editor-prefix">Entity prefix</label>
        <input
          id="editor-prefix"
          type="text"
          .value=${this.config.entity_prefix ?? ""}
          placeholder="e.g. h2d_0123456789abcdef"
          @change=${(event: Event) =>
            this.patchConfig({
              entity_prefix: (event.target as HTMLInputElement).value.trim(),
            })}
        />
        <small>
          Optional. Only needed when the printer status entity does not end in
          _print_status.
        </small>
      </div>
      <div class="field">
        <label for="editor-history">History window</label>
        <div class="number-row">
          <input
            id="editor-history"
            type="number"
            min="1"
            max=${MAX_HISTORY_DAYS}
            step="1"
            .value=${String(days)}
            @change=${(event: Event) =>
              this.patchConfig({
                history_days: clampHistoryDays(
                  (event.target as HTMLInputElement).value,
                ),
              })}
          />
          <small>
            Days of print cost history to request from Recorder (1–${MAX_HISTORY_DAYS}).
            Home Assistant Recorder retention still applies.
          </small>
        </div>
      </div>
      <div class="field">
        <label for="editor-currency">Currency</label>
        <input
          id="editor-currency"
          type="text"
          maxlength="3"
          .value=${this.config.currency ?? ""}
          placeholder="Derived from the price sensor"
          @change=${(event: Event) =>
            this.patchConfig({
              currency: (event.target as HTMLInputElement).value
                .trim()
                .toUpperCase(),
            })}
        />
        <small>Optional ISO 4217 code, for example EUR or SEK.</small>
      </div>
      <div class="divider"></div>
      ${this.toggle(
        "Show live camera",
        "Keep the camera stream on the card. Turn off to save bandwidth.",
        "show_camera",
      )}
      ${this.toggle(
        "Show AMS",
        "Show AMS units, tray colours and remaining filament.",
        "show_ams",
      )}
      <p class="note">
        The card is read-only. It never pauses, stops or starts a print. Costs
        are estimates from Recorder history, not a billing meter.
      </p>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "bambu-printer-card-editor": BambuPrinterCardEditor;
  }
}
