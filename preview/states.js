// Synthetic preview state and Recorder history for the Bambu printer card.
// All values are fictional. No Home Assistant instance or printer is contacted.

const now = Date.now();
const HOUR = 3_600_000;
const DAY = 24 * HOUR;
const PREFIX = "h2d_demo";
const HISTORY_DAYS = 7;
const rangeStart = now - HISTORY_DAYS * DAY;
const rangeEnd = now;

const sessions = [
  {
    start: now - 3 * DAY,
    end: now - 3 * DAY + 2.5 * HOUR,
    task: "Bracket",
    power: 255,
  },
  {
    start: now - 20 * HOUR,
    end: now - 18 * HOUR,
    task: "Phone stand",
    power: 300,
  },
  {
    start: now - 1 * HOUR,
    end: now,
    task: "Desk organizer",
    power: 310,
    open: true,
  },
];

function seeded(time, salt) {
  const value = Math.sin(time / 9_000_000 + salt) * 10_000;
  return value - Math.floor(value);
}

function sessionAt(time) {
  return sessions.find(
    (session) => time >= session.start - 8 * 60_000 && time <= session.end + 6 * 60_000,
  );
}

function powerAt(time) {
  const session = sessionAt(time);
  if (!session) return seeded(time, 1) > 0.94 ? 7 + seeded(time, 2) * 9 : 0;
  if (time < session.start) {
    // Short pre-print heat-up seen by the plug.
    return 18 + seeded(time, 3) * 14;
  }
  const elapsed = time - session.start;
  const ramp = Math.min(1, elapsed / (8 * 60_000));
  const base = 25 + (session.power - 25) * ramp;
  return Math.max(0, base + (seeded(time, 4) - 0.5) * 42);
}

function priceAt(time) {
  const hour = new Date(time).getHours();
  const day = Math.floor(time / DAY);
  const daily =
    0.105 +
    0.045 * Math.sin(((hour - 7) / 24) * Math.PI * 2) +
    0.025 * Math.cos(((hour - 17) / 24) * Math.PI * 2);
  const market = 0.012 * Math.sin(day * 1.7 + hour * 0.21);
  return Math.max(0.045, daily + market);
}

function iso(time) {
  return new Date(time).toISOString();
}

function buildSeries() {
  const status = [{ t: rangeStart - DAY, state: "idle" }];
  const task = [{ t: rangeStart - DAY, state: "unknown" }];
  const power = [];
  const current = [];
  const energy = [];
  let cumulative = 481.2;

  for (const session of sessions) {
    status.push({ t: session.start, state: "prepare" });
    status.push({ t: session.start + 10_000, state: "running" });
    task.push({ t: session.start - 60_000, state: session.task });
    if (!session.open) {
      status.push({ t: session.end, state: "finish" });
      status.push({ t: session.end + 60_000, state: "idle" });
    }
  }

  const step = 5 * 60_000;
  for (let time = rangeStart; time <= rangeEnd; time += step) {
    const watts = powerAt(time);
    power.push({ t: time, state: watts.toFixed(1) });
    current.push({ t: time, state: (watts / 231).toFixed(3) });
    cumulative += (watts * step) / HOUR / 1000;
    energy.push({ t: time, state: cumulative.toFixed(3) });
  }

  const price = [];
  for (let time = rangeStart; time <= rangeEnd; time += HOUR) {
    price.push({ t: time, state: priceAt(time).toFixed(6) });
  }

  return {
    [`sensor.${PREFIX}_print_status`]: status,
    [`sensor.${PREFIX}_task_name`]: task,
    "sensor.demo_printer_power": power,
    "sensor.demo_printer_current": current,
    "sensor.demo_printer_energy": energy,
    "sensor.real_electricity_price_current_price": price,
  };
}

const series = buildSeries();

