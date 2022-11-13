import React from 'react';

import {
  CoinsSolid,
} from '../../assets/icons/IconFactory';

import IconColors from '../../assets/icons/IconColors';

import Icon from '../Icon';

export default function CoinsIcon(props: { size: number }) {
  return (
    <Icon iconPath={CoinsSolid} svgWidth={512} color={IconColors.Coins} size={props.size} />
  );
};