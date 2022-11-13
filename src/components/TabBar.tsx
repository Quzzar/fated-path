import React, { useState } from 'react';
import { View, Pressable } from 'react-native';

import {
  WorldLight,
  WorldSolid,
  StoryLight,
  StorySolid,
  ItemsLight,
  ItemsSolid,
  StatsLight,
  StatsSolid,
} from '../assets/icons/IconFactory';

import LabeledIcon from './LabeledIcon';

import { isLoading } from '../contexts/load-context';
import { getSettings } from '../saved-settings';

type ScreenHandler = (index: number) => void;

export default function TabBar(props: { screenHandler: ScreenHandler }) {

  const [getTabIndex, setTabIndex] = useState(getSettings().tabIndex);

  function updateScreen(index: number){
    if(isLoading()) { return; }
    getSettings().tabIndex = index;
    setTabIndex(index);
    props.screenHandler(index);
  }

  return (
    <View style={{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    }}>
      <Pressable
        onPress={() => updateScreen(0)}>
        <LabeledIcon iconPath={(getTabIndex === 0) ? WorldSolid : WorldLight} svgWidth={512} text='World' size={28} />
      </Pressable>
      <Pressable
        onPress={() => updateScreen(1)}>
        <LabeledIcon iconPath={(getTabIndex === 1) ? StorySolid : StoryLight} svgWidth={576} text='Story' size={28} />
      </Pressable>
      <Pressable
        onPress={() => updateScreen(2)}>
        <LabeledIcon iconPath={(getTabIndex === 2) ? ItemsSolid : ItemsLight} svgWidth={448} text='Items' size={28} />
      </Pressable>
      <Pressable
        onPress={() => updateScreen(3)}>
        <LabeledIcon iconPath={(getTabIndex === 3) ? StatsSolid : StatsLight} svgWidth={576} text='Stats' size={28} />
      </Pressable>
    </View>
  );

};
