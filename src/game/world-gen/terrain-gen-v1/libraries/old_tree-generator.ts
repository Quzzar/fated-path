
import { Biome } from '../../../location-manager';
import {
  getRandomRange,
  getRandomElement,
} from '../../math-utils';

const TREE_COLORS = {
  'TAIGA': [],
  'OTHER': ['#689F66','#6AA168','#8DAB79','#8DAE79','#669C68','#92B386','#578F5E','#6FA66F','#639562'],
};
export function randomTreeColor(biome: Biome){
  if(biome === 'TAIGA'){
    return getRandomElement(TREE_COLORS.TAIGA);
  } else {
    return getRandomElement(TREE_COLORS.OTHER);
  }
}

export function generateTree(offset: { x: number, y: number }, scale: number){



  return hexTree(offset, scale);


}


function hexTree(offset: { x: number, y: number }, scale: number){

  let path = '';
  path += genCurve(offset, scale, {
    c_1: { x: 0.6667, y: -0.3333 },
    c_2: { x: 1.3333, y: -0.6667 },
    rel_end: { x: 2, y: -1 },
  });
  path += genCurve(offset, scale, {
    c_1: { x: 2.6667, y: -0.6667 },
    c_2: { x: 3.3333, y: -0.3333 },
    rel_end: { x: 4, y: 0 },
  });
  path += genCurve(offset, scale, {
    c_1: { x: 4, y: 0.6667 },
    c_2: { x: 4, y: 1.3333 },
    rel_end: { x: 4, y: 2 },
  });
  path += genCurve(offset, scale, {
    c_1: { x: 3.3333, y: 2.3333 },
    c_2: { x: 2.6667, y: 2.6667 },
    rel_end: { x: 2, y: 3 },
  });

  if(getRandomRange(0, 100) <= STUMP_CHANCE){
    path += ` L ${offset.x+2} ${offset.y+4} L ${offset.x+2} ${offset.y+3} `;
  }

  path += genCurve(offset, scale, {
    c_1: { x: 1.3333, y: 2.6667 },
    c_2: { x: 0.6667, y: 2.3333 },
    rel_end: { x: 0, y: 2 },
  });
  path += genCurve(offset, scale, {
    c_1: { x: 0, y: 1.3333 },
    c_2: { x: 0, y: 0.6667 },
    rel_end: { x: 0, y: 0 },
  });

  return `M ${offset.x} ${offset.y} ${path}`

}

interface CurveData {
  c_1: { x: number, y: number },
  c_2: { x: number, y: number },
  rel_end: { x: number, y: number },
}
const CURVE_MIN = 0.6;
const CURVE_MAX = 1.8;
const STUMP_CHANCE = 20;//%

function genCurve(offset: { x: number, y: number }, scale: number, data: CurveData){
  return ` C ${offset.x+data.c_1.x*getRandomRange(CURVE_MIN, CURVE_MAX)} ${offset.y+data.c_1.y*getRandomRange(CURVE_MIN, CURVE_MAX)} ${offset.x+data.c_2.x*getRandomRange(CURVE_MIN, CURVE_MAX)} ${offset.y+data.c_2.y*getRandomRange(CURVE_MIN, CURVE_MAX)} ${offset.x+data.rel_end.x} ${offset.y+data.rel_end.y} `;
}
