import React from 'react';
import { View } from 'react-native';

import WorldScreen from './WorldScreen';
import StoryScreen from './StoryScreen';
import ItemsScreen from './ItemsScreen';
import StatsScreen from './StatsScreen';

export default function ScreenDisplay(props: { index: number }) {

  switch (props.index) {
    case 0: return <WorldScreen />;
    case 1: return <StoryScreen />;
    case 2: return <ItemsScreen />;
    case 3: return <StatsScreen />;
    default: return <View />;
  }

};