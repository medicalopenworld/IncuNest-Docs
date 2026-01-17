---
id: environment-setup
title: Configuración del Entorno
sidebar_label: Entorno de Desarrollo
sidebar_position: 1
description: Configuración del entorno de desarrollo para contribuir a IncuNest
keywords: [desarrollo, setup, herramientas, IDE]
---
# Development Environment Configuration

## Required Tools

### For Firmware Development

| Tool | Minimum Version | Purpose |
|-------------|-------------|-----------|
| VSCode | 1.70+ | Senior Editor |
| PlatformIO | 6.0+ | Compilation and loading |
| Git | 2.30+ | Version control |
| Python | 3.8+ | Auxiliary scripts |

### For Web Development

| Tool | Minimum Version | Purpose |
|-------------|-------------|-----------|
| Node.js | 18+ | JavaScript Runtime |
| npm | 9+ | Package management |
| Vue.js | 3.x | Frontend Framework |

### Recommended VS Code Extensions

```json
{
  "recommendations": [
    "platformio.platformio-ide",
    "ms-vscode.cpptools",
    "vue.volar",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "eamodio.gitlens",
    "usernamehw.errorlens"
  ]
}
```

## Project Configuration

### Clone Repository

```bash
git clone https://github.com/medicalopenworld/IncuNest.git
cd IncuNest
```

### Directory Structure

```
IncuNest/
├── firmware/           # Código ESP32
│   ├── src/
│   ├── include/
│   ├── lib/
│   └── platformio.ini
├── webapp/            # Interfaz web
│   ├── src/
│   ├── public/
│   └── package.json
├── hardware/          # Diseños PCB y mecánicos
│   ├── kicad/
│   ├── 3d-models/
│   └── schematics/
├── docs/              # Documentación
└── tools/             # Scripts auxiliares
```

### Configure Firmware

```bash
cd firmware

# Instalar dependencias
pio pkg install

# Compilar
pio run

# Cargar a ESP32
pio run --target upload
```

### Configure Web App

```bash
cd webapp

# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build para producción
npm run build
```

## Git configuration

### Global Settings

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
git config --global core.autocrlf input  # Linux/Mac
git config --global core.autocrlf true   # Windows
```

### Pre-commit hooks

Install pre-commit for automatic verifications:

```bash
pip install pre-commit
pre-commit install
```

`.pre-commit-config.yaml` file:

```yaml
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.4.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml

  - repo: local
    hooks:
      - id: clang-format
        name: clang-format
        entry: clang-format -i
        language: system
        files: \.(cpp|hpp|c|h)$
```

## Environment Variables

### Local Development

Create file `.env` in root:

```bash
# WiFi para testing
WIFI_SSID=TestNetwork
WIFI_PASSWORD=TestPassword

# MQTT broker de desarrollo
MQTT_BROKER=localhost
MQTT_PORT=1883
```

### Secrets Archive

Create `firmware/include/secrets.h`:

```cpp
#ifndef SECRETS_H
#define SECRETS_H

// No subir a Git - agregado a .gitignore
#define DEFAULT_WIFI_SSID "MiRed"
#define DEFAULT_WIFI_PASSWORD "MiPassword"

#endif
```

## Docker (Optional)

For isolated development:

```dockerfile
# Dockerfile
FROM python:3.10-slim

RUN pip install platformio

WORKDIR /project
VOLUME /project

CMD ["pio", "run"]
```

```bash
# Construir imagen
docker build -t incunest-dev .

# Compilar con Docker
docker run -v $(pwd)/firmware:/project incunest-dev
```

## Next Steps

- [Code Standards](./coding-standards)
- [Testing](./testing)
- [CI/CD](./ci-cd)
