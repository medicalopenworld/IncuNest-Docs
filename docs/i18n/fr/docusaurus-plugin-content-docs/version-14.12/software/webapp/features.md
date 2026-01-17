---
id: webapp-features
title: Características de la Web App
sidebar_label: Características
sidebar_position: 2
description: Características y funcionalidades de la aplicación web de IncuNest
keywords: [webapp, características, funcionalidades, UI]
---

# Características de la Web App

## Dashboard Principal

### Indicadores en Tiempo Real

- **Temperatura Ambiente**
  - Valor actual con gauge visual
  - Indicador de setpoint
  - Código de color según estado

- **Temperatura de Piel** (si está disponible)
  - Medición secundaria
  - Comparación con ambiente

- **Humedad Relativa**
  - Valor actual y setpoint
  - Indicador visual

- **Potencia del Calefactor**
  - Barra de progreso
  - Porcentaje actual

### Panel de Estado

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

### Gráfico de Temperatura

- Línea de temperatura actual
- Línea de setpoint
- Bandas de warning/alarm
- Zoom y pan interactivo
- Exportación a CSV

### Opciones de Visualización

| Rango | Descripción |
|-------|-------------|
| 1h | Última hora |
| 6h | Últimas 6 horas |
| 24h | Últimas 24 horas |
| 7d | Última semana |
| Custom | Rango personalizado |

## Sistema de Alarmas

### Panel de Alarmas

- Lista de alarmas activas
- Nivel de severidad (color)
- Timestamp de activación
- Botón de reconocimiento
- Historial de alarmas

### Notificaciones

- Notificaciones en navegador (con permiso)
- Sonido de alerta (configurable)
- Banner visual prominente

## Configuración

### Control

- Ajuste de setpoint de temperatura
- Ajuste de setpoint de humedad
- Selector de modo (Auto/Manual)
- Control manual de potencia

### Parámetros PID

- Ganancia Proporcional (Kp)
- Ganancia Integral (Ki)
- Ganancia Derivativa (Kd)
- Botón de aplicar/resetear

### Alarmas

- Umbrales de temperatura (warning/alarm)
- Umbrales de humedad
- Activar/desactivar buzzer
- Volumen de alarma

### Red

- Estado de conexión WiFi
- Configuración MQTT
- mDNS hostname

### Sistema

- Información del dispositivo
- Versión de firmware
- Reiniciar dispositivo
- Restablecer configuración

## Responsive Design

La interfaz se adapta a diferentes tamaños de pantalla:

### Desktop (mayor a 1024px)

- Layout de dos columnas
- Gráficos grandes
- Sidebar de navegación

### Tablet (768px - 1024px)

- Layout de una columna
- Gráficos medianos
- Menú colapsable

### Mobile (menor a 768px)

- Layout vertical
- Gráficos optimizados para touch
- Navegación inferior

## Accesibilidad

- Contraste de colores WCAG 2.1 AA
- Navegación por teclado
- Labels para screen readers
- Indicadores no solo basados en color

## Internacionalización

Soporte para múltiples idiomas:

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

## Modo Oscuro

Toggle para cambiar entre tema claro y oscuro:

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

La aplicación puede instalarse como app:

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

## Próximas Secciones

- [Visión General](./webapp-overview)
- [Despliegue](./webapp-deployment)
