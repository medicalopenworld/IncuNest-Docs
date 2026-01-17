---
id: display
title: Display e Indicadores
sidebar_label: Display
sidebar_position: 4
description: Pantalla y LEDs de IncuNest
keywords: [display, LCD, TFT, LED, interfaz]
---

# Display e Indicadores

## Opciones de Display

IncuNest soporta dos tipos de pantalla:

| Tipo | Resolución | Conexión | Uso |
|------|------------|----------|-----|
| LCD 20x4 | 20 caracteres x 4 líneas | I2C | Básico/Económico |
| TFT 3.5" | 480x320 píxeles | SPI | Avanzado/Gráfico |

## LCD 20x4 (I2C)

### Especificaciones

| Parámetro | Valor |
|-----------|-------|
| Controlador | HD44780 + PCF8574 |
| Interfaz | I2C |
| Dirección | 0x27 o 0x3F |
| Voltaje | 5V |
| Retroiluminación | LED (ajustable) |

### Conexión

```
LCD I2C        ESP32
───────        ─────
VCC    ───────  5V
GND    ───────  GND
SDA    ───────  GPIO21
SCL    ───────  GPIO22
```

### Código de Ejemplo

```cpp
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27, 20, 4);

void setup() {
    lcd.init();
    lcd.backlight();
    
    // Caracteres personalizados
    byte degreeSymbol[8] = {
        0b00110,
        0b01001,
        0b01001,
        0b00110,
        0b00000,
        0b00000,
        0b00000,
        0b00000
    };
    lcd.createChar(0, degreeSymbol);
}

void updateDisplay(float temp, float hum, const char* status) {
    lcd.clear();
    
    // Línea 1: Título
    lcd.setCursor(0, 0);
    lcd.print("    IncuNest v1.0   ");
    
    // Línea 2: Temperatura
    lcd.setCursor(0, 1);
    lcd.printf("Temp: %.1f", temp);
    lcd.write(0); // Símbolo de grado
    lcd.print("C");
    
    // Línea 3: Humedad
    lcd.setCursor(0, 2);
    lcd.printf("Humedad: %.1f%%", hum);
    
    // Línea 4: Estado
    lcd.setCursor(0, 3);
    lcd.print("Estado: ");
    lcd.print(status);
}
```

### Layout de Pantalla

```
┌────────────────────┐
│    IncuNest v1.0   │  Línea 0: Título
│Temp: 36.5°C        │  Línea 1: Temperatura
│Humedad: 65.2%      │  Línea 2: Humedad
│Estado: OPERANDO    │  Línea 3: Estado
└────────────────────┘
```

## TFT 3.5" (ILI9488)

### Especificaciones

| Parámetro | Valor |
|-----------|-------|
| Controlador | ILI9488 |
| Resolución | 480x320 |
| Colores | 262K |
| Interfaz | SPI |
| Touch | Resistivo (XPT2046) |
| Voltaje | 3.3V |

### Conexión

```
TFT ILI9488    ESP32
───────────    ─────
VCC     ─────  3.3V
GND     ─────  GND
CS      ─────  GPIO15
RST     ─────  GPIO4
DC      ─────  GPIO2
MOSI    ─────  GPIO23
SCK     ─────  GPIO18
LED     ─────  3.3V (o PWM)
MISO    ─────  GPIO19

Touch (XPT2046)
T_CS    ─────  GPIO5
T_IRQ   ─────  GPIO34
```

### Código de Ejemplo

```cpp
#include <TFT_eSPI.h>

TFT_eSPI tft = TFT_eSPI();

void setup() {
    tft.init();
    tft.setRotation(1); // Landscape
    tft.fillScreen(TFT_BLACK);
}

void drawMainScreen(float temp, float hum, float setpoint) {
    // Cabecera
    tft.fillRect(0, 0, 480, 50, TFT_BLUE);
    tft.setTextColor(TFT_WHITE);
    tft.setTextSize(3);
    tft.setCursor(150, 15);
    tft.print("IncuNest");
    
    // Panel de temperatura
    tft.fillRoundRect(20, 70, 200, 100, 10, TFT_DARKGREY);
    tft.setTextColor(TFT_WHITE);
    tft.setCursor(30, 80);
    tft.setTextSize(2);
    tft.print("Temperatura");
    tft.setCursor(50, 120);
    tft.setTextSize(4);
    tft.printf("%.1f", temp);
    tft.setTextSize(2);
    tft.print(" C");
    
    // Panel de humedad
    tft.fillRoundRect(260, 70, 200, 100, 10, TFT_DARKGREY);
    tft.setCursor(270, 80);
    tft.setTextSize(2);
    tft.print("Humedad");
    tft.setCursor(290, 120);
    tft.setTextSize(4);
    tft.printf("%.1f", hum);
    tft.setTextSize(2);
    tft.print(" %");
    
    // Barra de setpoint
    drawProgressBar(20, 200, 440, 30, temp, setpoint);
    
    // Botones virtuales
    drawButton(20, 260, 140, 50, "CONFIG", TFT_NAVY);
    drawButton(170, 260, 140, 50, "ALARMAS", TFT_MAROON);
    drawButton(320, 260, 140, 50, "GRAFICOS", TFT_DARKGREEN);
}

void drawProgressBar(int x, int y, int w, int h, float value, float target) {
    tft.drawRect(x, y, w, h, TFT_WHITE);
    
    int fillWidth = map(value, 25, 40, 0, w - 4);
    fillWidth = constrain(fillWidth, 0, w - 4);
    
    uint16_t color = (value < target - 0.5) ? TFT_BLUE : 
                     (value > target + 0.5) ? TFT_RED : TFT_GREEN;
    
    tft.fillRect(x + 2, y + 2, fillWidth, h - 4, color);
    
    // Marcador de setpoint
    int targetPos = map(target, 25, 40, x + 2, x + w - 2);
    tft.drawFastVLine(targetPos, y, h, TFT_YELLOW);
}

void drawButton(int x, int y, int w, int h, const char* label, uint16_t color) {
    tft.fillRoundRect(x, y, w, h, 5, color);
    tft.setTextColor(TFT_WHITE);
    tft.setTextSize(2);
    
    int textWidth = strlen(label) * 12;
    tft.setCursor(x + (w - textWidth) / 2, y + (h - 16) / 2);
    tft.print(label);
}
```

