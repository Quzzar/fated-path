import React from 'react';

import {
  HeartSolid,
} from '../../assets/icons/IconFactory';

import IconColors from '../../assets/icons/IconColors';

import Icon from '../Icon';

export default function HealthIcon(props: { size: number }) {
  return (
    <Icon iconPath={HeartSolid} svgWidth={512} color={IconColors.Health} size={props.size} />
  );
};