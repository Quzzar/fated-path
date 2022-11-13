import React, { useContext } from 'react';
import { View } from 'react-native';
import FadeInView from '../FadeInView';

import { RelativeColor } from '../../contexts/theme-context';

import tw from 'twrnc';

import { textEvent } from '../../game/events';
import OptionButton from '../OptionButton';
import ProcessText from '../ProcessText';

export default function StoryScreen() {

  let sceneList = [];

  let count = 1;
  for (let storyText of textEvent.story) {

    sceneList.push(
      <FadeInView key={count} loadOrder={count} style={tw`py-2`}>
        <ProcessText text={storyText.text} />
      </FadeInView>
    );

    count++;
  }

  let optionsList = [];

  let optionCount = 1;
  for (let option of textEvent.options) {

    optionsList.push(
      <OptionButton
        key={optionCount}
        onPress={() => {
          console.log("Going here " + option.gotoEventID);
        }}
        style={tw`flex-1 flex-col justify-center`}
      >
        <ProcessText text={option.text} style={{ textAlign: 'center' }} />
      </OptionButton>
    );

    optionCount++;
  }
  sceneList.push(
    <FadeInView key={count} loadOrder={count}
      style={tw`flex-row px-4 pt-4 pb-2`}>
      {optionsList}
    </FadeInView>
  );

  return (
    <View style={[tw`px-5`, {  }]}>
      {sceneList}
    </View>
  );

};