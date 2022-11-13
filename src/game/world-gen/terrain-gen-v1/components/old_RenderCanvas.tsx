import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import React from 'react';
import { View } from 'react-native';
import Canvas from 'react-native-canvas';

import {
  setCanvasMain,
  setCanvasRiver,
  setCanvasScreenshot,
} from './old_canvas-manager';

export default function RenderCanvas() {

  return (
    <View>
      <Canvas ref={setCanvasMain}/>
      <Canvas ref={setCanvasRiver}/>
      <Canvas ref={setCanvasScreenshot}/>
    </View>
  );

};
