---
id: faq
title: Perguntas Frequentes
sidebar_label: FAQ
sidebar_position: 11
description: Preguntas frecuentes sobre IncuNest
keywords: [FAQ, preguntas, ayuda, soporte]
---
# Perguntas frequentes (FAQ)

## Em geral

### O que é o IncuNest?

IncuNest é uma incubadora neonatal de código aberto projetada para fornecer cuidados térmicos a recém-nascidos em ambientes com recursos limitados. O projeto inclui hardware e software, permitindo que comunidades e organizações construam e mantenham as suas próprias incubadoras.

### O IncuNest é um dispositivo médico certificado?

**Não.** O IncuNest é um projeto educacional e de pesquisa. Para uso clínico, você deve obter as certificações médicas apropriadas de sua jurisdição (CE, FDA, etc.). Consulte [Aviso de segurança](./safety-notice) para obter mais informações.

### Quanto custa construir um IncuNest?

O custo aproximado dos componentes varia dependendo da região:

| Componente | Custo estimado (USD) |
|------------|---------------------|
| Eletrônica | US$ 50 - US$ 80 |
| Sensores | US$ 20 - US$ 40 |
| Estrutura | US$ 100 - US$ 200 |
| Aquecimento | $ 30 - $ 50 |
| **Total** | **$200 - $370** |

### Quais habilidades eu preciso para construir o IncuNest?

- **Básico**: Soldagem de componentes passantes
- **Intermediário**: Programação básica, uso de ferramentas
- **Avançado**: design de PCB, programação C++

## Hardware

### Qual microcontrolador o IncuNest usa?

O IncuNest usa o **ESP32-WROOM-32** para seus recursos:
- Wi-Fi integrado
- GPIOs suficientes
- Baixo custo
- Boa documentação
- Comunidade ativa

### Posso usar outro microcontrolador?

Sim, mas exigirá adaptações significativas. O código é otimizado para ESP32. Alternativas possíveis:
- ESP32-S3 (recomendado)
- STM32 (porta necessária)
- Arduino Mega (limitado)

### Quais sensores de temperatura são compatíveis?

| Sensor | Precisão | Custo | Recomendação |
|--------|-----------|-------|---------------|
| DHT22 | ±0,5°C | Baixo | Para protótipos |
| SHT31 | ±0,3°C | Médio | **Recomendado** |
| DS18B20 | ±0,5°C | Baixo | Alternativa |
| MAX31865 (PT100) | ±0,1°C | Alto | Alta precisão |

### Onde posso obter os componentes?

Fornecedores recomendados:
- **Global**: DigiKey, Mouser, LCSC
- **América Latina**: MercadoLibre, lojas locais de eletrônicos
- **Ásia**: AliExpress, Banggood (maior tempo de envio)

### Posso usar uma fonte de alimentação diferente?

Sim, desde que cumpra:
**Tensão**: 12V DC (11-13V aceitável)
- **Atual**: Mínimo 10A
- **Qualidade**: Prefira fontes certificadas

##Programas

### Como faço para atualizar o firmware?

**Através de USB:**
```bash
cd firmware
pio run --target upload
```

**Via OTA (Over-the-Air):**
1. Acesse a interface web
2. Vá para Configurações > Sistema
3. Faça upload do arquivo `.bin`

### Posso usar o Arduino IDE em vez do PlatformIO?

Sim, mas não é recomendado. Se preferir:
1. Instale as bibliotecas necessárias manualmente
2. Copie o código de `src/` para um projeto Arduino
3. Defina as opções de construção corretamente

### Como altero os parâmetros PID?

No arquivo `config.h`:

```cpp
#define KP 2.0   // Ganancia proporcional
#define KI 0.5   // Ganancia integral
#define KD 1.0   // Ganancia derivativa
```

Ou via interface web em tempo real (Configurações > Controle).

### Os dados estão salvos em algum lugar?

Sim, o IncuNest armazena dados em:
- **SPIFFS**: configuração local e logs
- **Cartão SD** (opcional): Histórico estendido
- **Servidor externo** (opcional): Via MQTT

## Uso e Manutenção

### Com que frequência devo calibrar os sensores?

| Tipo de calibração | Frequência |
|----------|------------|
| Verificação rápida | Semanalmente |
| Calibração completa | Mensalmente |
| Calibração certificada | Anual |

### Como faço para limpar a incubadora?

1. **Desligue** e desconecte o equipamento
2. **Remover** componentes removíveis
3. **Limpar** com solução desinfetante aprovada
4. **Seque** completamente antes de usar
5. **Verifique** a operação antes do uso clínico

### O que devo fazer se um alarme tocar?

1. **Identifique** o tipo de alarme (ver tela)
2. **Verifique** o status do paciente
3. **Corrija** a condição que causou o alarme
4. **Silenciar** o alarme depois de corrigido
5. **Documente** o incidente

## Solução de problemas

### ESP32 não liga

1. Verifique a fonte de alimentação
2. Verifique o regulador de tensão
3. Verifique o LED de energia
4. Experimente outra placa ESP32

### As leituras de temperatura estão incorretas

1. Verifique as conexões do sensor
2. Execute a calibração
3. Substitua o sensor se estiver danificado
4. Verifique se há interferência eletromagnética

### Não consigo me conectar ao WiFi

1. Confirme as credenciais corretas
2. Verifique se é uma rede de 2,4 GHz
3. Aproxime o dispositivo do roteador
4. Reinicie o ESP32
5. Verifique se há erros no monitor serial

### A temperatura não estabiliza

1. Verifique o isolamento térmico
2. Ajuste os parâmetros PID
3. Verifique o elemento de aquecimento
4. Verifique se há vazamentos de ar

## Contribuição

### Como posso contribuir com o projeto?

Veja nosso [Guia de Contribuição](./contributing) completo. Formas de contribuir:
- Reportar bugs
- Melhorar a documentação
- Código de contribuição
- Melhorias de hardware de design
- Traduzir para outros idiomas

### Onde posso fazer perguntas?

- **Discussões no GitHub**: para perguntas gerais
- **Problemas do GitHub**: Para bugs e sugestões
- **Documentação**: Pesquise aqui primeiro

---

Não encontrou sua pergunta? [Abra um problema](https://github.com/medicalopenworld/IncuNest/issues/new) no GitHub.
