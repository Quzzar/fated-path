import React, { useContext } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { Colors, RelativeColor } from '../contexts/theme-context';

export default function OptionButton(props: { onPress: () => void, children: any, style?: {} }) {

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        ...props.style,
        borderWidth: 1,
        borderColor: RelativeColor.getBorderColor(),
        borderRadius: 7,
        marginLeft: 5,
        marginRight: 5,
        padding: 5,
      }}
    >
      {props.children}
    </TouchableOpacity>
  );

};