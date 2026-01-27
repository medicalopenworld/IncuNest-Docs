---
id: webapp-deployment
title: Despliegue da Web App
sidebar_label: Implantação
sidebar_position: 3
description: Guia de implantação da aplicação web do IncuNest
keywords: [despliegue, SPIFFS, build, producción]
---

# Despliegue da Web App

## Build de Produção

## Compilar para Produção

```bash
cd webapp

# Instalar dependencias
npm install

# Build de producción
npm run build
```

Isto gera a pasta `dist/` com os arquivos otimizados.

## Optimizações Aplicadas

- Minificação de JavaScript e CSS
- Tree-shaking de código não usado
- Compressão de assets
- Code splitting

## Despliegue em ESP32 (SPIFFS)

## Estrutura de Ficheiros

```
data/
├── index.html        # ~5KB
├── assets/
│   ├── index-xxx.js  # ~50KB (gzipped)
│   └── index-xxx.css # ~10KB (gzipped)
├── favicon.ico
└── manifest.json
```

## Configuração da PlataformaIO

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

## Script de Cópia

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

## Tabela de Partições

```csv
# partitions.csv
# Name,   Type, SubType, Offset,  Size, Flags
nvs,      data, nvs,     0x9000,  0x5000,
otadata,  data, ota,     0xe000,  0x2000,
app0,     app,  ota_0,   0x10000, 0x140000,
app1,     app,  ota_1,   0x150000,0x140000,
spiffs,   data, spiffs,  0x290000,0x160000,
```

## Subir para ESP32

```bash
# Build del sistema de archivos
pio run --target buildfs

# Subir firmware
pio run --target upload

# Subir SPIFFS
pio run --target uploadfs
```

## Servidor Web em ESP32

## Configuração do Servidor

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

## Compressão Gzip

Para reduzir o tamanho, servir arquivos gzip:

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

## Endpoint de Atualização

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

## Actualizar a partir da Web App

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

## Monitoramento de Recursos

## Espaço no SPIFFS

```cpp
void printSPIFFSInfo() {
    Serial.printf("SPIFFS Total: %d bytes\n", SPIFFS.totalBytes());
    Serial.printf("SPIFFS Used: %d bytes\n", SPIFFS.usedBytes());
    Serial.printf("SPIFFS Free: %d bytes\n", 
                  SPIFFS.totalBytes() - SPIFFS.usedBytes());
}
```

## Limites Típicos

| Recurso | Limite |
|--------|--------|
| SPIFFS | ~1.4 MB |
| Web App (gzip) | ~100 KB |
| Conexões WebSocket | ~4 simultâneas |
| RAM para servidor | ~40 KB |

# Troubleshooting

## Webapp não carga

1. Verificar o SPIFFS montado
2. Verificar que o index.html existe
3. Rever os logs do servidor

### Assets não carregam

1. Verificar as rotas relativas
2. Verificar o Content-Type correcto
3. Rever a 'Cache' do Navegador

## WebSocket não liga

1. Verificar o porto
2. Verificar o limite das ligações
3. Rever o firewall/proxy

## Próximas Secções

- [Visão Geral] (./webapp-overview)
- [Características] (./webapp-features)