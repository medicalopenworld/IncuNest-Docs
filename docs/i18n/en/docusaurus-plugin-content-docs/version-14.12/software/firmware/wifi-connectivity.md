---
id: wifi-connectivity
title: Conectividad WiFi
sidebar_label: WiFi
sidebar_position: 6
description: Implementación de conectividad WiFi en IncuNest
keywords: [WiFi, ESP32, red, conexión]
---
# WiFi connectivity

## Modes of Operation

The ESP32 supports three WiFi modes:

| Mode | Description | Usage |
|------|-------------|-----|
| Station (STA) | Connect to existing network | Normal operation |
| Access Point (AP) | Create your own network | Initial setup |
| Dual (STA+AP) | Both simultaneous | Fallback |

## WiFi Manager

```cpp
#include <WiFi.h>
#include <ESPmDNS.h>

class WiFiManager {
public:
    enum class State {
        DISCONNECTED,
        CONNECTING,
        CONNECTED,
        AP_MODE,
        ERROR
    };

private:
    String ssid_;
    String password_;
    String hostname_;
    State state_;
    
    unsigned long connectTimeout_ = 30000;  // 30 segundos
    unsigned long lastConnectAttempt_;
    int reconnectAttempts_;
    static constexpr int MAX_RECONNECT_ATTEMPTS = 5;
    
    // Callbacks
    std::function<void()> onConnectedCallback_;
    std::function<void()> onDisconnectedCallback_;

public:
    WiFiManager(const String& hostname = "incunest") 
        : hostname_(hostname), state_(State::DISCONNECTED), 
          reconnectAttempts_(0) {}
    
    bool begin(const String& ssid, const String& password) {
        ssid_ = ssid;
        password_ = password;
        
        WiFi.setHostname(hostname_.c_str());
        WiFi.mode(WIFI_STA);
        
        // Registrar eventos
        WiFi.onEvent([this](WiFiEvent_t event, WiFiEventInfo_t info) {
            handleEvent(event);
        });
        
        return connect();
    }
    
    bool connect() {
        if (ssid_.isEmpty()) {
            Serial.println("No SSID configured");
            startAP();
            return false;
        }
        
        state_ = State::CONNECTING;
        lastConnectAttempt_ = millis();
        
        Serial.printf("Connecting to %s...\n", ssid_.c_str());
        WiFi.begin(ssid_.c_str(), password_.c_str());
        
        // Esperar conexión con timeout
        unsigned long start = millis();
        while (WiFi.status() != WL_CONNECTED) {
            if (millis() - start > connectTimeout_) {
                Serial.println("Connection timeout");
                state_ = State::ERROR;
                return false;
            }
            delay(500);
            Serial.print(".");
        }
        
        Serial.println();
        Serial.printf("Connected! IP: %s\n", WiFi.localIP().toString().c_str());
        
        // Iniciar mDNS
        if (MDNS.begin(hostname_.c_str())) {
            MDNS.addService("http", "tcp", 80);
            Serial.printf("mDNS: http://%s.local\n", hostname_.c_str());
        }
        
        state_ = State::CONNECTED;
        reconnectAttempts_ = 0;
        
        if (onConnectedCallback_) {
            onConnectedCallback_();
        }
        
        return true;
    }
    
    void startAP() {
        state_ = State::AP_MODE;
        
        String apSSID = hostname_ + "_" + String((uint32_t)ESP.getEfuseMac(), HEX).substring(0, 4);
        String apPass = "incunest123";
        
        WiFi.mode(WIFI_AP);
        WiFi.softAP(apSSID.c_str(), apPass.c_str());
        
        Serial.println("Access Point started");
        Serial.printf("SSID: %s\n", apSSID.c_str());
        Serial.printf("Password: %s\n", apPass.c_str());
        Serial.printf("IP: %s\n", WiFi.softAPIP().toString().c_str());
    }
    
    void update() {
        if (state_ == State::CONNECTED && WiFi.status() != WL_CONNECTED) {
            Serial.println("WiFi disconnected");
            state_ = State::DISCONNECTED;
            
            if (onDisconnectedCallback_) {
                onDisconnectedCallback_();
            }
            
            // Intentar reconectar
            attemptReconnect();
        }
    }
    
    void attemptReconnect() {
        if (reconnectAttempts_ >= MAX_RECONNECT_ATTEMPTS) {
            Serial.println("Max reconnect attempts reached, starting AP");
            startAP();
            return;
        }
        
        reconnectAttempts_++;
        Serial.printf("Reconnection attempt %d/%d\n", 
                      reconnectAttempts_, MAX_RECONNECT_ATTEMPTS);
        
        WiFi.disconnect();
        delay(1000);
        connect();
    }
    
    // Getters
    State getState() { return state_; }
    bool isConnected() { return state_ == State::CONNECTED; }
    String getIP() { return WiFi.localIP().toString(); }
    int getRSSI() { return WiFi.RSSI(); }
    String getSSID() { return WiFi.SSID(); }
    
    // Callbacks
    void onConnected(std::function<void()> callback) {
        onConnectedCallback_ = callback;
    }
    
    void onDisconnected(std::function<void()> callback) {
        onDisconnectedCallback_ = callback;
    }

private:
    void handleEvent(WiFiEvent_t event) {
        switch (event) {
            case ARDUINO_EVENT_WIFI_STA_CONNECTED:
                Serial.println("WiFi STA connected");
                break;
            case ARDUINO_EVENT_WIFI_STA_GOT_IP:
                Serial.printf("Got IP: %s\n", WiFi.localIP().toString().c_str());
                break;
            case ARDUINO_EVENT_WIFI_STA_DISCONNECTED:
                Serial.println("WiFi STA disconnected");
                break;
            case ARDUINO_EVENT_WIFI_AP_STACONNECTED:
                Serial.println("Client connected to AP");
                break;
            default:
                break;
        }
    }
};
```

