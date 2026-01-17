---
id: configuration
title: Configuración
sidebar_label: Configuración
sidebar_position: 2
description: Guía de configuración avanzada de IncuNest
keywords: [configuración, parámetros, ajustes]
---
# Configuration

## Settings Panel

Access the settings from the **Settings** menu in the web interface or navigate to `http://{device_ip}/config`.

## Control Settings

### Temperature Parameters

| Parameter | Description | Range | Default |
|-----------|-------------|-------|---------|
| `temp_setpoint` | Target temperature | 25.0 - 37.5°C | 36.5°C |
| `temp_mode` | Control mode | auto/manual | car |
| `temp_hysteresis` | Hysteresis | 0.1 - 1.0°C | 0.3°C |

### PID parameters

```json
{
  "pid": {
    "kp": 2.0,
    "ki": 0.5,
    "kd": 1.0,
    "output_min": 0,
    "output_max": 100,
    "sample_time": 1000
  }
}
```

| Parameter | Description | Effect |
|-----------|-------------|--------|
| `kp` | Proportional gain | Higher = faster response, possible overshoot |
| `ki` | Comprehensive profit | Higher = eliminates static error, possible oscillation |
| `kd` | Derivative gain | Higher = reduces overshoot, sensitive to noise |

#### PID tuning

**Ziegler-Nichols method:**

1. Set Ki=0, Kd=0
2. Increase Kp until sustained oscillation
3. Write down Ku (critical Kp) and Tu (oscillation period)
4. Calculate:
- Kp = 0.6 × Ku
- Ki = 2 × Kp / Tu
- Kd = Kp × Tu / 8

### Humidity Parameters

| Parameter | Description | Range | Default |
|-----------|-------------|-------|---------|
| `humidity_setpoint` | Target humidity | 40 - 80% | 60% |
| `humidity_mode` | Control mode | auto/manual | car |
| `humidity_hysteresis` | Hysteresis | 2 - 10% | 5% |

## Alarm Settings

### Temperature Thresholds

```json
{
  "alarms": {
    "temperature": {
      "high_warning": 37.5,
      "high_alarm": 38.0,
      "low_warning": 34.0,
      "low_alarm": 32.0
    }
  }
}
```

### Humidity Thresholds

```json
{
  "alarms": {
    "humidity": {
      "high_warning": 75.0,
      "high_alarm": 85.0,
      "low_warning": 45.0,
      "low_alarm": 35.0
    }
  }
}
```

### Alarm Behavior

| Parameter | Description | Default |
|-----------|-------------|---------|
| `buzzer_enabled` | Enable audible alarm | true |
| `buzzer_volume` | Volume (if adjustable) | 100% |
| `auto_acknowledge_timeout` | Auto-mute (0=never) | 0 |
| `alarm_delay` | Delay before activating | 30s |

## Network Settings

### WiFi

```json
{
  "wifi": {
    "ssid": "MiRed",
    "password": "contraseña",
    "hostname": "incunest",
    "static_ip": null,
    "gateway": null,
    "subnet": null,
    "dns": null
  }
}
```

**Static IP (optional):**

```json
{
  "wifi": {
    "static_ip": "192.168.1.100",
    "gateway": "192.168.1.1",
    "subnet": "255.255.255.0",
    "dns": "8.8.8.8"
  }
}
```

### Web Server

| Parameter | Description | Default |
|-----------|-------------|---------|
| `http_port` | HTTP port | 80 |
| `ws_port` | WebSocket Port | 81 |
| `auth_enabled` | Authentication enabled | false |
| `auth_user` | User | admin |
| `auth_password` | Password | admin |

### MQTT

See [MQTT Documentation](../software/api/mqtt) for detailed configuration.

## Calibration Settings

### Sensor Offsets

```json
{
  "calibration": {
    "temp_ambient_offset": 0.0,
    "temp_skin_offset": 0.0,
    "humidity_offset": 0.0
  }
}
```

See [Calibration Guide](./calibration) for detailed procedures.

## System Configuration

### General

```json
{
  "system": {
    "device_name": "IncuNest Principal",
    "device_id": "INCUNEST_001",
    "language": "es",
    "timezone": "America/Mexico_City",
    "units": "metric"
  }
}
```

### Data Logging

```json
{
  "logging": {
    "enabled": true,
    "interval": 60,
    "max_records": 10000,
    "auto_export": false
  }
}
```

| Parameter | Description | Default |
|-----------|-------------|---------|
| `enabled` | Enable logging | true |
| `interval` | Interval between records (seconds) | 60 |
| `max_records` | Maximum records stored | 10000 |
| `auto_export` | Export automatically | false |

###Display

```json
{
  "display": {
    "brightness": 80,
    "timeout": 300,
    "show_clock": true,
    "temp_decimals": 1
  }
}
```

## Configuration File

The configuration is stored in SPIFFS in JSON format:

**Location:** `/config.json`

### Complete Structure

```json
{
  "version": "1.0.0",
  "device": {
    "name": "IncuNest Principal",
    "id": "INCUNEST_001"
  },
  "control": {
    "temperature": {
      "setpoint": 36.5,
      "mode": "auto",
      "hysteresis": 0.3
    },
    "humidity": {
      "setpoint": 60.0,
      "mode": "auto",
      "hysteresis": 5.0
    },
    "pid": {
      "kp": 2.0,
      "ki": 0.5,
      "kd": 1.0
    }
  },
  "alarms": {
    "temperature": {
      "high_warning": 37.5,
      "high_alarm": 38.0,
      "low_warning": 34.0,
      "low_alarm": 32.0
    },
    "humidity": {
      "high_warning": 75.0,
      "high_alarm": 85.0,
      "low_warning": 45.0,
      "low_alarm": 35.0
    },
    "buzzer_enabled": true
  },
  "network": {
    "wifi": {
      "ssid": "MiRed",
      "password": "contraseña"
    },
    "mqtt": {
      "enabled": false
    }
  },
  "calibration": {
    "temp_ambient_offset": 0.0,
    "temp_skin_offset": 0.0,
    "humidity_offset": 0.0
  },
  "logging": {
    "enabled": true,
    "interval": 60
  }
}
```

## Backup and Restore

### Export Settings

1. Go to **Settings > System > Backup**
2. Click on **Export Configuration**
3. `incunest_config_FECHA.json` file will be downloaded

### Import Settings

1. Go to **Settings > System > Backup**
2. Click on **Import Configuration**
3. Select the backup file
4. Review the changes and confirm

### Factory Reset

1. Go to **Settings > System > Reset**
2. Confirm the action
3. The device will reboot with default settings

**Hardware method:** Press and hold the reset button for 10 seconds.

## Upcoming Sections

- [Calibration](./calibration)
- [Maintenance](./maintenance)
