import _ from "lodash";
import { getSavedWorld, WorldData } from "../saved-world";

export type Biome = 'PLAINS' | 'FOREST' | 'SWAMP' | 'TAIGA' | 'MOUNTAINS' | 'UNKNOWN';
export type LocationType = 'Road' | 'City' | 'Town' | 'Dungeon';

export function getLocation(id: number) {

  let worldData = getSavedWorld();
  if (worldData) {
    let roadInfo = getRoadInfo(worldData, id);
    if (roadInfo) {
      return roadInfo;
    }
  }

  return {
    location: {
      t_i: id,
      name: 'Unknown',
      type: 'Town' as LocationType,
    },
    paths: [],
  };

}

type Attraction = {
  t_i: number,
  name: string,
  distance: number,
  direction: Direction,
};
function getRoadInfo(worldData: WorldData, t_index: number) {

  let connected = worldData.mapData.roads[t_index];
  if (!connected) { return null; }

  function findNearestAttractions(nt_i: number, destinations: { [index: string]: number | undefined; }) {

    let nearestCity = { t_i: -1, name: 'Untitled', distance: Number.MAX_VALUE, direction: 'UNKNOWN' as Direction };
    let nearestTown = { t_i: -1, name: 'Untitled', distance: Number.MAX_VALUE, direction: 'UNKNOWN' as Direction };
    let nearestDungeon = { t_i: -1, name: 'Untitled', distance: Number.MAX_VALUE, direction: 'UNKNOWN' as Direction };

    for (let str_dt_i in destinations) {
      const distance = destinations[str_dt_i];
      const dt_i = parseInt(str_dt_i);
      //if (nt_i === dt_i) { continue; }
      if (!distance) { continue; }

      let name = worldData.mapData.locations[dt_i]?.name;
      if (!name) { name = 'Unknown'; }
      if (worldData.mapData.cities.includes(dt_i)) {
        if (nearestCity.distance > distance) {
          nearestCity = {
            t_i: dt_i,
            name: name,
            distance: distance,
            direction: getDirection(worldData.mapData.locations[t_index], worldData.mapData.locations[dt_i]),
          };
        }
      } else if (worldData.mapData.towns.includes(dt_i)) {
        if (nearestTown.distance > distance) {
          nearestTown = {
            t_i: dt_i,
            name: name,
            distance: distance,
            direction: getDirection(worldData.mapData.locations[t_index], worldData.mapData.locations[dt_i]),
          };
        }
      } else if (worldData.mapData.dungeons.includes(dt_i)) {
        if (nearestDungeon.distance > distance) {
          nearestDungeon = {
            t_i: dt_i,
            name: name,
            distance: distance,
            direction: getDirection(worldData.mapData.locations[t_index], worldData.mapData.locations[dt_i]),
          };
        }
      }

    }

    return {
      city: (nearestCity.t_i === -1) ? null : nearestCity,
      town: (nearestTown.t_i === -1) ? null : nearestTown,
      dungeon: (nearestDungeon.t_i === -1) ? null : nearestDungeon,
    };

  }

  let output: {
    nt_i: number,
    direction: Direction,
    attractions: {
      city: Attraction | null,
      town: Attraction | null,
      dungeon: Attraction | null,
    },
    best_attraction: Attraction | null,
  }[] = [];

  for (const str_nt_i in connected) {
    const destinations = connected[str_nt_i];
    const nt_i = parseInt(str_nt_i);
    if (!destinations) { continue; }

    let attractions = findNearestAttractions(nt_i, destinations);
    let bestAttraction = findMostNoteworthyAttraction(attractions);

    output.push({
      nt_i: nt_i,
      direction: getDirection(worldData.mapData.locations[t_index], worldData.mapData.locations[nt_i]),
      attractions: attractions,
      best_attraction: bestAttraction,
    });
  }

  let type: LocationType = 'Road';
  if (worldData.mapData.cities.includes(t_index)) {
    type = 'City';
  } else if (worldData.mapData.towns.includes(t_index)) {
    type = 'Town';
  } else if (worldData.mapData.dungeons.includes(t_index)) {
    type = 'Dungeon';
  }

  let name = worldData.mapData.locations[t_index]?.name;
  if (!name) { name = 'Unknown'; }

  return {
    location: {
      t_i: t_index,
      name: name,
      type: type,
    },
    paths: output,
  };

}




