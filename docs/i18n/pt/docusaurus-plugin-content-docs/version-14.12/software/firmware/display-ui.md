---
id: display-ui
title: Interface do Display
sidebar_label: Display UI
sidebar_position: 5
description: Suporte à interface de usuário em display para IncuNest
keywords: [display, LCD, UI, interfaz]
---

# Interface do Display

## Displays Soportados

| Tipo | Resolução | Interface | Livreria |
|------|------------|----------|--------|-----------|
| LCD 20x4 | 20 caracteres x 4 linhas | I2C (PCF8574) | LiquidCrystal_I2C |
| TFT 3.5" | 480x320 pixels | SPI | TFT_eSPI |

## LCD 20x4 I2C

## Configuração

```cpp
#include <LiquidCrystal_I2C.h>

// Dirección I2C común: 0x27 o 0x3F
LiquidCrystal_I2C lcd(0x27, 20, 4);

void setupDisplay() {
    lcd.init();
    lcd.backlight();
    lcd.clear();
    
    // Crear caracteres personalizados
    createCustomChars();
}
```

## Caracteres Personalizados

```cpp
// Símbolo de grado
byte degreeChar[8] = {
    B00110,
    B01001,
    B01001,
    B00110,
    B00000,
    B00000,
    B00000,
    B00000
};

// Símbolo de termómetro
byte thermometerChar[8] = {
    B00100,
    B01010,
    B01010,
    B01010,
    B01010,
    B10001,
    B10001,
    B01110
};

// Símbolo de gota (humedad)
byte dropChar[8] = {
    B00100,
    B00100,
    B01010,
    B01010,
    B10001,
    B10001,
    B10001,
    B01110
};

// Símbolo de ventilador
byte fanChar[8] = {
    B00000,
    B10001,
    B01010,
    B00100,
    B01010,
    B10001,
    B00000,
    B00000
};

void createCustomChars() {
    lcd.createChar(0, degreeChar);
    lcd.createChar(1, thermometerChar);
    lcd.createChar(2, dropChar);
    lcd.createChar(3, fanChar);
}
```

## Display Manager

