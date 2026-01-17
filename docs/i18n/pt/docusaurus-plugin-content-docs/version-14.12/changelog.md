---
id: changelog
title: Registro de Cambios
sidebar_label: Changelog
sidebar_position: 12
description: Historial de versiones de IncuNest
keywords: [changelog, versiones, historial, actualizaciones]
---
# Registro de alterações

Todas as alterações notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
e este projeto segue [Versão Semântica](https://semver.org/lang/es/).

## [Não publicado]

### Planejado
- Suporte para sensor de peso
- Modo de transporte
- Aplicativo móvel complementar
- Integração com sistemas hospitalares (HL7/FHIR)

---

## [1.0.0] - 15/01/2026

### ✨ Adicionado
- Controle de temperatura PID com feedback
- Monitoramento de umidade relativa
- Interface web responsiva para monitoramento remoto
- Sistema de alarme multinível
- Cadastro de dados no SPIFFS
- Suporte para tela LCD 20x4
- Suporte para tela TFT de 3,5"
- API REST para integração externa
- WebSocket para atualizações em tempo real
- Documentação completa em espanhol e inglês
- Suporte para atualização OTA

### 🔧 Hardware
- PCB principal v1.0
- Projeto de carcaça para impressão 3D
- Integração com sensores DHT22 e SHT31
- Sistema de aquecimento com resistência cerâmica
- Sistema de umidificação passiva

### 📚 Documentação
- Guia de início rápido
- Manual de montagem completo
- Guia de calibração
- Documentação API

---

## [0.9.0-beta] - 01/11/2025

### ✨ Adicionado
- Primeira versão funcional de controle de temperatura
- Interface LCD básica
- Conexão Wi-Fi básica

### 🐛 Corrigido
- Estabilidade do controle PID
- Reconexão WiFi automática

### ⚠️ Conhecido
- Interface web incompleta
- Documentação pendente

---

## [0.5.0-alfa] - 15/08/2025

### ✨ Adicionado
- Protótipo inicial de hardware
- Leitura básica do sensor
- Estrutura de Firmware

### ⚠️ Limitações
- Apenas para desenvolvimento
- Não use em ambientes reais

---

## Guia de atualização

### De 0.9.x a 1.0.0

1. **Faça backup de sua configuração** antes de atualizar
2. **Atualizar firmware** via OTA ou USB
3. **Revise os novos parâmetros** em `config.h`
4. **Recalibre os sensores** após a atualização

```bash
# Actualizar firmware
cd firmware
git pull origin main
pio run --target upload
```

### Notas de compatibilidade

| Versão Anterior | Compatível com 1.0.0 | Notas |
|------------------|-----------|-------|
| 0.9.x | ✅ Sim | Atualização direta |
| 0,5.x | ⚠️ Parcial | Requer nova calibração |
| Anterior a 0.5 | ❌ Não | Regravar do zero |

---

## Convenções de versionamento

- **MAJOR.MINOR.PATCH** (ex: 1.2.3)
- **PRINCIPAL**: Alterações incompatíveis com versões anteriores
- **MINOR**: Novos recursos suportados
- **PATCH**: Correções de bugs compatíveis

### Tags de pré-lançamento

- **alfa**: Desenvolvimento inicial, instável
- **beta**: Funcionalidade completa, em teste
- **rc**: Release Candidate, pronto para produção

---

##Links

- [Lançamentos no GitHub](https://github.com/medicalopenworld/IncuNest/releases)
- [Comparar versões](https://github.com/medicalopenworld/IncuNest/compare)
- [Relatar problemas](https://github.com/medicalopenworld/IncuNest/issues)
