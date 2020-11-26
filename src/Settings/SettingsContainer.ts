import { connect } from 'react-redux';
import { withTheme } from 'react-native-paper';
import { withTranslation } from 'react-i18next';

import { changeTheme, changeLanguage } from './actions';
import { ISettingsState } from './types';

import Settings from './Settings';

const mapStateToProps = (state: { settings: ISettingsState }) => {
  const { settings } = state;
  return { currentTheme: settings.currentTheme, currentLanguage: settings.currentLanguage };
};

const mapDispatchToProps = {
  changeTheme,
  changeLanguage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation('Settings')(withTheme(Settings)));
