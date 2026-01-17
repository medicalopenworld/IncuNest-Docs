---
id: ci-cd
title: CI/CD
sidebar_label: CI/CD
sidebar_position: 5
description: Configuración de Integración y Despliegue Continuo para IncuNest
keywords: [CI, CD, GitHub Actions, automatización]
---
# CI/CD

## Overview

The CI/CD pipeline automates:

1. **Build** - Firmware and web app compilation
2. **Test** - Execution of unit tests
3. **Lint** - Code Style Check
4. **Release** - Binary generation

```mermaid
graph LR
    PUSH[Push/PR] --> BUILD[Build]
    BUILD --> TEST[Test]
    TEST --> LINT[Lint]
    LINT --> RELEASE[Release]
```

## GitHub Actions

### CI Workflow

```yaml
# .github/workflows/ci.yml

name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  firmware-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Cache PlatformIO
        uses: actions/cache@v3
        with:
          path: ~/.platformio
          key: ${{ runner.os }}-pio-${{ hashFiles('firmware/platformio.ini') }}
      
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.10'
      
      - name: Install PlatformIO
        run: pip install platformio
      
      - name: Build Firmware
        working-directory: ./firmware
        run: pio run
      
      - name: Upload Firmware Artifact
        uses: actions/upload-artifact@v3
        with:
          name: firmware
          path: firmware/.pio/build/*/firmware.bin

  firmware-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.10'
      
      - name: Install PlatformIO
        run: pip install platformio
      
      - name: Run Tests
        working-directory: ./firmware
        run: pio test -e native

  webapp-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: webapp/package-lock.json
      
      - name: Install Dependencies
        working-directory: ./webapp
        run: npm ci
      
      - name: Run Lint
        working-directory: ./webapp
        run: npm run lint
      
      - name: Run Tests
        working-directory: ./webapp
        run: npm run test -- --run
      
      - name: Build
        working-directory: ./webapp
        run: npm run build
      
      - name: Upload Web App Artifact
        uses: actions/upload-artifact@v3
        with:
          name: webapp
          path: webapp/dist

  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Check C++ formatting
        uses: jidicula/clang-format-action@v4.11.0
        with:
          clang-format-version: '16'
          check-path: 'firmware/src'
```

### Release Workflow

```yaml
# .github/workflows/release.yml

name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.10'
      
      - name: Install PlatformIO
        run: pip install platformio
      
      - name: Build Firmware
        working-directory: ./firmware
        run: pio run
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Build Web App
        working-directory: ./webapp
        run: |
          npm ci
          npm run build
      
      - name: Create SPIFFS image
        run: |
          # Crear imagen SPIFFS con la web app
          ~/.platformio/packages/tool-mkspiffs/mkspiffs \
            -c webapp/dist \
            -b 4096 \
            -p 256 \
            -s 0x160000 \
            spiffs.bin
      
      - name: Get version
        id: version
        run: echo "VERSION=${GITHUB_REF#refs/tags/}" >> $GITHUB_OUTPUT
      
      - name: Create Release
        uses: softprops/action-gh-release@v1
        with:
          name: IncuNest ${{ steps.version.outputs.VERSION }}
          draft: false
          prerelease: false
          files: |
            firmware/.pio/build/esp32/firmware.bin
            spiffs.bin
          body: |
            ## IncuNest ${{ steps.version.outputs.VERSION }}
            
            ### Downloads
            - `firmware.bin` - ESP32 firmware
            - `spiffs.bin` - Web app (SPIFFS image)
            
            ### Installation
            ```Bash
esptool.py write_flash 0x10000 firmware.bin
esptool.py write_flash 0x290000 spiffs.bin

```
```

### OTA Update Workflow

```yaml
# .github/workflows/ota-update.yml

name: OTA Update

on:
  workflow_dispatch:
    inputs:
      device_ip:
        description: 'Device IP address'
        required: true
        default: '192.168.1.100'
      firmware_version:
        description: 'Firmware version to deploy'
        required: true

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Download Release
        uses: robinraju/release-downloader@v1.8
        with:
          tag: ${{ github.event.inputs.firmware_version }}
          fileName: 'firmware.bin'
      
      - name: Upload via OTA
        run: |
          curl -F "firmware=@firmware.bin" \
               http://${{ github.event.inputs.device_ip }}/update
```

## Pre-commit Hooks

```yaml
# .pre-commit-config.yaml

repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.4.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-added-large-files

  - repo: https://github.com/pre-commit/mirrors-clang-format
    rev: v16.0.0
    hooks:
      - id: clang-format
        types_or: [c++, c]
        files: ^firmware/

  - repo: https://github.com/pre-commit/mirrors-eslint
    rev: v8.45.0
    hooks:
      - id: eslint
        files: \.[jt]sx?$
        types: [file]
        additional_dependencies:
          - eslint
          - eslint-config-prettier
```

## Semantic Versioning

### Version Structure

```
MAJOR.MINOR.PATCH
  │     │     │
  │     │     └── Bug fixes, patches
  │     └──────── New features (backward compatible)
  └────────────── Breaking changes
```

### Version Update

```cpp
// include/version.h
#define FIRMWARE_VERSION_MAJOR 1
#define FIRMWARE_VERSION_MINOR 0
#define FIRMWARE_VERSION_PATCH 0
#define FIRMWARE_VERSION "1.0.0"
```

### Release Script

```bash
#!/bin/bash
# scripts/release.sh

VERSION=$1

if [ -z "$VERSION" ]; then
    echo "Usage: ./release.sh <version>"
    exit 1
fi

# Actualizar version.h
sed -i "s/FIRMWARE_VERSION \".*\"/FIRMWARE_VERSION \"$VERSION\"/" include/version.h

# Actualizar package.json
cd webapp
npm version $VERSION --no-git-tag-version
cd ..

# Commit y tag
git add .
git commit -m "Release v$VERSION"
git tag "v$VERSION"
git push origin main --tags
```

##Badges

Add badges to the README:

```markdown
![CI](https://github.com/medicalopenworld/IncuNest/workflows/CI/badge.svg)
![Release](https://img.shields.io/github/v/release/medicalopenworld/IncuNest)
![License](https://img.shields.io/github/license/medicalopenworld/IncuNest)
```

## Upcoming Sections

- [Testing](./testing)
- [Code Standards](./coding-standards)
