---
id: installation
title: Guía de Instalación
sidebar_label: Instalación
sidebar_position: 1
description: Guía completa de instalación de IncuNest
keywords: [instalación, configuración, setup]
---
# Guia de instalação

## Pré-requisitos

Antes de iniciar a instalação, certifique-se de ter:

### Hardware
- IncuNest totalmente montado e testado
- Fonte de alimentação 12V/10A
- Cabo de alimentação CA
- Conexão Wi-Fi disponível

###Software
- Firmware carregado no ESP32
- Navegador moderno (Chrome, Firefox, Edge)

## Processo de instalação

### Etapa 1: Localização

Selecione um local adequado para a incubadora:

✅ **Requisitos:**
- Superfície plana e estável
- Longe de rascunhos
- Longe da luz solar direta
- Acesso à tomada elétrica
- Temperatura ambiente 18-25°C

❌ **Evite:**
- Perto de janelas ou portas
- Perto de equipamentos que geram calor
- Locais com vibrações
- Áreas com extrema umidade

### Etapa 2: Conexão Elétrica

1. Verifique se a chave está na posição **OFF**
2. Conecte o cabo de alimentação à incubadora
3. Conecte o cabo a uma tomada aterrada
4. Verifique se a tomada possui proteção (idealmente UPS)

:::aviso Segurança Elétrica
- Use sempre uma tomada aterrada
- Não use adaptadores ou extensões de baixa qualidade
- Considere usar um regulador de tensão em áreas com alimentação instável
:::

### Etapa 3: Primeira ligação

1. Coloque o interruptor na posição **ON**
2. O LED azul começará a piscar (inicialização)
3. Aguarde o sistema concluir o autodiagnóstico (~30 segundos)
4. LED verde indica sistema pronto

**Sequência de LED esperada:**
```
[Azul parpadeando] → Auto-diagnóstico
[Amarillo] → Conectando WiFi
[Verde parpadeando] → Standby (listo)
```

### Etapa 4: Configuração WiFi

Se esta for a primeira vez ou o WiFi não estiver configurado:

1. O dispositivo criará um ponto de acesso:
- **SSID:** `IncuNest_XXXX`
- **Senha:** `incunest123`

2. Conecte seu dispositivo (telefone/laptop) a esta rede

3. Abra um navegador e vá para `http://192.168.4.1`

4. Preencha o formulário de configuração:

```
   Red WiFi: [Seleccionar]
   Contraseña: [Ingresar]
   Nombre del dispositivo: [Opcional]
   ```

5. Pressione **Salvar**

6. O dispositivo será reiniciado e conectado à sua rede

### Etapa 5: Verifique a conexão

1. O dispositivo obterá um IP da sua rede
2. Você pode encontrar o IP em:
- Seu roteador (lista de clientes DHCP)
- Scanner de rede (como Fing)
-mDNS: `http://incunest.local`

3. Abra o navegador e acesse o IP

4. Você deverá ver o painel do IncuNest

### Etapa 6: Configuração inicial

#### Configurar pontos de ajuste

1. Acesse **Configurações > Controle**
2. Configurar:
**Temperatura alvo:** 36,5°C (típica)
- **Umidade alvo:** 60% (típico)
3. Salve as alterações

#### Verifique os sensores

1. Vá para **Status > Sensores**
2. Verifique se todos os sensores mostram leituras válidas
3. Caso algum sensor apresente erro, verifique as conexões

#### Definir alarmes

1. Acesse **Configurações > Alarmes**
2. Revise os limites padrão:

```
   Temp. alta (warning): 37.5°C
   Temp. alta (alarma): 38.0°C
   Temp. baja (warning): 34.0°C
   ```
3. Ajuste de acordo com necessidades clínicas

### Etapa 7: Calibração

Antes do primeiro uso clínico, realize a calibração:

1. Vá para **Configurações > Calibração**
2. Siga as instruções na tela
3. Use termômetro de referência certificado

Consulte o [Guia de calibração](./calibration) para obter instruções detalhadas.

### Etapa 8: Teste de função

#### Teste de aquecimento

1. Pressione **Iniciar** no painel
2. O sistema começará a aquecer
3. Verifique:
- [] Ventilador funcionando
- [] Temperatura aumentando gradualmente
- [] Sem alarmes inesperados

4. Aguarde atingir o ponto de ajuste (~15-20 minutos)

5. Verifique a estabilidade (±0,5°C por 10 minutos)

#### Teste de Alarme

1. Defina um ponto de ajuste temporariamente baixo (ex: 35°C)
2. Verifique se o alarme de "alta temperatura" soa
3. Restaure o ponto de ajuste normal
4. Verifique se o alarme está silenciado

## Lista de verificação pós-instalação

- [] Dispositivo ligado corretamente
- [] Wi-Fi conectado
- [] Painel acessível
- [] Sensores funcionando
- [] Aquecedor funcionando
- [] Ventilador funcionando
- [ ] Umidificador funcionando (se aplicável)
- [] Alarmes configurados
- [] Calibração concluída
- [] Teste de aquecimento bem-sucedido
- [] Teste de alarme bem-sucedido

## Solução de problemas

### Não liga

1. Verifique a conexão elétrica
2. Verifique o fusível
3. Verifique o interruptor

### Não conecta ao WiFi

1. Verifique as credenciais
2. Certifique-se de que seja uma rede de 2,4 GHz
3. Aproxime-se do roteador
4. Reinicie o dispositivo

### Sensores mostram erro

1. Verifique as conexões físicas
2. Reinicie o dispositivo
3. Verifique a fiação na PCB

### Não atinge a temperatura

1. Verifique o isolamento da câmara
2. Verifique se há vazamentos de ar
3. Verifique o funcionamento do aquecedor

## Próximas etapas

- [Configurações avançadas](./configuration)
- [Calibração](./calibration)
- [Manutenção](./maintenance)
