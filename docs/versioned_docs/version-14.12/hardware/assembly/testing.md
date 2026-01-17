---
id: testing
title: Pruebas y Verificación
sidebar_label: Pruebas
sidebar_position: 5
description: Guía de pruebas para IncuNest
keywords: [pruebas, verificación, calibración, QA]
---

# Pruebas y Verificación

## Lista de Verificación Pre-Operación

### Inspección Visual

- [ ] Todos los cables correctamente conectados
- [ ] Sin cables pelados o dañados
- [ ] Tornillería ajustada
- [ ] Estructura estable
- [ ] Sin obstrucciones en conductos de aire

### Verificación Eléctrica

- [ ] Continuidad de tierra
- [ ] Sin cortocircuitos (VCC-GND)
- [ ] Fusibles correctos instalados
- [ ] Polaridad de capacitores correcta

## Pruebas por Subsistema

### 1. Prueba de Alimentación

**Procedimiento:**

1. Desconectar todos los actuadores
2. Conectar fuente de alimentación
3. Medir voltajes:

| Punto de Medición | Valor Esperado | Tolerancia |
|-------------------|----------------|------------|
| Bus 12V | 12.0V | ±0.5V |
| Salida regulador 5V | 5.0V | ±0.25V |
| Salida regulador 3.3V | 3.3V | ±0.1V |

**Resultado:**
- ✅ PASS: Todos los voltajes dentro de tolerancia
- ❌ FAIL: Verificar reguladores y conexiones

### 2. Prueba de Sensores

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

**Criterios de aceptación:**
- [ ] Lecturas estables (±0.5°C en 1 minuto)
- [ ] Responde a cambios (soplar aire cálido)
- [ ] Sin valores NaN o errores de comunicación

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

### 3. Prueba de Actuadores

#### Calefactor

**⚠️ PRECAUCIÓN: Elemento caliente**

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

**Criterios de aceptación:**
- [ ] Aumento de temperatura detectable
- [ ] Sin humo ni olor a quemado
- [ ] MOSFET no sobrecalienta
- [ ] Termostato de seguridad no dispara

#### Ventilador

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

**Verificar:**
- [ ] Gira en todas las velocidades
- [ ] Sin ruidos anormales
- [ ] Flujo de aire perceptible

#### Humidificador

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

**Verificar:**
- [ ] Produce niebla visible
- [ ] Sensor de nivel funciona
- [ ] Sin fugas de agua

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

### 4. Prueba de Display

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

**Verificar:**
- [ ] Todas las líneas visibles
- [ ] Contraste adecuado
- [ ] Retroiluminación funciona

### 5. Prueba de Comunicaciones

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

#### Servidor Web

1. Conectar a la red WiFi del dispositivo
2. Abrir navegador en `http://[IP_del_dispositivo]`
3. Verificar que la página carga correctamente
4. Verificar datos en tiempo real

## Prueba de Sistema Completo

### Ciclo de Calentamiento

**Objetivo:** Verificar que el sistema alcanza y mantiene la temperatura objetivo.

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

**Procedimiento:**

1. Iniciar sistema a temperatura ambiente
2. Configurar setpoint: 36.5°C
3. Registrar temperatura cada minuto
4. Verificar:
   - [ ] Tiempo para alcanzar 36°C < 20 minutos
   - [ ] Estabilidad ±0.5°C después de estabilizar
   - [ ] Sin overshoots > 1°C

### Prueba de Alarmas

| Condición | Acción | Resultado Esperado |
|-----------|--------|-------------------|
| Setpoint > 38°C | Configurar | Alarma: temp alta |
| Desconectar sensor | Físicamente | Alarma: sensor falla |
| Cubrir sensor | Calentar externamente | Alarma: sobretemperatura |
| Vaciar reservorio | Activar humidificador | Alarma: agua baja |

### Prueba de Seguridad

**⚠️ Realizar con supervisión**

1. **Fallo de termostato de seguridad:**
   - Cortocircuitar termostato temporalmente
   - Verificar que el sistema detecta sobretemperatura por software
   - Restaurar termostato

2. **Fallo de comunicación:**
   - Desconectar WiFi
   - Verificar operación autónoma continua

3. **Corte de energía:**
   - Desconectar alimentación por 5 segundos
   - Reconectar
   - Verificar reinicio correcto

## Registro de Pruebas

### Formato de Registro

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

## Resolución de Problemas Comunes

| Problema | Posible Causa | Solución |
|----------|---------------|----------|
| No enciende | Fusible quemado | Reemplazar fusible |
| Lecturas erráticas | Conexión floja | Revisar soldaduras |
| No calienta | MOSFET dañado | Reemplazar MOSFET |
| WiFi inestable | Señal débil | Acercar a router |
| Display en blanco | Contraste | Ajustar potenciómetro |

## Próximas Secciones

- [Guía de Instalación](../../guides/installation)
- [Calibración](../../guides/calibration)
