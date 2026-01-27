---
id: webapp-overview
title: Aplicación Web
sidebar_label: Vue d'ensemble
sidebar_position: 1
description: Documentación de la aplicación web de IncuNest
keywords: [webapp, interfaz, Vue.js, dashboard]
---

# Aplicación Web

## Descripción General

La aplicación web de IncuNest proporciona una interfaz de usuario moderna para monitorear y controlar la incubadora desde cualquier navegador.

## Tecnologías

| Tecnología | Propósito |
|------------|-----------|
| Vue.js 3 | Framework frontend |
| TypeScript | Tipado estático |
| Pinia | State management |
| Vue Router | Navegación |
| TailwindCSS | Estilos |
| Chart.js | Gráficos |
| Socket.io | WebSocket |

## Arquitectura

```
webapp/
├── src/
│   ├── api/              # Clientes API
│   │   ├── http.ts       # Cliente REST
│   │   └── websocket.ts  # Cliente WebSocket
│   ├── components/       # Componentes Vue
│   │   ├── common/       # Componentes reutilizables
│   │   ├── dashboard/    # Componentes del dashboard
│   │   └── settings/     # Componentes de configuración
│   ├── composables/      # Composition functions
│   ├── layouts/          # Layouts de página
│   ├── pages/            # Vistas/páginas
│   ├── stores/           # Pinia stores
│   ├── types/            # TypeScript types
│   └── utils/            # Utilidades
├── public/               # Archivos estáticos
└── index.html
```

## Pantallas Principales

### Dashboard

Muestra el estado en tiempo real:

- Temperatura actual y setpoint
- Humedad actual y setpoint
- Potencia del calefactor
- Estado del sistema
- Alarmas activas

### Gráficos

Visualización histórica:

- Gráfico de temperatura (últimas 24h)
- Gráfico de humedad
- Tendencias

### Configuración

Ajuste de parámetros:

- Setpoints de temperatura y humedad
- Parámetros PID
- Umbrales de alarma
- Configuración de red

### Alarmas

Gestión de alarmas:

- Lista de alarmas activas
- Historial de alarmas
- Reconocimiento de alarmas

## Componentes Clave

### TemperatureGauge

```vue
<template>
  <div class="gauge-container">
    <svg viewBox="0 0 200 200">
      <!-- Arco de fondo -->
      <path 
        :d="backgroundArc"
        fill="none"
        stroke="#e5e7eb"
        stroke-width="20"
      />
      <!-- Arco de valor -->
      <path 
        :d="valueArc"
        fill="none"
        :stroke="gaugeColor"
        stroke-width="20"
        stroke-linecap="round"
      />
    </svg>
    <div class="gauge-value">
      <span class="text-4xl font-bold">{{ value.toFixed(1) }}</span>
      <span class="text-xl">°C</span>
    </div>
    <div class="gauge-label">{{ label }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  value: number
  min?: number
  max?: number
  warningThreshold?: number
  dangerThreshold?: number
  label?: string
}>()

const gaugeColor = computed(() => {
  if (props.dangerThreshold && props.value >= props.dangerThreshold) {
    return '#ef4444' // red
  }
  if (props.warningThreshold && props.value >= props.warningThreshold) {
    return '#f59e0b' // amber
  }
  return '#10b981' // green
})
</script>
```

### AlarmBanner

```vue
<template>
  <transition name="slide">
    <div 
      v-if="activeAlarms.length > 0"
      class="alarm-banner"
      :class="bannerClass"
    >
      <div class="flex items-center gap-4">
        <AlertIcon class="w-6 h-6 animate-pulse" />
        <span class="font-semibold">{{ currentAlarm.message }}</span>
      </div>
      <button 
        @click="acknowledgeAlarm"
        class="btn btn-sm"
      >
        Reconocer
      </button>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAlarmStore } from '@/stores/alarm'

const alarmStore = useAlarmStore()
const activeAlarms = computed(() => alarmStore.activeAlarms)
const currentAlarm = computed(() => activeAlarms.value[0])

const bannerClass = computed(() => ({
  'bg-red-500': currentAlarm.value?.level === 'CRITICAL',
  'bg-amber-500': currentAlarm.value?.level === 'WARNING',
  'bg-blue-500': currentAlarm.value?.level === 'INFO',
}))

function acknowledgeAlarm() {
  if (currentAlarm.value) {
    alarmStore.acknowledge(currentAlarm.value.id)
  }
}
</script>
```

## State Management (Pinia)

### Sensor Store

```typescript
// stores/sensor.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { SensorData } from '@/types'

export const useSensorStore = defineStore('sensor', () => {
  const data = ref<SensorData | null>(null)
  const history = ref<SensorData[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  const temperature = computed(() => data.value?.temperature.ambient ?? 0)
  const humidity = computed(() => data.value?.humidity.current ?? 0)
  
  async function fetchData() {
    loading.value = true
    try {
      const response = await fetch('/api/sensors')
      data.value = await response.json()
      error.value = null
    } catch (e) {
      error.value = 'Error al obtener datos'
    } finally {
      loading.value = false
    }
  }
  
  function updateFromWebSocket(newData: SensorData) {
    data.value = newData
    history.value.push(newData)
    
    // Mantener máximo 1000 puntos
    if (history.value.length > 1000) {
      history.value.shift()
    }
  }
  
  return {
    data,
    history,
    loading,
    error,
    temperature,
    humidity,
    fetchData,
    updateFromWebSocket,
  }
})
```

## WebSocket Integration

```typescript
// composables/useWebSocket.ts
import { ref, onMounted, onUnmounted } from 'vue'
import { useSensorStore } from '@/stores/sensor'
import { useAlarmStore } from '@/stores/alarm'

export function useWebSocket() {
  const connected = ref(false)
  let ws: WebSocket | null = null
  
  const sensorStore = useSensorStore()
  const alarmStore = useAlarmStore()
  
  function connect() {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
    ws = new WebSocket(`${protocol}//${window.location.host}/ws`)
    
    ws.onopen = () => {
      connected.value = true
      ws?.send(JSON.stringify({ type: 'subscribe', channel: 'all' }))
    }
    
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data)
      
      switch (message.type) {
        case 'sensor_update':
          sensorStore.updateFromWebSocket(message.data)
          break
        case 'alarm':
          alarmStore.handleAlarm(message.data)
          break
        case 'state_change':
          // Handle state change
          break
      }
    }
    
    ws.onclose = () => {
      connected.value = false
      // Reconectar después de 3 segundos
      setTimeout(connect, 3000)
    }
  }
  
  onMounted(() => connect())
  onUnmounted(() => ws?.close())
  
  return { connected }
}
```

## Build para ESP32

La web app se compila y empaqueta en SPIFFS:

```bash
# Build
npm run build

# Crear imagen SPIFFS
cd ..
pio run --target buildfs

# Subir a ESP32
pio run --target uploadfs
```

## Próximas Secciones

- [Características](./webapp-features)
- [Despliegue](./webapp-deployment)
