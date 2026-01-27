---
id: coding-standards
title: Estándares de Código
sidebar_label: Coding Standards
sidebar_position: 2
description: Guía de estilo y estándares de código para IncuNest
keywords: [código, estilo, estándares, convenciones]
---
# Code Standards

## General Principles

1. **Readability** over brevity
2. **Consistency** throughout the project
3. **Documentation** of the code
4. **Safety** as a priority

## C++ (Firmware)

### Code Style

We follow the style based on Google C++ Style Guide with adaptations for embedded.

#### Named

```cpp
// Clases: PascalCase
class TemperatureController { };
class SensorManager { };

// Funciones: camelCase
void readSensor();
float calculatePID();

// Variables: camelCase
float currentTemperature;
int sampleCount;

// Constantes: UPPER_SNAKE_CASE
const int MAX_TEMPERATURE = 38;
const float DEFAULT_KP = 2.0;

// Enums: PascalCase para tipo, UPPER_SNAKE_CASE para valores
enum class AlarmLevel {
    INFO,
    WARNING,
    CRITICAL
};

// Miembros privados: camelCase con sufijo _
float temperature_;
bool isRunning_;
```

#### Format

```cpp
// Llaves en la misma línea
if (condition) {
    doSomething();
} else {
    doSomethingElse();
}

// Espacios alrededor de operadores
int result = a + b * c;
if (x == 5 && y > 10) { }

// Sin espacios en paréntesis
function(arg1, arg2);  // Correcto
function( arg1, arg2 );  // Incorrecto

// Indentación: 4 espacios (no tabs)
class Example {
    void method() {
        if (condition) {
            statement;
        }
    }
};
```

#### Documentation

```cpp
/**
 * @brief Controlador PID para regulación de temperatura
 * 
 * Implementa un controlador PID discreto con anti-windup
 * para mantener la temperatura dentro del rango objetivo.
 * 
 * @example
 * PIDController pid(2.0, 0.5, 1.0);
 * pid.setSetpoint(36.5);
 * float output = pid.compute(currentTemp);
 */
class PIDController {
public:
    /**
     * @brief Calcula la salida del controlador
     * @param input Valor actual del proceso (temperatura)
     * @return Salida del controlador (0-100%)
     */
    float compute(float input);
    
private:
    float kp_;  ///< Ganancia proporcional
    float ki_;  ///< Ganancia integral
    float kd_;  ///< Ganancia derivativa
};
```

### Security Practices

```cpp
// Usar constexpr para valores conocidos en compilación
constexpr float MAX_SAFE_TEMP = 38.5f;

// Validar todos los inputs
void setTemperature(float temp) {
    if (temp < MIN_TEMP || temp > MAX_TEMP) {
        logError("Temperatura fuera de rango");
        return;
    }
    temperature_ = temp;
}

// Evitar magic numbers
// Malo
if (value > 37.5) { }

// Bueno
constexpr float TEMP_WARNING_THRESHOLD = 37.5f;
if (value > TEMP_WARNING_THRESHOLD) { }

// Usar static_assert para verificaciones en compilación
static_assert(sizeof(ConfigData) == 64, "ConfigData size mismatch");
```

### Memory Management

```cpp
// Preferir stack sobre heap
float readings[100];  // Stack - mejor
// float* readings = new float[100];  // Evitar si es posible

// Si se usa heap, usar smart pointers cuando sea posible
std::unique_ptr<Sensor> sensor = std::make_unique<SHT31Sensor>();

// Evitar fragmentación - pre-alocar buffers
class DataLogger {
    static constexpr size_t BUFFER_SIZE = 1024;
    char buffer_[BUFFER_SIZE];  // Pre-alocado
};
```

## JavaScript/TypeScript (Web App)

### Code Style

We follow the Airbnb JavaScript style with modifications for Vue.js.

```javascript
// Variables: camelCase
const currentTemperature = 36.5;
let sensorReadings = [];

// Constantes: UPPER_SNAKE_CASE
const MAX_RETRIES = 3;
const API_BASE_URL = '/api';

// Funciones: camelCase
function fetchSensorData() { }
const calculateAverage = (values) => { };

// Clases/Componentes: PascalCase
class SensorManager { }
// Vue components
<TemperatureDisplay />
<AlarmPanel />
```

### Vue components

```vue
<script setup lang="ts">
// imports primero, agrupados
import { ref, computed, onMounted } from 'vue';
import type { SensorData } from '@/types';
import { useSensorStore } from '@/stores/sensor';

// Props
interface Props {
  initialValue?: number;
  showUnits?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  initialValue: 0,
  showUnits: true,
});

// Emits
const emit = defineEmits<{
  (e: 'update', value: number): void;
}>();

// Store
const sensorStore = useSensorStore();

// State
const temperature = ref(props.initialValue);

// Computed
const formattedTemp = computed(() => {
  return `${temperature.value.toFixed(1)}°C`;
});

// Methods
function updateTemperature(newValue: number): void {
  temperature.value = newValue;
  emit('update', newValue);
}

// Lifecycle
onMounted(() => {
  // Inicialización
});
</script>

<template>
  <div class="temperature-display">
    <span>{{ formattedTemp }}</span>
  </div>
</template>

<style scoped>
.temperature-display {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
```

### TypeScript

```typescript
// Interfaces: PascalCase con prefijo 'I' opcional
interface SensorReading {
  timestamp: Date;
  temperature: number;
  humidity: number;
}

// Types
type AlarmLevel = 'info' | 'warning' | 'critical';

// Enums
enum ControlMode {
  Auto = 'auto',
  Manual = 'manual',
}

// Generics
function processReadings<T extends SensorReading>(
  readings: T[]
): T[] {
  return readings.filter(r => r.temperature > 0);
}
```

## Tools Configuration

### clang-format (C++)

`.clang-format` file:

```yaml
BasedOnStyle: Google
IndentWidth: 4
ColumnLimit: 100
BreakBeforeBraces: Attach
AllowShortFunctionsOnASingleLine: None
AllowShortIfStatementsOnASingleLine: false
```

### ESLint (JavaScript/TypeScript)

`.eslintrc.cjs` file:

```javascript
module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
  ],
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'error',
    '@typescript-eslint/explicit-function-return-type': 'warn',
  },
};
```

### Prettier

`.prettierrc` file:

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

## Code Review

### Checklist

Before creating a PR, check:

- [ ] Code compiles without warnings
- [ ] Tests pass
- [ ] Updated documentation
- [ ] Followed code standards
- [ ] Without TODO/FIXME without associated issue
- [ ] Descriptive commit messages

### Commit Messages

Follow Conventional Commits format:

```
<tipo>(<alcance>): <descripción>

[cuerpo opcional]

[pie opcional]
```

**Guys:**
- `feat`: New functionality
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Format (no code changes)
- `refactor`: Refactoring
- `test`: Add/modify tests
- `chore`: Maintenance

**Examples:**
```
feat(pid): agregar anti-windup al controlador

fix(sensor): corregir lectura errónea de SHT31 en alta humedad

docs(api): documentar endpoints de configuración

refactor(web): migrar store a Pinia
```

## Upcoming Sections

- [Testing](./testing)
- [CI/CD](./ci-cd)
