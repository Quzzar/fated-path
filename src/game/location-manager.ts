import { getSavedWorld, WorldData } from "../saved-world";

export type Biome = 'PLAINS' | 'FOREST' | 'SWAMP' | 'TAIGA' | 'MOUNTAINS' | 'UNKNOWN';

function getLocation(id: number) {

  let worldData = getSavedWorld();
  if (worldData) {

    let roadInfo = getRoadInfo(worldData, id);
    if(roadInfo){
      return roadInfo;
    }

  }

  return {
    location: {
      name: 'Unknown',
      t_i: id,
      type: 'Town',
    },
    paths: [],
  };

}

function getRoadInfo(worldData: WorldData, t_index: number) {

  let connected = worldData.mapData.roads[t_index];
  if (!connected) { return null; }

  function findNearestAttractions(nt_i: number, destinations: { [index: string]: number | undefined; }) {

    let nearestCity = { t_i: -1, name: 'Untitled', distance: Number.MAX_VALUE };
    let nearestTown = { t_i: -1, name: 'Untitled', distance: Number.MAX_VALUE };
    let nearestDungeon = { t_i: -1, name: 'Untitled', distance: Number.MAX_VALUE };

    for (let str_dt_i in destinations) {
      const distance = destinations[str_dt_i];
      const dt_i = parseInt(str_dt_i);
      if (nt_i === dt_i) { continue; }
      if (!distance) { continue; }

      let name = worldData.mapData.locations[dt_i]?.name;
      if (!name) { name = 'Unknown'; }
      if (worldData.mapData.cities.includes(dt_i)) {
        if (nearestCity.distance > distance) {
          nearestCity = { t_i: dt_i, name: name, distance: distance };
        }
      } else if (worldData.mapData.towns.includes(dt_i)) {
        if (nearestTown.distance > distance) {
          nearestTown = { t_i: dt_i, name: name, distance: distance };
        }
      } else if (worldData.mapData.dungeons.includes(dt_i)) {
        if (nearestDungeon.distance > distance) {
          nearestDungeon = { t_i: dt_i, name: name, distance: distance };
        }
      }

    }

    return {
      city: (nearestCity.t_i === -1) ? null : nearestCity,
      town: (nearestTown.t_i === -1) ? null : nearestTown,
      dungeon: (nearestDungeon.t_i === -1) ? null : nearestDungeon,
    };

  }

  let output: any[] = [];

  for (const str_nt_i in connected) {
    const destinations = connected[str_nt_i];
    const nt_i = parseInt(str_nt_i);
    if (!destinations) { continue; }

    output.push({
      nt_i: nt_i,
      direction: getDirection(worldData.mapData.locations[t_index], worldData.mapData.locations[nt_i]),
      attractions: findNearestAttractions(nt_i, destinations),
    });
  }

  let type = 'Road';
  if (worldData.mapData.cities.includes(t_index)) {
    type = 'City';
  } else if (worldData.mapData.towns.includes(t_index)) {
    type = 'Town';
  } else if (worldData.mapData.dungeons.includes(t_index)) {
    type = 'Dungeon';
  }

  return {
    location: {
      t_i: t_index,
      name: worldData.mapData.locations[t_index]?.name,
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



export default {
  getLocation,
};



