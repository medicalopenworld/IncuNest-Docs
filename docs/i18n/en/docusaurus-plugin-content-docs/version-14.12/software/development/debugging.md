---
id: debugging
title: Debugging
sidebar_label: Debugging
sidebar_position: 4
description: Técnicas y herramientas de debugging para IncuNest
keywords: [debugging, depuración, errores, diagnóstico]
---
# Debugging

## Debugging Techniques for ESP32

### Serial Monitor

The most basic and useful way of debugging.

```cpp
// Niveles de log
#define LOG_LEVEL_NONE    0
#define LOG_LEVEL_ERROR   1
#define LOG_LEVEL_WARN    2
#define LOG_LEVEL_INFO    3
#define LOG_LEVEL_DEBUG   4
#define LOG_LEVEL_VERBOSE 5

#ifndef LOG_LEVEL
#define LOG_LEVEL LOG_LEVEL_INFO
#endif

#define LOG_E(tag, fmt, ...) if(LOG_LEVEL >= LOG_LEVEL_ERROR)   Serial.printf("[E][%s] " fmt "\n", tag, ##__VA_ARGS__)
#define LOG_W(tag, fmt, ...) if(LOG_LEVEL >= LOG_LEVEL_WARN)    Serial.printf("[W][%s] " fmt "\n", tag, ##__VA_ARGS__)
#define LOG_I(tag, fmt, ...) if(LOG_LEVEL >= LOG_LEVEL_INFO)    Serial.printf("[I][%s] " fmt "\n", tag, ##__VA_ARGS__)
#define LOG_D(tag, fmt, ...) if(LOG_LEVEL >= LOG_LEVEL_DEBUG)   Serial.printf("[D][%s] " fmt "\n", tag, ##__VA_ARGS__)
#define LOG_V(tag, fmt, ...) if(LOG_LEVEL >= LOG_LEVEL_VERBOSE) Serial.printf("[V][%s] " fmt "\n", tag, ##__VA_ARGS__)

// Uso
static const char* TAG = "PID";
LOG_I(TAG, "Setpoint: %.2f, Current: %.2f", setpoint, current);
LOG_D(TAG, "P=%.2f, I=%.2f, D=%.2f", pTerm, iTerm, dTerm);
```

### ESP32 Core Debug Level

In `platformio.ini`:

```ini
build_flags = 
    -DCORE_DEBUG_LEVEL=4   ; 0=None, 1=Error, 2=Warn, 3=Info, 4=Debug, 5=Verbose
```

### Serial Diagnostic Commands

```cpp
class DiagnosticCommands {
public:
    void processCommand(const String& cmd) {
        if (cmd == "status") {
            printStatus();
        } else if (cmd == "sensors") {
            printSensors();
        } else if (cmd == "config") {
            printConfig();
        } else if (cmd == "heap") {
            printHeap();
        } else if (cmd == "tasks") {
            printTasks();
        } else if (cmd == "wifi") {
            printWiFi();
        } else if (cmd.startsWith("set ")) {
            handleSetCommand(cmd.substring(4));
        } else if (cmd == "reboot") {
            ESP.restart();
        } else if (cmd == "help") {
            printHelp();
        }
    }
    
private:
    void printStatus() {
        Serial.println("=== System Status ===");
        Serial.printf("State: %s\n", getStateName(currentState));
        Serial.printf("Uptime: %lu seconds\n", millis() / 1000);
        Serial.printf("Free Heap: %d bytes\n", ESP.getFreeHeap());
        Serial.printf("WiFi: %s\n", WiFi.isConnected() ? "Connected" : "Disconnected");
    }
    
    void printSensors() {
        Serial.println("=== Sensor Readings ===");
        Serial.printf("Ambient Temp: %.2f C\n", sensors->getAmbientTemperature());
        Serial.printf("Skin Temp: %.2f C\n", sensors->getSkinTemperature());
        Serial.printf("Humidity: %.1f %%\n", sensors->getHumidity());
        Serial.printf("Heater Power: %d %%\n", control->getHeaterPower());
    }
    
    void printHeap() {
        Serial.println("=== Memory Info ===");
        Serial.printf("Free Heap: %d\n", ESP.getFreeHeap());
        Serial.printf("Min Free Heap: %d\n", ESP.getMinFreeHeap());
        Serial.printf("Max Alloc Heap: %d\n", ESP.getMaxAllocHeap());
        Serial.printf("PSRAM Size: %d\n", ESP.getPsramSize());
        Serial.printf("Free PSRAM: %d\n", ESP.getFreePsram());
    }
    
    void printTasks() {
        Serial.println("=== FreeRTOS Tasks ===");
        char buffer[1024];
        vTaskList(buffer);
        Serial.println(buffer);
    }
    
    void printWiFi() {
        Serial.println("=== WiFi Info ===");
        Serial.printf("Status: %s\n", WiFi.isConnected() ? "Connected" : "Disconnected");
        Serial.printf("SSID: %s\n", WiFi.SSID().c_str());
        Serial.printf("IP: %s\n", WiFi.localIP().toString().c_str());
        Serial.printf("RSSI: %d dBm\n", WiFi.RSSI());
        Serial.printf("MAC: %s\n", WiFi.macAddress().c_str());
    }
    
    void printHelp() {
        Serial.println("Available commands:");
        Serial.println("  status  - System status");
        Serial.println("  sensors - Sensor readings");
        Serial.println("  config  - Current configuration");
        Serial.println("  heap    - Memory info");
        Serial.println("  tasks   - FreeRTOS tasks");
        Serial.println("  wifi    - WiFi info");
        Serial.println("  set <param> <value> - Set parameter");
        Serial.println("  reboot  - Restart device");
    }
};
```

