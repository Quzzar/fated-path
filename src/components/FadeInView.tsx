import React, { useRef, useEffect, useContext } from 'react';
import { Animated } from 'react-native';

import { useAppSelector, useAppDispatch } from '../hooks';
import { setLoadIndex, selectLoadIndex } from '../slices/storyDisplaySlice';

const FADE_DURATION = 500;

export default function FadeInView(props: { loadOrder: number, children: any, style?: {} }) {
  let fadeAnim = useRef(new Animated.Value(0)).current;  // Initial value for opacity: 0

  const loadIndex = useAppSelector(selectLoadIndex);
  const dispatch = useAppDispatch();

  let dontFade = false;
  if(loadIndex >= props.loadOrder){
    dontFade = true;
  }

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        useNativeDriver: true,
        toValue: 1,
        duration: (props.loadOrder === 0) ? 0 : FADE_DURATION,
        delay: FADE_DURATION*(props.loadOrder-1),
      }
    ).start(() => {finishAnimation()} );
  }, [fadeAnim]);

  function finishAnimation(){
    if(props.loadOrder > loadIndex){
      dispatch(setLoadIndex(props.loadOrder));
    }
  }

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: (dontFade) ? 1 : fadeAnim, // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
}