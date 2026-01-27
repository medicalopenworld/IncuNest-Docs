---
id: webapp-features
title: Características de la Web App
sidebar_label: Features
sidebar_position: 2
description: Características y funcionalidades de la aplicación web de IncuNest
keywords: [webapp, características, funcionalidades, UI]
---
# Web App Features

## Main Dashboard

### Real Time Indicators

- **Ambient Temperature**
- Current value with visual gauge
- Setpoint indicator
- Color code according to state

- **Skin Temperature** (if available)
- Secondary measurement
- Comparison with environment

- **Relative Humidity**
- Current value and setpoint
- Visual indicator

- **Heater Power**
- Progress bar
- Current percentage

### Status Panel

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

## Historical Charts

### Temperature Graph

- Current temperature line
- Setpoint line
- Warning/alarm bands
- Zoom and interactive pan
- Export to CSV

### Display Options

| Range | Description |
|-------|-------------|
| 1h | Breaking news |
| 6h | Last 6 hours |
| 24h | Last 24 hours |
| 7d | Last week |
| Custom | Custom range |

## Alarm System

### Alarm Panel

- List of active alarms
- Severity level (color)
- Activation timestamp
- Recognition button
- Alarm history

### Notifications

- Browser notifications (with permission)
- Alert sound (configurable)
- Prominent visual banner

## Configuration

### Control

- Temperature setpoint adjustment
- Humidity setpoint adjustment
- Mode selector (Auto/Manual)
- Manual power control

### PID parameters

- Proportional Gain (Kp)
- Integral Gain (Ki)
- Derivative Gain (Kd)
- Apply/reset button

### Alarms

- Temperature thresholds (warning/alarm)
- Humidity thresholds
- Activate/deactivate buzzer
- Alarm volume

### Grid

- WiFi connection status
- MQTT configuration
- mDNS hostname

### System

- Device information
- Firmware version
- Reboot device
- Reset settings

## Responsive Design

The interface adapts to different screen sizes:

### Desktop (greater than 1024px)

- Two column layout
- Large graphics
- Navigation sidebar

### Tablet (768px - 1024px)

- Layout of a column
- Medium graphics
- Collapsible menu

### Mobile (less than 768px)

- Vertical layout
- Touch-optimized graphics
- Bottom navigation

## Accessibility

- WCAG 2.1 AA color contrast
- Keyboard navigation
- Labels for screen readers
- Indicators not only based on color

## Internationalization

Support for multiple languages:

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

## Dark Mode

Toggle to switch between light and dark theme:

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

The application can be installed as an app:

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

## Upcoming Sections

- [Overview](./webapp-overview)
- [Deployment](./webapp-deployment)
