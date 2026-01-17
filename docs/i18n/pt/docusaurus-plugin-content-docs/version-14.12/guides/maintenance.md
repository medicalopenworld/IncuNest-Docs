---
id: maintenance
title: Mantenimiento
sidebar_label: Mantenimiento
sidebar_position: 4
description: Guía de mantenimiento preventivo y correctivo de IncuNest
keywords: [mantenimiento, limpieza, servicio]
---
# Manutenção

## Programa de Manutenção

A manutenção adequada é essencial para a operação segura e confiável do IncuNest.

<video
  controls
  preload="metadata"
  style={{width: '100%', maxWidth: 800}}
  src="/IncuNest-Docs/videos/pt/maintenance.mp4"
>
  Seu navegador não suporta a reprodução de vídeo.
</video>

### Frequência recomendada

| Tarefa | Frequência | Responsável |
|-------|------------|------------|
| Limpeza externa | Diário | Usuário |
| Limpeza interna | Semanalmente | Usuário |
| Verificação do sensor | Semanalmente | Usuário |
| Calibração de Verificação | Semanalmente | Técnico |
| Inspeção de cabos | Mensalmente | Técnico |
| Limpeza de filtros | Mensalmente | Usuário |
| Manutenção preventiva | Trimestralmente | Técnico |
| Calibração completa | Anual | Técnico Certificado |

## Manutenção Diária

### Limpeza Externa

1. **Desligue o equipamento** e desconecte da energia
2. **Limpe as superfícies externas** com pano úmido
3. **Solução de limpeza:** Água com sabão neutro ou álcool isopropílico 70%
4. **Seque completamente** antes de ligar

::: aviso Não use
- Solventes agressivos
- Produtos abrasivos
- Excesso de água que pode entrar no equipamento
:::

### Verificação Visual

- [] Sem acúmulo excessivo de poeira
- [ ] Cabos sem danos visíveis
- [] Conexões firmes
- [ ] Nenhum objeto obstruindo a ventilação
- [] Tela funcionando corretamente

## Manutenção Semanal

### Limpeza Interna da Câmara

1. **Remover paciente** (se aplicável)
2. **Desligue seu computador**
3. **Abra a câmera**
4. **Limpar com solução desinfetante:**
- Álcool isopropílico 70%
- Solução de hipoclorito 0,1%
- Desinfetante hospitalar aprovado

5. **Limpe todas as superfícies internas:**
- Paredes
-Base
- Portão de acesso
- Sensores (com cuidado)

6. **Enxágue com água destilada** se você usou produtos químicos
7. **Seque completamente** com um pano limpo
8. **Deixe ventilar** 15 minutos antes de usar

### Verificação do Sensor

1. **Inicie seu computador**
2. **Verifique as leituras do sensor:**
- Temperatura ambiente razoável
- Umidade razoável
- Sem erros no display

3. **Compare com o instrumento de referência** (opcional, mas recomendado)

### Manutenção do umidificador

1. **Esvazie o reservatório de água**
2. **Limpe o reservatório:**
- Solução de vinagre branco (1:1 com água)
- Ou solução de ácido cítrico

3. **Enxágue bem**
4. **Seque completamente**
5. **Encha com água destilada**

:::cuidado Água
**Sempre use água destilada** para o umidificador. A água da torneira pode deixar depósitos minerais e afetar o funcionamento.
:::

## Manutenção Mensal

### Limpeza do Filtro

Se o equipamento possuir filtros de ar:

1. **Localize os filtros**
2. **Remova com cuidado**
3. **Limpe com aspirador de pó** ou ar comprimido
4. **Se estiver muito sujo, substitua**
5. **Reinstale corretamente**

### Inspeção de Cabos e Conexões

1. **Inspecione visualmente:**
- Cabos de alimentação
- Cabos de sensores
- Conexões PCB

2. **Pesquisa:**
- Danos ao isolamento
- Conexões soltas
- Sinais de aquecimento
- Corrosão

3. **Documente quaisquer problemas**

