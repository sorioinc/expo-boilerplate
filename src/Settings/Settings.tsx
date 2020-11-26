import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Switch, Subheading } from 'react-native-paper';
import { Picker } from '@react-native-community/picker';
import { WithTranslation } from 'react-i18next';

import Theme from './Theme';
import Language, { languages } from './Language';

interface SettingsProps {
  currentTheme: Theme;
  currentLanguage: Language;
  changeTheme: (theme: Theme) => void;
  changeLanguage: (language: Language) => void;
}

type Props = SettingsProps & { theme: ReactNativePaper.Theme } & WithTranslation;

export default function Settings({
  currentTheme,
  changeTheme,
  theme,
  currentLanguage,
  changeLanguage,
  t,
  i18n,
}: Props): JSX.Element {
  const isDarkModeOn = currentTheme === Theme.Dark;
  const { colors } = theme;

  const handleDarkModeChange = (isDarkMode: boolean) =>
    changeTheme(isDarkMode ? Theme.Dark : Theme.Default);

  const handleLanguageChange = (selectedValue: string | number) => {
    changeLanguage(selectedValue as Language);
    i18n.changeLanguage(selectedValue as Language);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.row}>
        <Subheading>
          <Text>{t('darkMode')}</Text>
        </Subheading>
        <Switch value={isDarkModeOn} onValueChange={handleDarkModeChange} />
      </View>
      <View style={styles.row}>
        <Subheading>
          <Text>{t('language')}</Text>
        </Subheading>
        <Picker
          selectedValue={currentLanguage}
          style={styles.picker}
          onValueChange={handleLanguageChange}
        >
          {languages.map(lang => (
            <Picker.Item
              color={colors.text}
              label={lang.label}
              value={lang.language}
              key={lang.language}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    elevation: 2,
    flex: 1,
    padding: 16,
  },
  picker: { height: 50, width: 100 },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    width: '100%',
  },
});
