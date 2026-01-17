---
id: getting-started
title: Quick Start Guide
sidebar_label: Quick Start
sidebar_position: 2
description: Complete guide to get started with IncuNest
keywords: [getting started, installation, configuration, ESP32]
---
# Quick Start Guide

This guide will take you through the steps necessary to set up and get your IncuNest up and running.

<div style={{marginTop: '1rem'}}>
  <video
    controls
    preload="metadata"
    width="100%"
    src="/IncuNest-Docs/videos/en/user-interface.mp4"
  >
    Your browser does not support the video tag.
  </video>
  <p>
    <a href="/IncuNest-Docs/videos/en/user-interface.mp4" target="_blank" rel="noopener noreferrer">
      Watch full screen
    </a>
  </p>
</div>

## Prerequisites

### Required Hardware

- **ESP32-WROOM-32** or ESP32-WROVER
- Temperature sensors (DHT22 or SHT31)
- Heating element (ceramic resistance)
- Power supply 12V/10A
- 20x4 LCD or 3.5" TFT screen
- IncuNest main PCB (see [full BOM](./hardware/assembly/bom))

### Required Software

- [Visual Studio Code](https://code.visualstudio.com/)
- [PlatformIO IDE](https://platformio.org/install/ide?install=vscode)
- [Git](https://git-scm.com/)
- Modern web browser (Chrome, Firefox, Edge)

## Step 1: Clone the Repository

```bash
git clone https://github.com/medicalopenworld/IncuNest.git
cd IncuNest
```

## Step 2: Configure the Development Environment

### Install PlatformIO

1. Open Visual Studio Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "PlatformIO IDE"
4. Install the extension

### Open the Project

1. In VS Code, select **File > Open Folder**
2. Navigate to the `IncuNest/firmware` folder
3. PlatformIO will automatically detect the project

## Step 3: Firmware Configuration

### Configuration File

Copy the example configuration file:

```bash
cd firmware
cp include/config_example.h include/config.h
```

### Edit Settings

Open `include/config.h` and adjust the parameters:

```cpp
// Configuración WiFi
#define WIFI_SSID "TuRedWiFi"
#define WIFI_PASSWORD "TuContraseña"

// Configuración de Sensores
#define TEMP_SENSOR_PIN 4
#define HUMIDITY_SENSOR_PIN 5

// Parámetros de Control
#define DEFAULT_TARGET_TEMP 36.5
#define DEFAULT_TARGET_HUMIDITY 60.0

// Parámetros PID
#define KP 2.0
#define KI 0.5
#define KD 1.0
```

## Step 4: Compile and Upload

### Compile Firmware

```bash
# Usando PlatformIO CLI
pio run

# O usando el botón de Build en VS Code (✓)
```

### Upload to ESP32

1. Connect the ESP32 via USB
2. Run:

```bash
pio run --target upload
```

Or use the Upload button (→) in VS Code.

## Step 5: Verify Operation

### Serial Monitor

Open the serial monitor to verify boot:

```bash
pio device monitor --baud 115200
```

You should see:

```
[INFO] IncuNest v1.0.0 Starting...
[INFO] Initializing sensors...
[OK] Temperature sensor initialized
[OK] Humidity sensor initialized
[INFO] Connecting to WiFi...
[OK] Connected! IP: 192.168.1.100
[INFO] Starting control loop...
[OK] System ready!
```

### Access the Web Interface

1. Open a browser
2. Navigate to `http://[IP_DEL_ESP32]`
3. You should see the IncuNest dashboard

## Step 6: Initial Calibration

:::warning Important
Calibration is essential to ensure accurate and safe measurements.
:::

### Calibrate Temperature Sensors

1. Go to **Settings > Calibration**
2. Place a certified reference thermometer inside the chamber
3. Adjust the offset until the readings match
4. Save settings

### Calibrate Humidity Sensor

1. Use a saturated salt solution as a reference
2. Place the solution inside the sealed chamber
3. Wait 24 hours for stabilization
4. Adjust the offset in settings

## Final Verification

Complete the following checklist before using IncuNest:

- [ ] Temperature sensors working correctly
- [ ] Calibrated humidity sensor
- [ ] Heating system responds to control
- [ ] Active security alarms
- [ ] Accessible web interface
- [ ] Data logging working

## Troubleshooting

### ESP32 does not start

1. Check the USB connection
2. Try another USB cable
3. Press and hold BOOT while connecting

### Does not connect to WiFi

1. Verify the credentials in `config.h`
2. Make sure the network is 2.4GHz
3. Bring the device closer to the router

### Incorrect sensor readings

1. Check the sensor connections
2. Check that the pins are correctly configured
3. Run the calibration again

## Next Steps

- 📖 [Complete Installation Guide](./guides/installation)
- 🔧 [Advanced Settings](./guides/configuration)
- 📊 [Detailed Calibration](./guides/calibration)
- 🛠️ [Maintenance](./guides/maintenance)
