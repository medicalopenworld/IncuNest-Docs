---
id: webapp-deployment
title: Despliegue de la Web App
sidebar_label: Despliegue
sidebar_position: 3
description: Guía de despliegue de la aplicación web de IncuNest
keywords: [despliegue, SPIFFS, build, producción]
---

# Despliegue de la Web App

## Build de Producción

### Compilar para Producción

```bash
cd webapp

# Instalar dependencias
npm install

# Build de producción
npm run build
```

Esto genera la carpeta `dist/` con los archivos optimizados.

### Optimizaciones Aplicadas

- Minificación de JavaScript y CSS
- Tree-shaking de código no usado
- Compresión de assets
- Code splitting

## Despliegue en ESP32 (SPIFFS)

### Estructura de Archivos

```
data/
├── index.html        # ~5KB
├── assets/
│   ├── index-xxx.js  # ~50KB (gzipped)
│   └── index-xxx.css # ~10KB (gzipped)
├── favicon.ico
└── manifest.json
```

### Configuración de PlatformIO

```ini
; platformio.ini
[env:esp32]
platform = espressif32
board = esp32dev
framework = arduino

; Configuración de SPIFFS
board_build.filesystem = spiffs
board_build.partitions = partitions.csv

; Scripts para copiar webapp
extra_scripts = 
    pre:scripts/copy_webapp.py
```

### Script de Copia

```python
# scripts/copy_webapp.py
Import("env")
import shutil
import os

def copy_webapp(source, target, env):
    webapp_dist = os.path.join(env['PROJECT_DIR'], '..', 'webapp', 'dist')
    data_dir = os.path.join(env['PROJECT_DIR'], 'data')
    
    # Limpiar directorio data
    if os.path.exists(data_dir):
        shutil.rmtree(data_dir)
    
    # Copiar webapp build
    shutil.copytree(webapp_dist, data_dir)
    print("Web app copied to data/")

env.AddPreAction("buildfs", copy_webapp)
```

### Tabla de Particiones

```csv
# partitions.csv
# Name,   Type, SubType, Offset,  Size, Flags
nvs,      data, nvs,     0x9000,  0x5000,
otadata,  data, ota,     0xe000,  0x2000,
app0,     app,  ota_0,   0x10000, 0x140000,
app1,     app,  ota_1,   0x150000,0x140000,
spiffs,   data, spiffs,  0x290000,0x160000,
```

### Subir a ESP32

```bash
# Build del sistema de archivos
pio run --target buildfs

# Subir firmware
pio run --target upload

# Subir SPIFFS
pio run --target uploadfs
```

## Servidor Web en ESP32

### Configuración del Servidor

```cpp
#include <ESPAsyncWebServer.h>
#include <SPIFFS.h>

AsyncWebServer server(80);

void setupWebServer() {
    // Iniciar SPIFFS
    if (!SPIFFS.begin(true)) {
        Serial.println("SPIFFS mount failed");
        return;
    }
    
    // Servir archivos estáticos
    server.serveStatic("/", SPIFFS, "/")
        .setDefaultFile("index.html")
        .setCacheControl("max-age=600");  // Cache de 10 minutos
    
    // API endpoints
    server.on("/api/sensors", HTTP_GET, handleSensors);
    server.on("/api/config", HTTP_GET, handleGetConfig);
    server.on("/api/config", HTTP_POST, handleSetConfig);
    
    // WebSocket
    server.addHandler(&webSocket);
    
    // Manejo de 404
    server.onNotFound([](AsyncWebServerRequest *request) {
        // SPA: redirigir a index.html
        request->send(SPIFFS, "/index.html", "text/html");
    });
    
    server.begin();
    Serial.println("Web server started");
}
```

### Compresión Gzip

Para reducir el tamaño, servir archivos gzip:

```cpp
// Verificar si existe versión gzip
String path = request->url();
if (SPIFFS.exists(path + ".gz")) {
    AsyncWebServerResponse *response = request->beginResponse(
        SPIFFS, path + ".gz", getContentType(path));
    response->addHeader("Content-Encoding", "gzip");
    request->send(response);
}
```

## OTA (Over-The-Air) Update

### Endpoint de Actualización

```cpp
#include <Update.h>

void setupOTA() {
    server.on("/update", HTTP_POST,
        // Response
        [](AsyncWebServerRequest *request) {
            bool success = !Update.hasError();
            request->send(200, "text/plain", success ? "OK" : "FAIL");
            if (success) {
                delay(1000);
                ESP.restart();
            }
        },
        // Upload handler
        [](AsyncWebServerRequest *request, String filename, 
           size_t index, uint8_t *data, size_t len, bool final) {
            if (!index) {
                Serial.printf("Update: %s\n", filename.c_str());
                if (!Update.begin(UPDATE_SIZE_UNKNOWN)) {
                    Update.printError(Serial);
                }
            }
            
            if (Update.write(data, len) != len) {
                Update.printError(Serial);
            }
            
            if (final) {
                if (Update.end(true)) {
                    Serial.printf("Update Success: %u bytes\n", index + len);
                } else {
                    Update.printError(Serial);
                }
            }
        }
    );
}
```

### Actualizar desde Web App

```typescript
async function uploadFirmware(file: File): Promise<boolean> {
  const formData = new FormData()
  formData.append('firmware', file)
  
  const response = await fetch('/update', {
    method: 'POST',
    body: formData,
  })
  
  return response.ok
}
```

## Monitoreo de Recursos

### Espacio en SPIFFS

```cpp
void printSPIFFSInfo() {
    Serial.printf("SPIFFS Total: %d bytes\n", SPIFFS.totalBytes());
    Serial.printf("SPIFFS Used: %d bytes\n", SPIFFS.usedBytes());
    Serial.printf("SPIFFS Free: %d bytes\n", 
                  SPIFFS.totalBytes() - SPIFFS.usedBytes());
}
```

### Límites Típicos

| Recurso | Límite |
|---------|--------|
| SPIFFS | ~1.4 MB |
| Web App (gzip) | ~100 KB |
| Conexiones WebSocket | ~4 simultáneas |
| RAM para servidor | ~40 KB |

## Troubleshooting

### Webapp no carga

1. Verificar SPIFFS montado
2. Verificar que index.html existe
3. Revisar logs del servidor

### Assets no cargan

1. Verificar rutas relativas
2. Verificar Content-Type correcto
3. Revisar cache del navegador

### WebSocket no conecta

1. Verificar puerto
2. Verificar límite de conexiones
3. Revisar firewall/proxy

## Próximas Secciones

- [Visión General](./webapp-overview)
- [Características](./webapp-features)
