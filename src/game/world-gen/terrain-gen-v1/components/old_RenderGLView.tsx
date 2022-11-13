import React from 'react';
import { View } from 'react-native';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import Canvas from 'react-native-canvas';
import { setCanvasMain, setCanvasRiver, setCanvasScreenshot } from './old_canvas-manager';

export default function RenderGLView() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <GLView style={{ width: 300, height: 300 }} onContextCreate={onContextCreate} />
      <Canvas ref={setCanvasMain}/>
      <Canvas ref={setCanvasRiver}/>
      <Canvas ref={setCanvasScreenshot}/>
    </View>
  );
}

function onContextCreate(gl: ExpoWebGLRenderingContext) {

  console.log('got here');
  //setGLView(gl);

  
}