import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

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
          label: 'Documentación',
        },
        {
          type: 'docSidebar',
          sidebarId: 'hardwareSidebar',
          position: 'left',
          label: 'Hardware',
        },
        {
          type: 'docSidebar',
          sidebarId: 'softwareSidebar',
          position: 'left',
          label: 'Software',
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
              label: 'GitHub Discussions',
              href: 'https://github.com/medicalopenworld/IncuNest/discussions',
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
              label: 'Licencia GPL-3.0',
              href: 'https://github.com/medicalopenworld/IncuNest/blob/main/LICENSE',
            },
            {
              label: 'Aviso de Seguridad',
              to: '/docs/safety-notice',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Medical Open World - IncuNest. Built with Docusaurus. Licensed under GPL-3.0.`,
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
