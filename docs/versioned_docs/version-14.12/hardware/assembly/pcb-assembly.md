---
id: pcb-assembly
title: Ensamblaje del PCB
sidebar_label: Ensamblaje PCB
sidebar_position: 2
description: Guía de ensamblaje del PCB de IncuNest
keywords: [PCB, soldadura, ensamblaje, electrónica]
---

# Ensamblaje del PCB

## Antes de Comenzar

### Herramientas Necesarias

- Soldador de temperatura controlable (320-380°C)
- Estaño con flux (0.8mm recomendado)
- Flux adicional (opcional pero recomendado)
- Desoldador o malla de desoldar
- Pinzas de punta fina
- Lupa o microscopio (recomendado)
- Multímetro
- Tercera mano o soporte de PCB

### Inspección Previa

Antes de comenzar, verificar:

- [ ] PCB sin defectos visibles
- [ ] Todos los componentes presentes
- [ ] Componentes correctos según BOM
- [ ] Área de trabajo limpia y bien iluminada

## Orden de Ensamblaje

:::tip Regla General
Soldar primero los componentes de menor altura, luego los más altos.
:::

### Nivel 1: Componentes SMD (si aplica)

1. Resistencias SMD
2. Capacitores SMD
3. Diodos SMD

### Nivel 2: Resistencias y Diodos THT

```
Componente      Valor       Ubicación
─────────────────────────────────────
R1, R2, R3      10KΩ        Pull-ups
R4, R5          4.7KΩ       I2C
R6, R7, R8      330Ω        LEDs
R9, R10         1KΩ         Base transistores
D1              SS34        Protección
```

**Técnica de soldadura:**

1. Doblar las patas a 90°
2. Insertar en los agujeros
3. Asegurar que el componente esté plano
4. Soldar un pin
5. Verificar posición
6. Soldar el segundo pin
7. Cortar exceso de patas

### Nivel 3: Capacitores

```
Capacitores Cerámicos (primero)
──────────────────────────────
C1-C6: 100nF cerca de ICs

Capacitores Electrolíticos (después)
────────────────────────────────────
C7-C10: 100µF en reguladores
        ⚠️ RESPETAR POLARIDAD
        - Banda blanca = negativo
```

### Nivel 4: Semiconductores

#### Reguladores de Voltaje

```
           ┌─────────────────┐
           │   AMS1117-X.X   │
           │    ┌─┬─┬─┐      │
           │    │ │ │ │      │
           └────┴─┴─┴─┴──────┘
                 │ │ │
                GND│ OUT
                   IN

⚠️ Verificar orientación antes de soldar
⚠️ Considerar disipador si hay espacio
```

#### MOSFETs

```
IRLZ44N (TO-220)
           ┌───────┐
           │ ┌───┐ │
           │ │   │ │
           │ └───┘ │
           └─┬─┬─┬─┘
             │ │ │
             G D S
             
Montaje:
1. Aplicar pasta térmica si usa disipador
2. Insertar en PCB
3. Fijar con tornillo si hay disipador
4. Soldar pines
```

#### Transistores

```
2N2222A (TO-92)
          ╭───╮
          │   │
          └┬┬┬┘
           │││
           EBC (Emisor-Base-Colector)
           
⚠️ Verificar pinout según fabricante
```

### Nivel 5: Conectores

1. **Terminales de alimentación** - Soldar primero
2. **Headers para ESP32** - Usar el módulo como guía
3. **Conectores JST** - Para sensores y periféricos
4. **Terminal blocks** - Para actuadores de potencia

```
Técnica para headers rectos:
1. Insertar header en PCB
2. Colocar ESP32/módulo sobre los pines
3. Soldar UN pin de cada extremo
4. Verificar alineación
5. Soldar resto de pines
6. Retirar módulo
```

### Nivel 6: Componentes Altos

1. Fusible y portafusibles
2. Módulos (ESP32, RTC, etc.)
3. Disipadores de calor

## Verificación Post-Ensamblaje

### Inspección Visual

- [ ] Todas las soldaduras brillantes y cónicas
- [ ] Sin puentes de soldadura
- [ ] Sin componentes torcidos
- [ ] Polaridades correctas (capacitores, diodos)
- [ ] Sin residuos de flux excesivos

### Pruebas Eléctricas

#### 1. Continuidad (sin alimentación)

```
Prueba              Resultado Esperado
────────────────────────────────────────
VCC - GND           NO continuidad (>1MΩ)
Entre pistas        NO continuidad
Conexiones          Continuidad (<1Ω)
```

#### 2. Primera Alimentación

:::warning Procedimiento Seguro
Usar fuente de alimentación con límite de corriente (100mA inicial).
:::

1. Conectar multímetro en modo amperímetro en serie
2. Aplicar 12V lentamente
3. Verificar consumo < 50mA sin módulos
4. Medir voltajes de salida:
   - 5V rail: 4.9V - 5.1V ✓
   - 3.3V rail: 3.2V - 3.4V ✓

#### 3. Prueba con ESP32

1. Insertar ESP32 en headers
2. Alimentar el sistema
3. Verificar LED de power del ESP32
4. Conectar por USB y verificar comunicación serial

## Solución de Problemas

### Cortocircuito en Alimentación

1. **Desconectar inmediatamente**
2. Inspeccionar visualmente buscando puentes
3. Verificar polaridad de capacitores
4. Usar multímetro para localizar el corto
5. Desoldar componentes sospechosos uno a uno

### Regulador se Calienta Excesivamente

**Causas posibles:**
- Cortocircuito en la salida
- Exceso de carga
- Capacitor de entrada/salida faltante

**Solución:**
- Verificar corriente de carga
- Agregar disipador de calor
- Considerar regulador switching

### ESP32 No Responde

1. Verificar voltaje 3.3V en pines de alimentación
2. Verificar conexiones EN y IO0
3. Probar booteo con botón BOOT presionado
4. Verificar driver USB instalado

## Consejos de Soldadura

### Temperatura

| Componente | Temperatura |
|------------|-------------|
| Componentes THT | 320-350°C |
| SMD pequeño | 300-320°C |
| Conectores grandes | 350-380°C |
| Sin plomo | +20-30°C |

### Técnica Correcta

```
     INCORRECTO          CORRECTO
         │                   │
    ╭────┴────╮         ╭────┴────╮
    │ ░░░░░░░ │         │    ●    │
    │ fría    │         │ cónica  │
    └─────────┘         └─────────┘
    
    ╭────┬────╮         ╭────┬────╮
    │    ░    │         │    ●    │
    │ exceso  │         │ justa   │
    └─────────┘         └─────────┘
```

### Secuencia de Soldadura

1. Limpiar punta del soldador
2. Aplicar soldador al pad Y al pin (2s)
3. Aplicar estaño al punto de unión
4. Retirar estaño
5. Retirar soldador
6. No mover hasta que solidifique

## Próximas Secciones

- [Ensamblaje Mecánico](./mechanical-assembly)
- [Cableado](./wiring)
- [Pruebas](./testing)
