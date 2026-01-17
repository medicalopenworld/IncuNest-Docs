---
id: bom
title: Lista de Materiales (BOM)
sidebar_label: BOM
sidebar_position: 1
description: Lista completa de materiales para construir IncuNest
keywords: [BOM, materiales, componentes, compras]
---

# Lista de Materiales (BOM)

## Resumen de Costos

| Categoría | Costo Estimado (USD) |
|-----------|---------------------|
| Electrónica | $70 - $100 |
| Sensores | $25 - $50 |
| Actuadores | $40 - $60 |
| Estructura | $80 - $150 |
| Misceláneos | $20 - $40 |
| **Total** | **$235 - $400** |

:::note Nota
Los precios varían según la región y el proveedor. Se recomienda comparar precios en múltiples proveedores.
:::

## Electrónica Principal

### Microcontrolador y Módulos

| Componente | Especificación | Cant. | Precio Est. | Enlace Ref. |
|------------|----------------|-------|-------------|-------------|
| ESP32-WROOM-32 | DevKit V1 | 1 | $8 | [AliExpress](https://aliexpress.com) |
| DS3231 | Módulo RTC con batería | 1 | $3 | |
| Módulo SD Card | SPI | 1 | $2 | |

### Reguladores de Voltaje

| Componente | Especificación | Cant. | Precio Est. |
|------------|----------------|-------|-------------|
| AMS1117-5.0 | Regulador 5V 1A | 1 | $0.50 |
| AMS1117-3.3 | Regulador 3.3V 1A | 1 | $0.50 |
| Capacitor electrolítico | 100µF 25V | 4 | $0.40 |
| Capacitor cerámico | 100nF 50V | 10 | $0.50 |

### Componentes de Potencia

| Componente | Especificación | Cant. | Precio Est. |
|------------|----------------|-------|-------------|
| IRLZ44N | N-MOSFET 60V 50A | 3 | $3 |
| 2N2222A | NPN Transistor | 2 | $0.50 |
| SS34 | Diodo Schottky 3A | 1 | $0.30 |
| Fusible + portafusible | 15A 5x20mm | 1 | $1 |

### Resistencias

| Valor | Tipo | Cant. | Precio Est. |
|-------|------|-------|-------------|
| 10KΩ | 1/4W 5% | 10 | $0.50 |
| 4.7KΩ | 1/4W 5% | 5 | $0.25 |
| 1KΩ | 1/4W 5% | 5 | $0.25 |
| 330Ω | 1/4W 5% | 5 | $0.25 |

### Conectores

| Tipo | Especificación | Cant. | Precio Est. |
|------|----------------|-------|-------------|
| Terminal block | 2 pines, 5.08mm | 3 | $1.50 |
| JST-XH | 2, 3, 4 pines | 10 | $2 |
| Header macho | 2.54mm | 2 tiras | $1 |
| Header hembra | 2.54mm | 2 tiras | $1 |

## Sensores

| Componente | Especificación | Cant. | Precio Est. |
|------------|----------------|-------|-------------|
| SHT31 | Módulo I2C temp/hum | 1 | $8 |
| DHT22 | Temp/hum (respaldo) | 1 | $5 |
| DS18B20 | Sonda impermeable 1m | 2 | $6 |
| HX711 | Módulo ADC 24bit | 1 | $2 |
| Celda de carga | 5kg | 1 | $5 |

## Actuadores

| Componente | Especificación | Cant. | Precio Est. |
|------------|----------------|-------|-------------|
| Resistencia PTC | 100W 12V cerámica | 1 | $15 |
| Ventilador | 80mm 12V DC | 1 | $5 |
| Humidificador ultrasónico | 5V módulo | 1 | $8 |
| Buzzer | 5V activo | 1 | $1 |
| KSD301 | Termostato 45°C NC | 1 | $2 |

## Interfaz de Usuario

### Opción 1: LCD Básico

| Componente | Especificación | Cant. | Precio Est. |
|------------|----------------|-------|-------------|
| LCD 20x4 | I2C HD44780 | 1 | $8 |
| Pulsadores | 6x6mm táctiles | 4 | $1 |
| LED RGB | 5mm | 3 | $0.50 |

### Opción 2: TFT Avanzado

| Componente | Especificación | Cant. | Precio Est. |
|------------|----------------|-------|-------------|
| TFT 3.5" | ILI9488 480x320 SPI | 1 | $15 |
| Touch XPT2046 | Incluido en display | - | - |
| Pulsadores | 6x6mm táctiles | 4 | $1 |
| LED RGB | 5mm | 3 | $0.50 |

## Alimentación

| Componente | Especificación | Cant. | Precio Est. |
|------------|----------------|-------|-------------|
| Fuente switching | 12V 10A 120W | 1 | $15 |
| Cable de poder | AC 3 pines 1.5m | 1 | $3 |
| Interruptor | 250V 10A con luz | 1 | $2 |
| Enchufe IEC | C14 con fusible | 1 | $3 |

## Estructura Mecánica

### Acrílico

| Pieza | Dimensiones | Cant. | Precio Est. |
|-------|-------------|-------|-------------|
| Transparente 6mm | 600x400mm | 2 | $30 |
| Transparente 3mm | 300x300mm | 1 | $8 |
| Opaco blanco 6mm | 600x400mm | 1 | $15 |

### Estructura

| Componente | Especificación | Cant. | Precio Est. |
|------------|----------------|-------|-------------|
| Perfil aluminio | 20x20mm L | 2m | $10 |
| MDF | 600x400x15mm | 1 | $8 |
| Escuadras | Aluminio L | 8 | $4 |
| Bisagras | Acero inoxidable | 2 | $3 |

### Tornillería

| Tipo | Tamaño | Cant. | Precio Est. |
|------|--------|-------|-------------|
| Tornillo M3 | 10mm | 50 | $2 |
| Tornillo M4 | 20mm | 50 | $3 |
| Tuerca M3 | - | 50 | $1 |
| Tuerca M4 | - | 50 | $2 |
| Arandela M3 | - | 100 | $1 |
| Arandela M4 | - | 100 | $2 |

### Aislamiento y Sellado

| Componente | Especificación | Cant. | Precio Est. |
|------------|----------------|-------|-------------|
| Espuma poliestireno | 10mm, 500x500mm | 2 | $5 |
| Silicona | Transparente, tubo 280ml | 1 | $5 |
| Burlete | Goma, 5m | 1 | $3 |

## Misceláneos

| Componente | Especificación | Cant. | Precio Est. |
|------------|----------------|-------|-------------|
| Cable 22AWG | Varios colores, 10m | 1 | $5 |
| Cable 18AWG | Rojo/negro, 5m | 1 | $3 |
| Termofit | Surtido | 1 set | $3 |
| Cinta aislante | - | 2 | $2 |
| Bridas (zip ties) | 100 piezas | 1 | $2 |
| Protoboard | 400 puntos | 1 | $3 |

## Herramientas Necesarias

:::info Herramientas Básicas
Estas herramientas no están incluidas en el costo total.
:::

| Herramienta | Uso |
|-------------|-----|
| Soldador 40-60W | Soldadura de componentes |
| Estaño con flux | Soldadura |
| Desarmadores | Ensamblaje |
| Multímetro | Verificación |
| Pistola de silicona | Sellado |
| Sierra/cortadora | Corte de acrílico |
| Taladro | Perforaciones |
| Brocas 3mm, 4mm | Agujeros de montaje |
| Impresora 3D | Piezas plásticas (opcional) |

## Proveedores Recomendados

### Electrónica

| Proveedor | Región | Notas |
|-----------|--------|-------|
| DigiKey | Global | Alta calidad, envío rápido |
| Mouser | Global | Amplio catálogo |
| LCSC | Global | Económico, desde China |
| AliExpress | Global | Muy económico, envío lento |

### Materiales Mecánicos

| Proveedor | Región | Notas |
|-----------|--------|-------|
| Home Depot | América | Acrílico, madera |
| Leroy Merlin | Europa | Materiales generales |
| Ferreterías locales | - | Tornillería, herramientas |

## Archivo BOM Descargable

Descarga la lista completa en formato CSV/Excel:

- [BOM Completo (CSV)](/assets/bom_complete.csv)
- [BOM Electrónica (CSV)](/assets/bom_electronics.csv)
- [BOM Mecánica (CSV)](/assets/bom_mechanical.csv)

## Próximas Secciones

- [Ensamblaje de PCB](./pcb-assembly)
- [Ensamblaje Mecánico](./mechanical-assembly)
