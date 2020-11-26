import { Action } from 'redux';
import Language from './Language';
import Theme from './Theme';

export const CHANGE_THEME = 'CHANGE_THEME';
export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';
export const LOAD_SETTINGS_STATE = 'LOAD_SETTINGS_STATE';

export interface ISettings {
  currentTheme: Theme;
  currentLanguage: Language;
}

export type ISettingsState = ISettings;

export interface IChangeThemeAction extends Action<typeof CHANGE_THEME> {
  payload: Theme;
}

export interface IChangeLanguageAction extends Action<typeof CHANGE_LANGUAGE> {
  payload: Language;
}

export interface ILoadSettingsToStateAction extends Action<typeof LOAD_SETTINGS_STATE> {
  payload: ISettings;
}

export type SettingsActions =
  | IChangeThemeAction
  | IChangeLanguageAction
  | ILoadSettingsToStateAction;
