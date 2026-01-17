---
id: intro
title: Introducción a IncuNest
sidebar_label: Introducción
sidebar_position: 1
slug: /intro
description: IncuNest es una incubadora neonatal de código abierto diseñada para entornos con recursos limitados
keywords: [incubadora, neonatal, open source, código abierto, ESP32]
---

# Introducción a IncuNest

<div className="hero hero--primary">
  <div className="container">
    <h1 className="hero__title">🏥 IncuNest</h1>
    <p className="hero__subtitle">Incubadora Neonatal de Código Abierto</p>
  </div>
</div>

## ¿Qué es IncuNest?

**IncuNest** es un proyecto de hardware y software de código abierto que tiene como objetivo proporcionar una **incubadora neonatal accesible y de bajo costo** para entornos con recursos limitados. El proyecto está diseñado para cumplir con los estándares de seguridad médica mientras mantiene la facilidad de fabricación y mantenimiento.

:::tip Misión del Proyecto
Reducir la mortalidad neonatal proporcionando tecnología médica de calidad a comunidades que más la necesitan.
:::

## Características Principales

### 🌡️ Control de Temperatura
- Control preciso de temperatura mediante PID
- Rango de operación: 25°C - 37°C
- Precisión: ±0.1°C
- Múltiples sensores de temperatura redundantes

### 💧 Control de Humedad
- Humidificación activa del ambiente
- Rango de humedad: 40% - 80% HR
- Sistema de reservorio de agua integrado

### 📊 Monitorización en Tiempo Real
- Pantalla LCD/TFT integrada
- Interfaz web accesible vía WiFi
- Registro de datos históricos
- Alertas y alarmas configurables

### 🔒 Seguridad
- Múltiples niveles de alarma
- Protección contra sobrecalentamiento
- Batería de respaldo para emergencias
- Diseño a prueba de fallos

## Arquitectura del Sistema

```mermaid
flowchart TB
    subgraph Hardware
        ESP32[ESP32 MCU]
        SENSORS[Sensores]
        ACTUATORS[Actuadores]
        DISPLAY[Pantalla]
        POWER[Fuente de Poder]
    end
    
    subgraph Sensores
        TEMP[Temperatura]
        HUM[Humedad]
        WEIGHT[Peso]
    end
    
    subgraph Actuadores
        HEATER[Calefactor]
        FAN[Ventilador]
        HUMIDIFIER[Humidificador]
    end
    
    subgraph Comunicación
        WIFI[WiFi]
        API[REST API]
        WS[WebSocket]
    end
    
    SENSORS --> ESP32
    ESP32 --> ACTUATORS
    ESP32 --> DISPLAY
    POWER --> ESP32
    ESP32 --> WIFI
    WIFI --> API
    WIFI --> WS
```

## Especificaciones Técnicas

| Parámetro | Especificación |
|-----------|----------------|
| **Microcontrolador** | ESP32-WROOM-32 |
| **Rango de Temperatura** | 25°C - 37°C |
| **Precisión de Temperatura** | ±0.1°C |
| **Rango de Humedad** | 40% - 80% HR |
| **Alimentación** | 12V DC / 110-220V AC |
| **Consumo Máximo** | 150W |
| **Conectividad** | WiFi 802.11 b/g/n |
| **Pantalla** | LCD 20x4 / TFT 3.5" |

## Licencia

IncuNest está licenciado bajo **MIT**, lo que significa que:

- ✅ Puedes usar, modificar y distribuir el proyecto, incluso con fines comerciales
- ✅ Debes incluir el aviso de copyright y la licencia MIT en copias o trabajos derivados
- ⚠️ No se ofrece garantía; úsalo bajo tu propio riesgo

:::warning Aviso de Seguridad
Este proyecto es para fines educativos y de investigación. Cualquier uso clínico debe cumplir con las regulaciones médicas locales y requerir certificación apropiada.
:::

## Próximos Pasos

<div className="row">
  <div className="col col--6">
    <div className="card">
      <div className="card__header">
        <h3>🚀 Guía de Inicio Rápido</h3>
      </div>
      <div className="card__body">
        <p>Aprende a configurar tu primera IncuNest</p>
      </div>
      <div className="card__footer">
        <a className="button button--primary button--block" href="./getting-started">Comenzar</a>
      </div>
    </div>
  </div>
  <div className="col col--6">
    <div className="card">
      <div className="card__header">
        <h3>🔧 Hardware</h3>
      </div>
      <div className="card__body">
        <p>Explora los componentes y ensamblaje</p>
      </div>
      <div className="card__footer">
        <a className="button button--secondary button--block" href="./hardware/overview">Ver Hardware</a>
      </div>
    </div>
  </div>
</div>

## Contribuir

IncuNest es un proyecto comunitario y agradecemos todas las contribuciones. Consulta nuestra [guía de contribución](./contributing) para más información.

---

<p align="center">
  <strong>Medical Open World</strong> - Tecnología médica accesible para todos
</p>
