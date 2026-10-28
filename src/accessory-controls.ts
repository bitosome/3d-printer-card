import { LitElement, css, html, nothing, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  FamilyFlowController,
  actionPill,
  componentStyles,
  dialogStyles,
  familyStyles,
  notice,
  renderFamilyDialog,
} from "@bitosome/ha-card-ui";
import type { HomeAssistant, PrinterStatus } from "./types";

type Accessory = "printer" | "purifier";
type SwitchState = "on" | "off" | "unavailable";
interface Request {
  entityId: string;
  target: "on" | "off";
  acknowledged: boolean;
  timer?: ReturnType<typeof setTimeout>;
}

/** Optional external plugs, independent of whether the printer itself is online. */
@customElement("printer-accessory-controls")
export class PrinterAccessoryControls extends LitElement {
  static styles = [familyStyles, componentStyles, dialogStyles, css`
    :host { display: block; color: var(--primary-text-color); }
    :host([hidden]), :host(:not([configured])) { display: none; }
    .controls { display: flex; flex-wrap: wrap; gap: var(--family-grid-gap); }
    .accessory {
      flex: 1 1 140px;
      min-width: 0;
      justify-content: flex-start;
      padding: 10px 14px;
      text-align: start;
      background: var(--family-tile);
      border: 1px solid transparent;
    }
    .accessory[aria-checked="true"] {
      background: color-mix(in srgb, var(--primary-color) 10%, var(--family-surface));
      border-color: color-mix(in srgb, var(--primary-color) 28%, transparent);
    }
    .accessory[aria-checked="true"] ha-icon { color: var(--primary-color); }
    .copy { display: grid; min-width: 0; gap: 2px; }
    .label { font-size: 12px; line-height: 1.35; overflow-wrap: anywhere; }
    .state { color: var(--secondary-text-color); font-size: 11px; line-height: 1.35; }
    .errors { display: grid; gap: 8px; }
    .errors:not(:empty) { margin-top: 8px; }
    .family-notice { margin: 0; }
    .family-dialog-body p { margin: 0; font-size: 14px; line-height: 1.5; }
    .family-dialog-body p + p { margin-top: 12px; }
  `];

  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ attribute: false }) printerPowerEntity?: string;
  @property({ attribute: false }) airPurifierEntity?: string;
  @property({ attribute: false }) printerStatus?: PrinterStatus;
  @property({ type: Boolean, reflect: true }) configured = false;
  @state() private pending: Partial<Record<Accessory, Request>> = {};
  @state() private errors: Partial<Record<Accessory, string>> = {};
  private confirmationEntity?: string;
  private flow = new FamilyFlowController<"power-off">(this, {
    onClose: () => { this.confirmationEntity = undefined; },
  });

  protected willUpdate(changed: PropertyValues): void {
    this.configured = !!(this.entityId("printer") || this.entityId("purifier"));
    for (const kind of ["printer", "purifier"] as const) {
      const prop = kind === "printer" ? "printerPowerEntity" : "airPurifierEntity";
      if (changed.has(prop)) {
        this.clearRequest(kind);
        this.errors = { ...this.errors, [kind]: undefined };
        if (kind === "printer") this.flow.forceClose(false);
      }
      this.finishReportedRequest(kind);
    }
    // A different client already switched it off. Do not leave a stale destructive CTA.
    if (this.flow.active && this.switchState("printer") === "off") {
      this.flow.forceClose();
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.clearRequest("printer");
    this.clearRequest("purifier");
    this.confirmationEntity = undefined;
  }

  private entityId(kind: Accessory): string | undefined {
    const entity = kind === "printer" ? this.printerPowerEntity : this.airPurifierEntity;
    return entity && /^switch\.[a-z0-9_]+$/.test(entity) ? entity : undefined;
  }

  private switchState(kind: Accessory): SwitchState {
    const id = this.entityId(kind);
    const value = id ? this.hass?.states[id]?.state : undefined;
    return value === "on" || value === "off" ? value : "unavailable";
  }

  private label(kind: Accessory): string {
    return kind === "printer" ? "Printer power" : "Air purifier";
  }

  private clearRequest(kind: Accessory): void {
    const pending = this.pending[kind];
    if (!pending) return;
    if (pending.timer) clearTimeout(pending.timer);
    this.pending = { ...this.pending, [kind]: undefined };
  }

  private finishReportedRequest(kind: Accessory): void {
    const request = this.pending[kind];
    if (request?.acknowledged && this.entityId(kind) === request.entityId &&
        this.switchState(kind) === request.target) {
      this.clearRequest(kind);
    }
  }

  private toggle(kind: Accessory, opener: HTMLElement): void {
    if (this.pending[kind] || !this.isConnected) return;
    const state = this.switchState(kind);
    if (state === "unavailable") return;
    this.errors = { ...this.errors, [kind]: undefined };
    if (kind === "printer" && state === "on") {
      this.confirmationEntity = this.entityId(kind);
      this.flow.open("power-off", opener);
      return;
    }
    void this.send(kind, state === "on" ? "off" : "on");
  }

  private confirmPowerOff = (): void => {
    // Never retarget a confirmation after a config change or toggle an already-off plug.
    if (!this.flow.active || !this.confirmationEntity ||
        this.confirmationEntity !== this.entityId("printer") ||
        this.switchState("printer") !== "on" || this.pending.printer) return;
    this.flow.forceClose();
    void this.send("printer", "off");
  };

  private async send(kind: Accessory, target: "on" | "off"): Promise<void> {
    const entityId = this.entityId(kind);
    const current = this.switchState(kind);
    if (!this.isConnected || !this.hass || !entityId || this.pending[kind] ||
        current === "unavailable" || current === target) return;
    const request: Request = { entityId, target, acknowledged: false };
    this.pending = { ...this.pending, [kind]: request };
    this.errors = { ...this.errors, [kind]: undefined };
    // Bound both a lost service response and a missing state update. Never retry automatically.
    request.timer = setTimeout(() => {
      if (this.pending[kind] !== request) return;
      this.clearRequest(kind);
      if (this.switchState(kind) !== target) {
        this.errors = { ...this.errors,
          [kind]: `${this.label(kind)}: Home Assistant has not confirmed the change. Check the switch before trying again.`,
        };
      }
    }, 15_000);
    try {
      await this.hass.callService("switch", target === "on" ? "turn_on" : "turn_off", {
        entity_id: entityId,
      });
      if (!this.isConnected || this.pending[kind] !== request) return;
      request.acknowledged = true;
      this.finishReportedRequest(kind);
      this.requestUpdate();
    } catch (error) {
      if (!this.isConnected || this.pending[kind] !== request) return;
      this.clearRequest(kind);
      const message = error instanceof Error ? error.message :
        typeof error === "object" && error && "message" in error ? String(error.message) :
        "The request could not be completed.";
      this.errors = { ...this.errors, [kind]: `${this.label(kind)}: ${message}` };
    }
  }

  private renderControl(kind: Accessory) {
    if (!this.entityId(kind)) return nothing;
    if (kind === "purifier" && this.entityId(kind) === this.entityId("printer")) return nothing;
    const value = this.switchState(kind);
    const pending = this.pending[kind];
    const unavailable = value === "unavailable";
    const label = this.label(kind);
    const state = unavailable ? "Unavailable" : value === "on" ? "On" : "Off";
    const action = unavailable ? `${label}: unavailable` :
      `${label}: ${state.toLowerCase()}. Turn ${value === "on" ? "off" : "on"}${kind === "printer" && value === "on" ? "; confirmation required" : ""}`;
    return html`<button
      class="family-action accessory"
      type="button"
      data-accessory=${kind}
      role=${unavailable ? "button" : "switch"}
      aria-checked=${unavailable ? nothing : String(value === "on")}
      aria-label=${action}
      aria-busy=${String(!!pending)}
      title=${action}
      ?disabled=${unavailable || !!pending}
      @click=${(event: Event) => this.toggle(kind, event.currentTarget as HTMLElement)}
    >
      <ha-icon .icon=${kind === "printer" ? "mdi:power" : "mdi:air-purifier"} aria-hidden="true"></ha-icon>
      <span class="copy"><span class="label">${label}</span>
        <span class="state" aria-live="polite">${state}${pending ? " · Updating…" : ""}</span>
      </span>
    </button>`;
  }

  render() {
    if (!this.entityId("printer") && !this.entityId("purifier")) return nothing;
    const activeJob = ["printing", "preparing", "paused"].includes(this.printerStatus || "");
    return html`
      <div class="controls">${this.renderControl("printer")}${this.renderControl("purifier")}</div>
      <div class="errors">${(["printer", "purifier"] as const).map((kind) => this.errors[kind]
        ? notice({ message: this.errors[kind]!, tone: "error", action: {
          label: "Dismiss", onClick: () => { this.errors = { ...this.errors, [kind]: undefined }; },
        } }) : nothing)}</div>
      ${renderFamilyDialog(this.flow, {
        title: "Turn off printer?",
        ariaDescribedBy: "power-off-description",
        content: html`<p id="power-off-description">This cuts power to the printer.${activeJob
          ? " A print is in progress or paused and will be interrupted."
          : " Make sure printing and cooling have finished."}</p>
          ${this.switchState("printer") === "unavailable" ? html`<p>Printer power is unavailable. Wait for it to reconnect.</p>` : nothing}`,
        footer: html`${actionPill({ label: "Cancel", onClick: this.flow.close })}
          ${actionPill({ label: "Turn off printer", icon: "mdi:power", destructive: true,
            disabled: this.switchState("printer") !== "on" || !!this.pending.printer,
            onClick: this.confirmPowerOff })}`,
      })}
    `;
  }
}
