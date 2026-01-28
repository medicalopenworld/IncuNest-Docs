---
id: simulation
title: Hardware Simulation
sidebar_label: Simulation
sidebar_position: 2
description: Guide to simulate IncuNest hardware using Wokwi
keywords: [simulation, Wokwi, hardware, ESP32, development, testing]
---

# Hardware Simulation

## Introduction

Hardware simulation allows you to test and develop IncuNest firmware without needing all physical components. We use [Wokwi](https://wokwi.com/), an online electronics simulator that supports ESP32 and many of the components used in this project.

:::tip Simulation Advantages
- **Rapid development**: Test code without physical hardware
- **Safe debugging**: No risk of damaging components
- **Accessibility**: Anyone can contribute to the project
- **Education**: Ideal for learning about the system
:::

## Getting Started with Wokwi

### Prerequisites

1. Modern web browser (Chrome, Firefox, Edge)
2. Account on [Wokwi](https://wokwi.com/) (optional, but recommended for saving projects)
3. Basic knowledge of Arduino/ESP32

### Create a New Project

1. Visit [wokwi.com](https://wokwi.com/)
2. Click on "New Project"
3. Select "ESP32" as the platform
4. Add necessary components from the side panel

## BOM Component Compatibility

Below is the compatibility analysis between [IncuNest BOM](./assembly/bom) components and Wokwi supported hardware.

### Fully Supported Components ✅

| Component | Use in IncuNest | Wokwi Component |
|-----------|-----------------|-----------------|
| ESP32-WROOM-32 | Main MCU | `wokwi-esp32-devkit-v1` |
| DHT22 | Temp/humidity sensor (backup) | `wokwi-dht22` |
| DS18B20 | Skin temperature sensor | `wokwi-ds18b20` |
| HX711 + Load cell | Weight measurement | `wokwi-hx711` |
| SD Card Module | Data logging | `wokwi-microsd-card` |
| LCD 20x4 I2C | Basic display | `wokwi-lcd2004` |
| Buzzer | Sound alarm | `wokwi-buzzer` |
| RGB LEDs | Status indicators | `wokwi-rgb-led` |
| Push buttons | User interface | `wokwi-pushbutton` |
| Resistors | Various circuits | `wokwi-resistor` |
| NTC Thermistor | Analog temperature sensor | `wokwi-ntc-temperature-sensor` |
| Relay | Actuator control | `wokwi-relay-module` |
| Potentiometer | Analog sensor simulation | `wokwi-potentiometer` |

### Partially Supported Components ⚠️

| Component | Use in IncuNest | Wokwi Alternative | Notes |
|-----------|-----------------|-------------------|-------|
| DS3231 RTC | Real-time clock | Use DS3231 library | Compatible via I2C, no dedicated component |
| TFT ILI9488 | Advanced display | `wokwi-ili9341` | ILI9341 is compatible, different resolution |
| Touch XPT2046 | Touch screen | `wokwi-ili9341` | Included in ILI9341 display |
| MOSFET IRLZ44N | PWM actuator control | Simulate with digital logic | No physical component, simulate behavior |
| 12V Fan | Air circulation | `wokwi-led` as indicator | Use LED to visualize state |
| 2N2222A Transistor | Signal control | Simulate with digital logic | No physical component in simulation |

### Unsupported Components ❌

| Component | Use in IncuNest | Suggested Alternative |
|-----------|-----------------|----------------------|
| SHT31 | Primary temp/humidity sensor | Use DHT22 as substitute |
| PTC Resistance 100W | Heating element | Simulate with code variable |
| Ultrasonic humidifier | Humidity control | Simulate with code variable |
| KSD301 | Safety thermostat 45°C | Simulate protection logic in code |
| SS34 Diode | Circuit protection | Not needed in simulation |
| AMS1117 regulators | Voltage regulation | Not needed in simulation |
| Power supply | System power | Not needed in simulation |

## Base Simulation Project

### Wokwi Project Structure

A basic IncuNest simulation project requires the following files:

```
incunest-simulation/
├── diagram.json      # Circuit definition
├── wokwi.toml        # Project configuration
└── src/
    └── main.cpp      # Source code
```

### Basic Wiring Diagram

```json
{
  "version": 1,
  "author": "IncuNest Project",
  "editor": "wokwi",
  "parts": [
    { "type": "wokwi-esp32-devkit-v1", "id": "esp", "top": 0, "left": 0 },
    { "type": "wokwi-dht22", "id": "dht", "top": -50, "left": 150 },
    { "type": "wokwi-ds18b20", "id": "ds18", "top": -50, "left": 250 },
    { "type": "wokwi-lcd2004", "id": "lcd", "top": 150, "left": 0 },
    { "type": "wokwi-buzzer", "id": "buzzer", "top": -50, "left": 350 },
    { "type": "wokwi-led", "id": "heater_led", "top": 100, "left": 300, "attrs": { "color": "red" } },
    { "type": "wokwi-led", "id": "fan_led", "top": 100, "left": 350, "attrs": { "color": "blue" } }
  ],
  "connections": [
    ["esp:GND.1", "dht:GND", "black", ["v:20"]],
    ["esp:3V3", "dht:VCC", "red", ["v:10"]],
    ["esp:D4", "dht:DATA", "green", ["h:10"]],
    ["esp:GND.1", "ds18:GND", "black", ["v:30"]],
    ["esp:3V3", "ds18:VCC", "red", ["v:15"]],
    ["esp:D5", "ds18:DQ", "yellow", ["h:15"]],
    ["esp:GND.1", "lcd:GND", "black", ["v:40"]],
    ["esp:3V3", "lcd:VCC", "red", ["v:20"]],
    ["esp:D21", "lcd:SDA", "blue", ["h:20"]],
    ["esp:D22", "lcd:SCL", "purple", ["h:25"]],
    ["esp:D32", "buzzer:1", "orange", ["h:30"]],
    ["esp:GND.1", "buzzer:2", "black", ["v:50"]],
    ["esp:D25", "heater_led:A", "red", ["h:35"]],
    ["esp:GND.1", "heater_led:C", "black", ["v:55"]],
    ["esp:D26", "fan_led:A", "blue", ["h:40"]],
    ["esp:GND.1", "fan_led:C", "black", ["v:60"]]
  ]
}
```

### Example Code

```cpp
#include <Arduino.h>
#include <DHT.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <LiquidCrystal_I2C.h>

// Pin definitions (according to hardware/overview.md)
#define PIN_DHT22       4
#define PIN_DS18B20     5
#define PIN_HEATER_PWM  25
#define PIN_FAN_PWM     26
#define PIN_BUZZER      32

// Sensor configuration
DHT dht(PIN_DHT22, DHT22);
OneWire oneWire(PIN_DS18B20);
DallasTemperature sensors(&oneWire);
LiquidCrystal_I2C lcd(0x27, 20, 4);

// Control variables
float targetTemp = 36.5;
float currentTemp = 0;
float currentHumidity = 0;

void setup() {
  Serial.begin(115200);
  Serial.println("IncuNest Simulation - Starting...");
  
  // Initialize sensors
  dht.begin();
  sensors.begin();
  
  // Initialize display
  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("IncuNest v14.12");
  lcd.setCursor(0, 1);
  lcd.print("Simulation Mode");
  
  // Configure output pins
  pinMode(PIN_HEATER_PWM, OUTPUT);
  pinMode(PIN_FAN_PWM, OUTPUT);
  pinMode(PIN_BUZZER, OUTPUT);
  
  delay(2000);
  lcd.clear();
}

void loop() {
  // Read sensors
  currentHumidity = dht.readHumidity();
  float dhtTemp = dht.readTemperature();
  
  sensors.requestTemperatures();
  float ds18Temp = sensors.getTempCByIndex(0);
  
  // Use average temperature
  currentTemp = (dhtTemp + ds18Temp) / 2.0;
  
  // Simple temperature control
  if (currentTemp < targetTemp - 0.5) {
    digitalWrite(PIN_HEATER_PWM, HIGH);  // Turn on heater
    digitalWrite(PIN_FAN_PWM, HIGH);     // Turn on fan
  } else if (currentTemp > targetTemp + 0.5) {
    digitalWrite(PIN_HEATER_PWM, LOW);   // Turn off heater
    digitalWrite(PIN_FAN_PWM, HIGH);     // Keep fan on
  } else {
    digitalWrite(PIN_HEATER_PWM, LOW);
    digitalWrite(PIN_FAN_PWM, LOW);
  }
  
  // Update display
  lcd.setCursor(0, 0);
  lcd.print("Temp: ");
  lcd.print(currentTemp, 1);
  lcd.print(" C    ");
  
  lcd.setCursor(0, 1);
  lcd.print("Hum:  ");
  lcd.print(currentHumidity, 1);
  lcd.print(" %    ");
  
  lcd.setCursor(0, 2);
  lcd.print("Target: ");
  lcd.print(targetTemp, 1);
  lcd.print(" C  ");
  
  lcd.setCursor(0, 3);
  lcd.print("Status: ");
  lcd.print(digitalRead(PIN_HEATER_PWM) ? "HEATING" : "STABLE ");
  
  // Serial log
  Serial.printf("T:%.1f H:%.1f Target:%.1f\n", 
                currentTemp, currentHumidity, targetTemp);
  
  delay(2000);
}
```

## Firmware Integration

For a more complete simulation, consult the following software sections:

- [Firmware Architecture](../software/firmware/architecture) - Code structure
- [Initial Setup](../software/firmware/setup) - Development environment setup
- [Control System](../software/firmware/control-system) - PID control logic
- [Sensor Integration](../software/firmware/sensors-integration) - Sensor handling

### Using Real Firmware in Wokwi

1. Clone the IncuNest firmware repository
2. Copy source files to your Wokwi project
3. Adjust pin definitions according to simulation diagram
4. Comment out or simulate unsupported components

## Simulation Limitations

:::warning Differences from Real Hardware
Simulation has important limitations you should consider:
:::

### Cannot Simulate

1. **Real thermal behavior**: Thermal inertia and heat distribution
2. **Sensor noise**: Simulated readings are ideal
3. **Response times**: Actuators respond instantaneously
4. **Power consumption**: No current/power simulation
5. **Real WiFi communication**: Only basic simulation

### Recommendations

- Use simulation for initial development and debugging
- **Always test with real hardware** before clinical use
- Validate control algorithms with real data
- Consider tolerances of real components

## Additional Resources

### Useful Links

- [Wokwi Documentation](https://docs.wokwi.com/)
- [Wokwi Supported Hardware](https://docs.wokwi.com/getting-started/supported-hardware)
- [DHT22 Reference in Wokwi](https://docs.wokwi.com/parts/wokwi-dht22)
- [ESP32 Reference in Wokwi](https://docs.wokwi.com/parts/wokwi-esp32-devkit-v1)
- [HX711 Reference in Wokwi](https://docs.wokwi.com/parts/wokwi-hx711)

### Example Projects

- [IncuNest base simulation project](https://wokwi.com/) *(coming soon)*
- [ESP32 with sensors examples](https://wokwi.com/projects)

## Contributing to Simulation

If you want to improve the simulation environment:

1. Identify components that can be better simulated
2. Create example projects on Wokwi
3. Document your findings and share with the community
4. Consult the [Contributing](../contributing) guide

## Next Sections

- [Electronic Components](./electronics/main-board) - Real hardware details
- [Bill of Materials](./assembly/bom) - Complete project BOM
- [Software Overview](../software/overview) - Firmware architecture