## JTAG Debugging

### Required Hardware

- ESP-Prog or JTAG adapter compatible
- Connection cables

### JTAG Connections

| ESP32 Pin | JTAG Signal |
|-----------|-------------|
| GPIO13 | TCK |
| GPIO12 | TDI |
| GPIO15 | TDO |
| GPIO14 | TMS |
| GND | GND |

### PlatformIO Configuration

```ini
[env:esp32-debug]
platform = espressif32
board = esp32dev
framework = arduino
build_type = debug

debug_tool = esp-prog
debug_init_break = tbreak setup
debug_speed = 5000
```

### Use

1. Connect ESP-Prog to ESP32
2. In VS Code, go to Run and Debug (F5)
3. Select "PIO Debug"
4. Set breakpoints
5. Start debugging

## Remote Debugging via WebSocket

```cpp
#include <WebSocketsServer.h>

class RemoteDebugger {
private:
    WebSocketsServer webSocket;
    bool clientConnected;
    
public:
    RemoteDebugger() : webSocket(8081), clientConnected(false) {}
    
    void begin() {
        webSocket.begin();
        webSocket.onEvent([this](uint8_t num, WStype_t type, uint8_t* payload, size_t length) {
            handleWebSocketEvent(num, type, payload, length);
        });
    }
    
    void loop() {
        webSocket.loop();
    }
    
    void log(const char* level, const char* tag, const char* message) {
        if (clientConnected) {
            char buffer[256];
            snprintf(buffer, sizeof(buffer), "[%s][%s] %s", level, tag, message);
            webSocket.broadcastTXT(buffer);
        }
    }
    
private:
    void handleWebSocketEvent(uint8_t num, WStype_t type, uint8_t* payload, size_t length) {
        switch (type) {
            case WStype_CONNECTED:
                clientConnected = true;
                log("INFO", "DEBUG", "Remote debugger connected");
                break;
            case WStype_DISCONNECTED:
                clientConnected = false;
                break;
            case WStype_TEXT:
                // Procesar comandos remotos
                processRemoteCommand(String((char*)payload));
                break;
        }
    }
};
```

## Analysis Tools

### Stack Trace Decoder

When the ESP32 crashes, it shows a stack trace. To decode it:

```bash
# Instalar herramienta
pip install esp-idf-monitor

# O usar decodificador online
# https://esp32.com/backtrace

# Ejemplo de stack trace
Guru Meditation Error: Core  0 panic'ed (StoreProhibited)
Core 0 register dump:
PC      : 0x400d1234  PS      : 0x00060130
...
Backtrace: 0x400d1234:0x3ffb5e10 0x400d5678:0x3ffb5e30
```

### Memory Analyzer

```cpp
void analyzeMemory() {
    Serial.println("=== Memory Analysis ===");
    
    // Heap
    Serial.printf("Total Heap: %d\n", ESP.getHeapSize());
    Serial.printf("Free Heap: %d\n", ESP.getFreeHeap());
    Serial.printf("Min Free Heap: %d\n", ESP.getMinFreeHeap());
    
    // Fragmentación
    Serial.printf("Max Alloc Block: %d\n", ESP.getMaxAllocHeap());
    
    // Stack
    UBaseType_t stackHighWaterMark = uxTaskGetStackHighWaterMark(NULL);
    Serial.printf("Stack High Water Mark: %d\n", stackHighWaterMark);
    
    // Detectar leaks
    static int lastFreeHeap = 0;
    if (lastFreeHeap > 0) {
        int diff = lastFreeHeap - ESP.getFreeHeap();
        if (diff > 100) {
            Serial.printf("WARNING: Possible memory leak: %d bytes\n", diff);
        }
    }
    lastFreeHeap = ESP.getFreeHeap();
}
```

## Web App Debugging

### Vue DevTools

Install Vue.js devtools browser extension.

### Network Tab

To debug API calls:

```javascript
// Interceptor de fetch para debugging
const originalFetch = window.fetch;
window.fetch = async (...args) => {
  console.log('Fetch:', args[0]);
  const start = performance.now();
  
  try {
    const response = await originalFetch(...args);
    const duration = performance.now() - start;
    console.log(`Response: ${response.status} (${duration.toFixed(0)}ms)`);
    return response;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
```

### Source Maps

Ensure source maps are enabled:

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    sourcemap: true
  }
})
```

## Common Problems and Solutions

### Watchdog Reset

```
E (1234) task_wdt: Task watchdog got triggered
```

**Cause:** Blocking loop without yield.

**Solution:**
```cpp
while (condition) {
    // ... trabajo
    yield();  // o vTaskDelay(1)
}
```

###Heap Exhaustion

```
E (5678) heap: heap_caps_alloc failed
```

**Solution:**
- Reduce buffers
- Use PSRAM if available
- Find memory leaks

### WiFi Disconnection

**Debug:**
```cpp
WiFi.onEvent([](WiFiEvent_t event, WiFiEventInfo_t info) {
    Serial.printf("WiFi event: %d\n", event);
    if (event == ARDUINO_EVENT_WIFI_STA_DISCONNECTED) {
        Serial.printf("Disconnect reason: %d\n", info.wifi_sta_disconnected.reason);
    }
});
```

## Upcoming Sections

- [CI/CD](./ci-cd)
- [Testing](./testing)
