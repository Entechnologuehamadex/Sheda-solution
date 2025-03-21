import { Stack } from "expo-router";
import "../global.css"

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';

SplashScreen.preventAutoHideAsync();

function RootLayout() {
  const [loaded, error] = useFonts({
    'Inter-Black': require('../assets/fonts/Inter_24pt-Black.ttf'),
    'Inter-Bold': require('../assets/fonts/Inter_24pt-Bold.ttf'),
    'Inter-ExtraBold': require('../assets/fonts/Inter_24pt-ExtraBold.ttf'),
    'Inter-SemiBold': require('../assets/fonts/Inter_24pt-SemiBold.ttf'),
    'Inter-Light': require('../assets/fonts/Inter_24pt-Light.ttf'),
    'Inter-ExtraLight': require('../assets/fonts/Inter_24pt-ExtraLight.ttf'),
    'Inter-Medium': require('../assets/fonts/Inter_24pt-Medium.ttf'),
    'Inter-Regular': require('../assets/fonts/Inter_24pt-Regular.ttf'),
    'Inter-Thin': require('../assets/fonts/Inter_24pt-Thin.ttf'),
    'Sora-Bold': require('../assets/fonts/Sora-Bold.ttf'),
    'Sora-Medium': require('../assets/fonts/Sora-Medium.ttf'),
    'Manrope-Medium': require('../assets/fonts/Manrope-Medium.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return(
    <Stack>
      <Stack.Screen name="/" />
      <Stack.Screen name="/(auth)/login" />
      <Stack.Screen name="/(auth)/signup" />
    </Stack>

  )
}

export default RootLayout;