```cpp
class DisplayManager {
public:
    enum class Screen {
        MAIN,
        SETTINGS,
        ALARMS,
        INFO,
        CALIBRATION
    };

private:
    LiquidCrystal_I2C& lcd_;
    Screen currentScreen_;
    unsigned long lastUpdate_;
    bool needsRefresh_;
    
    // Datos a mostrar
    float temperature_;
    float tempSetpoint_;
    float humidity_;
    float humSetpoint_;
    int heaterPower_;
    bool wifiConnected_;
    String stateText_;
    std::vector<String> activeAlarms_;

public:
    DisplayManager(LiquidCrystal_I2C& lcd) 
        : lcd_(lcd), currentScreen_(Screen::MAIN), needsRefresh_(true) {}
    
    void begin() {
        lcd_.init();
        lcd_.backlight();
        createCustomChars();
        showSplash();
        delay(2000);
        needsRefresh_ = true;
    }
    
    void update() {
        if (!needsRefresh_ && millis() - lastUpdate_ < 500) {
            return;
        }
        
        switch (currentScreen_) {
            case Screen::MAIN:
                renderMainScreen();
                break;
            case Screen::SETTINGS:
                renderSettingsScreen();
                break;
            case Screen::ALARMS:
                renderAlarmsScreen();
                break;
            case Screen::INFO:
                renderInfoScreen();
                break;
        }
        
        lastUpdate_ = millis();
        needsRefresh_ = false;
    }
    
    void setScreen(Screen screen) {
        if (currentScreen_ != screen) {
            currentScreen_ = screen;
            needsRefresh_ = true;
            lcd_.clear();
        }
    }
    
    void updateData(float temp, float tempSP, float hum, float humSP, 
                    int power, bool wifi, const String& state) {
        temperature_ = temp;
        tempSetpoint_ = tempSP;
        humidity_ = hum;
        humSetpoint_ = humSP;
        heaterPower_ = power;
        wifiConnected_ = wifi;
        stateText_ = state;
    }

private:
    void showSplash() {
        lcd_.clear();
        lcd_.setCursor(4, 1);
        lcd_.print("INCUNEST v1.0");
        lcd_.setCursor(2, 2);
        lcd_.print("Inicializando...");
    }
    
    void renderMainScreen() {
        // Línea 1: Temperatura
        lcd_.setCursor(0, 0);
        lcd_.write(1); // Termómetro
        lcd_.printf(" %5.1f", temperature_);
        lcd_.write(0); // Grado
        lcd_.print("C");
        lcd_.setCursor(11, 0);
        lcd_.printf("SP:%5.1f", tempSetpoint_);
        
        // Línea 2: Humedad
        lcd_.setCursor(0, 1);
        lcd_.write(2); // Gota
        lcd_.printf(" %5.1f%%", humidity_);
        lcd_.setCursor(11, 1);
        lcd_.printf("SP:%5.1f", humSetpoint_);
        
        // Línea 3: Estado y potencia
        lcd_.setCursor(0, 2);
        lcd_.print("                    "); // Limpiar línea
        lcd_.setCursor(0, 2);
        lcd_.printf("%-12s", stateText_.c_str());
        lcd_.setCursor(13, 2);
        lcd_.write(3); // Ventilador
        lcd_.printf("%3d%%", heaterPower_);
        
        // Línea 4: WiFi e IP
        lcd_.setCursor(0, 3);
        if (wifiConnected_) {
            lcd_.print("WiFi:OK ");
            lcd_.print(WiFi.localIP().toString().substring(0, 12));
        } else {
            lcd_.print("WiFi: Desconectado  ");
        }
    }
    
    void renderSettingsScreen() {
        lcd_.setCursor(0, 0);
        lcd_.print("=== CONFIGURACION ===");
        lcd_.setCursor(0, 1);
        lcd_.printf("Temp SP: %5.1f C", tempSetpoint_);
        lcd_.setCursor(0, 2);
        lcd_.printf("Hum  SP: %5.1f %%", humSetpoint_);
        lcd_.setCursor(0, 3);
        lcd_.print("[<] Atras  [>] Editar");
    }
    
    void renderAlarmsScreen() {
        lcd_.setCursor(0, 0);
        lcd_.print("===== ALARMAS =====");
        
        if (activeAlarms_.empty()) {
            lcd_.setCursor(0, 1);
            lcd_.print("  Sin alarmas");
            lcd_.setCursor(0, 2);
            lcd_.print("  activas");
        } else {
            for (int i = 0; i < min(3, (int)activeAlarms_.size()); i++) {
                lcd_.setCursor(0, i + 1);
                lcd_.print(activeAlarms_[i].substring(0, 20));
            }
        }
    }
    
    void renderInfoScreen() {
        lcd_.setCursor(0, 0);
        lcd_.print("=== INFORMACION ===");
        lcd_.setCursor(0, 1);
        lcd_.printf("Firmware: v%s", FIRMWARE_VERSION);
        lcd_.setCursor(0, 2);
        lcd_.printf("Uptime: %luh", millis() / 3600000);
        lcd_.setCursor(0, 3);
        lcd_.printf("Heap: %dKB", ESP.getFreeHeap() / 1024);
    }
};
```

# Navegação com Botões

```cpp
class ButtonHandler {
public:
    enum class Button {
        NONE,
        UP,
        DOWN,
        LEFT,
        RIGHT,
        SELECT
    };

private:
    int analogPin_;
    Button lastButton_;
    unsigned long lastPressTime_;
    unsigned long debounceDelay_ = 200;

public:
    ButtonHandler(int pin) : analogPin_(pin), lastButton_(Button::NONE) {}
    
    Button read() {
        int value = analogRead(analogPin_);
        Button current = Button::NONE;
        
        // Valores típicos para shield LCD con botones resistivos
        if (value < 50) {
            current = Button::RIGHT;
        } else if (value < 200) {
            current = Button::UP;
        } else if (value < 400) {
            current = Button::DOWN;
        } else if (value < 600) {
            current = Button::LEFT;
        } else if (value < 800) {
            current = Button::SELECT;
        }
        
        // Debounce
        if (current != Button::NONE && current != lastButton_) {
            if (millis() - lastPressTime_ > debounceDelay_) {
                lastButton_ = current;
                lastPressTime_ = millis();
                return current;
            }
        }
        
        if (current == Button::NONE) {
            lastButton_ = Button::NONE;
        }
        
        return Button::NONE;
    }
};
```

