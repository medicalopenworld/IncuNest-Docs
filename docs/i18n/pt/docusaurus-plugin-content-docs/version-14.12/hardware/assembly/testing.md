---
id: testing
title: Testes e Verificação
sidebar_label: Testes
sidebar_position: 5
description: Guia de Testes para IncuNest
keywords: [pruebas, verificación, calibración, QA]
---

# Testes e Verificação

## Lista de Verificação Pré-Operação

## Inspecção Visual

- [ ] Todos os cabos corretamente conectados
- [ ] Sem fios descascados ou danificados
- [ ] Tornilleria ajustada
- [ ] Estrutura estável
- [ ] Sem obstruções em condutas de ar

## Verificação Elétrica

- [ ] Continuidade de terra
- [ ] Sem curto-circuitos (VCC-GND)
- [ ] Fusíveis corretos instalados
- [ ] Polaridade de capacitores correta

## Testes por Subsistema

## 1. Teste de Alimentação

**Procedimento:**

1. Desligar todos os atuadores
2. Ligar a fonte de alimentação
3. Medir voltagens:

| Ponto de Medição | Valor Esperado | Tolerancia |
|-------------------|----------------|------------|
| Bus 12V | 12.0V | ±0.5V |
| Saída regulador 5V | 5.0V | ±0.25V |
| Saída regulador 3.3V | 3.3V | ±0.1V |

**Resultado:**
- Gálatas PASS: Todas as voltagens dentro de tolerância
- ❌ FAIL: Verificar reguladores e ligações

## 2. Teste de Sensores

### Sensor SHT31/DHT22

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

**Criterios de aceitação:**
- [ ] Leituras estáveis (±0.5°C em 1 minuto)
- [ ] Responde a mudanças (soplar ar quente)
- [ ] Sem valores NaN ou erros de comunicação

### Sensor DS18B20

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

## 3. Teste de Ativos

### Calefator

** Bermuda️ PRECAUÇÃO: Elemento quente**

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

**Criterios de aceitação:**
- [ ] Aumento da temperatura detectável
- [ ] Sem fumaça nem cheiro a queimado
- [ ] MOSFET não sobrecalienta
- [ ] Termostato de segurança não dispara

### Ventilador

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
- [ ] Roda em todas as velocidades
- [ ] Sem ruídos anormais
- [ ] Fluxo de ar perceptível

### Humidificador

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
- [ ] Produz nevoeiro visível
- [ ] Sensor de nível funciona
- [ ] Sem vazamento de água

## Buzzer

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

## 4. Teste de Display

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
- [ ] Todas as linhas visíveis
- [ ] Contraste adequado
- [ ] Retroiluminação funciona

## 5. Teste de Comunicações

### WiFi

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

### Servidor Web

1. Ligar à rede WiFi do dispositivo
2. Abrir o Navegador no `http://[IP_del_dispositivo]`
3. Verificar que a página carrega corretamente
4. Verificar dados em tempo real

## Teste de Sistema Completo

## Ciclo de Calentamento

**Objetivo:** Verificar que o sistema atinge e mantém a temperatura alvo.

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

**Procedimento:**

1. Iniciar o sistema à temperatura ambiente
2. Configurar o setpoint: 36.5°C
3. Registar a temperatura a cada minuto
4. Verificar:
- [ ] Tempo para atingir 36°C < 20 minutos
- [ ] Estabilidade ±0.5°C após estabilizar
- [ ] Sem overshoots > 1°C

### Teste de Alarmes

| Condição | Ação | Resultado Esperado |
|-----------|--------|--------------------|
| Setpoint > 38°C | Configurar | Alarma: temp alta |
| Desconectar sensor | Físicamente | Alarma: sensor falha |
| Cubrir sensor | Calentar externamente | Alarma: sobretemperatura |
| Vaciar reservatório | Activar humidificador | Alarma: água baixa |

## Teste de Segurança

** Cadillac️ Realizar com supervisão**

1. **Falo de termostato de segurança:**
- Cortocircuitar termostato temporariamente
- Verificar que o sistema detecta sobretemperatura por software
- Restaurar termostato

2. **Falo de comunicação:**
- Desligar WiFi
- Verificar a operação autónoma contínua

3. **Corte de energia:**
- Desligar a alimentação por 5 segundos
- Ligar
- Verificar o reinício correcto

## Registo de Testes

## Formato de Registo

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

## Resolução de Problemas Comuns

| Problema | Possível Causa | Solução |
|----------|-----------------|------------|----------|
| Não acende | Fusível queimado | Substituir Fusível |
| Leituras erráticas | Conexão floja | Revisar soldas |
| Não aquece | MOSFET danificado | Substituir MOSFET |
| WiFi instável | Sinais fracos | Acercar roteador |
| Display em branco | Contraste | Ajustar potenciômetro |

## Próximas Secções

- [Guia de Instalação] (../../guides/installation)
- [Calibração] (../../guides/calibration)