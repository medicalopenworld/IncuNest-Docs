---
id: rest-api
title: API REST
sidebar_label: REST API
sidebar_position: 1
description: Documentación de la API REST de IncuNest
keywords: [API, REST, HTTP, endpoints]
---

# API REST

## Información General

La API REST de IncuNest permite controlar y monitorear el dispositivo remotamente.

**Base URL:** `http://<device_ip>/api`

**Formato de respuesta:** JSON

**Autenticación:** Basic Auth (opcional, configurable)

## Endpoints

### Estado del Sistema

#### GET /api/status

Obtiene el estado general del dispositivo.

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

### Sensores

#### GET /api/sensors

Obtiene las lecturas actuales de todos los sensores.

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

Obtiene el historial de lecturas.

**Query Parameters:**
- `hours` (int): Horas de historial (default: 24, max: 168)
- `interval` (int): Intervalo entre muestras en minutos (default: 5)

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

Obtiene la configuración actual de control.

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

Configura el control de temperatura.

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
- `setpoint` (float): Temperatura objetivo (25.0 - 37.5)
- `mode` (string): "auto" | "manual"
- `manual_power` (int, opcional): Potencia manual 0-100 si mode="manual"

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

Configura el control de humedad.

**Request:**
```json
{
  "setpoint": 60.0,
  "mode": "auto"
}
```

#### POST /api/control/fan

Configura el ventilador.

**Request:**
```json
{
  "speed": 50,
  "mode": "auto"
}
```

### Alarmas

#### GET /api/alarms

Obtiene las alarmas activas.

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

Reconoce una alarma.

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

Obtiene el historial de alarmas.

**Query Parameters:**
- `hours` (int): Horas de historial (default: 24)
- `limit` (int): Número máximo de resultados (default: 100)

### Configuración

#### GET /api/config

Obtiene la configuración actual del sistema.

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

Actualiza la configuración.

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

:::warning Precaución
Cambiar los parámetros PID puede afectar la estabilidad del control. Haga cambios pequeños y observe el comportamiento.
:::

### Sistema

#### POST /api/system/reboot

Reinicia el dispositivo.

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

Restablece la configuración de fábrica.

**Request:**
```json
{
  "confirm": true
}
```

#### GET /api/system/logs

Obtiene los logs del sistema.

**Query Parameters:**
- `lines` (int): Número de líneas (default: 100)
- `level` (string): Nivel mínimo ("DEBUG", "INFO", "WARNING", "ERROR")

## Códigos de Error

| Código HTTP | Significado |
|-------------|-------------|
| 200 | Éxito |
| 400 | Parámetros inválidos |
| 401 | No autorizado |
| 404 | Recurso no encontrado |
| 500 | Error interno |

**Formato de error:**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_PARAMETER",
    "message": "El setpoint debe estar entre 25.0 y 37.5"
  }
}
```

## Ejemplos de Uso

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

### Python

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

- Máximo 60 requests por minuto
- Respuesta 429 si se excede el límite

## Próximas Secciones

- [WebSocket API](./websocket)
- [MQTT](./mqtt)
