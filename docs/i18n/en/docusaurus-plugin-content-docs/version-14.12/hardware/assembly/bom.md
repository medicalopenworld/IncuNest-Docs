---
id: bom
title: Bill of Materials (BOM)
sidebar_label: BOM
sidebar_position: 1
description: Lista completa de materiales para construir IncuNest
keywords: [BOM, materiales, componentes, compras]
---
# Bill of Materials (BOM)

## Cost Summary

| Category | Estimated Cost (USD) |
|-----------|---------------------|
| Electronics | $70 - $100 |
| Sensors | $25 - $50 |
| Actuators | $40 - $60 |
| Structure | $80 - $150 |
| Miscellaneous | $20 - $40 |
| **Total** | **$235 - $400** |

:::note Note
Prices vary by region and provider. It is recommended to compare prices at multiple providers.
:::

## Main Electronics

### Microcontroller and Modules

| Component | Specification | Qty | Est. Price | Link Ref. |
|---------|----------------|-------|-------------|-------------|
| ESP32-WROOM-32 | DevKit V1 | 1 | $8 | [AliExpress](https://aliexpress.com) |
| DS3231 | RTC module with battery | 1 | $3 | |
| SD Card Module | SPI | 1 | $2 | |

### Voltage Regulators

| Component | Specification | Qty | Est. Price |
|---------|----------------|-------|-------------|
| AMS1117-5.0 | Regulator 5V 1A | 1 | $0.50 |
| AMS1117-3.3 | Regulator 3.3V 1A | 1 | $0.50 |
| Electrolytic capacitor | 100µF 25V | 4 | $0.40 |
| Ceramic capacitor | 100nF 50V | 10 | $0.50 |

### Power Components

| Component | Specification | Qty | Est. Price |
|---------|----------------|-------|-------------|
| IRLZ44N | N-MOSFET 60V 50A | 3 | $3 |
| 2N2222A | NPN Transistor | 2 | $0.50 |
| SS34 | Schottky diode 3A | 1 | $0.30 |
| Fuse + fuse holder | 15A 5x20mm | 1 | $1 |

### Resistors

| Value | Type | Qty | Est. Price |
|-------|------|-------|-------------|
| 10KΩ | 1/4W 5% | 10 | $0.50 |
| 4.7KΩ | 1/4W 5% | 5 | $0.25 |
| 1KΩ | 1/4W 5% | 5 | $0.25 |
| 330Ω | 1/4W 5% | 5 | $0.25 |

### Connectors

| Type | Specification | Qty | Est. Price |
|------|----------------|-------|-------------|
| Terminal block | 2 pins, 5.08mm | 3 | $1.50 |
| JST-XH | 2, 3, 4 pins | 10 | $2 |
| Male header | 2.54mm | 2 strips | $1 |
| Female header | 2.54mm | 2 strips | $1 |

## Sensors

| Component | Specification | Qty | Est. Price |
|---------|----------------|-------|-------------|
| SHT31 | I2C temp/hum module | 1 | $8 |
| DHT22 | Temp/hum (backup) | 1 | $5 |
| DS18B20 | Waterproof probe 1m | 2 | $6 |
| HX711 | 24bit ADC Module | 1 | $2 |
| Load cell | 5kg | 1 | $5 |

## Actuators

| Component | Specification | Qty | Est. Price |
|---------|----------------|-------|-------------|
| PTC resistance | 100W 12V ceramic | 1 | $15 |
| Fan | 80mm 12V DC | 1 | $5 |
| Ultrasonic humidifier | 5V module | 1 | $8 |
| Buzzer | 5V active | 1 | $1 |
| KSD301 | Thermostat 45°C NC | 1 | $2 |

## User Interface

### Option 1: Basic LCD

| Component | Specification | Qty | Est. Price |
|---------|----------------|-------|-------------|
| LCD 20x4 | I2C HD44780 | 1 | $8 |
| Pushbuttons | 6x6mm touch | 4 | $1 |
| RGB LEDs | 5mm | 3 | $0.50 |

### Option 2: Advanced TFT

| Component | Specification | Qty | Est. Price |
|---------|----------------|-------|-------------|
| TFT 3.5" | ILI9488 480x320 SPI | 1 | $15 |
| Touch XPT2046 | Included in display | - | - |
| Pushbuttons | 6x6mm touch | 4 | $1 |
| RGB LEDs | 5mm | 3 | $0.50 |

## Food

| Component | Specification | Qty | Est. Price |
|---------|----------------|-------|-------------|
| Switching font | 12V 10A 120W | 1 | $15 |
| Power cable | AC 3 pin 1.5m | 1 | $3 |
| Switch | 250V 10A with light | 1 | $2 |
| IEC plug | C14 with fuse | 1 | $3 |

## Mechanical Structure

### Acrylic

| Piece | Dimensions | Qty | Est. Price |
|-------|-------------|-------|-------------|
| Transparent 6mm | 600x400mm | 2 | $30 |
| Transparent 3mm | 300x300mm | 1 | $8 |
| Opaque white 6mm | 600x400mm | 1 | $15 |

### Structure

| Component | Specification | Qty | Est. Price |
|---------|----------------|-------|-------------|
| Aluminum profile | 20x20mm L | 2m | $10 |
| MDF | 600x400x15mm | 1 | $8 |
| Squads | Aluminum L | 8 | $4 |
| Hinges | Stainless steel | 2 | $3 |

### Screws

| Type | Size | Qty | Est. Price |
|------|--------|-------|-------------|
| M3 screw | 10mm | 50 | $2 |
| M4 screw | 20mm | 50 | $3 |
| M3 nut | - | 50 | $1 |
| M4 nut | - | 50 | $2 |
| M3 Washer | - | 100 | $1 |
| M4 Washer | - | 100 | $2 |

### Insulation and Sealing

| Component | Specification | Qty | Est. Price |
|---------|----------------|-------|-------------|
| Styrofoam | 10mm, 500x500mm | 2 | $5 |
| Silicone | Transparent, 280ml tube | 1 | $5 |
| Weatherstrip | Rubber, 5m | 1 | $3 |

## Miscellaneous

| Component | Specification | Qty | Est. Price |
|---------|----------------|-------|-------------|
| 22AWG Wire | Various colors, 10m | 1 | $5 |
| 18AWG Wire | Red/black, 5m | 1 | $3 |
| Thermofit | Assortment | 1 set | $3 |
| Insulating tape | - | 2 | $2 |
| Zip ties | 100 pieces | 1 | $2 |
| Breadboard | 400 points | 1 | $3 |

## Necessary Tools

:::info Basic Tools
These tools are not included in the total cost.
:::

| Tool | Usage |
|-------------|-----|
| Soldering iron 40-60W | Component welding |
| Tin with flux | Welding |
| Screwdrivers | Assembly |
| Multimeter | Verification |
| Silicone gun | Sealed |
| Saw/cutter | Acrylic cutting |
| Drill | Drilling |
| Drill bits 3mm, 4mm | Mounting holes |
| 3D Printer | Plastic parts (optional) |

## Recommended Suppliers

### Electronics

| Supplier | Region | Notes |
|-----------|--------|-------|
| DigiKey | Global | High quality, fast shipping |
| Mouser | Global | Extensive catalog |
| LCSC | Global | Economic, from China |
| Aliexpress | Global | Very cheap, slow shipping |

### Mechanical Materials

| Supplier | Region | Notes |
|-----------|--------|-------|
| Home Depot | America | Acrylic, wood |
| Leroy Merlin | Europe | General materials |
| Local hardware stores | - | Screws, tools |

## Downloadable BOM File

Download the complete list in CSV/Excel format:

- [Full BOM (CSV)](/assets/bom_complete.csv)
- [Electronic BOM (CSV)](/assets/bom_electronics.csv)
- [Mechanical BOM (CSV)](/assets/bom_mechanical.csv)

## Upcoming Sections

- [PCB Assembly](./pcb-assembly)
- [Mechanical Assembly](./mechanical-assembly)
