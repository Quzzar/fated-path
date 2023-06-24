import React, { useState, useContext } from 'react';
import { View, Text, Pressable } from 'react-native';

import {
  BarsSolid,
} from '../assets/icons/IconFactory';

import HealthIcon from './icons/HealthIcon';
import CoinsIcon from './icons/CoinsIcon';
import LocationIcon from './icons/LocationIcon';

import Icon from './Icon';

import { ThemeContext, RelativeColor } from '../contexts/theme-context';

import { useAppSelector, useAppDispatch } from '../hooks';
import {
  selectCurrentHealth,
  selectMaxHealth,
  selectTempHealth,
  selectCoins,
  selectLocation,
} from '../slices/playerSlice';

import { getLocation } from '../game/location-manager';
import { isLoading } from '../contexts/load-context';

export default function HeaderBar() {

  const currentHealth = useAppSelector(selectCurrentHealth);
  const maxHealth = useAppSelector(selectMaxHealth);
  const tempHealth = useAppSelector(selectTempHealth);
  const coins = useAppSelector(selectCoins);
  const location = useAppSelector(selectLocation);

  const theme = useContext(ThemeContext);

  function openMenu() {
    if(isLoading()) { return; }
    if(theme.type === 'dark'){
      theme.setType('light');
    } else {
      theme.setType('dark');
    }
  }

  return (
    <View style={{
      flex: 1,
      flexDirection: 'row',
    }}>
      <View style={{
        flex: 1,
        paddingLeft: 15,
        paddingTop: 15,
      }}>
        <Pressable
          onPress={() => openMenu()}>
          <Icon iconPath={BarsSolid} svgWidth={448} color={RelativeColor.getTextColor()} size={25} />
        </Pressable>
      </View>
      <View style={{
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <HealthIcon size={20} />
        <Text style={{
          fontSize: 17,
          fontFamily: 'CrimsonText_600SemiBold',
          paddingLeft: 1,
          paddingBottom: 1,
          color: RelativeColor.getTextColor(),
        }}> {currentHealth}/{maxHealth} {(tempHealth > 0) ? `(${tempHealth})` : ``} </Text>
      </View>
      <View style={{
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <CoinsIcon size={20} />
        <Text style={{
          fontSize: 17,
          fontFamily: 'CrimsonText_600SemiBold',
          paddingLeft: 3,
          paddingBottom: 1,
          color: RelativeColor.getTextColor(),
        }}> {coins} </Text>
      </View>
      <View style={{
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <LocationIcon size={20} />
        <Text style={{
          fontSize: 16,
          fontFamily: 'CrimsonText_600SemiBold',
          paddingLeft: 3,
          paddingBottom: 1,
          color: RelativeColor.getTextColor(),
        }}> {getLocation(location.current).location.name} </Text>
      </View>
    </View>
  );

};