type Direction = 'NORTH' | 'SOUTH' | 'EAST' | 'WEST' | 'NORTH-EAST' | 'NORTH-WEST' | 'SOUTH-EAST' | 'SOUTH-WEST' | 'UNKNOWN';
function getDirection(coords_base: { x: number, y: number, name?: string } | undefined, coords_to: { x: number, y: number, name?: string } | undefined): Direction {
  if (!coords_base || !coords_to) { return 'UNKNOWN'; }

  /*      270
    180   +   0/360
          90
  */
  function angle(cx: number, cy: number, ex: number, ey: number) {
    var dy = ey - cy;
    var dx = ex - cx;
    var theta = Math.atan2(dy, dx); // range (-PI, PI]
    theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
    if (theta < 0) theta = 360 + theta; // range [0, 360)
    return theta;
  }
  let deg = angle(coords_base.x, coords_base.y, coords_to.x, coords_to.y);

  if (deg > 90 - (45 / 2) && deg <= 90 + (45 / 2)) {
    return 'SOUTH';
  } else if (deg > 90 + (45 / 2) && deg <= 180 - (45 / 2)) {
    return 'SOUTH-WEST';
  } else if (deg > 180 - (45 / 2) && deg <= 180 + (45 / 2)) {
    return 'WEST';
  } else if (deg > 180 + (45 / 2) && deg <= 270 - (45 / 2)) {
    return 'NORTH-WEST';
  } else if (deg > 270 - (45 / 2) && deg <= 270 + (45 / 2)) {
    return 'NORTH';
  } else if (deg > 270 + (45 / 2) && deg <= 360 - (45 / 2)) {
    return 'NORTH-EAST';
  } else if (deg > 360 - (45 / 2) || deg <= 0 + (45 / 2)) {
    return 'EAST';
  } else if (deg > 0 + (45 / 2) && deg <= 90 - (45 / 2)) {
    return 'SOUTH-EAST';
  } else {
    return 'UNKNOWN';
  }

}

export function directionToStr(direction: Direction){
  switch(direction){
    case 'SOUTH': return 'south';
    case 'SOUTH-WEST': return 'southwest';
    case 'WEST': return 'west';
    case 'NORTH-WEST': return 'northwest';
    case 'NORTH': return 'north';
    case 'NORTH-EAST': return 'northeast';
    case 'EAST': return 'east';
    case 'SOUTH-EAST': return 'southeast';
    default: 'unknown';
  }
}



const NOTEWORTHY_CITY_VALUE = 5;
const NOTEWORTHY_CITY_INFLUENCE_DISTANCE = 100;

const NOTEWORTHY_TOWN_VALUE = 5;
const NOTEWORTHY_TOWN_INFLUENCE_DISTANCE = 50;

const NOTEWORTHY_DUNGEON_VALUE = 6;
const NOTEWORTHY_DUNGEON_INFLUENCE_DISTANCE = 100;

function findMostNoteworthyAttraction(attractions: { city: Attraction | null, town: Attraction | null, dungeon: Attraction | null }){

  function calcScore(attraction: Attraction, value: number, influence: number): number {
    return _.clamp(value - (value/influence)*attraction.distance, 0, value);
  }

  let cityScore = (attractions.city) ? calcScore(attractions.city, NOTEWORTHY_CITY_VALUE, NOTEWORTHY_CITY_INFLUENCE_DISTANCE) : 0;
  let townScore = (attractions.town) ? calcScore(attractions.town, NOTEWORTHY_TOWN_VALUE, NOTEWORTHY_TOWN_INFLUENCE_DISTANCE) : 0;
  let dungeonScore = (attractions.dungeon) ? calcScore(attractions.dungeon, NOTEWORTHY_DUNGEON_VALUE, NOTEWORTHY_DUNGEON_INFLUENCE_DISTANCE) : 0;

  /*
  console.log(attractions);
  console.log(cityScore);
  console.log(townScore);
  console.log(dungeonScore);
  */

  let bestScore = Math.max(cityScore, townScore, dungeonScore);
  if(bestScore === cityScore){
    return attractions.city;
  }
  if(bestScore === townScore){
    return attractions.town;
  }
  if(bestScore === dungeonScore){
    return attractions.dungeon;
  }
  return null;

}
