# Incunest-Docs

Repositorio de documentación de IncuNest basado en Docusaurus.

## Objetivo del repositorio

Este repositorio contiene la documentación de IncuNest. Aquí se configura el sitio, el versionado y el flujo de traducciones.

## Stack y configuración principal

- **Docusaurus**: configuración en [docs/docusaurus.config.ts](docs/docusaurus.config.ts)
- **Sidebars**: estructura de navegación en [docs/sidebars.ts](docs/sidebars.ts)
- **Versionado**: basado en la versión de firmware **14.12** (definida en el repo IncuNest)
- **i18n**: idiomas configurados **es**, **en**, **pt**, **fr**
- **Blog**: deshabilitado (blog: false)

### Versionado

La versión publicada es **14.12**. La documentación versionada vive en:

- [docs/versioned_docs/version-14.12](docs/versioned_docs/version-14.12)
- [docs/versioned_sidebars/version-14.12-sidebars.json](docs/versioned_sidebars/version-14.12-sidebars.json)
- Traducciones versionadas:
  - [docs/i18n/en/docusaurus-plugin-content-docs/version-14.12](docs/i18n/en/docusaurus-plugin-content-docs/version-14.12)
  - [docs/i18n/pt/docusaurus-plugin-content-docs/version-14.12](docs/i18n/pt/docusaurus-plugin-content-docs/version-14.12)
  - [docs/i18n/fr/docusaurus-plugin-content-docs/version-14.12](docs/i18n/fr/docusaurus-plugin-content-docs/version-14.12)

## Proceso de traducción (Docusaurus i18n)

El idioma fuente es **español**. Docusaurus usa carpetas de i18n para cada idioma. La estructura se replica por versión:

```
docs/i18n/<lang>/docusaurus-plugin-content-docs/version-14.12/
```

### Flujo recomendado

1. **Editar contenido fuente (ES)** en:
	- [docs/versioned_docs/version-14.12](docs/versioned_docs/version-14.12)
2. **Replicar estructura** para EN/PT/FR (mismas rutas y nombres de archivo).
3. **Traducir el contenido** en los archivos correspondientes de `docs/i18n/<lang>/...`.
4. **Verificar build** con:
	- `npm run build` desde [docs](docs)

### Notas de traducción

- Mantener **frontmatter** intacto (id, sidebar_label, title, etc.).
- No traducir **código**, **bloques de ejemplo**, **rutas**, ni **identificadores** (por ejemplo, IDs de docs).
- Traducir encabezados, texto y listas de contenido.

## Ejecutar localmente

Desde la carpeta [docs](docs):

- Instalar dependencias: `npm install`
- Desarrollo: `npm run start`
- Build: `npm run build`

## Assets estáticos

Archivos como manuales y videos se publican desde:

- [docs/static/manuals](docs/static/manuals)
- [docs/static/videos](docs/static/videos)

Se enlazan con rutas públicas, por ejemplo:

- `/manuals/mi-manual.pdf`
- `/videos/mantenimiento.mp4`
