import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from "react-native-svg"

export default function Icon(props: { iconPath: string, size: number, color: string, svgWidth: number }) {
  return ( // @ts-ignore
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${props.svgWidth} 512`} style={{ width: props.size, height: props.size }}>
      <Path d={props.iconPath} fill={`${props.color}`} />
    </Svg>
  );
};