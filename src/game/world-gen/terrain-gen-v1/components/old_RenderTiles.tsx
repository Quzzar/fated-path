import React from 'react';

import Svg, {
  Circle,
  Ellipse,
  G,
  Text,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';

import {
  generateTree,
  randomTreeColor,
} from '../tree-generator';

import {
  groundColor, waterColor,
} from '../ground-generator';

export default class RenderTiles extends React.Component {

  render() {

    const map: string[][] = [
      ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O',],
      ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O',],
      ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O',],
      ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O',],
      ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O',],
      ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O',],
      ['O', 'O', 'O', 'O', 'O', 'O', 'X', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O',],
      ['O', 'O', 'O', 'O', 'O', 'X', 'X', 'O', 'X', 'O', 'O', 'O', 'O', 'O', 'O', 'O',],
      ['O', 'O', 'O', 'O', 'X', 'X', 'X', 'X', 'X', 'O', 'O', 'O', 'O', 'O', 'O', 'O',],
      ['O', 'O', 'O', 'O', 'X', 'X', 'X', 'O', 'X', 'O', 'O', 'O', 'O', 'O', 'O', 'O',],
      ['O', 'O', 'O', 'O', 'O', 'X', 'X', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O',],
      ['O', 'O', 'O', 'O', 'O', 'O', 'X', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O',],
      ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O',],
      ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'X', 'O', 'O', 'O', 'O', 'O',],
      ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'X', 'X', 'O', 'O', 'O', 'O',],
      ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'X', 'O', 'X', 'O', 'O', 'O',],
      ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O',],
      ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O',],
      ['O', 'O', 'X', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O',],
      ['O', 'O', 'X', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O',],
      ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O',],
    ];
  
    const tileSize = 10;

    const mapHeight = map.length;
    const mapWidth = map[0].length;

    return (
      <Svg height="100%" width="100%" viewBox={`0 0 ${tileSize * mapWidth} ${tileSize * mapHeight}`}>
        {buildTileArray(map, tileSize)}
      </Svg>
    );
  }
}


function buildTileArray(map: string[][], tileSize: number) {
  let tileArray = [];

  for (let rowI = 0; rowI < map.length; rowI++) {
    for (let colI = 0; colI < map[rowI].length; colI++) {

      let type = map[rowI][colI];

      //console.log(`${colI}, ${rowI}`);

      let color = '';
      if (type == 'X') {
        color = groundColor('FOREST');
      } else if (type == 'O') {
        color = waterColor('FOREST');
      }

      tileArray.push(
        <Rect
          key={`tile-${colI}-${rowI}`}
          x={tileSize * colI}
          y={tileSize * rowI}
          width={tileSize}
          height={tileSize}
          stroke="black"
          strokeWidth="0"
          fill={color}
        />
      );

      tileArray.push(
        <Path
            key={`tree-${colI}-${rowI}`}
            d={generateTree({ x: tileSize * colI, y: tileSize * rowI }, 1)}
            fill={randomTreeColor('FOREST')}
            stroke='black'
            strokeWidth='0.5'
            strokeLinecap="round"
            strokeLinejoin="round"
          />
      );

    }
  }

  return tileArray;

}
