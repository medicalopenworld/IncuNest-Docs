---
id: calibration
title: Guía de Calibración
sidebar_label: Calibración
sidebar_position: 3
description: Procedimiento de calibración de sensores de IncuNest
keywords: [calibración, sensores, temperatura, humedad]
---
# Calibration Guide

## Importance of Calibration

Accurate calibration is **critical** to patient safety. Sensors may have factory deviations or develop drift over time.

:::warning Calibration Frequency
- **Verification:** Weekly
- **Complete calibration:** Monthly
- **Certified calibration:** Annual or according to local regulations
:::

## Necessary Equipment

### For Temperature Calibration

| Team | Specification | Usage |
|--------|----------------|-----|
| Reference thermometer | Certified, ±0.1°C | Comparison pattern |
| Thermal bath (optional) | Stability ±0.05°C | Multi-point calibration |

### For Humidity Calibration

| Team | Specification | Usage |
|--------|----------------|-----|
| Reference hygrometer | Certified, ±2% RH | Comparison pattern |
| Saturated salts | NaCl, MgCl₂ | Fixed reference points |

## Temperature Calibration

### Method 1: Simple Comparison

**Procedure:**

1. **Preparation**
- Place the reference thermometer in the center of the chamber
- Close the camera completely
- Wait 10 minutes for stabilization

2. **Measurement**
- Write down the reference reading: ____°C
- Write down the sensor reading: ____°C
- Calculate the offset: Reference - Sensor = ____°C

3. **Apply Correction**
- Go to **Settings > Calibration**
- Enter the calculated offset
- Save settings

4. **Verification**
- Wait 5 minutes
- Compare the readings again
- The difference must be < 0.3°C

### Method 2: Two Point Calibration

For greater accuracy, calibrate at two temperature points.

**Low point (25°C):**
```
Referencia: ____°C
Sensor: ____°C
```

**High point (37°C):**
```
Referencia: ____°C
Sensor: ____°C
```

**Calculation of coefficients:**

Gain = (Ref High - Ref Low) / (Sensor High - Sensor Low)

Offset = Ref Low - (Gain × Sensor Low)

### Application Code

```cpp
struct CalibrationData {
    float offset;
    float gain;
};

float applyCalibration(float rawValue, CalibrationData& cal) {
    return (rawValue * cal.gain) + cal.offset;
}

// Ejemplo de uso
CalibrationData tempCal = {0.0, 1.0}; // Valores por defecto
tempCal.offset = -0.3;  // Si el sensor lee 0.3°C más alto
tempCal.gain = 1.0;     // Sin ajuste de ganancia

float calibratedTemp = applyCalibration(rawTemp, tempCal);
```

## Humidity Calibration

### Saturated Salts Method

Saturated salt solutions provide known relative humidity at controlled temperature.

| Salt | RH at 25°C |
|-----|-----------|
| Lithium Chloride (LiCl) | 11.3% |
| Magnesium Chloride (MgCl₂) | 32.8% |
| Sodium Chloride (NaCl) | 75.3% |

**Procedure:**

1. **Prepare saturated solution**
- Add salt to water until it no longer dissolves
- Let it rest for 24 hours

2. **Create calibration chamber**
- Small airtight container
- Place solution at the bottom
- Suspend sensor inside (without touching solution)

3. **Wait for stabilization**
- Minimum 24 hours for balance
- Stable temperature (±1°C)

4. **Record readings**

```
   Sal NaCl (referencia 75.3%):
   Lectura del sensor: ____%
   Offset = 75.3 - Lectura = ____%
   ```

5. **Apply correction**
- Enter offset in configuration
- Check with another salt if possible

## Weight Sensor Calibration (Optional)

### Procedure

1. **Tare**
- No weight on the platform
- Run `scale.tare()`

2. **Calibration with known weight**
- Set reference weight (e.g.: 1000g)
- Read raw value from sensor
- Calculate calibration factor

```cpp
// Código de calibración de peso
void calibrateScale() {
    Serial.println("Retirar todo peso y presionar Enter...");
    waitForEnter();
    scale.tare();
    
    Serial.println("Colocar peso de 1000g y presionar Enter...");
    waitForEnter();
    
    long rawValue = scale.get_units(20);
    float calibrationFactor = rawValue / 1000.0;
    
    Serial.printf("Factor de calibración: %.2f\n", calibrationFactor);
    scale.set_scale(calibrationFactor);
}
```

## Calibration Log

Keep a record of all calibrations:

```
REGISTRO DE CALIBRACIÓN - INCUNEST
====================================

Fecha: _______________
Técnico: _______________
Número de serie: _______________

TEMPERATURA AMBIENTE
  Referencia utilizada: _______________
  Certificado #: _______________
  Lectura sensor: ___°C
  Lectura referencia: ___°C
  Offset aplicado: ___°C
  Verificación final: ___°C vs ___°C
  Diferencia: ___°C
  ¿APROBADO? [ ]Sí [ ]No

TEMPERATURA PIEL
  Lectura sensor: ___°C
  Lectura referencia: ___°C
  Offset aplicado: ___°C
  ¿APROBADO? [ ]Sí [ ]No

HUMEDAD
  Referencia utilizada: _______________
  Lectura sensor: ___%
  Lectura referencia: ___%
  Offset aplicado: ___%
  ¿APROBADO? [ ]Sí [ ]No

Firma: _______________
Próxima calibración: _______________
```

## Post-Calibration Verification

### Checklist

- [ ] Temperature offset applied
- [ ] Temperature readings within ±0.3°C
- [ ] Applied humidity offset
- [ ] Humidity readings within ±3%
- [ ] Registration completed
- [ ] Date of next scheduled calibration

### Stability Test

After calibrating, monitor the readings for 30 minutes:

1. Configure the system to normal setpoint
2. Record readings every 5 minutes
3. Verify that the variation is < ±0.5°C

## Upcoming Sections

- [Settings](./configuration)
- [Maintenance](./maintenance)
