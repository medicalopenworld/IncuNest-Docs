import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
import {localize} from './localize';

/**
 * IncuNest Documentation Sidebars
 * 
 * Three main sidebars:
 * - docsSidebar: General documentation (intro, getting started, safety, contributing)
 * - hardwareSidebar: Hardware-specific documentation
 * - softwareSidebar: Software/firmware documentation
 */
const sidebars: SidebarsConfig = {
  // Main documentation sidebar
  docsSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: localize({
        es: 'Introducción',
        en: 'Introduction',
        pt: 'Introdução',
        fr: 'Introduction',
      }),
    },
    {
      type: 'doc',
      id: 'getting-started',
      label: localize({
        es: 'Inicio Rápido',
        en: 'Quick Start',
        pt: 'Guia Rápido',
        fr: 'Démarrage rapide',
      }),
    },
    {
      type: 'doc',
      id: 'safety-notice',
      label: localize({
        es: 'Aviso de Seguridad',
        en: 'Safety Notice',
        pt: 'Aviso de Segurança',
        fr: 'Avis de sécurité',
      }),
    },
    {
      type: 'category',
      label: localize({
        es: 'Arquitectura',
        en: 'Architecture',
        pt: 'Arquitetura',
        fr: 'Architecture',
      }),
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'architecture/overview',
          label: localize({
            es: 'Visión General',
            en: 'Overview',
            pt: 'Visão Geral',
            fr: 'Vue d’ensemble',
          }),
        },
        {
          type: 'doc',
          id: 'architecture/system-design',
          label: localize({
            es: 'Diseño del Sistema',
            en: 'System Design',
            pt: 'Projeto do Sistema',
            fr: 'Conception du système',
          }),
        },
        {
          type: 'doc',
          id: 'architecture/communication',
          label: localize({
            es: 'Comunicación y Protocolos',
            en: 'Communication & Protocols',
            pt: 'Comunicação e Protocolos',
            fr: 'Communication et protocoles',
          }),
        },
      ],
    },
    {
      type: 'category',
      label: localize({
        es: 'Guías',
        en: 'Guides',
        pt: 'Guias',
        fr: 'Guides',
      }),
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'guides/installation',
          label: localize({
            es: 'Instalación',
            en: 'Installation',
            pt: 'Instalação',
            fr: 'Installation',
          }),
        },
        {
          type: 'doc',
          id: 'guides/configuration',
          label: localize({
            es: 'Configuración',
            en: 'Configuration',
            pt: 'Configuração',
            fr: 'Configuration',
          }),
        },
        {
          type: 'doc',
          id: 'guides/calibration',
          label: localize({
            es: 'Calibración',
            en: 'Calibration',
            pt: 'Calibração',
            fr: 'Étalonnage',
          }),
        },
        {
          type: 'doc',
          id: 'guides/maintenance',
          label: localize({
            es: 'Mantenimiento',
            en: 'Maintenance',
            pt: 'Manutenção',
            fr: 'Maintenance',
          }),
        },
        {
          type: 'doc',
          id: 'guides/troubleshooting',
          label: localize({
            es: 'Solución de Problemas',
            en: 'Troubleshooting',
            pt: 'Solução de Problemas',
            fr: 'Dépannage',
          }),
        },
      ],
    },
    {
      type: 'doc',
      id: 'contributing',
      label: localize({
        es: 'Contribuir',
        en: 'Contributing',
        pt: 'Contribuições',
        fr: 'Contribuer',
      }),
    },
    {
      type: 'doc',
      id: 'faq',
      label: localize({
        es: 'Preguntas Frecuentes',
        en: 'FAQ',
        pt: 'Perguntas Frequentes',
        fr: 'FAQ',
      }),
    },
    {
      type: 'doc',
      id: 'changelog',
      label: localize({
        es: 'Registro de Cambios',
        en: 'Changelog',
        pt: 'Histórico de Alterações',
        fr: 'Journal des modifications',
      }),
    },
  ],

  // Hardware documentation sidebar
  hardwareSidebar: [
    {
      type: 'doc',
      id: 'hardware/overview',
      label: localize({
        es: 'Visión General',
        en: 'Overview',
        pt: 'Visão Geral',
        fr: "Vue d'ensemble",
      }),
    },
    {
      type: 'doc',
      id: 'hardware/simulation',
      label: localize({
        es: 'Simulación',
        en: 'Simulation',
        pt: 'Simulação',
        fr: 'Simulation',
      }),
    },
    {
      type: 'category',
      label: localize({
        es: 'Componentes Electrónicos',
        en: 'Electronic Components',
        pt: 'Componentes Eletrônicos',
        fr: 'Composants électroniques',
      }),
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'hardware/electronics/main-board',
          label: localize({
            es: 'Placa Principal',
            en: 'Main Board',
            pt: 'Placa Principal',
            fr: 'Carte principale',
          }),
        },
        {
          type: 'doc',
          id: 'hardware/electronics/sensors',
          label: localize({
            es: 'Sensores',
            en: 'Sensors',
            pt: 'Sensores',
            fr: 'Capteurs',
          }),
        },
        {
          type: 'doc',
          id: 'hardware/electronics/actuators',
          label: localize({
            es: 'Actuadores',
            en: 'Actuators',
            pt: 'Atuadores',
            fr: 'Actionneurs',
          }),
        },
        {
          type: 'doc',
          id: 'hardware/electronics/display',
          label: localize({
            es: 'Pantalla',
            en: 'Display',
            pt: 'Tela',
            fr: 'Affichage',
          }),
        },
        {
          type: 'doc',
          id: 'hardware/electronics/power-supply',
          label: localize({
            es: 'Fuente de Poder',
            en: 'Power Supply',
            pt: 'Fonte de Energia',
            fr: 'Alimentation',
          }),
        },
      ],
    },
    {
      type: 'category',
      label: localize({
        es: 'Estructura Mecánica',
        en: 'Mechanical Structure',
        pt: 'Estrutura Mecânica',
        fr: 'Structure mécanique',
      }),
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'hardware/mechanical/enclosure',
          label: localize({
            es: 'Estructura',
            en: 'Enclosure',
            pt: 'Gabinete',
            fr: 'Enceinte',
          }),
        },
        {
          type: 'doc',
          id: 'hardware/mechanical/heating-system',
          label: localize({
            es: 'Sistema de Calefacción',
            en: 'Heating System',
            pt: 'Sistema de Aquecimento',
            fr: 'Système de chauffage',
          }),
        },
        {
          type: 'doc',
          id: 'hardware/mechanical/humidification',
          label: localize({
            es: 'Humidificación',
            en: 'Humidification',
            pt: 'Umidificação',
            fr: 'Humidification',
          }),
        },
        {
          type: 'doc',
          id: 'hardware/mechanical/3d-parts',
          label: localize({
            es: 'Piezas 3D',
            en: '3D Parts',
            pt: 'Peças 3D',
            fr: 'Pièces 3D',
          }),
        },
      ],
    },
    {
      type: 'category',
      label: localize({
        es: 'Ensamblaje',
        en: 'Assembly',
        pt: 'Montagem',
        fr: 'Assemblage',
      }),
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'hardware/assembly/bom',
          label: localize({
            es: 'Lista de Materiales (BOM)',
            en: 'Bill of Materials (BOM)',
            pt: 'Lista de Materiais (BOM)',
            fr: 'Liste de matériel (BOM)',
          }),
        },
        {
          type: 'doc',
          id: 'hardware/assembly/pcb-assembly',
          label: localize({
            es: 'Ensamblaje de PCB',
            en: 'PCB Assembly',
            pt: 'Montagem de PCB',
            fr: 'Assemblage PCB',
          }),
        },
        {
          type: 'doc',
          id: 'hardware/assembly/mechanical-assembly',
          label: localize({
            es: 'Ensamblaje Mecánico',
            en: 'Mechanical Assembly',
            pt: 'Montagem Mecânica',
            fr: 'Assemblage mécanique',
          }),
        },
        {
          type: 'doc',
          id: 'hardware/assembly/wiring',
          label: localize({
            es: 'Cableado',
            en: 'Wiring',
            pt: 'Fiação',
            fr: 'Câblage',
          }),
        },
        {
          type: 'doc',
          id: 'hardware/assembly/testing',
          label: localize({
            es: 'Pruebas',
            en: 'Testing',
            pt: 'Testes',
            fr: 'Tests',
          }),
        },
      ],
    },
    {
      type: 'category',
      label: localize({
        es: 'Esquemáticos y PCB',
        en: 'Schematics & PCB',
        pt: 'Esquemáticos e PCB',
        fr: 'Schémas et PCB',
      }),
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'hardware/schematics/circuit-diagrams',
          label: localize({
            es: 'Diagramas de Circuito',
            en: 'Circuit Diagrams',
            pt: 'Diagramas de Circuito',
            fr: 'Schémas de circuit',
          }),
        },
        {
          type: 'doc',
          id: 'hardware/schematics/pcb-layout',
          label: localize({
            es: 'Diseño PCB',
            en: 'PCB Layout',
            pt: 'Layout de PCB',
            fr: 'Routage PCB',
          }),
        },
        {
          type: 'doc',
          id: 'hardware/schematics/gerber-files',
          label: localize({
            es: 'Archivos Gerber',
            en: 'Gerber Files',
            pt: 'Arquivos Gerber',
            fr: 'Fichiers Gerber',
          }),
        },
      ],
    },
  ],

  // Software documentation sidebar
  softwareSidebar: [
    {
      type: 'doc',
      id: 'software/overview',
      label: localize({
        es: 'Visión General',
        en: 'Overview',
        pt: 'Visão Geral',
        fr: "Vue d'ensemble",
      }),
    },
    {
      type: 'category',
      label: localize({
        es: 'Firmware ESP32',
        en: 'ESP32 Firmware',
        pt: 'Firmware ESP32',
        fr: 'Firmware ESP32',
      }),
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'software/firmware/architecture',
          label: localize({
            es: 'Arquitectura del Firmware',
            en: 'Firmware Architecture',
            pt: 'Arquitetura do Firmware',
            fr: 'Architecture du firmware',
          }),
        },
        {
          type: 'doc',
          id: 'software/firmware/setup',
          label: localize({
            es: 'Configuración Inicial',
            en: 'Initial Setup',
            pt: 'Configuração Inicial',
            fr: 'Configuration initiale',
          }),
        },
        {
          type: 'doc',
          id: 'software/firmware/modules',
          label: localize({
            es: 'Módulos',
            en: 'Modules',
            pt: 'Módulos',
            fr: 'Modules',
          }),
        },
        {
          type: 'doc',
          id: 'software/firmware/control-system',
          label: localize({
            es: 'Sistema de Control',
            en: 'Control System',
            pt: 'Sistema de Controle',
            fr: 'Système de contrôle',
          }),
        },
        {
          type: 'doc',
          id: 'software/firmware/sensors-integration',
          label: localize({
            es: 'Integración de Sensores',
            en: 'Sensor Integration',
            pt: 'Integração de Sensores',
            fr: 'Intégration des capteurs',
          }),
        },
        {
          type: 'doc',
          id: 'software/firmware/display-ui',
          label: localize({
            es: 'Pantalla y UI',
            en: 'Display & UI',
            pt: 'Tela e UI',
            fr: 'Affichage et UI',
          }),
        },
        {
          type: 'doc',
          id: 'software/firmware/wifi-connectivity',
          label: localize({
            es: 'Conectividad WiFi',
            en: 'WiFi Connectivity',
            pt: 'Conectividade WiFi',
            fr: 'Connectivité WiFi',
          }),
        },
        {
          type: 'doc',
          id: 'software/firmware/data-logging',
          label: localize({
            es: 'Registro de Datos',
            en: 'Data Logging',
            pt: 'Registro de Dados',
            fr: 'Enregistrement des données',
          }),
        },
      ],
    },
    {
      type: 'category',
      label: localize({
        es: 'API Reference',
        en: 'API Reference',
        pt: 'Referência da API',
        fr: "Référence de l'API",
      }),
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'software/api/rest-api',
          label: localize({
            es: 'REST API',
            en: 'REST API',
            pt: 'REST API',
            fr: 'API REST',
          }),
        },
        {
          type: 'doc',
          id: 'software/api/websocket',
          label: localize({
            es: 'WebSocket',
            en: 'WebSocket',
            pt: 'WebSocket',
            fr: 'WebSocket',
          }),
        },
        {
          type: 'doc',
          id: 'software/api/mqtt',
          label: localize({
            es: 'MQTT',
            en: 'MQTT',
            pt: 'MQTT',
            fr: 'MQTT',
          }),
        },
      ],
    },
    {
      type: 'category',
      label: localize({
        es: 'Desarrollo',
        en: 'Development',
        pt: 'Desenvolvimento',
        fr: 'Développement',
      }),
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'software/development/environment-setup',
          label: localize({
            es: 'Configuración del Entorno',
            en: 'Environment Setup',
            pt: 'Configuração do Ambiente',
            fr: "Configuration de l'environnement",
          }),
        },
        {
          type: 'doc',
          id: 'software/development/coding-standards',
          label: localize({
            es: 'Estándares de Código',
            en: 'Coding Standards',
            pt: 'Padrões de Código',
            fr: 'Normes de codage',
          }),
        },
        {
          type: 'doc',
          id: 'software/development/testing',
          label: localize({
            es: 'Pruebas',
            en: 'Testing',
            pt: 'Testes',
            fr: 'Tests',
          }),
        },
        {
          type: 'doc',
          id: 'software/development/debugging',
          label: localize({
            es: 'Depuración',
            en: 'Debugging',
            pt: 'Depuração',
            fr: 'Débogage',
          }),
        },
        {
          type: 'doc',
          id: 'software/development/ci-cd',
          label: localize({
            es: 'CI/CD',
            en: 'CI/CD',
            pt: 'CI/CD',
            fr: 'CI/CD',
          }),
        },
      ],
    },
    {
      type: 'category',
      label: localize({
        es: 'Aplicación Web',
        en: 'Web Application',
        pt: 'Aplicação Web',
        fr: 'Application Web',
      }),
      collapsed: true,
      items: [
        {
          type: 'doc',
          id: 'software/webapp/webapp-overview',
          label: localize({
            es: 'Visión General',
            en: 'Overview',
            pt: 'Visão Geral',
            fr: "Vue d'ensemble",
          }),
        },
        {
          type: 'doc',
          id: 'software/webapp/webapp-features',
          label: localize({
            es: 'Características',
            en: 'Features',
            pt: 'Funcionalidades',
            fr: 'Fonctionnalités',
          }),
        },
        {
          type: 'doc',
          id: 'software/webapp/webapp-deployment',
          label: localize({
            es: 'Despliegue',
            en: 'Deployment',
            pt: 'Implantação',
            fr: 'Déploiement',
          }),
        },
      ],
    },
  ],
};

export default sidebars;
