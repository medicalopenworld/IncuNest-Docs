---
id: configuration
title: Configuración
sidebar_label: Configuración
sidebar_position: 2
description: Guía de configuración avanzada de IncuNest
keywords: [configuración, parámetros, ajustes]
---

# Configuración

## Panel de Configuración

Acceda a la configuración desde el menú **Configuración** en la interfaz web o navegue a `http://{device_ip}/config`.

## Configuración de Control

### Parámetros de Temperatura

| Parámetro | Descripción | Rango | Default |
|-----------|-------------|-------|---------|
| `temp_setpoint` | Temperatura objetivo | 25.0 - 37.5°C | 36.5°C |
| `temp_mode` | Modo de control | auto/manual | auto |
| `temp_hysteresis` | Histéresis | 0.1 - 1.0°C | 0.3°C |

### Parámetros PID

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

| Parámetro | Descripción | Efecto |
|-----------|-------------|--------|
| `kp` | Ganancia proporcional | Mayor = respuesta más rápida, posible overshoot |
| `ki` | Ganancia integral | Mayor = elimina error estático, posible oscilación |
| `kd` | Ganancia derivativa | Mayor = reduce overshoot, sensible a ruido |

#### Sintonización PID

**Método Ziegler-Nichols:**

1. Configure Ki = 0, Kd = 0
2. Aumente Kp hasta oscilación sostenida
3. Anote Ku (Kp crítico) y Tu (período de oscilación)
4. Calcule:
   - Kp = 0.6 × Ku
   - Ki = 2 × Kp / Tu
   - Kd = Kp × Tu / 8

### Parámetros de Humedad

| Parámetro | Descripción | Rango | Default |
|-----------|-------------|-------|---------|
| `humidity_setpoint` | Humedad objetivo | 40 - 80% | 60% |
| `humidity_mode` | Modo de control | auto/manual | auto |
| `humidity_hysteresis` | Histéresis | 2 - 10% | 5% |

## Configuración de Alarmas

### Umbrales de Temperatura

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

### Umbrales de Humedad

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

### Comportamiento de Alarmas

| Parámetro | Descripción | Default |
|-----------|-------------|---------|
| `buzzer_enabled` | Habilitar alarma sonora | true |
| `buzzer_volume` | Volumen (si es ajustable) | 100% |
| `auto_acknowledge_timeout` | Auto-silenciar (0=nunca) | 0 |
| `alarm_delay` | Retardo antes de activar | 30s |

## Configuración de Red

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

**IP Estática (opcional):**

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

### Servidor Web

| Parámetro | Descripción | Default |
|-----------|-------------|---------|
| `http_port` | Puerto HTTP | 80 |
| `ws_port` | Puerto WebSocket | 81 |
| `auth_enabled` | Autenticación habilitada | false |
| `auth_user` | Usuario | admin |
| `auth_password` | Contraseña | admin |

### MQTT

Ver [Documentación MQTT](../software/api/mqtt) para configuración detallada.

## Configuración de Calibración

### Offsets de Sensores

```json
{
  "calibration": {
    "temp_ambient_offset": 0.0,
    "temp_skin_offset": 0.0,
    "humidity_offset": 0.0
  }
}
```

Ver [Guía de Calibración](./calibration) para procedimientos detallados.

## Configuración del Sistema

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

### Registro de Datos

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

| Parámetro | Descripción | Default |
|-----------|-------------|---------|
| `enabled` | Habilitar registro | true |
| `interval` | Intervalo entre registros (segundos) | 60 |
| `max_records` | Máximo de registros almacenados | 10000 |
| `auto_export` | Exportar automáticamente | false |

### Display

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

## Archivo de Configuración

La configuración se almacena en SPIFFS en formato JSON:

**Ubicación:** `/config.json`

### Estructura Completa

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

## Respaldo y Restauración

### Exportar Configuración

1. Vaya a **Configuración > Sistema > Respaldo**
2. Click en **Exportar Configuración**
3. Se descargará archivo `incunest_config_FECHA.json`

### Importar Configuración

1. Vaya a **Configuración > Sistema > Respaldo**
2. Click en **Importar Configuración**
3. Seleccione el archivo de respaldo
4. Revise los cambios y confirme

### Restablecer Valores de Fábrica

1. Vaya a **Configuración > Sistema > Restablecer**
2. Confirme la acción
3. El dispositivo se reiniciará con configuración por defecto

**Método de hardware:** Mantenga presionado el botón de reset durante 10 segundos.

## Próximas Secciones

- [Calibración](./calibration)
- [Mantenimiento](./maintenance)