function historySeries(entityId, start, end) {
  const all = series[entityId];
  if (!all) return [];
  const before = [...all].reverse().find((point) => point.t <= start);
  const middle = all.filter((point) => point.t > start && point.t <= end);
  return [
    ...(before ? [{ state: before.state, last_changed: iso(start) }] : []),
    ...middle.map((point) => ({ state: point.state, last_changed: iso(point.t) })),
  ];
}

function entity(id, state, attributes = {}) {
  return {
    entity_id: id,
    state,
    attributes,
    last_updated: iso(now),
    last_changed: iso(now),
  };
}

function tray(unit, slot, name, type, color, remain, active = false) {
  return entity(`sensor.${PREFIX}_ams_${unit}_tray_${slot}`, name, {
    slot,
    active,
    color,
    cols: [color],
    name,
    type,
    filament_id: type === "PLA" ? "GFA00" : type === "PETG" ? "GFG00" : "GFB00",
    remain,
    remain_enabled: true,
    empty: false,
    nozzle_temp_min: type === "PLA" ? "190" : "240",
    nozzle_temp_max: type === "PLA" ? "230" : "280",
    tray_weight: "1000",
    icon: "mdi:printer-3d-nozzle",
    friendly_name: `${name} ${type}`,
  });
}

const activeSession = sessions[2];
const states = {
  [`sensor.${PREFIX}_print_status`]: entity(
    `sensor.${PREFIX}_print_status`,
    "running",
    {
      device_class: "enum",
      options: [
        "failed",
        "finish",
        "idle",
        "init",
        "offline",
        "pause",
        "prepare",
        "running",
        "slicing",
        "unknown",
      ],
      friendly_name: "H2D Print status",
    },
  ),
  [`sensor.${PREFIX}_printer_name`]: entity(
    `sensor.${PREFIX}_printer_name`,
    "H2D",
    { friendly_name: "Printer name" },
  ),
  [`sensor.${PREFIX}_serial_number`]: entity(
    `sensor.${PREFIX}_serial_number`,
    "DEMO0123456789",
    { friendly_name: "Serial number" },
  ),
  [`sensor.${PREFIX}_task_name`]: entity(
    `sensor.${PREFIX}_task_name`,
    activeSession.task,
    { icon: "mdi:cloud-outline", friendly_name: "Task name" },
  ),
  [`sensor.${PREFIX}_print_progress`]: entity(
    `sensor.${PREFIX}_print_progress`,
    "42",
    { unit_of_measurement: "%", icon: "mdi:percent", friendly_name: "Print progress" },
  ),
  [`sensor.${PREFIX}_current_stage`]: entity(
    `sensor.${PREFIX}_current_stage`,
    "printing",
    { friendly_name: "Current stage" },
  ),
  [`sensor.${PREFIX}_remaining_time`]: entity(
    `sensor.${PREFIX}_remaining_time`,
    "1.45",
    { unit_of_measurement: "h", friendly_name: "Remaining time" },
  ),
  [`sensor.${PREFIX}_start_time`]: entity(
    `sensor.${PREFIX}_start_time`,
    iso(activeSession.start),
    { device_class: "timestamp", friendly_name: "Start time" },
  ),
  [`sensor.${PREFIX}_end_time`]: entity(
    `sensor.${PREFIX}_end_time`,
    iso(now + 1.45 * HOUR),
    { device_class: "timestamp", friendly_name: "End time" },
  ),
  [`sensor.${PREFIX}_current_layer`]: entity(
    `sensor.${PREFIX}_current_layer`,
    "78",
    { friendly_name: "Current layer" },
  ),
  [`sensor.${PREFIX}_total_layer_count`]: entity(
    `sensor.${PREFIX}_total_layer_count`,
    "210",
    { friendly_name: "Total layer count" },
  ),
  [`sensor.${PREFIX}_print_weight`]: entity(
    `sensor.${PREFIX}_print_weight`,
    "84.2",
    { unit_of_measurement: "g", friendly_name: "Print weight" },
  ),
  [`sensor.${PREFIX}_print_length`]: entity(
    `sensor.${PREFIX}_print_length`,
    "28.4",
    { unit_of_measurement: "m", friendly_name: "Print length" },
  ),
  [`sensor.${PREFIX}_print_bed_type`]: entity(
    `sensor.${PREFIX}_print_bed_type`,
    "textured_plate",
    { friendly_name: "Print bed type" },
  ),
  [`sensor.${PREFIX}_speed_profile`]: entity(
    `sensor.${PREFIX}_speed_profile`,
    "standard",
    { modifier: 100, friendly_name: "Speed profile" },
  ),
  [`sensor.${PREFIX}_print_type`]: entity(
    `sensor.${PREFIX}_print_type`,
    "cloud",
    { friendly_name: "Print type" },
  ),
  [`sensor.${PREFIX}_gcode_file_downloaded`]: entity(
    `sensor.${PREFIX}_gcode_file_downloaded`,
    "DeskOrganizer.gcode",
    { friendly_name: "Gcode file downloaded" },
  ),
  [`sensor.${PREFIX}_printable_objects`]: entity(
    `sensor.${PREFIX}_printable_objects`,
    "1",
    { objects: { 1: "DeskOrganizer.stl" }, friendly_name: "Printable objects" },
  ),
  [`sensor.${PREFIX}_bed_temperature`]: entity(
    `sensor.${PREFIX}_bed_temperature`,
    "60",
    { unit_of_measurement: "°C", device_class: "temperature", state_class: "measurement", friendly_name: "Bed temperature" },
  ),
  [`sensor.${PREFIX}_bed_target_temperature`]: entity(
    `sensor.${PREFIX}_bed_target_temperature`,
    "60",
    { unit_of_measurement: "°C", friendly_name: "Bed target temperature" },
  ),
  [`sensor.${PREFIX}_chamber_temperature`]: entity(
    `sensor.${PREFIX}_chamber_temperature`,
    "31",
    { unit_of_measurement: "°C", device_class: "temperature", state_class: "measurement", friendly_name: "Chamber temperature" },
  ),
  [`sensor.${PREFIX}_chamber_target_temperature`]: entity(
    `sensor.${PREFIX}_chamber_target_temperature`,
    "0",
    { unit_of_measurement: "°C", friendly_name: "Chamber target temperature" },
  ),
  [`sensor.${PREFIX}_nozzle_temperature`]: entity(
    `sensor.${PREFIX}_nozzle_temperature`,
    "220",
    { unit_of_measurement: "°C", device_class: "temperature", state_class: "measurement", friendly_name: "Nozzle temperature" },
  ),
  [`sensor.${PREFIX}_nozzle_target_temperature`]: entity(
    `sensor.${PREFIX}_nozzle_target_temperature`,
    "220",
    { unit_of_measurement: "°C", friendly_name: "Nozzle target temperature" },
  ),
  [`sensor.${PREFIX}_left_nozzle_temperature`]: entity(
    `sensor.${PREFIX}_left_nozzle_temperature`,
    "220",
    { unit_of_measurement: "°C", friendly_name: "Left nozzle temperature" },
  ),
  [`sensor.${PREFIX}_left_nozzle_target_temperature`]: entity(
    `sensor.${PREFIX}_left_nozzle_target_temperature`,
    "220",
    { unit_of_measurement: "°C", friendly_name: "Left nozzle target temperature" },
  ),
  [`sensor.${PREFIX}_right_nozzle_temperature`]: entity(
    `sensor.${PREFIX}_right_nozzle_temperature`,
    "38",
    { unit_of_measurement: "°C", friendly_name: "Right nozzle temperature" },
  ),
  [`sensor.${PREFIX}_right_nozzle_target_temperature`]: entity(
    `sensor.${PREFIX}_right_nozzle_target_temperature`,
    "0",
    { unit_of_measurement: "°C", friendly_name: "Right nozzle target temperature" },
  ),
  [`sensor.${PREFIX}_nozzle_size`]: entity(
    `sensor.${PREFIX}_nozzle_size`,
    "0.4",
    { unit_of_measurement: "mm", friendly_name: "Nozzle size" },
  ),
  [`sensor.${PREFIX}_cooling_fan_speed`]: entity(
    `sensor.${PREFIX}_cooling_fan_speed`,
    "82",
    { unit_of_measurement: "%", friendly_name: "Cooling fan speed" },
  ),
  [`sensor.${PREFIX}_aux_fan_speed`]: entity(
    `sensor.${PREFIX}_aux_fan_speed`,
    "60",
    { unit_of_measurement: "%", friendly_name: "Aux fan speed" },
  ),
  [`sensor.${PREFIX}_chamber_fan_speed`]: entity(
    `sensor.${PREFIX}_chamber_fan_speed`,
    "30",
    { unit_of_measurement: "%", friendly_name: "Chamber fan speed" },
  ),
  [`sensor.${PREFIX}_heatbreak_fan_speed`]: entity(
    `sensor.${PREFIX}_heatbreak_fan_speed`,
    "100",
    { unit_of_measurement: "%", friendly_name: "Heatbreak fan speed" },
  ),
  [`binary_sensor.${PREFIX}_hms_errors`]: entity(
    `binary_sensor.${PREFIX}_hms_errors`,
    "off",
    { Count: 0, device_class: "problem", friendly_name: "HMS errors" },
  ),
  [`binary_sensor.${PREFIX}_print_error`]: entity(
    `binary_sensor.${PREFIX}_print_error`,
    "off",
    { device_class: "problem", friendly_name: "Print error" },
  ),
  [`binary_sensor.${PREFIX}_online`]: entity(
    `binary_sensor.${PREFIX}_online`,
    "on",
    { device_class: "running", friendly_name: "Online" },
  ),
  [`binary_sensor.${PREFIX}_enclosure_door`]: entity(
    `binary_sensor.${PREFIX}_enclosure_door`,
    "off",
    { device_class: "door", friendly_name: "Door" },
  ),
  [`binary_sensor.${PREFIX}_extruder_filament_state`]: entity(
    `binary_sensor.${PREFIX}_extruder_filament_state`,
    "on",
    { friendly_name: "Extruder filament" },
  ),
  [`binary_sensor.${PREFIX}_firmware_update`]: entity(
    `binary_sensor.${PREFIX}_firmware_update`,
    "off",
    { device_class: "update", friendly_name: "Firmware" },
  ),
  [`binary_sensor.${PREFIX}_developer_lan_mode`]: entity(
    `binary_sensor.${PREFIX}_developer_lan_mode`,
    "off",
    { device_class: "running", friendly_name: "Developer LAN mode" },
  ),
  [`sensor.${PREFIX}_wi_fi_signal`]: entity(
    `sensor.${PREFIX}_wi_fi_signal`,
    "-48",
    { unit_of_measurement: "dBm", device_class: "signal_strength", state_class: "measurement", friendly_name: "Wi-Fi signal" },
  ),
  [`sensor.${PREFIX}_ip_address`]: entity(
    `sensor.${PREFIX}_ip_address`,
    "192.0.2.10",
    { friendly_name: "IP address" },
  ),
  [`sensor.${PREFIX}_mqtt_connection_mode`]: entity(
    `sensor.${PREFIX}_mqtt_connection_mode`,
    "local",
    { friendly_name: "MQTT connection mode" },
  ),
  [`sensor.${PREFIX}_sd_card_status`]: entity(
    `sensor.${PREFIX}_sd_card_status`,
    "normal",
    { friendly_name: "SD card status" },
  ),
  [`sensor.${PREFIX}_tool_module`]: entity(
    `sensor.${PREFIX}_tool_module`,
    "none",
    { friendly_name: "Tool module" },
  ),
  [`sensor.${PREFIX}_total_usage`]: entity(
    `sensor.${PREFIX}_total_usage`,
    "820.89",
    { friendly_name: "Total usage" },
  ),
  [`light.${PREFIX}_chamber_light`]: entity(
    `light.${PREFIX}_chamber_light`,
    "on",
    { friendly_name: "Chamber light" },
  ),
  [`light.${PREFIX}_heatbed_light`]: entity(
    `light.${PREFIX}_heatbed_light`,
    "off",
    { friendly_name: "Heatbed light" },
  ),
  [`camera.${PREFIX}_camera`]: entity(
    `camera.${PREFIX}_camera`,
    "streaming",
    {
      entity_picture: "/preview/camera.svg",
      friendly_name: "H2D Camera",
      supported_features: 2,
    },
  ),
  [`image.${PREFIX}_cover_image`]: entity(
    `image.${PREFIX}_cover_image`,
    iso(now),
    { entity_picture: "/preview/cover.svg", friendly_name: "Cover image" },
  ),
  [`sensor.demo_printer_power`]: entity(
    "sensor.demo_printer_power",
    "312",
    { unit_of_measurement: "W", device_class: "power", state_class: "measurement", friendly_name: "Printer power" },
  ),
  [`sensor.demo_printer_current`]: entity(
    "sensor.demo_printer_current",
    "1.36",
    { unit_of_measurement: "A", device_class: "current", state_class: "measurement", friendly_name: "Printer current" },
  ),
  [`sensor.demo_printer_voltage`]: entity(
    "sensor.demo_printer_voltage",
    "231",
    { unit_of_measurement: "V", device_class: "voltage", state_class: "measurement", friendly_name: "Printer voltage" },
  ),
  [`sensor.demo_printer_energy`]: entity(
    "sensor.demo_printer_energy",
    "512.41",
    { unit_of_measurement: "kWh", device_class: "energy", state_class: "total_increasing", friendly_name: "Printer energy" },
  ),
  "sensor.real_electricity_price_current_price": entity(
    "sensor.real_electricity_price_current_price",
    "0.162000",
    {
      unit_of_measurement: "€/kWh",
      device_class: "monetary",
      friendly_name: "Current electricity price",
    },
  ),
  [`sensor.${PREFIX}_active_tray`]: entity(
    `sensor.${PREFIX}_active_tray`,
    "Bambu PLA Basic",
    {
      ams_index: 0,
      tray_index: 0,
      name: "Bambu PLA Basic",
      type: "PLA",
      color: "#C12E1FFF",
      cols: ["#C12E1FFF"],
      remain: 97,
      remain_enabled: true,
      friendly_name: "Active tray",
    },
  ),
  [`binary_sensor.${PREFIX}_ams_1_active`]: entity(
    `binary_sensor.${PREFIX}_ams_1_active`,
    "on",
    { friendly_name: "AMS 1 active" },
  ),
  [`binary_sensor.${PREFIX}_ams_2_active`]: entity(
    `binary_sensor.${PREFIX}_ams_2_active`,
    "off",
    { friendly_name: "AMS 2 active" },
  ),
  [`binary_sensor.${PREFIX}_ams_1_drying`]: entity(
    `binary_sensor.${PREFIX}_ams_1_drying`,
    "off",
    { friendly_name: "AMS 1 drying" },
  ),
  [`binary_sensor.${PREFIX}_ams_2_drying`]: entity(
    `binary_sensor.${PREFIX}_ams_2_drying`,
    "off",
    { friendly_name: "AMS 2 drying" },
  ),
  [`sensor.${PREFIX}_ams_1_temperature`]: entity(
    `sensor.${PREFIX}_ams_1_temperature`,
    "24.5",
    { unit_of_measurement: "°C", friendly_name: "AMS 1 temperature" },
  ),
  [`sensor.${PREFIX}_ams_2_temperature`]: entity(
    `sensor.${PREFIX}_ams_2_temperature`,
    "24.0",
    { unit_of_measurement: "°C", friendly_name: "AMS 2 temperature" },
  ),
  [`sensor.${PREFIX}_ams_1_humidity`]: entity(
    `sensor.${PREFIX}_ams_1_humidity`,
    "32",
    { unit_of_measurement: "%", friendly_name: "AMS 1 humidity" },
  ),
  [`sensor.${PREFIX}_ams_2_humidity`]: entity(
    `sensor.${PREFIX}_ams_2_humidity`,
    "26",
    { unit_of_measurement: "%", friendly_name: "AMS 2 humidity" },
  ),
  [`sensor.${PREFIX}_ams_1_tray_1`]: tray(1, 1, "Bambu PLA Basic", "PLA", "#C12E1F", 97, true),
  [`sensor.${PREFIX}_ams_1_tray_2`]: tray(1, 2, "Bambu PLA Matte", "PLA", "#F2E8D5", 64),
  [`sensor.${PREFIX}_ams_1_tray_3`]: tray(1, 3, "Bambu PETG HF", "PETG", "#1E88E5", 38),
  [`sensor.${PREFIX}_ams_1_tray_4`]: tray(1, 4, "Bambu ASA", "ASA", "#242424", 12),
  [`sensor.${PREFIX}_ams_2_tray_1`]: tray(2, 1, "Bambu PLA Basic", "PLA", "#F4F4F4", 88),
  [`sensor.${PREFIX}_ams_2_tray_2`]: tray(2, 2, "Bambu PLA Basic", "PLA", "#1A1A1A", 71),
  [`sensor.${PREFIX}_ams_2_tray_3`]: tray(2, 3, "Bambu PETG Basic", "PETG", "#E8A317", 45),
  [`sensor.${PREFIX}_ams_2_tray_4`]: tray(2, 4, "Bambu ASA", "ASA", "#7A5C43", 22),
  [`sensor.${PREFIX}_externalspool_external_spool`]: entity(
    `sensor.${PREFIX}_externalspool_external_spool`,
    "?",
    { empty: true, name: "?", friendly_name: "External spool" },
  ),
};

