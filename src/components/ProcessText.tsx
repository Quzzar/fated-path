import React, { useContext } from 'react';
import { Text } from 'react-native';

import HealthIcon from './icons/HealthIcon';
import CoinsIcon from './icons/CoinsIcon';
import LocationIcon from './icons/LocationIcon';

import { RelativeColor } from '../contexts/theme-context';

const iconRegex = /({health}|{coins}|{location})/gmi;
const italicRegex = /(__.+__)/g;
const boldRegex = /(\*\*.+\*\*)/g;

export default function ProcessText(props: { text: string, style?: {} }) {

  const fontSize = 18;
  const iconSize = 14;

  let procList = [];
  let count = 1;
  for (let part of props.text.split(iconRegex)) {
    switch (part.toLowerCase()) {
      case '{health}': procList.push(<HealthIcon key={count} size={iconSize} />); break;
      case '{coins}': procList.push(<CoinsIcon key={count} size={iconSize} />); break;
      case '{location}': procList.push(<LocationIcon key={count} size={iconSize} />); break;
      default:

        if (italicRegex.test(part)) {
          let italicSubParts = part.split(italicRegex);
          for (let italicSubPart of italicSubParts) {
            if (italicRegex.test(italicSubPart)) {
              procList.push(<Text key={count} style={{
                fontFamily: 'CrimsonText_400Regular_Italic',
              }} >{italicSubPart.replace(/__/g, '')}</Text>);
            } else {
              procList.push(italicSubPart);
            }
            count++
          }
        } else if(boldRegex.test(part)) {
          let boldSubParts = part.split(boldRegex);
          for (let boldSubPart of boldSubParts) {
            if (boldRegex.test(boldSubPart)) {
              procList.push(<Text key={count} style={{
                fontFamily: 'CrimsonText_700Bold',
              }} >{boldSubPart.replace(/\*\*/g, '')}</Text>);
            } else {
              procList.push(boldSubPart);
            }
            count++
          }
        } else {
          procList.push(part);
        }

        break;
    }
    count++;
  }

  return (
    <Text
      style={{
        ...props.style,
        fontSize: fontSize,
        fontFamily: 'CrimsonText_400Regular',
        color: RelativeColor.getTextColor(),
        justifyContent: 'center',
      }}>
      {procList}
    </Text>
  );

};