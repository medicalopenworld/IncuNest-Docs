---
id: getting-started
title: Guía de Inicio Rápido
sidebar_label: Inicio Rápido
sidebar_position: 2
description: Guía completa para comenzar con IncuNest
keywords: [inicio, instalación, configuración, ESP32]
---

# Guía de Inicio Rápido

Esta guía te llevará a través de los pasos necesarios para configurar y poner en funcionamiento tu IncuNest.

<div style={{marginTop: '1rem'}}>
  <video
    controls
    preload="metadata"
    width="100%"
    src="/IncuNest-Docs/videos/es/user-interface.mp4"
  >
    Tu navegador no soporta la etiqueta de vídeo.
  </video>
  <p>
    <a href="/IncuNest-Docs/videos/es/user-interface.mp4" target="_blank" rel="noopener noreferrer">
      Ver en pantalla completa
    </a>
  </p>
</div>

## Requisitos Previos

### Hardware Necesario

- **ESP32-WROOM-32** o ESP32-WROVER
- Sensores de temperatura (DHT22 o SHT31)
- Elemento calefactor (resistencia cerámica)
- Fuente de alimentación 12V/10A
- Pantalla LCD 20x4 o TFT 3.5"
- PCB principal de IncuNest (ver [BOM completo](./hardware/assembly/bom))

### Software Necesario

- [Visual Studio Code](https://code.visualstudio.com/)
- [PlatformIO IDE](https://platformio.org/install/ide?install=vscode)
- [Git](https://git-scm.com/)
- Navegador web moderno (Chrome, Firefox, Edge)

## Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/medicalopenworld/IncuNest.git
cd IncuNest
```

## Paso 2: Configurar el Entorno de Desarrollo

### Instalar PlatformIO

1. Abre Visual Studio Code
2. Ve a Extensions (Ctrl+Shift+X)
3. Busca "PlatformIO IDE"
4. Instala la extensión

### Abrir el Proyecto

1. En VS Code, selecciona **File > Open Folder**
2. Navega hasta la carpeta `IncuNest/firmware`
3. PlatformIO detectará automáticamente el proyecto

## Paso 3: Configuración del Firmware

### Archivo de Configuración

Copia el archivo de configuración de ejemplo:

```bash
cd firmware
cp include/config_example.h include/config.h
```

### Editar Configuración

Abre `include/config.h` y ajusta los parámetros:

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

## Paso 4: Compilar y Cargar

### Compilar el Firmware

```bash
# Usando PlatformIO CLI
pio run

# O usando el botón de Build en VS Code (✓)
```

### Cargar al ESP32

1. Conecta el ESP32 via USB
2. Ejecuta:

```bash
pio run --target upload
```

O usa el botón de Upload (→) en VS Code.

## Paso 5: Verificar Funcionamiento

### Monitor Serial

Abre el monitor serial para verificar el arranque:

```bash
pio device monitor --baud 115200
```

Deberías ver:

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

### Acceder a la Interfaz Web

1. Abre un navegador
2. Navega a `http://[IP_DEL_ESP32]`
3. Deberías ver el dashboard de IncuNest

## Paso 6: Calibración Inicial

:::warning Importante
La calibración es esencial para garantizar mediciones precisas y seguras.
:::

### Calibrar Sensores de Temperatura

1. Accede a **Configuración > Calibración**
2. Coloca un termómetro de referencia certificado dentro de la cámara
3. Ajusta el offset hasta que las lecturas coincidan
4. Guarda la configuración

### Calibrar Sensor de Humedad

1. Usa una solución de sal saturada como referencia
2. Coloca la solución dentro de la cámara sellada
3. Espera 24 horas para estabilización
4. Ajusta el offset en la configuración

## Verificación Final

Completa la siguiente lista de verificación antes de usar IncuNest:

- [ ] Sensores de temperatura funcionando correctamente
- [ ] Sensor de humedad calibrado
- [ ] Sistema de calefacción responde al control
- [ ] Alarmas de seguridad activas
- [ ] Interfaz web accesible
- [ ] Registro de datos funcionando

## Resolución de Problemas

### El ESP32 no arranca

1. Verifica la conexión USB
2. Intenta con otro cable USB
3. Mantén presionado BOOT mientras conectas

### No conecta al WiFi

1. Verifica las credenciales en `config.h`
2. Asegúrate de que la red sea 2.4GHz
3. Acerca el dispositivo al router

### Lecturas de sensor incorrectas

1. Verifica las conexiones de los sensores
2. Revisa que los pines estén correctamente configurados
3. Ejecuta la calibración nuevamente

## Próximos Pasos

- 📖 [Guía de Instalación Completa](./guides/installation)
- 🔧 [Configuración Avanzada](./guides/configuration)
- 📊 [Calibración Detallada](./guides/calibration)
- 🛠️ [Mantenimiento](./guides/maintenance)