## LEDs de Estado

### Configuración

| LED | Color | GPIO | Función |
|-----|-------|------|---------|
| LED1 | Rojo | GPIO12 | Alarma/Error |
| LED2 | Verde | GPIO13 | OK/Operando |
| LED3 | Azul | GPIO14 | Info/WiFi |

### Código de Control

```cpp
#define LED_RED   12
#define LED_GREEN 13
#define LED_BLUE  14

void setupLEDs() {
    pinMode(LED_RED, OUTPUT);
    pinMode(LED_GREEN, OUTPUT);
    pinMode(LED_BLUE, OUTPUT);
    setAllLEDs(LOW, LOW, LOW);
}

void setAllLEDs(bool red, bool green, bool blue) {
    digitalWrite(LED_RED, red);
    digitalWrite(LED_GREEN, green);
    digitalWrite(LED_BLUE, blue);
}

void setStatusLED(SystemState state) {
    switch (state) {
        case STATE_INIT:
            blinkLED(LED_BLUE, 500);
            break;
        case STATE_STANDBY:
            blinkLED(LED_GREEN, 1000);
            break;
        case STATE_HEATING:
            setAllLEDs(LOW, LOW, HIGH);
            break;
        case STATE_OPERATING:
            setAllLEDs(LOW, HIGH, LOW);
            break;
        case STATE_ALARM:
            blinkLED(LED_RED, 250);
            break;
        case STATE_ERROR:
            alternateRedBlue();
            break;
    }
}

void blinkLED(uint8_t pin, uint16_t interval) {
    static uint32_t lastBlink = 0;
    static bool ledState = false;
    
    if (millis() - lastBlink > interval) {
        ledState = !ledState;
        digitalWrite(pin, ledState);
        lastBlink = millis();
    }
}
```

## Botones de Entrada

### Configuración

| Botón | GPIO | Función |
|-------|------|---------|
| UP | GPIO33 | Subir valor/Navegar |
| DOWN | GPIO34 | Bajar valor/Navegar |
| SELECT | GPIO35 | Seleccionar/Confirmar |
| BACK | GPIO36 | Volver/Cancelar |

### Código de Manejo

```cpp
#include <Button2.h>

#define BTN_UP     33
#define BTN_DOWN   34
#define BTN_SELECT 35
#define BTN_BACK   36

Button2 btnUp, btnDown, btnSelect, btnBack;

void setupButtons() {
    btnUp.begin(BTN_UP);
    btnDown.begin(BTN_DOWN);
    btnSelect.begin(BTN_SELECT);
    btnBack.begin(BTN_BACK);
    
    btnUp.setClickHandler(onUpClick);
    btnDown.setClickHandler(onDownClick);
    btnSelect.setClickHandler(onSelectClick);
    btnBack.setClickHandler(onBackClick);
    
    btnUp.setLongClickHandler(onUpLongClick);
    btnDown.setLongClickHandler(onDownLongClick);
}

void loopButtons() {
    btnUp.loop();
    btnDown.loop();
    btnSelect.loop();
    btnBack.loop();
}

void onUpClick(Button2& btn) {
    // Incrementar valor seleccionado
}

void onDownClick(Button2& btn) {
    // Decrementar valor seleccionado
}

void onSelectClick(Button2& btn) {
    // Confirmar selección
}

void onBackClick(Button2& btn) {
    // Volver al menú anterior
}
```

## Próximas Secciones

- [Fuente de Alimentación](./power-supply)
