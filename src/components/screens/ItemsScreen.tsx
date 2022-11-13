import React, { useContext } from 'react';
import { Text, View, Button } from 'react-native';

import tw from 'twrnc';

import { RelativeColor } from '../../contexts/theme-context';
import { deleteWorld } from '../../game/world-gen/terrain-gen-v1/libraries/old_world-manager';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { deleteSavedWorld } from '../../saved-world';
import { setCoins, selectCoins } from '../../slices/playerSlice';

export default function ItemsScreen() {

  const coins = useAppSelector(selectCoins);
  const dispatch = useAppDispatch();

  return (
    <View style={[tw`px-5`, {  }]}>

      <Text
        style={{
          fontSize: 18,
          fontFamily: 'CrimsonText_400Regular',
          color: RelativeColor.getTextColor(),
        }}>
        Items go here.
      </Text>

      <Button
        title="Give Coin"
        onPress={() => { dispatch(setCoins(coins+1)) }}
      />

      <Button
        title="Delete World"
        onPress={() => { deleteSavedWorld() }}
      />

    </View>
  );

};