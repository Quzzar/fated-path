import React, { useEffect, useRef } from 'react';
import * as SplashScreen from 'expo-splash-screen';

import {
  useFonts,
  CrimsonText_400Regular,
  CrimsonText_400Regular_Italic,
  CrimsonText_600SemiBold,
  CrimsonText_600SemiBold_Italic,
  CrimsonText_700Bold,
  CrimsonText_700Bold_Italic,
} from '@expo-google-fonts/crimson-text';
import {
  Merriweather_900Black,
} from '@expo-google-fonts/merriweather';

import AppDisplay from './src/AppDisplay';
import { useQuery } from '@tanstack/react-query';
import { loadFromPlayerStorage, saveToPlayerStorage } from './src/saved-player';
import { AppState, AppStateStatus } from 'react-native';
import { initSavedWorld } from './src/saved-world';
import { loadFromSettingStorage, saveToSettingStorage } from './src/saved-settings';

// Keep the splash screen visible while fetching resources
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
});

export default function App() {

  const appState = useRef(AppState.currentState);
  
  useEffect(() => {
    const subscription = AppState.addEventListener("change", _handleAppStateChange);
    return () => {
      subscription.remove();
    };
  }, []);
  const _handleAppStateChange = (nextAppState: AppStateStatus) => {
    if(nextAppState !== 'active'){
      saveToPlayerStorage();
      saveToSettingStorage();
    }
    appState.current = nextAppState;
  };

  // Load fonts
  let [fontsLoaded] = useFonts({
    CrimsonText_400Regular,
    CrimsonText_400Regular_Italic,
    CrimsonText_600SemiBold,
    CrimsonText_600SemiBold_Italic,
    CrimsonText_700Bold,
    CrimsonText_700Bold_Italic,
    Merriweather_900Black,
  });

  const {
    data,
    isLoading,
  } = useQuery(['app-init'], async () => {
    await loadFromSettingStorage();
    await loadFromPlayerStorage();
    await initSavedWorld();
    return '';
  });

  if (!isLoading && fontsLoaded) {
    SplashScreen.hideAsync();
  } else {
    return null;
  }

  return (
    <AppDisplay />
  );

}