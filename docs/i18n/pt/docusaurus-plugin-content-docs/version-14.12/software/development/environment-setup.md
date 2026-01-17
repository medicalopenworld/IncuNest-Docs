---
id: environment-setup
title: Configuração do Ambiente
sidebar_label: Ambiente de Desenvolvimento
sidebar_position: 1
description: Configuração do Ambiente de Desenvolvimento para contribuir para o IncuNest
keywords: [desarrollo, setup, herramientas, IDE]
---

# Configuração do Ambiente de Desenvolvimento

# Ferramentas Requeridas

### Para Desenvolvimento de Firmware

| Ferramenta | Versão Mínima | Propósito |
|-------------|----------------|----------|
| VS Code | 1.70+ | Editor principal |
| PlatformIO | 6.0+ | Compilação e carga |
| Git | 2.30+ | Controle de versões |
| Python | 3.8+ | Scripts auxiliares |

### Para Desenvolvimento Web

| Ferramenta | Versão Mínima | Propósito |
|-------------|----------------|----------|
| Node.js | 18+ | Runtime JavaScript |
| npm | 9+ | Gestão de Pacotes |
| Vue.js | 3.x | Framework frontend |

### Extensões VS Code Recomendadas

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

## Configuração do Projecto

## Clonar Repositório

```bash
git clone https://github.com/medicalopenworld/IncuNest.git
cd IncuNest
```

## Estrutura de Pastas

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

## Configurar o Firmware

```bash
cd firmware

# Instalar dependencias
pio pkg install

# Compilar
pio run

# Cargar a ESP32
pio run --target upload
```

## Configurar o Web App

```bash
cd webapp

# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build para producción
npm run build
```

## Configuração do Git

## Configuração Global

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
git config --global core.autocrlf input  # Linux/Mac
git config --global core.autocrlf true   # Windows
```

## Hooks de Pre-commit

Instalar o pré-commit para verificações automáticas:

```bash
pip install pre-commit
pre-commit install
```

Ficheiro@@ CODE0@:

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

## Variáveis de Ambiente

## Desenvolvimento Local

Criar um Ficheiro@ @ CODE0@@ na raiz:

```bash
# WiFi para testing
WIFI_SSID=TestNetwork
WIFI_PASSWORD=TestPassword

# MQTT broker de desarrollo
MQTT_BROKER=localhost
MQTT_PORT=1883
```

## Ficheiro de Segredos

Criar@@ CODE0@:

```cpp
#ifndef SECRETS_H
#define SECRETS_H

// No subir a Git - agregado a .gitignore
#define DEFAULT_WIFI_SSID "MiRed"
#define DEFAULT_WIFI_PASSWORD "MiPassword"

#endif
```

## Docker (Opcional)

Para desenvolvimento isolado:

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

## Próximos Passos

- [Nome de Código] (./coding-standards)
- [Testing] (./testing)
- [CI/CD] (./ci-cd)