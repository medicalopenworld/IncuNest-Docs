---
id: safety-notice
title: Aviso de Segurança
sidebar_label: Aviso de Segurança
sidebar_position: 3
description: Informações importantes de segurança para o IncuNest
keywords: [segurança, aviso, uso médico, regulações]
---
# ⚠️ Aviso de segurança

:::danger Aviso importante
Leia este aviso completamente antes de construir, montar ou usar o IncuNest.
:::

## Isenção de responsabilidade

IncuNest é um projeto de código aberto para fins educacionais e de pesquisa. A equipe de desenvolvimento e colaboradores:

1. **NÃO garantimos** a adequação do dispositivo para uso clínico
2. **NÃO nos responsabilizamos** por danos ou lesões resultantes do uso
3. **NÃO certifique** a conformidade com regulamentos médicos específicos

## Requisitos para uso clínico

Se você planeja usar o IncuNest em um ambiente clínico, **DEVE**:

### Certificações exigidas

| Região | Certificação necessária |
|--------|---------|
| União Europeia | Marcação CE (MDR 2017/745) |
| Estados Unidos | Autorização FDA 510(k) |
| América Latina | ANVISA, COFEPRIS, INVIMA, etc. |
| Internacional | ISO 13485, IEC 60601-1 |

### Etapas necessárias

1. **Avaliação de Riscos**: Realize uma análise completa de acordo com a ISO 14971
2. **Validação Clínica**: Testes em ambiente controlado com supervisão médica
3. **Certificação**: Obtenha aprovação da autoridade reguladora local
4. **Rastreabilidade**: Implementar sistema de rastreamento de dispositivos
5. **Treinamento**: Treine a equipe médica no uso correto

## Riscos Conhecidos

### Riscos Térmicos

| Risco | Mitigação |
|--------|------------|
| Superaquecimento | Múltiplos sensores + alarme a 38°C |
| Falha no aquecedor | Controle redundante + corte térmico |
| Temperatura insuficiente | Alarme de baixa temperatura |

### Riscos elétricos

| Risco | Mitigação |
|--------|------------|
| Choque elétrico | Isolamento galvânico + fusíveis |
| Curto-circuito | Proteção de circuito |
| Falha de energia | Sistema UPS recomendado |

### Riscos de umidade

| Risco | Mitigação |
|--------|------------|
| Umidade excessiva | Controle automático + drenagem |
| Condensação | Ventilação adequada |
| Crescimento bacteriano | Limpeza periódica |

## Sistema de alarme

IncuNest implementa um sistema de alarme multinível:

```mermaid
graph TD
    A([🔍 Monitoramento Contínuo]) --> B{Parâmetro fora da faixa?}
    B -->|✅ Não| A
    B -->|⚠️ Sim| C{Nível de Severidade}
    
    C -->|🟡 Baixo| D[Alarme Visual - Amarelo]
    C -->|🟠 Médio| E[Alarme Visual + Sonoro]
    C -->|🔴 Alto| F[Alarme + Ação Corretiva]
    C -->|⛔ Crítico| G[Alarme + Desligamento de Emergência]
    
    D --> A
    E --> A
    F --> A
    G --> H((🔧 Requer Reset Manual))
    
    classDef monitor fill:#e2e3e5,stroke:#6c757d,stroke-width:2px
    classDef decision fill:#cce5ff,stroke:#007bff,stroke-width:2px
    classDef low fill:#fff3cd,stroke:#ffc107,stroke-width:2px
    classDef medium fill:#ffe5b4,stroke:#fd7e14,stroke-width:2px
    classDef high fill:#f8d7da,stroke:#dc3545,stroke-width:2px
    classDef critical fill:#dc3545,stroke:#721c24,stroke-width:2px,color:#fff
    
    class A monitor
    class B,C decision
    class D low
    class E medium
    class F high
    class G,H critical
```

### Níveis de alarme

| Nível | Condição | Ação |
|-------|-----------|--------|
| **INFORMAÇÕES** | Desvio menor | Indicador LED azul |
| **AVISO** | Desvio moderado | LED amarelo + bipe |
| **ALARME** | Parâmetro fora dos limites | LED vermelho + alarme sonoro |
| **CRÍTICO** | Risco para o paciente | Desligamento seguro + alarme contínuo |

## Limites operacionais seguros

### Temperatura

```mermaid
graph LR
    subgraph danger1 [⚠️ ZONA DE PERIGO - FRIO]
        A["< 25°C<br/>ALARME"]
    end
    
    subgraph safe [✅ ZONA SEGURA]
        B["25°C - 37°C<br/>OPERAÇÃO NORMAL"]
    end
    
    subgraph danger2 [🛑 ZONA DE PERIGO - CALOR]
        C["> 38°C<br/>CRÍTICO"]
    end
    
    A --> B --> C
    
    classDef danger fill:#f8d7da,stroke:#dc3545,stroke-width:2px
    classDef safe fill:#d4edda,stroke:#28a745,stroke-width:2px
    classDef critical fill:#dc3545,stroke:#721c24,stroke-width:2px,color:#fff
    
    class A danger
    class B safe
    class C critical
```

### Umidade relativa

```mermaid
graph LR
    subgraph low [⚠️ BAIXO]
        A["< 40%<br/>Aviso"]
    end
    
    subgraph optimal [✅ ZONA SEGURA]
        B["40% - 80%<br/>ÓTIMO"]
    end
    
    subgraph high [⚠️ ALTO]
        C["> 85%<br/>Aviso"]
    end
    
    A --> B --> C
    
    classDef warning fill:#fff3cd,stroke:#ffc107,stroke-width:2px
    classDef safe fill:#d4edda,stroke:#28a745,stroke-width:2px
    
    class A,C warning
    class B safe
```

## Manutenção de segurança

### Inspeções Diárias

- [] Verifique as leituras de temperatura e umidade
- [ ] Verifique a operação do alarme
- [] Inspecione cabos e conexões
- [] Verifique o nível de água do umidificador

### Inspeções semanais

- [] Limpar sensores de temperatura
- [ ] Verifique a calibração do sensor
- [ ] Verifique as conexões elétricas
- [] Revise os registros de alarme

### Inspeções Mensais

- [] Calibração completa do sensor
- [] Limpeza profunda da câmera
- [] Verifique a integridade do isolamento
- [] Atualizar firmware se versões estiverem disponíveis

## Contato de emergência

Em caso de mau funcionamento durante o uso:

1. **Remova imediatamente o paciente** para um ambiente alternativo seguro
2. **Desconecte o dispositivo** da fonte de alimentação
3. **Documente o incidente** com todos os detalhes
4. **Relate o problema** em [Problemas do GitHub](https://github.com/medicalopenworld/IncuNest/issues)

## Declaração de Conformidade

Este projeto **NÃO** inclui uma declaração de conformidade com regulamentos médicos. Cada implementador é responsável por:

- Obtenha as certificações necessárias
- Realizar validação clínica
- Cumprir os regulamentos locais
- Manter documentação de qualidade

---

:::info Nota Legal
Ao utilizar este projeto, você concorda que o faz por sua própria conta e risco e que leu e compreendeu totalmente este aviso de segurança.
:::
