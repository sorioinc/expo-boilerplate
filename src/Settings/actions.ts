import { ActionCreator } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import {
  CHANGE_THEME,
  CHANGE_LANGUAGE,
  LOAD_SETTINGS_STATE,
  IChangeThemeAction,
  IChangeLanguageAction,
  ILoadSettingsToStateAction,
  ISettingsState,
} from './types';
import Theme from './Theme';
import Language from './Language';
import { Settings } from '../models';
import { detectedLanguage } from '../utils';
import { GenericRepository } from '../repository';
import { i18n } from '../config';

export const changeTheme: ActionCreator<
  ThunkAction<Promise<IChangeThemeAction>, ISettingsState, unknown, IChangeThemeAction>
> = (theme: Theme) => {
  return async (dispatch: ThunkDispatch<ISettingsState, unknown, IChangeThemeAction>) => {
    try {
      const repository = new GenericRepository(Settings);
      const settings = await repository.get(0);
      if (settings) {
        settings.darkMode = theme === Theme.Dark;
        await repository.update(settings, settings.id);
      }
    } catch (error) {
      // TODO Add Sentry
    }
    const action: IChangeThemeAction = {
      type: CHANGE_THEME,
      payload: theme,
    };
    return dispatch(action);
  };
};

export const changeLanguage: ActionCreator<
  ThunkAction<Promise<IChangeLanguageAction>, ISettingsState, unknown, IChangeLanguageAction>
> = (language: Language) => {
  return async (dispatch: ThunkDispatch<ISettingsState, unknown, IChangeLanguageAction>) => {
    try {
      const repository = new GenericRepository(Settings);
      const settings = await repository.get(0);
      if (settings) {
        settings.language = language;
        await repository.update(settings, settings.id);
      } else {
        const newSetting = new Settings(0, detectedLanguage as Language, false);
        await repository.create(newSetting);
      }
    } catch (error) {
      // TODO Add Sentry
    }

    const action: IChangeLanguageAction = {
      type: CHANGE_LANGUAGE,
      payload: language,
    };
    return dispatch(action);
  };
};

export const loadSettingsToState: ActionCreator<
  ThunkAction<
    Promise<ILoadSettingsToStateAction | undefined>,
    ISettingsState,
    unknown,
    ILoadSettingsToStateAction
  >
> = () => {
  return async (dispatch: ThunkDispatch<ISettingsState, unknown, ILoadSettingsToStateAction>) => {
    try {
      const repository = new GenericRepository(Settings);

      let settings: Settings | undefined = await repository.get(0);
      if (!settings) {
        const newSetting = new Settings(0, detectedLanguage as Language, false);
        settings = (await repository.create(newSetting)) || newSetting;
      }

      const { darkMode, language } = settings;
      const action: ILoadSettingsToStateAction = {
        type: LOAD_SETTINGS_STATE,
        payload: {
          currentTheme: darkMode ? Theme.Dark : Theme.Default,
          currentLanguage: language,
        },
      };
      i18n.changeLanguage(language);
      return dispatch(action);
    } catch (error) {
      // TODO: Add Sentry
    }
    return undefined;
  };
};