## Menu de Configuração

```cpp
class MenuSystem {
private:
    DisplayManager& display_;
    ButtonHandler& buttons_;
    
    struct MenuItem {
        String label;
        float* value;
        float min;
        float max;
        float step;
    };
    
    std::vector<MenuItem> menuItems_;
    int currentItem_;
    bool editing_;
    float editValue_;

public:
    MenuSystem(DisplayManager& display, ButtonHandler& buttons)
        : display_(display), buttons_(buttons), 
          currentItem_(0), editing_(false) {}
    
    void addItem(const String& label, float* value, 
                 float min, float max, float step) {
        menuItems_.push_back({label, value, min, max, step});
    }
    
    void handle() {
        auto button = buttons_.read();
        
        if (button == ButtonHandler::Button::NONE) return;
        
        if (!editing_) {
            switch (button) {
                case ButtonHandler::Button::UP:
                    currentItem_ = (currentItem_ - 1 + menuItems_.size()) % menuItems_.size();
                    break;
                case ButtonHandler::Button::DOWN:
                    currentItem_ = (currentItem_ + 1) % menuItems_.size();
                    break;
                case ButtonHandler::Button::SELECT:
                    editing_ = true;
                    editValue_ = *menuItems_[currentItem_].value;
                    break;
            }
        } else {
            auto& item = menuItems_[currentItem_];
            switch (button) {
                case ButtonHandler::Button::UP:
                    editValue_ = min(editValue_ + item.step, item.max);
                    break;
                case ButtonHandler::Button::DOWN:
                    editValue_ = max(editValue_ - item.step, item.min);
                    break;
                case ButtonHandler::Button::SELECT:
                    *item.value = editValue_;
                    editing_ = false;
                    // Guardar configuración
                    break;
                case ButtonHandler::Button::LEFT:
                    editing_ = false; // Cancelar
                    break;
            }
        }
        
        render();
    }
    
    void render() {
        // Renderizar menú actual
        // ...
    }
};
```

# TFT Display (Alternativa)

Para displays gráficos TFT:

```cpp
#include <TFT_eSPI.h>

TFT_eSPI tft = TFT_eSPI();

void setupTFT() {
    tft.init();
    tft.setRotation(1);  // Landscape
    tft.fillScreen(TFT_BLACK);
    tft.setTextColor(TFT_WHITE, TFT_BLACK);
}

void drawMainScreenTFT() {
    // Fondo
    tft.fillScreen(TFT_BLACK);
    
    // Título
    tft.setTextSize(2);
    tft.drawString("INCUNEST", 160, 10, 2);
    
    // Panel de temperatura
    tft.drawRoundRect(10, 50, 220, 100, 10, TFT_CYAN);
    tft.setTextSize(3);
    tft.setTextColor(TFT_CYAN);
    tft.drawString("Temp:", 20, 60);
    tft.drawFloat(temperature, 1, 20, 100, 4);
    tft.drawString("C", 140, 100, 4);
    
    // Panel de humedad
    tft.drawRoundRect(250, 50, 220, 100, 10, TFT_GREEN);
    tft.setTextColor(TFT_GREEN);
    tft.drawString("Hum:", 260, 60);
    tft.drawFloat(humidity, 1, 260, 100, 4);
    tft.drawString("%", 380, 100, 4);
    
    // Barra de potencia
    int barWidth = map(heaterPower, 0, 100, 0, 460);
    tft.fillRect(10, 280, 460, 30, TFT_DARKGREY);
    tft.fillRect(10, 280, barWidth, 30, TFT_RED);
}
```

## Próximas Secções

- [Conectividade WiFi] (./wifi-connectivity)
- [Registo de Dados] (./data-logging)