export const hass = {
  states,
  locale: { language: "en", time_zone: "Europe/Tallinn" },
  config: { time_zone: "Europe/Tallinn" },
  async callService() {
    throw new Error("The preview is read-only.");
  },
  async callApi(method, path) {
    if (method !== "GET") throw new Error("Unsupported preview API method");
    const match = /^history\/period\/([^?]+)\?(.*)$/.exec(path);
    if (!match) return [];
    const start = Date.parse(decodeURIComponent(match[1]));
    const params = new URLSearchParams(match[2]);
    const end = Date.parse(params.get("end_time") || "");
    const ids = decodeURIComponent(params.get("filter_entity_id") || "").split(",");
    if (!Number.isFinite(start) || !Number.isFinite(end)) return [];
    return ids.map((id) => {
      const points = historySeries(id, start, end);
      if (!points.length) return [];
      return points.map((point, index) => ({
        ...(index === 0 ? { entity_id: id } : {}),
        state: point.state,
        last_changed: point.last_changed,
      }));
    });
  },
};

export const cardConfig = {
  type: "custom:bambu-printer-card",
  printer_entity: `sensor.${PREFIX}_print_status`,
  name: "H2D",
  power_entity: "sensor.demo_printer_power",
  energy_entity: "sensor.demo_printer_energy",
  current_entity: "sensor.demo_printer_current",
  voltage_entity: "sensor.demo_printer_voltage",
  price_entity: "sensor.real_electricity_price_current_price",
  camera_entity: `camera.${PREFIX}_camera`,
  history_days: HISTORY_DAYS,
  currency: "EUR",
  show_camera: true,
  show_ams: true,
};
