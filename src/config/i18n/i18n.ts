import assets from '../../../assets';

export const fallback = 'es';
export const supportedLocales: SupportedLocales = {
  en: {
    name: 'English',
    translationFileLoader: (): Translation => assets.translations.en,
  },
  es: {
    name: 'Español',
    translationFileLoader: (): Translation => assets.translations.es,
  },
};
export const defaultNamespace = 'common';
export const namespaces = ['common', 'Settings'];

interface Translation {
  [key: string]: {
    [key: string]: string;
  };
}

interface SupportedLocal {
  name: string;
  translationFileLoader: () => Translation;
}

interface SupportedLocales {
  [key: string]: SupportedLocal;
}