## WiFi Configuration Portal

```cpp
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>

class WiFiConfigPortal {
private:
    AsyncWebServer server_;
    WiFiManager& wifiManager_;
    bool portalActive_;

public:
    WiFiConfigPortal(WiFiManager& wifiManager) 
        : server_(80), wifiManager_(wifiManager), portalActive_(false) {}
    
    void start() {
        portalActive_ = true;
        
        // Página principal de configuración
        server_.on("/", HTTP_GET, [](AsyncWebServerRequest* request) {
            String html = R"(
                <!DOCTYPE html>
                <html>
                <head>
                    <title>IncuNest WiFi Setup</title>
                    <meta name='viewport' content='width=device-width, initial-scale=1'>
                    <style>
                        body { font-family: Arial; margin: 40px; }
                        input { width: 100%; padding: 10px; margin: 5px 0; }
                        button { background: #007bff; color: white; padding: 15px; 
                                 border: none; width: 100%; cursor: pointer; }
                    </style>
                </head>
                <body>
                    <h1>IncuNest WiFi Setup</h1>
                    <form action='/save' method='POST'>
                        <label>Network Name (SSID):</label>
                        <input type='text' name='ssid' required>
                        <label>Password:</label>
                        <input type='password' name='password'>
                        <button type='submit'>Connect</button>
                    </form>
                    <h3>Available Networks:</h3>
                    <div id='networks'>Scanning...</div>
                    <script>
                        fetch('/scan').then(r=>r.json()).then(networks=>{
                            let html = '';
                            networks.forEach(n => {
                                html += '<div onclick="document.querySelector(\'input[name=ssid]\').value=\''+n.ssid+'\'">'
                                     + n.ssid + ' (' + n.rssi + 'dBm)</div>';
                            });
                            document.getElementById('networks').innerHTML = html;
                        });
                    </script>
                </body>
                </html>
            )";
            request->send(200, "text/html", html);
        });
        
        // Escanear redes
        server_.on("/scan", HTTP_GET, [](AsyncWebServerRequest* request) {
            int n = WiFi.scanComplete();
            if (n == WIFI_SCAN_FAILED) {
                WiFi.scanNetworks(true);
                request->send(200, "application/json", "[]");
            } else if (n == WIFI_SCAN_RUNNING) {
                request->send(200, "application/json", "[]");
            } else {
                String json = "[";
                for (int i = 0; i < n; i++) {
                    if (i > 0) json += ",";
                    json += "{\"ssid\":\"" + WiFi.SSID(i) + "\",";
                    json += "\"rssi\":" + String(WiFi.RSSI(i)) + "}";
                }
                json += "]";
                WiFi.scanDelete();
                request->send(200, "application/json", json);
            }
        });
        
        // Guardar configuración
        server_.on("/save", HTTP_POST, [this](AsyncWebServerRequest* request) {
            String ssid = request->getParam("ssid", true)->value();
            String password = request->getParam("password", true)->value();
            
            // Guardar en NVS
            saveCredentials(ssid, password);
            
            request->send(200, "text/html", 
                "<h1>Saved! Rebooting...</h1>"
                "<script>setTimeout(()=>location='/',10000);</script>");
            
            delay(1000);
            ESP.restart();
        });
        
        server_.begin();
        Serial.println("Config portal started");
    }
    
    void stop() {
        server_.end();
        portalActive_ = false;
    }
    
private:
    void saveCredentials(const String& ssid, const String& password) {
        Preferences prefs;
        prefs.begin("wifi", false);
        prefs.putString("ssid", ssid);
        prefs.putString("password", password);
        prefs.end();
    }
};
```

