---
id: intro
title: Introducción a IncuNest
sidebar_label: Introducción
sidebar_position: 1
slug: /intro
description: IncuNest es una incubadora neonatal de código abierto diseñada para entornos con recursos limitados
keywords: [incubadora, neonatal, open source, código abierto, ESP32]
---
# Introduction to IncuNest

<div className="hero hero--primary">
<div className="container">
<h1 className="hero__title">🏥 IncuNest</h1>
<p className="hero__subtitle">Open Source Neonatal Incubator</p>
</div>
</div>

## What is IncuNest?

**IncuNest** is an open source hardware and software project that aims to provide a **low-cost, accessible neonatal incubator** for resource-limited settings. The project is designed to meet medical safety standards while maintaining ease of manufacturing and maintenance.

:::tip Project Mission
Reduce neonatal mortality by providing quality medical technology to communities that need it most.
:::

## Main Features

### 🌡️ Temperature Control
- Precise temperature control via PID
- Operating range: 25°C - 37°C
- Accuracy: ±0.1°C
- Multiple redundant temperature sensors

### 💧 Humidity Control
- Active humidification of the environment
- Humidity range: 40% - 80% RH
- Integrated water reservoir system

### 📊 Real Time Monitoring
- Integrated LCD/TFT screen
- Web interface accessible via WiFi
- Historical data recording
- Configurable alerts and alarms

### 🔒 Security
- Multiple alarm levels
- Overheat protection
- Backup battery for emergencies
- Failsafe design

## System Architecture

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

## Technical Specifications

| Parameter | Specification |
|-----------|----------------|
| **Microcontroller** | ESP32-WROOM-32 |
| **Temperature Range** | 25°C - 37°C |
| **Temperature Accuracy** | ±0.1°C |
| **Humidity Range** | 40% - 80% RH |
| **Feeding** | 12V DC / 110-220V AC |
| **Maximum Consumption** | 150W |
| **Connectivity** | WiFi 802.11 b/g/n |
| **Display** | 20x4 LCD / 3.5" TFT |

## License

IncuNest is licensed under **GPL-3.0**, which means that:

- ✅ You can use, modify and distribute the project
- ✅ You must keep the source code open
- ✅ You must include the same license in derivative works
- ✅ You must document the changes made

:::warning Security Notice
This project is for educational and research purposes. Any clinical use must comply with local medical regulations and require appropriate certification.
:::

## Next Steps

<div className="row">
<div className="col col--6">
<div className="card">
<div className="card__header">
<h3>🚀 Quick Start Guide</h3>
</div>
<div className="card__body">
<p>Learn how to set up your first IncuNest</p>
</div>
<div className="card__footer">
<a className="button button--primary button--block" href="./getting-started">Get Started</a>
</div>
</div>
</div>
<div className="col col--6">
<div className="card">
<div className="card__header">
<h3>🔧 Hardware</h3>
</div>
<div className="card__body">
<p>Explore components and assembly</p>
</div>
<div className="card__footer">
<a className="button button--secondary button--block" href="./hardware/overview">View Hardware</a>
</div>
</div>
</div>
</div>

## Contribute

IncuNest is a community project and we welcome all contributions. See our [contribution guide](./contributing) for more information.

---

<p align="center">
<strong>Medical Open World</strong> - Medical technology accessible to all
</p>
