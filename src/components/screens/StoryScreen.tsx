import React, { useContext } from 'react';
import { View } from 'react-native';
import FadeInView from '../FadeInView';

import { RelativeColor } from '../../contexts/theme-context';

import tw from 'twrnc';

import { useAppSelector, useAppDispatch } from '../../hooks';
import {
  selectEventID,
  selectLocation,

  setEventID,
  setLocationID,
} from '../../slices/playerSlice';

//import { textEvent } from '../../game/events';
import OptionButton from '../OptionButton';
import ProcessText from '../ProcessText';
import { getEvent } from '../../game/events';

export default function StoryScreen() {

  const eventID = useAppSelector(selectEventID);
  const location = useAppSelector(selectLocation);

  const dispatch = useAppDispatch();

  let event = getEvent(eventID, location);

  let sceneList = [];

  let count = 1;
  for (let storyText of event.story) {

    sceneList.push(
      <FadeInView key={count} loadOrder={count} style={tw`py-2`}>
        <ProcessText text={storyText.text} />
      </FadeInView>
    );

    count++;
  }

  let optionsList = [];

  let optionCount = 1;
  for (let option of event.options) {

    optionsList.push(
      <OptionButton
        key={optionCount}
        onPress={() => {
          if(option.moveLocation){
            dispatch(setLocationID(option.moveLocation));
          }
          dispatch(setEventID(option.gotoEventID));
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