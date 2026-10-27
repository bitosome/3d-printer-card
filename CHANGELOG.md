# Changelog

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
