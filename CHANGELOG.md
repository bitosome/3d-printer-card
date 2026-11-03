# Changelog

## 0.8.0 — 2026-11-03

- The 24 h power chart on the card and in History is now the shared chart from ha-card-ui 1.7.0, the same one the weather forecast and electricity price cards use. The card's own chart element is gone.
- Power draws as a 4px stepped line with a shadow and an area that fades downwards; current is a 2px neutral line. Recorder samples are held in 5-minute steps, and missing data stays a gap.
- The axes have five gridlines with round values. Watts are on the right and amps on the left, with the unit in each label ("300 W", "0.25 A"). Axis labels, readout and time labels use the shared Home Assistant formatters, like the weather and electricity price charts: every axis label has the step's decimals (0.25 A, never 0.3 A), and the time reads as date and time without the year. Time labels show the date and time and fit the card width. Small negative plug readings are drawn at zero, as before, so they cannot stretch the watt axis below zero.
- Scrub the chart, or focus it and use the arrow keys, Page Up/Down, Home and End: the head shows the selected time with the power and current, and a dot marks each line. Escape returns to the latest reading, and so does each refresh of the chart data. The chart follows the History button in the tab order.
- The chart panel takes the shared primary-tinted chart background. The head adds the readout next to the "Power · 24 h" button, or below it on narrow cards. Loading, error and empty states keep the chart's height (120 px on the card, 160 px in History), so the panel does not jump. The card has no chart CSS of its own; restyle it with the shared `--family-chart-*` variables.
- A sensor that never reported in the window gets no legend entry or axis labels. The legend notes "Gaps mean missing data" only when there are gaps. The loading shimmer stops under reduced motion.
- Needs ha-card-ui 1.7.0.

## 0.7.0 — 2026-11-03

- Bundle shared UI 1.6.0 for the camera overlay and progress bar. The printer camera now uses Camera Card's viewer 1:1: the same top-right row of 44px rounded buttons, 8px from the edges and 8px apart, in the minimised card and in fullscreen.
- The fullscreen button turns blue with an exit icon while fullscreen and collapses the stream on the next press, including desktop browsers where Home Assistant's nested shadow DOM hid the fullscreen state.
- Camera buttons name what they do next ("Show snapshot", "Show live stream", "Enter fullscreen", "Exit fullscreen"). The Live / Snapshot pill is gone, like in Camera Card; the zoom reset and loading/unavailable messages use the shared style.
- The stream frame is black and the live player fills it the way Camera Card does; snapshots fill the tile and fit the screen in fullscreen.
- The print progress bar uses the shared level meter (the same bar as battery charge and fan speed) in the printer's status colour.

## 0.6.0 — 2026-11-03

- Update the shared UI library to v1.4.0. Status colours (hero, glow, AMS, history records) now follow the Home Assistant theme's success, warning and error colours, so they match the shared chips and notices.
- Show a spinner on the printer power and air purifier buttons while a change is pending instead of fading them like Unavailable; the History Refresh button does the same and now uses a refresh icon.
- Give the printer power-off confirmation two equal buttons and focus Cancel first.
- Show the external spool's remaining filament as a percentage, like AMS trays; an unknown reading is hidden and a real 0% is kept.
- Use the shared chips for AMS Active, Drying and section counts, and the shared metric tiles for History totals.
- Show History and power-chart loading, empty and error states in the shared style, with one Try again action. History records show an expand chevron.
- Missing values in Details and History say "Unavailable" (or "Not configured" for cost without sensors) instead of "—". Durations read "1 h 5 min" everywhere.
- Raise 10px AMS and History labels to 11px and keep the progress percentage at least 38px on narrow cards. The chart's current line is now neutral rather than warning orange.

## 0.5.1 — 2026-11-03

- Keep the printer power and air purifier buttons above the hero glow. The glow extends below the hero tile and was painting over them while printing, paused, finished or failed.

## 0.5.0 — 2026-11-02

- Show when a running print will be ready next to the remaining time, e.g. "Ready 14:35" or "Ready tomorrow 02:10"; later days show the weekday or date.
- Prefer the Bambu Lab integration's native end-time sensor; otherwise count the remaining time from Home Assistant's last sensor update. The ready time follows new readings.
- Format the ready time and its day with Home Assistant's time-zone, language and 12/24-hour preferences.
- Hide the ready time while preparing, paused or idle, and when the estimate is unknown, unavailable or stale. The remaining time now reads "… left" instead of "ETA …".

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
