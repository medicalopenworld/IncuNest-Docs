import fs from 'fs';
import path from 'path';
import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {localize} from './localize';

const DEFAULT_LOCALE = 'es';

type SidebarItem = {
  type: string;
  label?: string;
  id?: string;
  items?: SidebarItem[];
};

const loadTranslations = (filePath: string): Record<string, {message: string}> => {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch {
    return {};
  }
};

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'IncuNest',
  tagline: 'Incubadora Neonatal de Código Abierto / Open Source Neonatal Incubator',
  favicon: 'img/favicon.ico',

  // Future flags
  future: {
    v4: true,
  },

  // GitHub Pages deployment configuration
  url: 'https://medicalopenworld.github.io',
  baseUrl: '/IncuNest-Docs/',

  // GitHub pages deployment config
  organizationName: 'medicalopenworld',
  projectName: 'IncuNest-Docs',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  // Internationalization configuration (ES/EN)
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'pt', 'fr'],
    localeConfigs: {
      es: {
        label: 'Español',
        direction: 'ltr',
        htmlLang: 'es-ES',
      },
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
      },
      pt: {
        label: 'Português',
        direction: 'ltr',
        htmlLang: 'pt-PT',
      },
      fr: {
        label: 'Français',
        direction: 'ltr',
        htmlLang: 'fr-FR',
      },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          sidebarItemsGenerator: async function (args) {
            const locale = process.env.DOCUSAURUS_CURRENT_LOCALE ?? DEFAULT_LOCALE;
            const translations =
              locale === 'es'
                ? undefined
                : loadTranslations(path.join(__dirname, 'i18n', locale, 'code.json'));

            const categoryKeyMap: Record<string, string> = {
              Arquitectura: 'sidebar.docs.architecture',
              'Guías': 'sidebar.docs.guides',
              'Componentes Electrónicos': 'sidebar.hardware.components',
              'Estructura Mecánica': 'sidebar.hardware.mechanical',
              Ensamblaje: 'sidebar.hardware.assembly',
              'Esquemáticos y PCB': 'sidebar.hardware.schematics',
              'Firmware ESP32': 'sidebar.software.firmware',
              'API Reference': 'sidebar.software.api',
              Desarrollo: 'sidebar.software.development',
              'Aplicación Web': 'sidebar.software.webapp',
            };

            const docKeyMap: Record<string, string> = {
              intro: 'sidebar.docs.intro',
              'getting-started': 'sidebar.docs.gettingStarted',
              'safety-notice': 'sidebar.docs.safetyNotice',
              'architecture/overview': 'sidebar.docs.architecture.overview',
              'architecture/system-design': 'sidebar.docs.architecture.systemDesign',
              'architecture/communication': 'sidebar.docs.architecture.communication',
              'guides/installation': 'sidebar.docs.guides.installation',
              'guides/configuration': 'sidebar.docs.guides.configuration',
              'guides/calibration': 'sidebar.docs.guides.calibration',
              'guides/maintenance': 'sidebar.docs.guides.maintenance',
              'guides/troubleshooting': 'sidebar.docs.guides.troubleshooting',
              contributing: 'sidebar.docs.contributing',
              faq: 'sidebar.docs.faq',
              changelog: 'sidebar.docs.changelog',
              'hardware/overview': 'sidebar.hardware.overview',
              'hardware/electronics/main-board': 'sidebar.hardware.components.mainBoard',
              'hardware/electronics/sensors': 'sidebar.hardware.components.sensors',
              'hardware/electronics/actuators': 'sidebar.hardware.components.actuators',
              'hardware/electronics/display': 'sidebar.hardware.components.display',
              'hardware/electronics/power-supply': 'sidebar.hardware.components.powerSupply',
              'hardware/mechanical/enclosure': 'sidebar.hardware.mechanical.enclosure',
              'hardware/mechanical/heating-system': 'sidebar.hardware.mechanical.heating',
              'hardware/mechanical/humidification': 'sidebar.hardware.mechanical.humidification',
              'hardware/mechanical/3d-parts': 'sidebar.hardware.mechanical.parts3d',
              'hardware/assembly/bom': 'sidebar.hardware.assembly.bom',
              'hardware/assembly/pcb-assembly': 'sidebar.hardware.assembly.pcb',
              'hardware/assembly/mechanical-assembly': 'sidebar.hardware.assembly.mechanical',
              'hardware/assembly/wiring': 'sidebar.hardware.assembly.wiring',
              'hardware/assembly/testing': 'sidebar.hardware.assembly.testing',
              'hardware/schematics/circuit-diagrams': 'sidebar.hardware.schematics.circuit',
              'hardware/schematics/pcb-layout': 'sidebar.hardware.schematics.layout',
              'hardware/schematics/gerber-files': 'sidebar.hardware.schematics.gerber',
              'software/overview': 'sidebar.software.overview',
              'software/firmware/architecture': 'sidebar.software.firmware.architecture',
              'software/firmware/setup': 'sidebar.software.firmware.setup',
              'software/firmware/modules': 'sidebar.software.firmware.modules',
              'software/firmware/control-system': 'sidebar.software.firmware.control',
              'software/firmware/sensors-integration': 'sidebar.software.firmware.sensors',
              'software/firmware/display-ui': 'sidebar.software.firmware.display',
              'software/firmware/wifi-connectivity': 'sidebar.software.firmware.wifi',
              'software/firmware/data-logging': 'sidebar.software.firmware.logging',
              'software/api/rest-api': 'sidebar.software.api.rest',
              'software/api/websocket': 'sidebar.software.api.websocket',
              'software/api/mqtt': 'sidebar.software.api.mqtt',
              'software/development/environment-setup': 'sidebar.software.development.environment',
              'software/development/coding-standards': 'sidebar.software.development.standards',
              'software/development/testing': 'sidebar.software.development.testing',
              'software/development/debugging': 'sidebar.software.development.debugging',
              'software/development/ci-cd': 'sidebar.software.development.cicd',
              'software/webapp/webapp-overview': 'sidebar.software.webapp.overview',
              'software/webapp/webapp-features': 'sidebar.software.webapp.features',
              'software/webapp/webapp-deployment': 'sidebar.software.webapp.deployment',
            };

            const translateLabel = (key: string | undefined, fallback?: string) => {
              if (!translations || !key) {
                return fallback;
              }
              return translations[key]?.message ?? fallback;
            };

            const normalizeDocId = (id: string): string =>
              id.replace(/^version-[^/]+\//, '');

            const translateItems = (items: SidebarItem[]): SidebarItem[] =>
              items.map((item) => {
                if (item.type === 'category') {
                  return {
                    ...item,
                    label: translateLabel(categoryKeyMap[item.label], item.label),
                    items: translateItems(item.items),
                  };
                }
                if (item.type === 'doc') {
                  const normalizedId =
                    typeof item.id === 'string' ? normalizeDocId(item.id) : item.id;
                  return {
                    ...item,
                    label: translateLabel(docKeyMap[normalizedId], item.label),
                  };
                }
                return item;
              });

            const defaultItems = await args.defaultSidebarItemsGenerator(args);
            return translateItems(defaultItems);
          },
          editUrl: 'https://github.com/medicalopenworld/IncuNest-Docs/tree/main/docs/',
          // Versioning configuration
          lastVersion: '14.12',
          versions: {
            '14.12': {
              label: '14.12',
              path: '',
              badge: true,
            },
          },
          includeCurrentVersion: false,
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/incunest-social-card.jpg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    // Announcement bar for important updates
    announcementBar: {
      id: 'support_us',
      content:
        '⭐ Si te gusta IncuNest, ¡danos una estrella en <a target="_blank" rel="noopener noreferrer" href="https://github.com/medicalopenworld/IncuNest">GitHub</a>! ⭐',
      backgroundColor: '#4CAF50',
      textColor: '#ffffff',
      isCloseable: true,
    },
    navbar: {
      title: 'IncuNest',
      logo: {
        alt: 'IncuNest Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: localize({
            es: 'Documentación',
            en: 'Documentation',
            pt: 'Documentação',
            fr: 'Documentation',
          }),
        },
        {
          type: 'docSidebar',
          sidebarId: 'hardwareSidebar',
          position: 'left',
          label: localize({
            es: 'Hardware',
            en: 'Hardware',
            pt: 'Hardware',
            fr: 'Matériel',
          }),
        },
        {
          type: 'docSidebar',
          sidebarId: 'softwareSidebar',
          position: 'left',
          label: localize({
            es: 'Software',
            en: 'Software',
            pt: 'Software',
            fr: 'Logiciel',
          }),
        },
        // Version dropdown
        {
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownActiveClassDisabled: true,
        },
        // Language dropdown
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/medicalopenworld/IncuNest',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentación',
          items: [
            {
              label: 'Introducción',
              to: '/docs/intro',
            },
            {
              label: 'Guía de Inicio Rápido',
              to: '/docs/getting-started',
            },
            {
              label: 'Hardware',
              to: '/docs/hardware/overview',
            },
            {
              label: 'Software',
              to: '/docs/software/overview',
            },
          ],
        },
        {
          title: 'Comunidad',
          items: [
            {
              label: 'Comunidades',
              href: 'https://github.com/orgs/medicalopenworld/discussions',
            },
            {
              label: 'Reportar un Issue',
              href: 'https://github.com/medicalopenworld/IncuNest/issues',
            },
            {
              label: 'Contribuir',
              to: '/docs/contributing',
            },
          ],
        },
        {
          title: 'Recursos',
          items: [
            {
              label: 'Repositorio Principal',
              href: 'https://github.com/medicalopenworld/IncuNest',
            },
            {
              label: 'Medical Open World',
              href: 'https://github.com/medicalopenworld',
            },
          ],
        },
        {
          title: 'Legal',
          items: [
            {
              label: 'Licencia MIT',
              href: 'https://github.com/medicalopenworld/IncuNest/blob/master/LICENSE',
            },
            {
              label: 'Aviso de Seguridad',
              to: '/docs/safety-notice',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Medical Open World - IncuNest. Built with Docusaurus. Licensed under MIT.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'cpp', 'python', 'json', 'yaml'],
    },
    // Table of contents configuration
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
    // Algolia search (placeholder - configure when ready)
    // algolia: {
    //   appId: 'YOUR_APP_ID',
    //   apiKey: 'YOUR_SEARCH_API_KEY',
    //   indexName: 'incunest',
    // },
  } satisfies Preset.ThemeConfig,

  // Plugins
  plugins: [
    // Plugin for ideal image optimization
    // '@docusaurus/plugin-ideal-image',
  ],

  // Markdown configuration
  markdown: {
    mermaid: true,
  },

  // Themes
  themes: ['@docusaurus/theme-mermaid'],
};

export default config;
