# GitHub Copilot Instructions for IncuNest-Docs

## Project Context

This repository contains documentation for IncuNest, an open-source neonatal incubator project. The documentation covers hardware assembly, firmware development, and simulation using Wokwi.

## External Documentation Sources

When working on this project, Copilot should be able to reference the following external documentation:

### Wokwi Simulator Documentation
- **URL**: https://docs.wokwi.com/
- **Purpose**: Reference for simulating IncuNest hardware components using the Wokwi online simulator
- **Relevant sections**:
  - Supported hardware components
  - ESP32 simulation
  - Sensor simulation (DHT22, DS18B20, HX711, etc.)
  - Display simulation (LCD, TFT)

## Allowed Domains for Documentation Search

The following domains are approved for documentation lookup:

- `docs.wokwi.com` - Wokwi simulator documentation
- `docs.espressif.com` - ESP32 official documentation
- `docs.platformio.org` - PlatformIO build system documentation

## Code Style Guidelines

- Use Spanish as the primary language for documentation content
- Provide translations in English, French, and Portuguese where applicable
- Follow Docusaurus markdown conventions
- Include code examples that are compatible with Wokwi simulation

## Hardware Simulation Context

This project uses Wokwi (https://wokwi.com/) for hardware simulation. When suggesting code or documentation:

1. Verify component compatibility with Wokwi supported hardware list
2. Use appropriate Wokwi component identifiers (e.g., `wokwi-esp32-devkit-v1`, `wokwi-dht22`)
3. Reference pin configurations that work in both simulation and real hardware
