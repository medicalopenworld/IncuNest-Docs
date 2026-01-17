---
id: setup
title: Configuración del Entorno de Desarrollo
sidebar_label: Setup
sidebar_position: 1
description: Guía para configurar el entorno de desarrollo de firmware
keywords: [desarrollo, setup, PlatformIO, ESP32]
---

# Configuración del Entorno de Desarrollo

## Requisitos Previos

### Hardware

- Computadora con Windows, macOS o Linux
- Cable USB-A a Micro-USB
- Placa ESP32-WROOM-32 (DevKit o similar)
- (Opcional) Adaptador USB-Serial si la placa no tiene integrado

### Software

- [Visual Studio Code](https://code.visualstudio.com/)
- [PlatformIO IDE](https://platformio.org/platformio-ide)
- [Git](https://git-scm.com/)
- (Opcional) [Arduino IDE](https://www.arduino.cc/en/software) como alternativa

## Instalación de PlatformIO

### Paso 1: Instalar Visual Studio Code

1. Descargue VS Code desde [code.visualstudio.com](https://code.visualstudio.com/)
2. Instale siguiendo las instrucciones del instalador
3. Abra VS Code

### Paso 2: Instalar Extensión PlatformIO

1. En VS Code, vaya a **Extensions** (Ctrl+Shift+X)
2. Busque "PlatformIO IDE"
3. Click en **Install**
4. Espere a que complete la instalación
5. Reinicie VS Code cuando se solicite

### Paso 3: Verificar Instalación

1. Click en el icono de PlatformIO (alien) en la barra lateral
2. Debería ver el menú de PlatformIO Home
3. Click en **New Terminal** y ejecute:

```bash
pio --version
# Debería mostrar: PlatformIO Core, version X.X.X
```

## Clonar el Repositorio

```bash
# Clonar el repositorio
git clone https://github.com/medicalopenworld/IncuNest.git
cd IncuNest/firmware

# Abrir en VS Code
code .
```

## Estructura del Proyecto PlatformIO

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

## Configuración de platformio.ini

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

## Instalar Dependencias

Las dependencias se instalan automáticamente al compilar, pero puede hacerlo manualmente:

```bash
# Desde terminal de PlatformIO
pio lib install

# O especificar una librería
pio lib install "Adafruit SHT31 Library"
```

## Compilar el Proyecto

### Desde VS Code

1. Click en el icono de **PlatformIO** (alien)
2. Expanda **PROJECT TASKS**
3. Click en **Build** (o presione Ctrl+Alt+B)

### Desde Terminal

```bash
pio run
```

**Salida esperada:**
```
Processing esp32 (platform: espressif32; board: esp32dev)
...
Building .pio/build/esp32/firmware.bin
================================ SUCCESS ================================
```

## Cargar Firmware al ESP32

### Conectar el ESP32

1. Conecte el ESP32 vía USB
2. Verifique que el puerto sea detectado:

```bash
# Linux
ls /dev/ttyUSB*

# macOS
ls /dev/cu.usbserial*

# Windows
# Ver en Administrador de Dispositivos > Puertos (COM)
```

### Cargar desde VS Code

1. Click en **Upload** en PlatformIO
2. O presione Ctrl+Alt+U

### Cargar desde Terminal

```bash
pio run --target upload
```

### Cargar Sistema de Archivos (SPIFFS)

Si el proyecto usa archivos web:

```bash
pio run --target uploadfs
```

## Monitor Serial

Para ver los logs del ESP32:

### Desde VS Code

Click en **Serial Monitor** o presione Ctrl+Alt+S

### Desde Terminal

```bash
pio device monitor
```

**Opciones útiles:**
```bash
# Especificar puerto
pio device monitor -p /dev/ttyUSB0

# Especificar baudrate
pio device monitor -b 115200

# Con filtro de colores
pio device monitor --filter colorize
```

## Configuración de Debug (Opcional)

Para debugging avanzado con JTAG:

```ini
; En platformio.ini
[env:esp32-debug]
extends = env:esp32
build_type = debug
debug_tool = esp-prog
debug_init_break = tbreak setup
```

## Variables de Entorno

Cree un archivo `include/secrets.h` para credenciales:

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

Agregue a `.gitignore`:
```
include/secrets.h
```

## Solución de Problemas

### Puerto no detectado

**Linux:**
```bash
# Agregar usuario al grupo dialout
sudo usermod -a -G dialout $USER
# Reiniciar sesión
```

**Windows:**
- Instalar drivers CP210x o CH340 según el chip USB

### Error de compilación

```bash
# Limpiar y recompilar
pio run --target clean
pio run
```

### Error de upload

1. Verifique que el puerto esté correcto
2. Mantenga presionado BOOT mientras conecta
3. Verifique cable USB (algunos solo cargan)

### Memoria insuficiente

```
Error: region `dram0_0_seg' overflowed
```

Solución: Optimizar código o usar partición con más DRAM

## Próximos Pasos

- [Arquitectura del Firmware](./architecture)
- [Sistema de Control](./control-system)
- [Estándares de Código](../development/coding-standards)
