---
id: calibration
title: Guía de Calibración
sidebar_label: Calibración
sidebar_position: 3
description: Procedimiento de calibración de sensores de IncuNest
keywords: [calibración, sensores, temperatura, humedad]
---

# Guía de Calibración

## Importancia de la Calibración

La calibración precisa es **crítica** para la seguridad del paciente. Los sensores pueden tener desviaciones de fábrica o desarrollar drift con el tiempo.

:::warning Frecuencia de Calibración
- **Verificación:** Semanal
- **Calibración completa:** Mensual
- **Calibración certificada:** Anual o según regulaciones locales
:::

## Equipamiento Necesario

### Para Calibración de Temperatura

| Equipo | Especificación | Uso |
|--------|----------------|-----|
| Termómetro de referencia | Certificado, ±0.1°C | Patrón de comparación |
| Baño térmico (opcional) | Estabilidad ±0.05°C | Calibración de múltiples puntos |

### Para Calibración de Humedad

| Equipo | Especificación | Uso |
|--------|----------------|-----|
| Higrómetro de referencia | Certificado, ±2% RH | Patrón de comparación |
| Sales saturadas | NaCl, MgCl₂ | Puntos de referencia fijos |

## Calibración de Temperatura

### Método 1: Comparación Simple

**Procedimiento:**

1. **Preparación**
   - Coloque el termómetro de referencia en el centro de la cámara
   - Cierre la cámara completamente
   - Espere 10 minutos para estabilización

2. **Medición**
   - Anote la lectura de referencia: ____°C
   - Anote la lectura del sensor: ____°C
   - Calcule el offset: Referencia - Sensor = ____°C

3. **Aplicar Corrección**
   - Vaya a **Configuración > Calibración**
   - Ingrese el offset calculado
   - Guarde la configuración

4. **Verificación**
   - Espere 5 minutos
   - Compare nuevamente las lecturas
   - La diferencia debe ser < 0.3°C

### Método 2: Calibración de Dos Puntos

Para mayor precisión, calibre en dos puntos de temperatura.

**Punto bajo (25°C):**
```
Referencia: ____°C
Sensor: ____°C
```

**Punto alto (37°C):**
```
Referencia: ____°C
Sensor: ____°C
```

**Cálculo de coeficientes:**

Ganancia = (Ref alto - Ref bajo) / (Sensor alto - Sensor bajo)

Offset = Ref bajo - (Ganancia × Sensor bajo)

### Código de Aplicación

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

## Calibración de Humedad

### Método de Sales Saturadas

Las soluciones de sales saturadas proporcionan humedad relativa conocida a temperatura controlada.

| Sal | HR a 25°C |
|-----|-----------|
| Cloruro de Litio (LiCl) | 11.3% |
| Cloruro de Magnesio (MgCl₂) | 32.8% |
| Cloruro de Sodio (NaCl) | 75.3% |

**Procedimiento:**

1. **Preparar solución saturada**
   - Añadir sal a agua hasta que no se disuelva más
   - Dejar reposar 24 horas

2. **Crear cámara de calibración**
   - Recipiente hermético pequeño
   - Colocar solución en el fondo
   - Suspender sensor dentro (sin tocar solución)

3. **Esperar estabilización**
   - Mínimo 24 horas para equilibrio
   - Temperatura estable (±1°C)

4. **Registrar lecturas**
   ```
   Sal NaCl (referencia 75.3%):
   Lectura del sensor: ____%
   Offset = 75.3 - Lectura = ____%
   ```

5. **Aplicar corrección**
   - Ingresar offset en configuración
   - Verificar con otra sal si es posible

## Calibración del Sensor de Peso (Opcional)

### Procedimiento

1. **Tara**
   - Sin peso en la plataforma
   - Ejecutar `scale.tare()`

2. **Calibración con peso conocido**
   - Colocar peso de referencia (ej: 1000g)
   - Leer valor raw del sensor
   - Calcular factor de calibración

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

## Registro de Calibración

Mantenga un registro de todas las calibraciones:

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

## Verificación Post-Calibración

### Lista de Control

- [ ] Offset de temperatura aplicado
- [ ] Lecturas de temperatura dentro de ±0.3°C
- [ ] Offset de humedad aplicado
- [ ] Lecturas de humedad dentro de ±3%
- [ ] Registro completado
- [ ] Fecha de próxima calibración programada

### Prueba de Estabilidad

Después de calibrar, monitoree las lecturas durante 30 minutos:

1. Configure el sistema al setpoint normal
2. Registre lecturas cada 5 minutos
3. Verifique que la variación sea < ±0.5°C

## Próximas Secciones

- [Configuración](./configuration)
- [Mantenimiento](./maintenance)
