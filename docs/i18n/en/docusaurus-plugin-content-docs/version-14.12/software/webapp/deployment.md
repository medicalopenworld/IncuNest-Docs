---
id: webapp-deployment
title: Despliegue de la Web App
sidebar_label: Despliegue
sidebar_position: 3
description: Guía de despliegue de la aplicación web de IncuNest
keywords: [despliegue, SPIFFS, build, producción]
---
# Web App Deployment

## Production Build

### Compile for Production

```bash
cd webapp

# Instalar dependencias
npm install

# Build de producción
npm run build
```

This generates the `dist/` folder with the optimized files.

### Applied Optimizations

- JavaScript and CSS minification
- Tree-shaking of unused code
- Asset compression
- Code splitting

## Deployment on ESP32 (SPIFFS)

### File Structure

```
data/
├── index.html        # ~5KB
├── assets/
│   ├── index-xxx.js  # ~50KB (gzipped)
│   └── index-xxx.css # ~10KB (gzipped)
├── favicon.ico
└── manifest.json
```

### PlatformIO Configuration

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

### Copy Script

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

### Partition Table

```csv
# partitions.csv
# Name,   Type, SubType, Offset,  Size, Flags
nvs,      data, nvs,     0x9000,  0x5000,
otadata,  data, ota,     0xe000,  0x2000,
app0,     app,  ota_0,   0x10000, 0x140000,
app1,     app,  ota_1,   0x150000,0x140000,
spiffs,   data, spiffs,  0x290000,0x160000,
```

### Upload to ESP32

```bash
# Build del sistema de archivos
pio run --target buildfs

# Subir firmware
pio run --target upload

# Subir SPIFFS
pio run --target uploadfs
```

## Web Server on ESP32

### Server Configuration

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

### Gzip compression

To reduce the size, serve gzip files:

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

### Update Endpoint

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

### Update from Web App

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

## Resource Monitoring

### Space in SPIFFS

```cpp
void printSPIFFSInfo() {
    Serial.printf("SPIFFS Total: %d bytes\n", SPIFFS.totalBytes());
    Serial.printf("SPIFFS Used: %d bytes\n", SPIFFS.usedBytes());
    Serial.printf("SPIFFS Free: %d bytes\n", 
                  SPIFFS.totalBytes() - SPIFFS.usedBytes());
}
```

### Typical Limits

| Resource | Limit |
|---------|--------|
| SPIFFS | ~1.4MB |
| Web App (gzip) | ~100KB |
| WebSocket Connections | ~4 simultaneous |
| Server RAM | ~40KB |

## Troubleshooting

### Webapp not loading

1. Verify mounted SPIFFS
2. Verify that index.html exists
3. Review server logs

### Assets not loading

1. Check relative paths
2. Verify correct Content-Type
3. Check browser cache

### WebSocket not connecting

1. Check port
2. Check connection limit
3. Check firewall/proxy

## Upcoming Sections

- [Overview](./webapp-overview)
- [Features](./webapp-features)
