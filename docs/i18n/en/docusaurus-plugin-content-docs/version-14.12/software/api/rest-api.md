---
id: rest-api
title: API REST
sidebar_label: REST API
sidebar_position: 1
description: Documentación de la API REST de IncuNest
keywords: [API, REST, HTTP, endpoints]
---
# REST API

## General Information

IncuNest REST API allows you to control and monitor the device remotely.

**Base URL:** `http://<device_ip>/api`

**Response format:** JSON

**Authentication:** Basic Auth (optional, configurable)

## Endpoints

### System Status

#### GET /api/status

Gets the overall status of the device.

**Request:**
```http
GET /api/status HTTP/1.1
Host: 192.168.1.100
```

**Response:**
```json
{
  "success": true,
  "data": {
    "device_id": "INCUNEST_001",
    "firmware_version": "1.0.0",
    "hardware_version": "1.0",
    "uptime": 3600,
    "state": "OPERATING",
    "wifi": {
      "connected": true,
      "ssid": "MiRed",
      "rssi": -65,
      "ip": "192.168.1.100"
    },
    "memory": {
      "heap_free": 180000,
      "heap_total": 320000
    }
  }
}
```

### Sensors

#### GET /api/sensors

Gets current readings from all sensors.

**Response:**
```json
{
  "success": true,
  "data": {
    "timestamp": "2026-01-15T10:30:00Z",
    "temperature": {
      "ambient": {
        "value": 36.5,
        "unit": "celsius",
        "sensor": "SHT31",
        "valid": true
      },
      "skin": {
        "value": 36.8,
        "unit": "celsius",
        "sensor": "DS18B20",
        "valid": true
      }
    },
    "humidity": {
      "value": 65.2,
      "unit": "percent",
      "sensor": "SHT31",
      "valid": true
    },
    "water_level": {
      "ok": true,
      "level": "normal"
    }
  }
}
```

#### GET /api/sensors/history

Gets the reading history.

**Query Parameters:**
- `hours` (int): History hours (default: 24, max: 168)
- `interval` (int): Interval between samples in minutes (default: 5)

**Request:**
```http
GET /api/sensors/history?hours=6&interval=10 HTTP/1.1
```

**Response:**
```json
{
  "success": true,
  "data": {
    "start": "2026-01-15T04:30:00Z",
    "end": "2026-01-15T10:30:00Z",
    "interval_minutes": 10,
    "readings": [
      {
        "timestamp": "2026-01-15T04:30:00Z",
        "temperature": 36.2,
        "humidity": 62.5
      },
      {
        "timestamp": "2026-01-15T04:40:00Z",
        "temperature": 36.4,
        "humidity": 63.1
      }
    ]
  }
}
```

### Control

#### GET /api/control

Gets the current control settings.

**Response:**
```json
{
  "success": true,
  "data": {
    "temperature": {
      "setpoint": 36.5,
      "current": 36.3,
      "heater_power": 45,
      "mode": "auto"
    },
    "humidity": {
      "setpoint": 60.0,
      "current": 65.2,
      "humidifier_active": false,
      "mode": "auto"
    },
    "fan": {
      "speed": 50,
      "mode": "auto"
    }
  }
}
```

#### POST /api/control/temperature

Set the temperature control.

**Request:**
```http
POST /api/control/temperature HTTP/1.1
Content-Type: application/json

{
  "setpoint": 36.5,
  "mode": "auto"
}
```

**Body Parameters:**
- `setpoint` (float): Target temperature (25.0 - 37.5)
- `mode` (string): "auto" | "manual"
- `manual_power` (int, optional): Manual power 0-100 if mode="manual"

**Response:**
```json
{
  "success": true,
  "message": "Temperatura configurada",
  "data": {
    "setpoint": 36.5,
    "mode": "auto"
  }
}
```

#### POST /api/control/humidity

Set humidity control.

**Request:**
```json
{
  "setpoint": 60.0,
  "mode": "auto"
}
```

#### POST /api/control/fan

Set up the fan.

**Request:**
```json
{
  "speed": 50,
  "mode": "auto"
}
```

### Alarms

#### GET /api/alarms

Gets the active alarms.

