import i18next from 'i18next';
import { I18nManager as RNI18nManager } from 'react-native';
import { initReactI18next } from 'react-i18next';

import * as config from './i18n';
import languageDetector from './language-detector';
import translationLoader from './translations-loader';
import { formatDate } from '../../utils';

type Direction = 'rtl' | 'ltr';
type Indexer = { [key: string]: Indexer };
interface customIl8n {
  init: () => Promise<void>;
  readonly locale: string;
  readonly isRTL: boolean;
  readonly dir: string;
  t: (key: string, options: { [key: string]: string }) => string;
  select: (map: { [key in Direction]: Indexer }) => Indexer;
  changeLanguage: (language: string) => Promise<void>;
}

const i18n: customIl8n = {
  /**
   * @returns {Promise}
   */
  init: () => {
    return new Promise((resolve, reject) => {
      i18next
        .use(languageDetector)
        .use(translationLoader)
        .use(initReactI18next)
        .init(
          {
            react: {
              useSuspense: false,
            },
            fallbackLng: config.fallback,
            ns: config.namespaces,
            defaultNS: config.defaultNamespace,
            interpolation: {
              escapeValue: false,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              format: (value: any, format?: string, lng?: string): string => {
                if (value instanceof Date) {
                  return formatDate(value, format, lng);
                }
                return value;
              },
            },
          },
          (error): void => {
            if (error) {
              reject(error);
            }
            resolve();
          },
        );
    });
  },
  /**
   * @param {string} key
   * @param {Object} options
   * @returns {string}
   */
  t: (key: string, options: { [key: string]: string }): string => i18next.t(key, options),
  /**
   * @returns {string}
   */
  get locale() {
    return i18next.language;
  },
  /**
   * @returns {'LTR' | 'RTL'}
   */
  get dir() {
    return i18next.dir().toUpperCase();
  },
  /**
   * @returns {boolean}
   */
  get isRTL() {
    return RNI18nManager.isRTL;
  },
  /**
   * Similar to React Native's Platform.select(),
   * i18n.select() takes a map with two keys, 'rtl'
   * and 'ltr'. It then returns the value referenced
   * by either of the keys, given the current
   * locale's direction.
   *
   * @param {Object<string,mixed>} map
   * @returns {mixed}
   */
  select(map: { [key in Direction]: Indexer }) {
    const key = this.isRTL ? 'rtl' : 'ltr';
    return map[key];
  },
  async changeLanguage(language: string) {
    await i18next.changeLanguage(language);
  },
};

export default i18n;
