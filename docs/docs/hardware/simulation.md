---
id: simulation
title: Simulación de Hardware
sidebar_label: Simulación
sidebar_position: 2
description: Guía para simular el hardware de IncuNest usando Wokwi
keywords: [simulación, Wokwi, hardware, ESP32, desarrollo, pruebas]
---

# Simulación de Hardware

## Introducción

La simulación del hardware permite probar y desarrollar el firmware de IncuNest sin necesidad de contar con todos los componentes físicos. Utilizamos [Wokwi](https://wokwi.com/), un simulador de electrónica en línea que soporta ESP32 y muchos de los componentes utilizados en este proyecto.

:::tip Ventajas de la Simulación
- **Desarrollo rápido**: Prueba código sin hardware físico
- **Depuración segura**: Sin riesgo de dañar componentes
- **Accesibilidad**: Cualquiera puede contribuir al proyecto
- **Educación**: Ideal para aprender sobre el sistema
:::

## Empezando con Wokwi

### Requisitos Previos

1. Navegador web moderno (Chrome, Firefox, Edge)
2. Cuenta en [Wokwi](https://wokwi.com/) (opcional, pero recomendada para guardar proyectos)
3. Conocimientos básicos de Arduino/ESP32

### Crear un Nuevo Proyecto

1. Visita [wokwi.com](https://wokwi.com/)
2. Haz clic en "New Project"
3. Selecciona "ESP32" como plataforma
4. Añade los componentes necesarios desde el panel lateral

## Compatibilidad de Componentes BOM

A continuación se presenta el análisis de compatibilidad entre los componentes del [BOM de IncuNest](./assembly/bom) y el hardware soportado por Wokwi.

### Componentes Completamente Soportados ✅

| Componente | Uso en IncuNest | Componente Wokwi |
|------------|-----------------|------------------|
| ESP32-WROOM-32 | MCU principal | `wokwi-esp32-devkit-v1` |
| DHT22 | Sensor temp/humedad (respaldo) | `wokwi-dht22` |
| DS18B20 | Sensor temperatura de piel | `wokwi-ds18b20` |
| HX711 + Celda de carga | Medición de peso | `wokwi-hx711` |
| Módulo SD Card | Registro de datos | `wokwi-microsd-card` |
| LCD 20x4 I2C | Display básico | `wokwi-lcd2004` |
| Buzzer | Alarma sonora | `wokwi-buzzer` |
| LEDs RGB | Indicadores de estado | `wokwi-rgb-led` |
| Pulsadores | Interfaz de usuario | `wokwi-pushbutton` |
| Resistencias | Varios circuitos | `wokwi-resistor` |
| NTC Termistor | Sensor temperatura analógico | `wokwi-ntc-temperature-sensor` |
| Relé | Control de actuadores | `wokwi-relay-module` |
| Potenciómetro | Simulación de sensores analógicos | `wokwi-potentiometer` |

### Componentes Parcialmente Soportados ⚠️

| Componente | Uso en IncuNest | Alternativa en Wokwi | Notas |
|------------|-----------------|----------------------|-------|
| DS3231 RTC | Reloj tiempo real | Usar librería DS3231 | Compatible vía I2C, sin componente dedicado |
| TFT ILI9488 | Display avanzado | `wokwi-ili9341` | ILI9341 es compatible, diferente resolución |
| Touch XPT2046 | Pantalla táctil | `wokwi-ili9341` | Incluido en display ILI9341 |
| MOSFET IRLZ44N | Control PWM de actuadores | Simular con lógica digital | Sin componente físico, simular comportamiento |
| Ventilador 12V | Circulación de aire | `wokwi-led` como indicador | Usar LED para visualizar estado |
| Transistor 2N2222A | Control de señales | Simular con lógica digital | Sin componente físico en simulación |

### Componentes No Soportados ❌

| Componente | Uso en IncuNest | Alternativa Sugerida |
|------------|-----------------|---------------------|
| SHT31 | Sensor temp/humedad primario | Usar DHT22 como sustituto |
| Resistencia PTC 100W | Elemento calefactor | Simular con variable en código |
| Humidificador ultrasónico | Control de humedad | Simular con variable en código |
| KSD301 | Termostato de seguridad 45°C | Simular lógica de protección en código |
| Diodo SS34 | Protección de circuito | No necesario en simulación |
| Reguladores AMS1117 | Regulación de voltaje | No necesario en simulación |
| Fuente de alimentación | Energía del sistema | No necesario en simulación |

## Proyecto de Simulación Base

### Estructura del Proyecto Wokwi

Un proyecto básico de simulación de IncuNest requiere los siguientes archivos:

```
incunest-simulation/
├── diagram.json      # Definición del circuito
├── wokwi.toml        # Configuración del proyecto
└── src/
    └── main.cpp      # Código fuente
```

### Diagrama de Conexiones Básico

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

### Código de Ejemplo

```cpp
#include <Arduino.h>
#include <DHT.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <LiquidCrystal_I2C.h>

// Definición de pines (según hardware/overview.md)
#define PIN_DHT22       4
#define PIN_DS18B20     5
#define PIN_HEATER_PWM  25
#define PIN_FAN_PWM     26
#define PIN_BUZZER      32

// Configuración de sensores
DHT dht(PIN_DHT22, DHT22);
OneWire oneWire(PIN_DS18B20);
DallasTemperature sensors(&oneWire);
LiquidCrystal_I2C lcd(0x27, 20, 4);

// Variables de control
float targetTemp = 36.5;
float currentTemp = 0;
float currentHumidity = 0;

void setup() {
  Serial.begin(115200);
  Serial.println("IncuNest Simulation - Starting...");
  
  // Inicializar sensores
  dht.begin();
  sensors.begin();
  
  // Inicializar display
  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("IncuNest v14.12");
  lcd.setCursor(0, 1);
  lcd.print("Simulation Mode");
  
  // Configurar pines de salida
  pinMode(PIN_HEATER_PWM, OUTPUT);
  pinMode(PIN_FAN_PWM, OUTPUT);
  pinMode(PIN_BUZZER, OUTPUT);
  
  delay(2000);
  lcd.clear();
}

void loop() {
  // Leer sensores
  currentHumidity = dht.readHumidity();
  float dhtTemp = dht.readTemperature();
  
  sensors.requestTemperatures();
  float ds18Temp = sensors.getTempCByIndex(0);
  
  // Usar temperatura promedio
  currentTemp = (dhtTemp + ds18Temp) / 2.0;
  
  // Control simple de temperatura
  if (currentTemp < targetTemp - 0.5) {
    digitalWrite(PIN_HEATER_PWM, HIGH);  // Encender calefactor
    digitalWrite(PIN_FAN_PWM, HIGH);     // Encender ventilador
  } else if (currentTemp > targetTemp + 0.5) {
    digitalWrite(PIN_HEATER_PWM, LOW);   // Apagar calefactor
    digitalWrite(PIN_FAN_PWM, HIGH);     // Mantener ventilador
  } else {
    digitalWrite(PIN_HEATER_PWM, LOW);
    digitalWrite(PIN_FAN_PWM, LOW);
  }
  
  // Actualizar display
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
  
  // Log serial
  Serial.printf("T:%.1f H:%.1f Target:%.1f\n", 
                currentTemp, currentHumidity, targetTemp);
  
  delay(2000);
}
```

## Integración con Firmware

Para una simulación más completa, consulta las siguientes secciones de software:

- [Arquitectura del Firmware](../software/firmware/architecture) - Estructura del código
- [Configuración Inicial](../software/firmware/setup) - Configuración del entorno de desarrollo
- [Sistema de Control](../software/firmware/control-system) - Lógica de control PID
- [Integración de Sensores](../software/firmware/sensors-integration) - Manejo de sensores

### Usando el Firmware Real en Wokwi

1. Clona el repositorio del firmware de IncuNest
2. Copia los archivos fuente a tu proyecto Wokwi
3. Ajusta las definiciones de pines según el diagrama de simulación
4. Comenta o simula los componentes no soportados

## Limitaciones de la Simulación

:::warning Diferencias con Hardware Real
La simulación tiene limitaciones importantes que debes considerar:
:::

### No se Puede Simular

1. **Comportamiento térmico real**: La inercia térmica y la distribución de calor
2. **Ruido en sensores**: Las lecturas simuladas son ideales
3. **Tiempos de respuesta**: Los actuadores responden instantáneamente
4. **Consumo de energía**: No hay simulación de corriente/potencia
5. **Comunicación WiFi real**: Solo simulación básica

### Recomendaciones

- Usa la simulación para desarrollo y depuración inicial
- **Siempre prueba con hardware real** antes de uso clínico
- Valida los algoritmos de control con datos reales
- Considera las tolerancias de componentes reales

## Recursos Adicionales

### Enlaces Útiles

- [Documentación de Wokwi](https://docs.wokwi.com/)
- [Hardware Soportado por Wokwi](https://docs.wokwi.com/getting-started/supported-hardware)
- [Referencia DHT22 en Wokwi](https://docs.wokwi.com/parts/wokwi-dht22)
- [Referencia ESP32 en Wokwi](https://docs.wokwi.com/parts/wokwi-esp32-devkit-v1)
- [Referencia HX711 en Wokwi](https://docs.wokwi.com/parts/wokwi-hx711)

### Proyectos de Ejemplo

- [Proyecto base de simulación IncuNest](https://wokwi.com/) *(próximamente)*
- [Ejemplos de ESP32 con sensores](https://wokwi.com/projects)

## Contribuir a la Simulación

Si deseas mejorar el entorno de simulación:

1. Identifica componentes que puedan ser simulados de mejor manera
2. Crea proyectos de ejemplo en Wokwi
3. Documenta tus hallazgos y compártelos con la comunidad
4. Consulta la guía de [Contribución](../contributing)

## Próximas Secciones

- [Componentes Electrónicos](./electronics/main-board) - Detalles del hardware real
- [Lista de Materiales](./assembly/bom) - BOM completo del proyecto
- [Visión General del Software](../software/overview) - Arquitectura del firmware
