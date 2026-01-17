---
id: troubleshooting
title: Solución de Problemas
sidebar_label: Solución de Problemas
sidebar_position: 5
description: Guía de diagnóstico y solución de problemas de IncuNest
keywords: [problemas, errores, diagnóstico, solución]
---
# Solução de problemas

## Diagnóstico Rápido

### Indicadores LED

| Estado dos LEDs | Significado | Ação |
|--------|-------------|--------|
| Azul piscando | Inicializando | Espere |
| Amarelo sólido | Conectando Wi-Fi | Verifique a rede |
| Verde sólido | Espera | Normais |
| Verde piscando | Operacional | Normais |
| Vermelho sólido | Erro crítico | Veja o código de erro |
| Vermelho piscando | Alarme ativo | Responder alarme |
| Sem LED | Sem energia | Verifique a potência |

### Códigos de erro

| Código | Descrição | Solução |
|--------|-------------|----------|
| E01 | Erro no sensor de temperatura ambiente | Verifique a conexão SHT31 |
| E02 | Erro no sensor de temperatura da pele | Verifique a conexão DS18B20 |
| E03 | Erro no sensor de umidade | Verifique a conexão SHT31 |
| E04 | Falha no aquecedor | Verifique a conexão e o fusível |
| E05 | Falha no ventilador | Verifique a conexão e o motor |
| E06 | Erro de comunicação WiFi | Verifique as credenciais |
| E07 | Erro de memória | Reinicializar dispositivo |
| E08 | Erro de configuração | Redefinir configurações |

## Problemas de ignição

### O dispositivo não liga

**Sintomas:** Sem LEDs, sem resposta

**Possíveis causas e soluções:**

1. **Sem fonte de alimentação**
- Verifique se o cabo está conectado
- Verifique a tomada com outro dispositivo
- Verifique a posição do interruptor

2. **Fusível queimado**
- Localize o porta-fusível
- Verifique a continuidade do fusível
- Substitua por fusível da mesma especificação

3. **Fonte de alimentação danificada**
- Verifique a tensão de saída (deve ser 12V DC)
- Substitua a fonte se necessário

### O computador continua reiniciando

**Sintomas:** LEDs piscando, reinicialização contínua

**Possíveis causas e soluções:**

1. **Fonte de alimentação insuficiente**
- Verifique a amperagem da fonte (mínimo 10A)
- Verifique a queda de tensão sob carga

2. **Curto-circuito na carga**
- Desconecte os atuadores um por um
- Identificar componente em curto

3. **Erro de firmware**
- Experimente o modo de recuperação
-Firmware Flash

## Problemas de temperatura

### Não atinge a temperatura alvo

**Tempo esperado:** 15-20 minutos para atingir 36°C

**Possíveis causas e soluções:**

1. **Perda excessiva de calor**
- Verifique o fechamento completo da câmara
- Verifique vedações e juntas
- Reduza as correntes de ar ambiente

2. **Aquecedor insuficiente**
- Verifique a potência do aquecedor (deve ser 100W)
- Verifique as conexões elétricas
- Medir a resistência do elemento PTC

3. **Ventilador não funciona**
- O calor não é distribuído
- Verifique o funcionamento do ventilador

4. **Configuração incorreta**
- Verifique o ponto de ajuste configurado
- Verifique o modo de controle (automático vs manual)

### Superaquecimento (temperatura muito alta)

**Sintomas:** Alarme de alta temperatura, temperatura > 38°C

**AÇÃO IMEDIATA:** Abra a câmara, remova o paciente se necessário

**Possíveis causas e soluções:**

1. **Controle PID fora de ajuste**
- Revise os parâmetros PID
- Reduza Kp se houver ultrapassagem

2. **Sensor mal calibrado**
- Verifique a calibração com termômetro de referência
- Aplicar deslocamento de correção

3. **Sensor danificado**
- Se você lê consistentemente valores incorretos
- Substitua o sensor

4. **Relé do aquecedor preso**
- Verifique se o aquecedor desliga
- Substitua o relé/SSR se estiver danificado

### Oscilação de temperatura

**Sintomas:** A temperatura sobe e desce continuamente

**Possíveis causas e soluções:**

1. **Parâmetros PID incorretos**

```
   Si oscila mucho: reducir Kp, aumentar Kd
   Si respuesta lenta: aumentar Kp, reducir Ki
   ```

2. **Histerese muito baixa**
- Aumentar o valor da histerese

3. **Ruído no sensor**
- Verifique as conexões
- Implementar filtragem de software adicional

## Problemas de umidade

### Umidade muito baixa

**Possíveis causas e soluções:**

1. **Reservatório vazio**
- Encha com água destilada

2. **Umidificador não funciona**
- Verifique a conexão elétrica
- Verifique a membrana ultrassônica
- Limpar depósitos minerais

3. **Vazamentos de ar**
- Verifique os selos da câmera

### Umidade muito alta (condensação)

**Possíveis causas e soluções:**

1. **Ponto de ajuste muito alto**
- Reduzir o ponto de ajuste de umidade

