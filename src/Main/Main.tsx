import 'reflect-metadata';
import 'react-native-gesture-handler';

import React, { useCallback, useEffect, useState } from 'react';
import { I18nManager as RNI18nManager } from 'react-native';
import * as Updates from 'expo-updates';
import { Provider as ReduxProvider, connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
  withTheme,
} from 'react-native-paper';
import { createConnection, getConnection } from 'typeorm/browser';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { createStackNavigator } from '@react-navigation/stack';
import { withTranslation } from 'react-i18next';

import store, { RootState, changeNetworkStatus, INetworkStatus } from '../store';
import { i18n, dbConfig } from '../config';

import { RootStackParamList } from './types';
import { Theme, loadSettingsToState, Settings } from '../Settings';
import { Home, SplashScreen } from '../Home';
import { ILoadSettingsToStateAction, ISettingsState } from '../Settings/types';

const Stack = createStackNavigator<RootStackParamList>();

const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
  },
};
const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
  },
};

const onLoad = async (): Promise<void> => {
  const dispatch = store.dispatch as ThunkDispatch<
    ISettingsState,
    unknown,
    ILoadSettingsToStateAction
  >;

  await createConnection(dbConfig);

  await Promise.all([
    i18n
      .init()
      .then(async () => {
        const RNDir = RNI18nManager.isRTL ? 'RTL' : 'LTR';
        // RN doesn't always correctly identify native
        // locale direction, so we force it here.
        if (i18n.dir !== RNDir) {
          const isLocaleRTL = i18n.dir === 'RTL';
          RNI18nManager.forceRTL(isLocaleRTL);
          // RN won't set the layout direction if we
          // don't restart the app's JavaScript.
          await Updates.reloadAsync();
        }
      })
      // TODO: Add this to sentry
      .catch(error => console.warn(error)),
    dispatch(loadSettingsToState()),
  ]);
};

interface MainProps {
  currentTheme: Theme;
  changeNetworkStatusAction: (networkStatus: INetworkStatus) => void;
}

const HomeWithProps = withTranslation('Home')(withTheme(Home));

// eslint-disable-next-line react-redux/connect-prefer-named-arguments
const BootstrapContainer = connect(
  (state: RootState) => {
    const { settings } = state;
    return { currentTheme: settings.currentTheme };
  },
  {
    changeNetworkStatusAction: changeNetworkStatus,
  },
)(function Bootstrap({ currentTheme, changeNetworkStatusAction }: MainProps): JSX.Element {
  const [hasDataLoaded, setHasDataLoaded] = useState(false);
  const [hasSplashAnimationFinished, setHasSplashAnimationFinished] = useState(false);
  const onAnimationFinish = useCallback(() => setHasSplashAnimationFinished(true), []);

  useEffect(() => {
    onLoad().then(() => setHasDataLoaded(true));
    return () => {
      getConnection().close();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) =>
      changeNetworkStatusAction({ type: state.type, isConnected: state.isConnected }),
    );
    return () => unsubscribe();
  }, [changeNetworkStatusAction]);

  if (!hasDataLoaded || !hasSplashAnimationFinished) {
    return <SplashScreen onAnimationFinish={onAnimationFinish} />;
  }

  const theme = currentTheme === Theme.Dark ? CombinedDarkTheme : CombinedDefaultTheme;
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeWithProps} />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
});

export default function Main(): JSX.Element {
  return (
    <ReduxProvider store={store}>
      <BootstrapContainer />
    </ReduxProvider>
  );
}
