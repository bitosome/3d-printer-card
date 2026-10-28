# Changelog

## 0.4.1 — 2026-10-28

- Open AMS from the bottom menu and summary tiles in the shared modal; retain the overview, camera player and dashboard height.
- Restore focus to the actual launcher on X/Escape; remove page-switch scrolling.

## 0.4.0 — 2026-10-28

- Expand the existing camera feed in place using the same shared immersive fullscreen controller as Camera Card; remove the media modal and preserve one player, pinch/pan and safe-area controls.
- Add optional printer-power and external air-purifier controls with explicit On/Off state; printer power-off always requires confirmation.
- Keep switches usable when printer telemetry is missing, bound pending commands and surface service or state-confirmation failures without automatic retries.
- Add visual editor selectors and regression coverage for confirmation, configuration races, fullscreen teardown and unavailable entities.

## 0.3.0 — 2026-10-28

- Reuse Camera Card’s zoom, gesture, stream bootstrap and fullscreen behaviour through the pinned shared UI library v1.1.0.
- Add pinch zoom, bounded pan and zoom reset to expanded live and snapshot views; retain stationary controls and one active player.
- Use a safe-area-aware media dialog when native fullscreen is unavailable or rejected; preserve X/Escape and opener focus.
- Bound stream-element loading, offer retry, and ignore late fullscreen/loading responses after teardown or configuration changes.

## 0.2.3 — 2026-10-28

- Keep completed electricity estimates current when History was opened during the print; choose the newest matching recorded estimate and refresh visible History after completion.
- Ignore pending pre-completion responses so they cannot restore an unfinished history snapshot.
- Correct live tariff-transition and history-seeding timing without repricing earlier consumption.
- Add regression checks for cache freshness, completion refreshes and live accounting; clarify Recorder reconstruction and retention.

## 0.2.2 — 2026-10-28

- Align headers, state chips, metric labels and telemetry with the pinned shared UI library; retain temperature targets and keep previews accessible on narrow cards.
- Fix the preview expand icon, WebRTC sizing, touch hover states and editor accessibility. Details dialogs fit their content.
- Add the shared camera dialog fallback when native fullscreen is unavailable or rejected; include an explicit fullscreen exit and avoid duplicate streams.
- Recover interrupted Recorder requests after reconnect or a temporarily missing printer; ignore obsolete results and retain history disclosure identity.
- Correct stale-power and cumulative-energy cost estimates, mark incomplete coverage, and keep normalized tariff units accurate.
- Honor Home Assistant number, clock and time-zone preferences; chart summaries report observed readings rather than padded axis limits.
- Extend offline regression coverage for accounting, reconnects, stale responses, camera dialogs and accessibility.

## 0.2.0 — 2026-10-27

- Added the shared bottom navigation: **Overview**, **AMS**, **History** and
  **Details**, matching the heat pump card. Overview and AMS are inline pages;
  History and Details open the common modal flow.
- Metric and telemetry tiles now open Home Assistant's native entity more-info
  instead of the full details dialog. The chamber temperature tile, for example,
  opens the chamber sensor.
- The overview now shows a compact AMS summary (active tray, colours, loaded
  count); the dedicated AMS page keeps the full unit/tray view.
- The print cover image is now a button that opens a full print-preview dialog.
- The camera tile reuses the camera-card live-stream bootstrap: standard
  `ha-camera-stream`/`ha-web-rtc-player` elements, a loading state and a
  live/snapshot toggle.
- Removed the duplicate header History/Details icons; the bottom navigation and
  the cost/chart shortcuts are the navigation.
- Updated preview and documentation screenshots.

## 0.1.1 — 2026-10-27

- The camera tile can now switch between the live stream and the camera
  snapshot. Live remains the default; the snapshot is useful when the printer
  RTSP stream or Home Assistant's stream worker is unstable.
- Nothing is sent to the printer; switching only changes what the card renders.

## 0.1.0 — 2026-10-27

- Initial release of the Bambu Lab printer card.
- Live printer status, task, progress, ETA, layers, filament use, cover image
  and a live camera stream (with still-image fallback).
- Automatic AMS discovery: multiple units, tray colours, material, remaining
  filament, active tray, unit temperature/humidity and drying state. External
  spools are shown when loaded.
- Metrics for bed, nozzle, chamber and smart-plug power, plus current, voltage,
  electricity price and print energy.
- Per-print electricity cost estimated from recorded printer power and the
  recorded electricity price, including live session cost and a print-history
  dialog with totals, a 24-hour power/current chart and per-print records.
- Recorder-based history; no backend integration, browser ledger, service call
  or printer command.
- HMS, print error, offline/unavailable and open-door notices.
- Read-only details dialog with print job, temperatures, fans, power, machine,
  AMS and HMS data, and native Home Assistant more-info links.
- Visual editor, responsive layout, light/dark themes, keyboard focus, 44px
  touch targets and reduced-motion support.
- Built with the pinned `@bitosome/ha-card-ui` design tokens and components.
