import { BackendModule, ResourceKey } from 'i18next';
import { supportedLocales } from './i18n';

const translationLoader: BackendModule = {
  type: 'backend',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init: (): void => {},
  read(
    language: string,
    namespace: string,
    callback: (error: Error, resource: ResourceKey) => void,
  ): void {
    let resource = {};
    let error = null;
    try {
      resource = supportedLocales[language].translationFileLoader()[namespace];
    } catch (_error) {
      error = _error;
    }
    callback(error, resource);
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  create: () => {},
};
export default translationLoader;