**Response:**
```json
{
  "success": true,
  "data": {
    "active_count": 1,
    "alarms": [
      {
        "id": 1,
        "code": "TEMP_HIGH",
        "level": "WARNING",
        "message": "Temperatura alta: 37.8°C",
        "timestamp": "2026-01-15T10:25:00Z",
        "acknowledged": false
      }
    ]
  }
}
```

#### POST /api/alarms/:id/acknowledge

Recognize an alarm.

**Request:**
```http
POST /api/alarms/1/acknowledge HTTP/1.1
```

**Response:**
```json
{
  "success": true,
  "message": "Alarma reconocida"
}
```

#### GET /api/alarms/history

Gets the alarm history.

**Query Parameters:**
- `hours` (int): History hours (default: 24)
- `limit` (int): Maximum number of results (default: 100)

### Configuration

#### GET /api/config

Gets the current system configuration.

**Response:**
```json
{
  "success": true,
  "data": {
    "device": {
      "name": "IncuNest Principal",
      "id": "INCUNEST_001"
    },
    "control": {
      "pid": {
        "kp": 2.0,
        "ki": 0.5,
        "kd": 1.0
      },
      "limits": {
        "temp_min": 25.0,
        "temp_max": 38.0,
        "humidity_min": 40.0,
        "humidity_max": 80.0
      }
    },
    "alarms": {
      "temp_high_warning": 37.5,
      "temp_high_alarm": 38.0,
      "temp_low_warning": 34.0
    },
    "calibration": {
      "temp_ambient_offset": 0.0,
      "temp_skin_offset": 0.0,
      "humidity_offset": 0.0
    },
    "network": {
      "hostname": "incunest",
      "mqtt_enabled": false
    }
  }
}
```

#### POST /api/config

Update settings.

**Request:**
```json
{
  "control": {
    "pid": {
      "kp": 2.5,
      "ki": 0.4,
      "kd": 1.2
    }
  },
  "calibration": {
    "temp_ambient_offset": -0.3
  }
}
```

:::warning Caution
Changing the PID parameters may affect the stability of the control. Make small changes and observe the behavior.
:::

### System

#### POST /api/system/reboot

Restart the device.

**Request:**
```http
POST /api/system/reboot HTTP/1.1
```

**Response:**
```json
{
  "success": true,
  "message": "Reiniciando en 3 segundos..."
}
```

#### POST /api/system/factory-reset

Reset to factory settings.

**Request:**
```json
{
  "confirm": true
}
```

#### GET /api/system/logs

Gets the system logs.

**Query Parameters:**
- `lines` (int): Number of lines (default: 100)
- `level` (string): Minimum level ("DEBUG", "INFO", "WARNING", "ERROR")

## Error Codes

| HTTP Code | Meaning |
|-------------|-------------|
| 200 | Success |
| 400 | Invalid parameters |
| 401 | Unauthorized |
| 404 | Resource not found |
| 500 | Internal error |

**Error format:**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_PARAMETER",
    "message": "El setpoint debe estar entre 25.0 y 37.5"
  }
}
```

## Examples of Use

### cURL

```bash
# Obtener estado
curl http://192.168.1.100/api/status

# Configurar temperatura
curl -X POST http://192.168.1.100/api/control/temperature \
  -H "Content-Type: application/json" \
  -d '{"setpoint": 36.5, "mode": "auto"}'

# Con autenticación
curl -u admin:password http://192.168.1.100/api/status
```

###Python

```python
import requests

BASE_URL = "http://192.168.1.100/api"

# Obtener sensores
response = requests.get(f"{BASE_URL}/sensors")
data = response.json()
print(f"Temperatura: {data['data']['temperature']['ambient']['value']}°C")

# Configurar setpoint
payload = {"setpoint": 36.5, "mode": "auto"}
response = requests.post(f"{BASE_URL}/control/temperature", json=payload)
print(response.json())
```

### JavaScript

```javascript
// Obtener estado
fetch('http://192.168.1.100/api/status')
  .then(response => response.json())
  .then(data => console.log(data));

// Configurar temperatura
fetch('http://192.168.1.100/api/control/temperature', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ setpoint: 36.5, mode: 'auto' })
})
  .then(response => response.json())
  .then(data => console.log(data));
```

## Rate Limiting

- Maximum 60 requests per minute
- Response 429 if limit is exceeded

## Upcoming Sections

- [WebSocket API](./websocket)
- [MQTT](./mqtt)
