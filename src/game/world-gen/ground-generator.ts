
import { Biome } from '../location-manager';

const GROUND_COLORS = {
  'FOREST': '#91C192',
};
export function groundColor(biome: Biome){
  return GROUND_COLORS.FOREST; //GROUND_COLORS[biome];
}



const WATER_COLORS = {
  'FOREST': '#9DD8EA',
};
export function waterColor(biome: Biome){
  return WATER_COLORS.FOREST; //WATER_COLORS[biome];
}