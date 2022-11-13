import React from 'react';

import {
  MapLocationSolid,
} from '../../assets/icons/IconFactory';

import IconColors from '../../assets/icons/IconColors';

import Icon from '../Icon';

export default function LocationIcon(props: { size: number }) {
  return (
    <Icon iconPath={MapLocationSolid} svgWidth={576} color={IconColors.Location} size={props.size} />
  );
};