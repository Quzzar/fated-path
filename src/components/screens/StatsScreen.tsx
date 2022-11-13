import React, { useContext } from 'react';
import { Text, View } from 'react-native';

import tw from 'twrnc';

import HealthIcon from '../icons/HealthIcon';

import { RelativeColor } from '../../contexts/theme-context';

export default function StatsScreen() {

  return (
    <View style={[tw`px-5`, { }]}>

      <Text
        style={{
          fontSize: 18,
          fontFamily: 'CrimsonText_400Regular',
          color: RelativeColor.getTextColor(),
        }}>
        Stats on this screen.
      </Text>

    </View>
  );

};