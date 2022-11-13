import React, { useContext, useEffect, useState } from 'react';

import { View, Image } from 'react-native';
import Svg, {
  Circle,
  Line,
  Path,
  Text,
} from 'react-native-svg';

import { doMap } from '../terrain-gen-v1/terrain';

import { useQuery } from '@tanstack/react-query';

import {
  loadWorld,
  setNewWorld,
  doesWorldExist,
  WorldState,
} from '../world-manager';

import {
  isLoading,
  LoadContext,
} from '../../../contexts/load-context';

type MapData = {
  svg: any,
  width: number,
  height: number,
  viewBox: string,
}

export default function RenderMap() {

  console.log('Starting..');

  const loadingDisplay = useContext(LoadContext);

  const [worldState, setWorldState] = useState<WorldState | null>(null);
  const [mapData, setMapData] = useState<MapData | null>(null);

  useQuery(['world-load'], async () => {

    let savedWorldState = await loadWorld();

    if (savedWorldState != null) {
      setWorldState(savedWorldState);
    } else {
      const newMapData = await doMap();
      setMapData(newMapData);
    }

    return '';
  });

  // Display loading visual if nothing will show
  useEffect(() => {
    if (!doesWorldExist() && !isLoading()) {
      loadingDisplay.showLoading(true);
    }
  }, []);

  if (worldState != null) {

    console.log('Rendering png map...');

    return (
      <Image
        onLoad={() => loadingDisplay.showLoading(false)}
        source={{
          uri: `data:image/png;base64,${worldState.pngBase64}`,
        }}
        style={{ height: 2000, width: 2000 }}
      />
    );

  }

  if (mapData != null) {

    console.log('Rendering svg map...');

    function saveBase64(ref: any) {
      ref?.toDataURL(async (newBase64: string) => {
        console.log('Saving svg as png, base64');
        let worldState = await setNewWorld(newBase64);
        if (worldState != null) {
          setWorldState(worldState);
        }
      });
    };

    return (
      <Svg
        ref={(ref) => { saveBase64(ref); }}
        viewBox={'0 0 2000 2000'}
      >
        {generateSvgContent(mapData.svg)}
      </Svg>
    );

  }

  return (
    <View />
  );

};



function generateSvgContent(svg: any[]) {

  let svgContent: JSX.Element[] = [];
  for (let i = 0; i < svg.length; i++) {
    let svgData = svg[i];

    if (svgData.type == 'path') {

      svgContent.push(
        <Path
          key={`svg-element-${i}`}
          d={svgData.data.d}
          fill={svgData.data.fill}
        />
      );

    } else if (svgData.type == 'line') {

      svgContent.push(
        <Line
          key={`svg-element-${i}`}
          x1={svgData.data.x1}
          y1={svgData.data.y1}
          x2={svgData.data.x2}
          y2={svgData.data.y2}
        />
      );

    } else if (svgData.type == 'circle') {

      svgContent.push(
        <Circle
          key={`svg-element-${i}`}
          cx={svgData.data.cx}
          cy={svgData.data.cy}
          r={svgData.data.r}
          fill='black'
        />
      );

    } else if (svgData.type == 'text') {

      svgContent.push(
        // @ts-ignore
        <Text
          key={`svg-element-${i}`}
          x={svgData.data.x}
          y={svgData.data.y}
          fontSize={svgData.data.fontSize}
          textAnchor={svgData.data.textAnchor}
          fill='white'
        >
          {svgData.data.text}
        </Text>
      );

    } else {

    }
  }

  return svgContent;

}