2. **O umidificador não desliga**
- Verifique o controle/relé do umidificador
- Verifique o sensor de umidade

3. **Ventilação insuficiente**
- Verifique o funcionamento do ventilador

## Problemas de conectividade

### Não conecta ao WiFi

**Sintomas:** LED amarelo sólido, modo AP ativo

**Possíveis causas e soluções:**

1. **Credenciais incorretas**
- Verifique SSID (diferencia maiúsculas de minúsculas)
- Verifique a senha

2. **Rede não suportada**
- ESP32 suporta apenas 2,4 GHz
- Verifique se a rede é de 2,4 GHz

3. **Sinal fraco**
- Aproxime o dispositivo do roteador
- Verifique RSSI em diagnóstico (-70 dBm ou melhor)

4. **Bloqueio de roteador**
- Verifique o filtro MAC
- Verifique o limite do dispositivo

### Perde a conexão WiFi com frequência

**Possíveis causas e soluções:**

1. **Interferência**
- Alterar canal do roteador
- Afaste-se de outros dispositivos de 2,4 GHz

2. **Sem memória**
- Reinicializar dispositivo
- Verifique o heap livre

3. **Configurações de economia de energia**
- Desative a economia de energia WiFi no firmware

### Não consigo acessar a interface web

1. **Verifique o IP correto**
- Usar scanner de rede
- Tente `http://incunest.local`

2. **Porta bloqueada**
- Verifique o firewall
- Verifique se a porta 80 está aberta

3. **O servidor Web não foi iniciado**
- Reinicializar dispositivo
- Verifique os logs de inicialização

## Problemas com sensores

### Sensor mostra "Erro" ou "NaN"

**Possíveis causas e soluções:**

1. **Conexão solta**
- Verifique a fiação
- Verifique soldas

2. **Sensor danificado**
- Teste com sensor de substituição
- Medir continuidade

3. **Endereço I2C incorreto**
- Execute o scanner I2C
- Verifique o endereço configurado

### Leituras incorretas, mas estáveis

1. **Precisa de calibração**
- Consulte [Guia de calibração](./calibration)

2. **Deslocamento incorreto**
- Verifique o deslocamento configurado
- Redefinir para os valores padrão

### Leituras erráticas

1. **Ruído elétrico**
- Verifique a ligação à terra
- Afaste os cabos dos sensores das fontes de ruído
- Adicionar capacitor de desacoplamento

2. **Cabos muito longos**
- Utilize cabos blindados
- Reduza o comprimento se possível

## Problemas de alarme

### Alarme tocando sem motivo aparente

1. **Limite muito apertado**
- Aumentar a margem nos limites
- Verifique a histerese do alarme

2. **Sensor com ruído**
- Veja a seção de leituras erráticas

3. **Calibração incorreta**
- Verifique a calibração do sensor

### O alarme não soa quando deveria

1. **Campainha desativada**
- Verifique as configurações da campainha

2. **Campainha danificada**
- Teste a campainha diretamente
- Verifique a conexão

3. **Limites muito amplos**
- Verifique a configuração do limite

## Modo de recuperação

Se o dispositivo não responder normalmente:

1. **Desligue a energia**
2. **Pressione e segure o botão BOOT/FLASH**
3. **Ligue a energia**
4. **Solte o botão após 5 segundos**
5. **O dispositivo entrará no modo de recuperação**

Neste modo você pode:
-Firmware Flash
- Redefinir configurações
- Diagnóstico de acesso

## Diagnóstico Avançado

### Acesso serial

Para diagnóstico detalhado, conecte via USB e abra o monitor serial a 115200 baud.

```bash
# Linux/Mac
screen /dev/ttyUSB0 115200

# O con PlatformIO
pio device monitor
```

### Comandos de diagnóstico

No monitor serial, digite:

| Comando | Descrição |
|--------|-------------|
| __CÓDIGO0__ | Estado geral |
| __CÓDIGO1__ | Leituras de sensores |
| __CÓDIGO2__ | Configurações atuais |
| __CÓDIGO3__ | Estado do Wi-Fi |
| __CÓDIGO4__ | Memória disponível |
| __CÓDIGO5__ | Reiniciar |
| __CÓDIGO6__ | Redefinição de fábrica |

### Registros do sistema

Os logs podem ser vistos em:
- Monitor serial
-Interface web: `/logs`
- API: `GET /api/system/logs`

## Quando entrar em contato com o suporte

Entre em contato com o suporte técnico se:

- O problema persiste depois de tentar as soluções
- Há danos físicos visíveis
- Substituição dos principais componentes necessários
- É necessária recalibração certificada
- Há um comportamento de segurança anormal

**Informações a serem fornecidas:**

- Número de série do dispositivo
- Versão do firmware
- Descrição detalhada do problema
- Códigos de erro exibidos
- Ações já tentadas
- Fotos/vídeos, se relevante

## Próximas seções

- [Manutenção](./maintenance)
- [Perguntas frequentes](../faq)
