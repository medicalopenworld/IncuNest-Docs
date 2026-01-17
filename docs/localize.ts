const currentLocale = process.env.DOCUSAURUS_CURRENT_LOCALE ?? 'es';

export const localize = (values: Record<string, string>): string =>
  values[currentLocale] ?? values.es ?? Object.values(values)[0];
