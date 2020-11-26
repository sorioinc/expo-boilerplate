import { Reducer } from 'redux';
import Language from './Language';
import Theme from './Theme';
import {
  ISettingsState,
  SettingsActions,
  CHANGE_THEME,
  CHANGE_LANGUAGE,
  LOAD_SETTINGS_STATE,
} from './types';

const INITIAL_STATE: ISettingsState = {
  currentTheme: Theme.Default,
  currentLanguage: Language.es,
};

const settingsReducer: Reducer<ISettingsState, SettingsActions> = (
  state = INITIAL_STATE,
  action: SettingsActions,
): ISettingsState => {
  switch (action.type) {
    case CHANGE_THEME:
      return { ...state, currentTheme: action.payload };
    case CHANGE_LANGUAGE:
      return { ...state, currentLanguage: action.payload };
    case LOAD_SETTINGS_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default settingsReducer;
