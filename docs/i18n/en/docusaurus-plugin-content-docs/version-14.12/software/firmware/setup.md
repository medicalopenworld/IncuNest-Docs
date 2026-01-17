---
id: setup
title: Configuración del Entorno de Desarrollo
sidebar_label: Setup
sidebar_position: 1
description: Guía para configurar el entorno de desarrollo de firmware
keywords: [desarrollo, setup, PlatformIO, ESP32]
---
# Development Environment Configuration

## Prerequisites

### Hardware

- Computer with Windows, macOS or Linux
- USB-A to Micro-USB cable
- ESP32-WROOM-32 board (DevKit or similar)
- (Optional) USB-Serial adapter if the board does not have one integrated

### Software

- [Visual Studio Code](https://code.visualstudio.com/)
- [PlatformIO IDE](https://platformio.org/platformio-ide)
- [Git](https://git-scm.com/)
- (Optional) [Arduino IDE](https://www.arduino.cc/en/software) as an alternative

##PlatformIO installation

### Step 1: Install Visual Studio Code

1. Download VS Code from [code.visualstudio.com](https://code.visualstudio.com/)
2. Install following the installer instructions
3. Open VS Code

### Step 2: Install PlatformIO Extension

1. In VS Code, go to **Extensions** (Ctrl+Shift+X)
2. Search for "PlatformIO IDE"
3. Click on **Install**
4. Wait for the installation to complete
5. Restart VS Code when prompted

### Step 3: Verify Installation

1. Click on the PlatformIO (alien) icon in the sidebar
2. You should see the PlatformIO Home menu
3. Click on **New Terminal** and execute:

```bash
pio --version
# Debería mostrar: PlatformIO Core, version X.X.X
```

## Clone the Repository

```bash
# Clonar el repositorio
git clone https://github.com/medicalopenworld/IncuNest.git
cd IncuNest/firmware

# Abrir en VS Code
code .
```

## PlatformIO Project Structure

```
firmware/
├── platformio.ini      # Configuración del proyecto
├── src/
│   └── main.cpp        # Código principal
├── include/
│   └── config.h        # Configuración
├── lib/
│   └── README          # Librerías locales
├── test/
│   └── README          # Tests unitarios
└── data/
    └── www/            # Archivos web (SPIFFS)
```

## Platformio.ini configuration

```ini
[env:esp32]
platform = espressif32
board = esp32dev
framework = arduino
monitor_speed = 115200
upload_speed = 921600

; Librerías
lib_deps =
    adafruit/Adafruit SHT31 Library@^2.2.0
    paulstoffregen/OneWire@^2.3.7
    milesburton/DallasTemperature@^3.11.0
    bogde/HX711@^0.7.5
    knolleary/PubSubClient@^2.8
    bblanchon/ArduinoJson@^6.21.3
    me-no-dev/ESPAsyncWebServer@^1.2.3
    me-no-dev/AsyncTCP@^1.1.1

; Particiones personalizadas para SPIFFS
board_build.partitions = partitions.csv

; Flags de compilación
build_flags =
    -DCORE_DEBUG_LEVEL=3
    -DBOARD_HAS_PSRAM=0
```

## Install Dependencies

Dependencies are installed automatically when you build, but you can do this manually:

```bash
# Desde terminal de PlatformIO
pio lib install

# O especificar una librería
pio lib install "Adafruit SHT31 Library"
```

## Compile the Project

### From VS Code

1. Click on the **PlatformIO** icon (alien)
2. Expand **PROJECT TASKS**
3. Click **Build** (or press Ctrl+Alt+B)

### From Terminal

```bash
pio run
```

**Expected output:**
```
Processing esp32 (platform: espressif32; board: esp32dev)
...
Building .pio/build/esp32/firmware.bin
================================ SUCCESS ================================
```

## Load Firmware to ESP32

### Connect the ESP32

1. Connect the ESP32 via USB
2. Verify that the port is detected:

```bash
# Linux
ls /dev/ttyUSB*

# macOS
ls /dev/cu.usbserial*

# Windows
# Ver en Administrador de Dispositivos > Puertos (COM)
```

### Load from VS Code

1. Click on **Upload** in PlatformIO
2. Or press Ctrl+Alt+U

### Load from Terminal

```bash
pio run --target upload
```

### Load File System (SPIFFS)

If the project uses web files:

```bash
pio run --target uploadfs
```

## Serial Monitor

To view the ESP32 logs:

### From VS Code

Click on **Serial Monitor** or press Ctrl+Alt+S

### From Terminal

```bash
pio device monitor
```

**Useful options:**
```bash
# Especificar puerto
pio device monitor -p /dev/ttyUSB0

# Especificar baudrate
pio device monitor -b 115200

# Con filtro de colores
pio device monitor --filter colorize
```

## Debug Configuration (Optional)

For advanced debugging with JTAG:

```ini
; En platformio.ini
[env:esp32-debug]
extends = env:esp32
build_type = debug
debug_tool = esp-prog
debug_init_break = tbreak setup
```

## Environment Variables

Create a `include/secrets.h` file for credentials:

```cpp
// secrets.h - NO SUBIR A GIT
#ifndef SECRETS_H
#define SECRETS_H

#define WIFI_SSID "MiRed"
#define WIFI_PASSWORD "MiContraseña"
#define MQTT_USER "usuario"
#define MQTT_PASSWORD "contraseña"

#endif
```

Add to `.gitignore`:
```
include/secrets.h
```

## Troubleshooting

### Port not detected

**Linux:**
```bash
# Agregar usuario al grupo dialout
sudo usermod -a -G dialout $USER
# Reiniciar sesión
```

**Windows:**
- Install CP210x or CH340 drivers depending on the USB chip

### Compilation error

```bash
# Limpiar y recompilar
pio run --target clean
pio run
```

### Upload error

1. Verify that the port is correct
2. Press and hold BOOT while connecting
3. Check USB cable (some only charge)

### Out of memory

```
Error: region `dram0_0_seg' overflowed
```

Solution: Optimize code or use partition with more DRAM

## Next Steps

- [Firmware Architecture](./architecture)
- [Control System](./control-system)
- [Code Standards](../development/coding-standards)
