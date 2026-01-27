---
id: environment-setup
title: Configuration de l'environnement
sidebar_label: Configuration de l'environnement
sidebar_position: 1
description: Configuración del entorno de desarrollo para contribuir a IncuNest
keywords: [desarrollo, setup, herramientas, IDE]
---

# Configuración del Entorno de Desarrollo

## Herramientas Requeridas

### Para Desarrollo de Firmware

| Herramienta | Versión Mínima | Propósito |
|-------------|----------------|-----------|
| VS Code | 1.70+ | Editor principal |
| PlatformIO | 6.0+ | Compilación y carga |
| Git | 2.30+ | Control de versiones |
| Python | 3.8+ | Scripts auxiliares |

### Para Desarrollo Web

| Herramienta | Versión Mínima | Propósito |
|-------------|----------------|-----------|
| Node.js | 18+ | Runtime JavaScript |
| npm | 9+ | Gestión de paquetes |
| Vue.js | 3.x | Framework frontend |

### Extensiones VS Code Recomendadas

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

## Configuración del Proyecto

### Clonar Repositorio

```bash
git clone https://github.com/medicalopenworld/IncuNest.git
cd IncuNest
```

### Estructura de Directorios

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

### Configurar Firmware

```bash
cd firmware

# Instalar dependencias
pio pkg install

# Compilar
pio run

# Cargar a ESP32
pio run --target upload
```

### Configurar Web App

```bash
cd webapp

# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build para producción
npm run build
```

## Configuración de Git

### Configuración Global

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
git config --global core.autocrlf input  # Linux/Mac
git config --global core.autocrlf true   # Windows
```

### Hooks de Pre-commit

Instalar pre-commit para verificaciones automáticas:

```bash
pip install pre-commit
pre-commit install
```

Archivo `.pre-commit-config.yaml`:

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

## Variables de Entorno

### Desarrollo Local

Crear archivo `.env` en la raíz:

```bash
# WiFi para testing
WIFI_SSID=TestNetwork
WIFI_PASSWORD=TestPassword

# MQTT broker de desarrollo
MQTT_BROKER=localhost
MQTT_PORT=1883
```

### Archivo de Secretos

Crear `firmware/include/secrets.h`:

```cpp
#ifndef SECRETS_H
#define SECRETS_H

// No subir a Git - agregado a .gitignore
#define DEFAULT_WIFI_SSID "MiRed"
#define DEFAULT_WIFI_PASSWORD "MiPassword"

#endif
```

## Docker (Opcional)

Para desarrollo aislado:

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

## Próximos Pasos

- [Estándares de Código](./coding-standards)
- [Testing](./testing)
- [CI/CD](./ci-cd)
