---
id: testing
title: Pruebas y Verificación
sidebar_label: Testing
sidebar_position: 5
description: Guía de pruebas para IncuNest
keywords: [pruebas, verificación, calibración, QA]
---
# Testing and Verification

## Pre-Operation Checklist

### Visual Inspection

- [ ] All cables correctly connected
- [ ] No frayed or damaged cables
- [ ] Tightened screws
- [ ] Stable structure
- [ ] No obstructions in air ducts

### Electrical Check

- [ ] Ground continuity
- [ ] No short circuits (VCC-GND)
- [ ] Correct fuses installed
- [ ] Correct polarity of capacitors

## Tests by Subsystem

### 1. Feeding Test

**Procedure:**

1. Disconnect all actuators
2. Connect power supply
3. Measure voltages:

| Measurement Point | Expected Value | Tolerance |
|-------------------|----------------|-------------|
| Bus 12V | 12.0V | ±0.5V |
| Regulator output 5V | 5.0V | ±0.25V |
| Regulator output 3.3V | 3.3V | ±0.1V |

**Result:**
- ✅ PASS: All voltages within tolerance
- ❌ FAIL: Check regulators and connections

### 2. Sensor Test

#### Sensor SHT31/DHT22

```cpp
// Código de prueba
void testTemperatureSensor() {
    float temp = readTemperature();
    float hum = readHumidity();
    
    Serial.printf("Temperatura: %.2f°C\n", temp);
    Serial.printf("Humedad: %.2f%%\n", hum);
    
    // Verificar rango razonable
    if (temp > 15.0 && temp < 40.0 && hum > 20.0 && hum < 90.0) {
        Serial.println("PASS: Sensor funcionando");
    } else {
        Serial.println("FAIL: Lecturas fuera de rango");
    }
}
```

**Acceptance criteria:**
- [ ] Stable readings (±0.5°C in 1 minute)
- [ ] Responds to changes (blow warm air)
- [ ] No NaN values or communication errors

#### Sensor DS18B20

```cpp
void testSkinSensor() {
    float temp = readSkinTemperature();
    
    Serial.printf("Temperatura piel: %.2f°C\n", temp);
    
    // Tocar la sonda debería subir la temperatura
    if (temp > 20.0 && temp < 45.0) {
        Serial.println("PASS: Sensor funcionando");
    }
}
```

### 3. Actuator Test

#### Heater

**⚠️ CAUTION: Hot element**

```cpp
void testHeater() {
    Serial.println("Iniciando prueba de calefactor...");
    
    float tempInicial = readTemperature();
    
    // Encender calefactor al 50% por 30 segundos
    setHeaterPower(50);
    setFanSpeed(100); // Ventilador al máximo
    
    delay(30000);
    
    float tempFinal = readTemperature();
    setHeaterPower(0);
    
    float deltaTemp = tempFinal - tempInicial;
    Serial.printf("Delta temperatura: %.2f°C\n", deltaTemp);
    
    if (deltaTemp > 2.0) {
        Serial.println("PASS: Calefactor funcionando");
    } else {
        Serial.println("FAIL: Calentamiento insuficiente");
    }
}
```

**Acceptance criteria:**
- [ ] Detectable temperature increase
- [ ] No smoke or burning smell
- [ ] MOSFET does not overheat
- [ ] Safety thermostat does not trip

#### Fan

```cpp
void testFan() {
    Serial.println("Prueba de ventilador...");
    
    for (int speed = 0; speed <= 100; speed += 25) {
        setFanSpeed(speed);
        Serial.printf("Velocidad: %d%%\n", speed);
        delay(2000);
    }
    
    setFanSpeed(0);
    Serial.println("PASS: Ventilador funcionando");
}
```

**Verify:**
- [ ] Rotates at all speeds
- [ ] No abnormal noises
- [ ] Perceptible airflow

#### Humidifier

```cpp
void testHumidifier() {
    Serial.println("Prueba de humidificador...");
    
    if (!checkWaterLevel()) {
        Serial.println("FAIL: Sin agua en reservorio");
        return;
    }
    
    setHumidifier(true);
    delay(5000);
    
    // Verificar visualmente producción de niebla
    Serial.println("¿Se observa niebla? (Y/N)");
    
    setHumidifier(false);
}
```

**Verify:**
- [ ] Produces visible fog
- [ ] Level sensor works
- [ ] No water leaks

#### Buzzer

```cpp
void testBuzzer() {
    Serial.println("Prueba de buzzer...");
    
    // Tono bajo
    beep(1000, 500);
    delay(200);
    
    // Tono medio
    beep(2000, 500);
    delay(200);
    
    // Tono alto
    beep(3000, 500);
    
    Serial.println("¿Se escucharon 3 tonos? (Y/N)");
}
```

