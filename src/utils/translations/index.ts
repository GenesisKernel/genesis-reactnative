import enUS from './en-US';

const locales = {
  enUS,
}

export const getTranslations = (locale: string): object => {
  return locales[locale.replace('-', '')] || 'en-US';
}