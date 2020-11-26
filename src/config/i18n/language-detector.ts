import { LanguageDetectorAsyncModule } from 'i18next';

import detectedLanguage from '../../utils/detected-language';

const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  detect: (callback: (locale: string) => void): void => {
    // We will get back a string like "en-US". We
    // return a string like "en" to match our language
    // files.
    callback(detectedLanguage);
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  cacheUserLanguage: () => {},
};
export default languageDetector;