## Credential Storage

```cpp
#include <Preferences.h>

class CredentialsManager {
private:
    Preferences prefs_;
    
public:
    bool load(String& ssid, String& password) {
        prefs_.begin("wifi", true);  // Solo lectura
        ssid = prefs_.getString("ssid", "");
        password = prefs_.getString("password", "");
        prefs_.end();
        return !ssid.isEmpty();
    }
    
    bool save(const String& ssid, const String& password) {
        prefs_.begin("wifi", false);  // Escritura
        prefs_.putString("ssid", ssid);
        prefs_.putString("password", password);
        prefs_.end();
        return true;
    }
    
    void clear() {
        prefs_.begin("wifi", false);
        prefs_.clear();
        prefs_.end();
    }
};
```

## WiFi Quality Monitoring

```cpp
class WiFiMonitor {
private:
    int rssiHistory_[10];
    int historyIndex_;
    
public:
    WiFiMonitor() : historyIndex_(0) {
        memset(rssiHistory_, 0, sizeof(rssiHistory_));
    }
    
    void update() {
        if (WiFi.status() == WL_CONNECTED) {
            rssiHistory_[historyIndex_] = WiFi.RSSI();
            historyIndex_ = (historyIndex_ + 1) % 10;
        }
    }
    
    int getAverageRSSI() {
        int sum = 0;
        for (int i = 0; i < 10; i++) {
            sum += rssiHistory_[i];
        }
        return sum / 10;
    }
    
    String getSignalQuality() {
        int rssi = getAverageRSSI();
        if (rssi > -50) return "Excelente";
        if (rssi > -60) return "Buena";
        if (rssi > -70) return "Regular";
        if (rssi > -80) return "Débil";
        return "Muy débil";
    }
    
    void printStatus() {
        Serial.println("=== WiFi Status ===");
        Serial.printf("SSID: %s\n", WiFi.SSID().c_str());
        Serial.printf("IP: %s\n", WiFi.localIP().toString().c_str());
        Serial.printf("RSSI: %d dBm (%s)\n", 
                      getAverageRSSI(), getSignalQuality().c_str());
        Serial.printf("Channel: %d\n", WiFi.channel());
    }
};
```

## Upcoming Sections

- [Data Record](./data-logging)
- [REST API](../api/rest-api)
