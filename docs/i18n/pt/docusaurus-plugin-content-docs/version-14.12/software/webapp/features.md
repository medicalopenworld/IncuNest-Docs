---
id: webapp-features
title: Características do Web App
sidebar_label: Funcionalidades
sidebar_position: 2
description: Características e funcionalidades da aplicação Web do IncuNest
keywords: [webapp, características, funcionalidades, UI]
---

# Características da Web App

## Dashboard Principal

## Opções em Tempo Real

- **Temperatura Ambiente**
- Valor actual com gauge visual
- Indicador de setpoint
- Código de cores de acordo com o estado

- **Temperatura de Piel** (se disponível)
- Medição secundária
- Comparação com o Ambiente

- **Humedad Relativa**
- Valor actual e setpoint
- Indicador visual

- **Potencia do Calefator**
- Barra de progresso
- Percentagem Actual

## Painel de Estado

```
┌─────────────────────────────────────────────┐
│  INCUNEST DASHBOARD                         │
├─────────────────────────────────────────────┤
│                                             │
│   ┌─────────┐    ┌─────────┐               │
│   │  36.5°C │    │   65%   │               │
│   │  ───────│    │  ───────│               │
│   │  SP:36.5│    │  SP:60% │               │
│   └─────────┘    └─────────┘               │
│   Temperatura      Humedad                  │
│                                             │
│   Estado: OPERANDO                          │
│   Potencia: ████████░░ 80%                  │
│   Uptime: 12h 34m                           │
│                                             │
└─────────────────────────────────────────────┘
```

## Gráficos Históricos

## Gráfico de Temperatura

- Linha de temperatura actual
- Linha de setpoint
- Bandas de varning/alarm
- Zoom e pão interativo
- Exportação para CSV

## Opções de Visualização

| Rango | Descrição |
|-------|-------------|
| 1h | Última hora |
| 6h | Últimas 6 horas |
| 24h | Últimas 24 horas |
| 7d | Última semana |
| Custom | Rango personalizado |

## Sistema de Alarmas

## Painel de Alarmas

- Lista de Alarmes Ativas
- Nível de gravidade (color)
- Timestamp de ativação
- Botão de Reconhecimento
- Histórico de Alarmes

## Notificações

- Notificações de navegador (com permissão)
- Som de alerta (configuravel)
- Banner visual proeminente

# Configuração

### Controlo

- Ajuste de setpoint de temperatura
- Ajuste de setpoint de umidade
- Selector de Modo (Auto/Manual)
- Controle manual de potência

## Parâmetros PID

- Ganho Proporcional
- Ganho Integral (Ki)
- Ganho Derivativo (Kd)
- Botão de aplicar/resetear

## Alarmes

- Umbrais de temperatura (warning/alarm)
- Umbrais de humidade
- Activar/desactivar o buzzer
- Volume de alarme

### Rede

- Estado de acesso WiFi
- Configuração MQTT
- mDNS hostname

### Sistema

- Informação do Dispositivo
- Versão do firmware
- Reiniciar o Dispositivo
- Actualizar a Configuração

# # Responsive Design

A interface é adaptada a diferentes tamanhos de ecrã:

## Desktop (maior a 1024px)

- Layout de duas colunas
- Gráficos Grandes
- Sidebar de navegação

## Tablet (768px - 1024px)

- Layout de uma coluna
- Gráficos Médios
- Menu Subsídio

## Mobile (menor a 768px)

- Layout Vertical
- Gráficos otimizados para touch
- Navegação Inferior

## Acessibilidade

- Contraste de cores WCAG 2.1 AA
- Navegação por Teclado
- Labels para screen readers
- Indicadores não apenas baseados em cores

# Internacionalização

Suporte para várias línguas:

```typescript
// i18n/es.ts
export default {
  dashboard: {
    title: 'Panel de Control',
    temperature: 'Temperatura',
    humidity: 'Humedad',
    setpoint: 'Objetivo',
    power: 'Potencia',
  },
  alarms: {
    title: 'Alarmas',
    noAlarms: 'Sin alarmas activas',
    acknowledge: 'Reconocer',
  },
  // ...
}
```

# Modo Escuro

Toggle para mudar entre tema claro e escuro:

```typescript
// composables/useTheme.ts
export function useTheme() {
  const isDark = ref(false)
  
  function toggle() {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark', isDark.value)
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  }
  
  onMounted(() => {
    const saved = localStorage.getItem('theme')
    isDark.value = saved === 'dark' || 
      (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)
    document.documentElement.classList.toggle('dark', isDark.value)
  })
  
  return { isDark, toggle }
}
```

## PWA (Progressive Web App)

O aplicativo pode ser instalado como app:

```json
// manifest.json
{
  "name": "IncuNest Control",
  "short_name": "IncuNest",
  "description": "Control de incubadora neonatal",
  "theme_color": "#3b82f6",
  "background_color": "#ffffff",
  "display": "standalone",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

## Próximas Secções

- [Visão Geral] (./webapp-overview)
- [Despliegue] (./webapp-deployment)