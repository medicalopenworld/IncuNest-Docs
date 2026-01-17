---
id: setup
title: Configuração do Ambiente de Desenvolvimento
sidebar_label: Setup
sidebar_position: 1
description: Guia para configurar o ambiente de desenvolvimento do firmware
keywords: [desarrollo, setup, PlatformIO, ESP32]
---

# Configuração do Ambiente de Desenvolvimento

## Requisitos Anteriores

## Hardware

- Computador com Windows, macOS ou Linux
- Cabo USB-A para Micro-USB
- Placa ESP32-WROOM-32 (DevKit ou similar)
- (Opcional) Adaptador USB-Serial se a placa não tiver integrado

## Software

- [Visual Studio Code] (https://code.visualstudio.com/)
- [PlatformIO IDE] (https://platformio.org/platformio-ide)
- [Git] (https://git-scm.com/)
- (Opcional) [Arduino IDE] (https://www.arduino.cc/en/software) como alternativa

## Instalação da PlataformaIO

### Passo 1: Instalar o Visual Studio Code

1. Baixe o VS Code a partir de [code.visualstudio.com] (https://code.visualstudio.com/)
2. Instale a seguir as instruções do instalador
3. Abra VS Code

### Passo 2: Instalar a Extensão PlatformIO

1. No VS Code, vá a **Extensions** (Ctrl+Shift+X)
2. Procure "PlatformIO IDE"
3. Clique em **Install**
4. Espere até completar a instalação
5. Reinicie VS Code quando solicitado

### Passo 3: Verificar a Instalação

1. Clique no ícone da PlatformIO (alien) na barra lateral
2. Deveria ver o menu PlatformIO Home
3. Clique em **New Terminal** e execute:

```bash
pio --version
# Debería mostrar: PlatformIO Core, version X.X.X
```

# Clonar o Repositório

```bash
# Clonar el repositorio
git clone https://github.com/medicalopenworld/IncuNest.git
cd IncuNest/firmware

# Abrir en VS Code
code .
```

## Estrutura do Projeto PlatformIO

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

## Configuração do platformio.ini

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

## Instalar Dependeções

As dependências são instaladas automaticamente ao compilar, mas você pode fazê-lo manualmente:

```bash
# Desde terminal de PlatformIO
pio lib install

# O especificar una librería
pio lib install "Adafruit SHT31 Library"
```

## Compilar o Projeto

### De VS Code

1. Clique no ícone **PlatformIO** (alien)
2. Expanda **PROJECT TASKS**
3. Clique em **Build** (ou pressione Ctrl+Alt+B)

### De Terminal

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

## Carregar Firmware para o ESP32

## Ligar o ESP32

1. Ligue o ESP32 via USB
2. Verifique se o porto é detectado:

```bash
# Linux
ls /dev/ttyUSB*

# macOS
ls /dev/cu.usbserial*

# Windows
# Ver en Administrador de Dispositivos > Puertos (COM)
```

## Carregar do VS Code

1. Clique em **Upload** em PlatformIO
2. Ou pressione Ctrl+Alt+U

## Carregar do Terminal

```bash
pio run --target upload
```

### Carregar Sistema de Ficheiros (SPIFFS)

Se o projeto usa arquivos web:

```bash
pio run --target uploadfs
```

# Monitor Serial

Para ver os logs do ESP32:

### De VS Code

Clique em **Serial Monitor** ou pressione Ctrl+Alt+S

### De Terminal

```bash
pio device monitor
```

**Opções úteis:**
```bash
# Especificar puerto
pio device monitor -p /dev/ttyUSB0

# Especificar baudrate
pio device monitor -b 115200

# Con filtro de colores
pio device monitor --filter colorize
```

## Configuração do Debug (Opcional)

Para debugging avançado com JTAG:

```ini
; En platformio.ini
[env:esp32-debug]
extends = env:esp32
build_type = debug
debug_tool = esp-prog
debug_init_break = tbreak setup
```

## Variáveis de Ambiente

Crie um ficheiro `include/secrets.h` para credenciais:

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

Agregue para `.gitignore`:
```
include/secrets.h
```

## Solução de Problemas

### Porto não detectado

**Linux:**
```bash
# Agregar usuario al grupo dialout
sudo usermod -a -G dialout $USER
# Reiniciar sesión
```

**Windows:**
- Instalar drivers CP210x ou CH340 de acordo com o chip USB

## Erro de compilação

```bash
# Limpiar y recompilar
pio run --target clean
pio run
```

### Erro de upload

1. Verifique se o porto está correcto
2. Mantenha o BOOT pressionado enquanto liga
3. Verifique o cabo USB (alguns só carregam)

### Memória insuficiente

```
Error: region `dram0_0_seg' overflowed
```

Solução: Otimizar código ou usar partição com mais DRAM

## Próximos Passos

- [Arquitectura do Firmware] (./architecture)
- [Sistema de Controlo] (./control-system)
- [Estãodares de Código] (../development/coding-standards)