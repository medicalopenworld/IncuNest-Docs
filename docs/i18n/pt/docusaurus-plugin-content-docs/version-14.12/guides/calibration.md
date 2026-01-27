---
id: calibration
title: Guía de Calibración
sidebar_label: Calibração
sidebar_position: 3
description: Procedimiento de calibración de sensores de IncuNest
keywords: [calibración, sensores, temperatura, humedad]
---
# Guia de calibração

## Importância da Calibração

A calibração precisa é **crítica** para a segurança do paciente. Os sensores podem ter desvios de fábrica ou desenvolver desvios ao longo do tempo.

:::aviso Frequência de Calibração
- **Verificação:** Semanal
- **Calibração completa:** Mensalmente
- **Calibração certificada:** Anual ou de acordo com regulamentos locais
:::

## Equipamento Necessário

### Para calibração de temperatura

| Equipe | Especificação | Uso |
|--------|----------------|-----|
| Termômetro de referência | Certificado, ±0,1°C | Padrão de comparação |
| Banho termal (opcional) | Estabilidade ±0,05°C | Calibração multiponto |

### Para calibração de umidade

| Equipe | Especificação | Uso |
|--------|----------------|-----|
| Higrômetro de referência | Certificado, ±2% UR | Padrão de comparação |
| Sais saturados | NaCl, MgCl₂ | Pontos de referência fixos |

## Calibração de temperatura

### Método 1: comparação simples

**Procedimento:**

1. **Preparação**
- Coloque o termômetro de referência no centro da câmara
- Feche a câmera completamente
- Aguarde 10 minutos para estabilização

2. **Medição**
- Anote a leitura de referência: ____°C
- Anote a leitura do sensor: ____°C
- Calcule o offset: Referência - Sensor = ____°C

3. **Aplicar correção**
- Vá para **Configurações > Calibração**
- Insira o deslocamento calculado
- Salvar configurações

4. **Verificação**
- Aguarde 5 minutos
- Compare as leituras novamente
- A diferença deve ser < 0,3°C

### Método 2: Calibração de Dois Pontos

Para maior precisão, calibre em dois pontos de temperatura.

**Ponto baixo (25°C):**
```
Referencia: ____°C
Sensor: ____°C
```

**Ponto máximo (37°C):**
```
Referencia: ____°C
Sensor: ____°C
```

**Cálculo dos coeficientes:**

Ganho = (Ref Alta - Ref Baixa) / (Sensor Alto - Sensor Baixo)

Offset = Ref Baixa - (Ganho × Sensor Baixo)

### Código do aplicativo

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

## Calibração de umidade

### Método de Sais Saturados

Soluções saturadas de sal fornecem umidade relativa conhecida a temperatura controlada.

| Sal | UR a 25°C |
|-----|-----------|
| Cloreto de Lítio (LiCl) | 11,3% |
| Cloreto de magnésio (MgCl₂) | 32,8% |
| Cloreto de sódio (NaCl) | 75,3% |

**Procedimento:**

1. **Prepare solução saturada**
- Adicione sal à água até que ela não se dissolva mais
- Deixe descansar por 24 horas

2. **Criar câmara de calibração**
- Pequeno recipiente hermético
- Coloque a solução no fundo
- Suspender o sensor no interior (sem tocar na solução)

3. **Aguarde a estabilização**
- Mínimo de 24 horas para saldo
- Temperatura estável (±1°C)

4. **Registrar leituras**

```
   Sal NaCl (referencia 75.3%):
   Lectura del sensor: ____%
   Offset = 75.3 - Lectura = ____%
   ```

5. **Aplicar correção**
- Insira o deslocamento na configuração
- Verifique com outro sal se possível

## Calibração do sensor de peso (opcional)

### Procedimento

1. **Tara**
- Sem peso na plataforma
- Execute `scale.tare()`

2. **Calibração com peso conhecido**
- Definir peso de referência (ex.: 1000g)
- Leia o valor bruto do sensor
- Calcular fator de calibração

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

## Registro de calibração

Mantenha um registro de todas as calibrações:

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

## Verificação pós-calibração

### Lista de verificação

- [] Compensação de temperatura aplicada
- [ ] Leituras de temperatura dentro de ±0,3°C
- [] Compensação de umidade aplicada
- [] Leituras de umidade dentro de ±3%
- [] Registro concluído
- [ ] Data da próxima calibração programada

### Teste de estabilidade

Após a calibração, monitore as leituras por 30 minutos:

1. Configure o sistema para ponto de ajuste normal
2. Registre leituras a cada 5 minutos
3. Verifique se a variação é < ±0,5°C

## Próximas seções

- [Configurações](./configuration)
- [Manutenção](./maintenance)