### Verificação do sistema de aquecimento

1. **Iniciar no modo de teste**
2. **Verifique a resposta do aquecedor**
3. **Observe o tempo de aquecimento**
4. **Compare com valores de referência:**
- Deve atingir 36°C em < 20 minutos
- À temperatura ambiente de 25°C

### Verificação do ventilador

1. **Ouça ruídos anormais**
2. **Verifique o fluxo de ar**
3. **Verifique a velocidade variável** (se aplicável)
4. **Limpe as lâminas** se houver poeira acumulada

## Manutenção Trimestral

### Inspeção Elétrica

**Deve ser realizado por pessoal qualificado:**

1. **Verifique a conexão de aterramento**
2. **Meça a resistência de isolamento**
3. **Teste de corrente de fuga:**
- Deve ser menor que 0,5mA
4. **Inspecione os fusíveis**
5. **Verifique o status da fonte de alimentação**

### Inspeção Mecânica

1. **Verifique dobradiças e fechos**
2. **Lubrifique se necessário** (lubrificante aprovado)
3. **Verifique a integridade dos selos**
4. **Inspecione a estrutura geral**

### Atualização de Firmware

1. **Verifique a versão atual**
2. **Verifique as versões disponíveis**
3. **Leia as notas de lançamento**
4. **Configuração de backup**
5. **Aplicar atualização** seguindo o procedimento
6. **Verifique a operação pós-atualização**

## Manutenção Anual

### Calibração Completa

Deve ser realizado por técnico certificado com equipamento de referência calibrado.

Consulte [Guia de calibração](./calibration).

### Substituição de componentes

Considere substituir preventivamente:

| Componente | Vida útil típica |
|--------|--------|
| Sensor SHT31 | 3-5 anos |
| Sensor DS18B20 | 5+ anos |
| Ventilador | 3-5 anos |
| Elemento de aquecimento | 3-5 anos |
| Carimbos de silicone | 2-3 anos |

### Documentação

Mantenha registro de:

- Todas as calibrações
- Reparos feitos
- Componentes substituídos
- Incidentes e alarmes
- Resultados dos testes

## Lista de peças sobressalentes recomendadas

Mantenha em estoque:

- []Sensor SHT31
- [ ]Sensor DS18B20
- [] Fusíveis
- [] Cabos do sensor
- [] Vedações de silicone
- [] Elemento de aquecimento (PTC)
- [] Ventilador de substituição

## Solução de problemas de manutenção

### O sensor não responde após a limpeza

1. Verifique se está completamente seco
2. Verifique as conexões
3. Reinicie o seu computador
4. Se persistir, o sensor pode estar danificado

### O aquecedor não aquece uniformemente

1. Verifique o ventilador
2. Limpe a área do aquecedor
3. Verifique se há obstruções
4. Pode indicar degradação do elemento

### Alarmes frequentes sem causa aparente

1. Verifique a calibração
2. Verifique as conexões do sensor
3. Verifique os limites de alarme
4. Pode indicar sensor em mau estado

## Registro de manutenção

```
REGISTRO DE MANTENIMIENTO - INCUNEST
=====================================

Número de serie: _______________

Fecha: _______________
Tipo de mantenimiento: [ ]Diario [ ]Semanal [ ]Mensual [ ]Trimestral [ ]Anual

Tareas realizadas:
[ ] Limpieza externa
[ ] Limpieza interna
[ ] Verificación de sensores
[ ] Limpieza de humidificador
[ ] Limpieza de filtros
[ ] Inspección de cables
[ ] Verificación de calefactor
[ ] Verificación de ventilador
[ ] Inspección eléctrica
[ ] Calibración
[ ] Actualización de firmware

Observaciones:
_________________________________
_________________________________

Problemas encontrados:
_________________________________
_________________________________

Acciones correctivas:
_________________________________
_________________________________

Próximo mantenimiento programado: _______________

Técnico: _______________
Firma: _______________
```

## Próximas seções

- [Solução de problemas](./troubleshooting)
- [Calibração](./calibration)
