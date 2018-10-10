import enUS from './en-US';
import ru from './ru-RU';

export const SUPPORTED_LOCALES = ['ru', 'en'];
const locales = {
  enUS,
  ru
};

export const getTranslations = (locale: string): any => {
  if (locale) {
    if (locale.substr(0, 2) === 'en') {
      return locales[locale.replace('-', '')] || locales['enUS'];
    } else {
      const nonEnglishLocale = locale.substr(0, 2);
      return locales[nonEnglishLocale] || locales['enUS'];
    }
  }
};
