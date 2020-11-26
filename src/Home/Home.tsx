import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { WithTranslation } from 'react-i18next';

import { RootStackParamList } from '../Main';

type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;

interface HomeProps {
  theme: ReactNativePaper.Theme;
  navigation: SettingsScreenNavigationProp;
}
type Props = HomeProps & WithTranslation;

export default function Home({ theme, navigation, t }: Props): JSX.Element {
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      flex: 1,
      justifyContent: 'center',
    },
    text: {
      margin: 10,
    },
  });

  const handleOnPress = useCallback(() => navigation.navigate('Settings'), [navigation]);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>{t('title')}</Text>
        <Button icon="cogs" onPress={handleOnPress} mode="outlined">
          <Text>{t('settings')}</Text>
        </Button>
      </View>
    </>
  );
}
