import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { DefaultTheme } from 'react-native-paper';

import assets from '../../assets';

interface SplashScreenProps {
  onAnimationFinish: () => void;
}

export default function SplashScreen({ onAnimationFinish }: SplashScreenProps): JSX.Element {
  return (
    <>
      <View style={styles.animationContainer}>
        <LottieView
          autoPlay
          loop={false}
          source={assets.animations.app}
          onAnimationFinish={onAnimationFinish}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    alignItems: 'center',
    backgroundColor: DefaultTheme.colors.background,
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    paddingTop: 20,
  },
});