### 4. Display Test

```cpp
void testDisplay() {
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("LINEA 1 - TEST OK");
    lcd.setCursor(0, 1);
    lcd.print("LINEA 2 - TEST OK");
    lcd.setCursor(0, 2);
    lcd.print("LINEA 3 - TEST OK");
    lcd.setCursor(0, 3);
    lcd.print("LINEA 4 - TEST OK");
    
    Serial.println("Verificar todas las líneas visibles");
}
```

**Verify:**
- [ ] All lines visible
- [ ] Adequate contrast
- [ ] Backlight works

### 5. Communications Test

#### WiFi

```cpp
void testWiFi() {
    WiFi.begin(SSID, PASSWORD);
    
    int attempts = 0;
    while (WiFi.status() != WL_CONNECTED && attempts < 20) {
        delay(500);
        Serial.print(".");
        attempts++;
    }
    
    if (WiFi.status() == WL_CONNECTED) {
        Serial.printf("\nPASS: Conectado a WiFi\n");
        Serial.printf("IP: %s\n", WiFi.localIP().toString().c_str());
        Serial.printf("RSSI: %d dBm\n", WiFi.RSSI());
    } else {
        Serial.println("\nFAIL: No se pudo conectar");
    }
}
```

#### Web Server

1. Connect to the device's WiFi network
2. Open browser in `http://[IP_del_dispositivo]`
3. Verify that the page loads correctly
4. Verify data in real time

## Full System Test

### Heating Cycle

**Objective:** Verify that the system reaches and maintains the target temperature.

```
Temperatura
    38°C │                    ════════════════════
         │                   ╱
    36°C │   Objetivo ─────────────────────────────
         │                 ╱
    25°C │════════════════╱
         └─────────┼──────────┼──────────────────► Tiempo
                  10min      20min
```

**Procedure:**

1. Start system at room temperature
2. Configure setpoint: 36.5°C
3. Record temperature every minute
4. Check:
- [ ] Time to reach 36°C < 20 minutes
- [ ] Stability ±0.5°C after stabilizing
- [ ] No overshoots > 1°C

### Alarm Test

| Condition | Action | Expected Result |
|--------|--------|-------------------|
| Setpoint > 38°C | Configure | Alarm: high temp |
| Disconnect sensor | Physically | Alarm: sensor failure |
| Cover sensor | Heat externally | Alarm: overtemperature |
| Empty reservoir | Activate humidifier | Alarm: low water |

### Security Test

**⚠️ Perform with supervision**

1. **Safety thermostat failure:**
- Temporarily short circuit thermostat
- Verify that the system detects overtemperature by software
- Reset thermostat

2. **Communication failure:**
- Disconnect WiFi
- Verify continuous autonomous operation

3. **Power outage:**
- Disconnect power for 5 seconds
- Reconnect
- Verify successful reboot

## Test Log

### Registration Format

```
REGISTRO DE PRUEBAS - INCUNEST
================================

Fecha: _______________
Técnico: _______________
Número de serie: _______________

ALIMENTACIÓN
[ ] 12V: _____ V
[ ] 5V:  _____ V
[ ] 3.3V: _____ V

SENSORES
[ ] SHT31: ___°C / ___% HR
[ ] DS18B20: ___°C
[ ] Nivel agua: OK / FALLA

ACTUADORES
[ ] Calefactor: OK / FALLA
[ ] Ventilador: OK / FALLA
[ ] Humidificador: OK / FALLA
[ ] Buzzer: OK / FALLA

DISPLAY
[ ] LCD: OK / FALLA

COMUNICACIONES
[ ] WiFi: OK / FALLA
[ ] WebServer: OK / FALLA

SISTEMA COMPLETO
[ ] Ciclo calentamiento: ___min hasta 36°C
[ ] Estabilidad: ±___°C
[ ] Alarmas: OK / FALLA

OBSERVACIONES:
_________________________________
_________________________________

RESULTADO FINAL: [ ] APROBADO  [ ] RECHAZADO

Firma: _______________
```

## Common Problem Resolution

| Problem | Possible Cause | Solution |
|----------|---------------|----------|
| Does not turn on | Blown fuse | Replace fuse |
| Erratic readings | Loose connection | Check welds |
| Does not heat | Damaged MOSFET | Replace MOSFET |
| Unstable WiFi | Weak signal | Zoom in on router |
| Blank display | Contrast | Adjust potentiometer |

## Upcoming Sections

- [Installation Guide](../../guides/installation)
- [Calibration](../../guides/calibration)
