import React, { createContext, useContext } from 'react';
import { Text, View } from 'react-native';
import Svg, { Path } from "react-native-svg"

import Icon from './Icon';

import { RelativeColor } from '../contexts/theme-context';

export default function LabeledIcon(props: { iconPath: string, svgWidth: number, text: string, size: number }) {

  return (
    <View style={{ padding: 25, }}>
      <Icon iconPath={props.iconPath} svgWidth={props.svgWidth} size={props.size} color={RelativeColor.getTextColor()} />
      <Text style={{
        textAlign: 'center',
        fontSize: 8,
        fontFamily: 'Merriweather_900Black',
        color: RelativeColor.getTextColor(),
      }}>{props.text}</Text>
    </View>
  );
};