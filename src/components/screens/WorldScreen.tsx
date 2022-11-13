import React, { useContext } from 'react';
import { View } from 'react-native';
import RenderMap from '../../game/world-gen/components/RenderMap';

export default function WorldScreen() {

  return (

    <View style={{ flex: 1 }}>

      <RenderMap />

    </View>

  );

};