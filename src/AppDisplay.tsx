import React, { useContext, useState } from 'react';
import { SafeAreaView, View, StatusBar, Image, ImageBackground } from 'react-native';

import tw from 'twrnc';
// https://github.com/jaredh159/tailwind-react-native-classnames#api
// https://nerdcave.com/tailwind-cheat-sheet

import ScreenDisplay from './components/screens/ScreenDisplay';

import TabBar from './components/TabBar';
import HeaderBar from './components/HeaderBar';

import { RelativeColor } from './contexts/theme-context';
import { getSettings } from './saved-settings';

export default function AppDisplay() {

  const [screenIndex, setScreenIndex] = useState(getSettings().tabIndex);
  function screenHandler(index: number) {
    setScreenIndex(index);
  }

  const backgroundColor = RelativeColor.getBackgroundColor();
  const backgroundBarColor = RelativeColor.getBackgroundBarColor();

  return (
    <View style={tw`flex-1`}>

      <SafeAreaView style={[tw`flex-1 flex-col`, {
        backgroundColor: backgroundColor,
      }]}>
        <StatusBar />
        <View style={[tw`flex-1`, {
          backgroundColor: backgroundBarColor,
        }]}>
          <HeaderBar />
        </View>
        <View style={tw`flex-10 overflow-hidden`}>
          {/*<LoadContext.Provider value={{ updateLoading: setLoading }}>*/}
            <ScreenDisplay index={screenIndex} />
          {/*</LoadContext.Provider>*/}
        </View>
        <View style={[tw`flex-1`, {
          backgroundColor: backgroundBarColor,
        }]}>
          <TabBar screenHandler={screenHandler} />
        </View>
      </SafeAreaView>

    </View>
  );

}
