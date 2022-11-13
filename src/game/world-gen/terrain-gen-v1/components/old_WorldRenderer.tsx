
import React from 'react';

import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { Dimensions, View } from 'react-native';

import { useAppSelector, useAppDispatch } from '../../../hooks';
import {
  selectLocationID,
} from '../../../slices/playerSlice';
import WorldManager from '../../location-manager';

import RenderMap from './old_RenderMap';
import RenderCanvas from './old_RenderCanvas';
import RenderGLView from './old_RenderGLView';

export default function WorldRenderer() {

  const starting_coords = WorldManager.getLocation(useAppSelector(selectLocationID)).coords;
  const starting_scale = 1;


  const offset = useSharedValue({ x: starting_coords.x, y: starting_coords.y });
  const start = useSharedValue({ x: starting_coords.x, y: starting_coords.y });
  const scale = useSharedValue(starting_scale);
  const savedScale = useSharedValue(starting_scale);

  const imageWidth = 2000;
  const imageHeight = 2000;

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value.x },
        { translateY: offset.value.y },
        { scale: scale.value },
      ],
    };
  });

  const dragGesture = Gesture.Pan()
    .averageTouches(true)
    .onUpdate((e) => {

      let newOffsetX = e.translationX + start.value.x;
      let newOffsetY = e.translationY + start.value.y;

      const minX_offset = 173.7 * scale.value - 178.1;
      const maxX_offset = 822.4 * scale.value - 785.3;
      const minY_offset = 501.9 * scale.value - 494.1;
      const maxY_offset = 491.3 * scale.value - 332.9;

      const minX = minX_offset;
      const maxX = -1 * (imageWidth + maxX_offset - windowWidth);

      const minY = minY_offset;
      const maxY = -1 * (imageHeight + maxY_offset - windowHeight);

      if ((newOffsetX > minX && maxX > newOffsetX) || (newOffsetY > minY && maxY > newOffsetY)) {
        offset.value = {
          x: minX,
          y: minY,
        };
        return;
      }

      if (newOffsetX > minX) {
        offset.value = {
          x: minX,
          y: offset.value.y,
        };
      } else if (maxX > newOffsetX) {
        offset.value = {
          x: maxX,
          y: offset.value.y,
        };
      } else {
        offset.value = {
          x: newOffsetX,
          y: offset.value.y,
        };
      }

      if (newOffsetY > minY) {
        offset.value = {
          x: offset.value.x,
          y: minY,
        };
      } else if (maxY > newOffsetY) {
        offset.value = {
          x: offset.value.x,
          y: maxY,
        };
      } else {
        offset.value = {
          x: offset.value.x,
          y: newOffsetY,
        };
      }

    })
    .onEnd(() => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
    });

  const zoomGesture = Gesture.Pinch()
    .onUpdate((e) => {

      const minScale = 0.35;
      const maxScale = 10.0;

      let newScale = savedScale.value * e.scale;
      if(newScale <= maxScale && newScale >= minScale){
        scale.value = newScale;
      }

    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const composed = Gesture.Simultaneous(dragGesture, zoomGesture);

  return (
    <View>
      <GestureDetector gesture={composed}>
        <Animated.View style={[animatedStyles]}>
          {/* <RenderTiles /> or <RenderMap /> or <RenderImage /> */}
          <RenderMap />
        </Animated.View>
      </GestureDetector>
    </View>
  );

};
