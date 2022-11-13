import * as FileSystem from 'expo-file-system';

const WORLD_DATA_FILE = 'world-data.data';

const FOLIAGE_IMAGE_FILE = 'canvas-foliage.png';
const MARKERS_IMAGE_FILE = 'canvas-markers.png';
const HOVER1_IMAGE_FILE = 'canvas-hover1.png';
const HOVER2_IMAGE_FILE = 'canvas-hover2.png';

let cachedData: WorldData | null = null;

//export type Roads = Map<number, Map<number, Map<number, number>>>;
export type Roads = {
  [index: string]: {
    [index: string]: {
      [index: string]: number | undefined
    } | undefined
  } | undefined
};

//export type Regions = Map<number, { cost: number, region_ct_i: number }>;
export type Regions = {
  [index: string]: {
    cost: number,
    region_ct_i: number,
  } | undefined
};

//export type Locations = Map<number, {x: number, y: number, name: string}>;
export type Locations = {
  [index: string]: {
    x: number,
    y: number,
    name: string,
  } | undefined
};

export type WorldData = {
  version: string,
  seed: string,
  canvases: {
    foliage: string,
    markers: string,
    hover1: string,
    hover2: string,
  },
  mapData: {
    roads: Roads,
    regions: Regions,
    locations: Locations,
    cities: number[],
    towns: number[],
    dungeons: number[],
  }
};

export async function initSavedWorld() {

  console.log('Loading world from storage');
  try {

    //let strResult = await AsyncStorage.getItem(STORAGE_KEY);
    let strResult = await loadData(WORLD_DATA_FILE);
    let parsedResult = (strResult) ? JSON.parse(strResult) : null;
    if (parsedResult == null) {
      cachedData = null;
      return null;
    }

    parsedResult.canvases.foliage = await loadImage(FOLIAGE_IMAGE_FILE);
    parsedResult.canvases.markers = await loadImage(MARKERS_IMAGE_FILE);
    parsedResult.canvases.hover1 = await loadImage(HOVER1_IMAGE_FILE);
    parsedResult.canvases.hover2 = await loadImage(HOVER2_IMAGE_FILE);

    cachedData = parsedResult;

    console.log('Size: ' + JSON.stringify(parsedResult).length);

    return cachedData as WorldData;
  } catch (e) {
    console.log(e);
    return null;
  }

}

export function getSavedWorld() {
  return cachedData;
}

export function setSavedWorld(data: WorldData) {
  cachedData = data;

  (async () => {
    try {

      let storedData = JSON.parse(JSON.stringify(data));

      console.log('Pre Size: ' + JSON.stringify(storedData).length);

      saveImage(FOLIAGE_IMAGE_FILE, storedData.canvases.foliage);
      saveImage(MARKERS_IMAGE_FILE, storedData.canvases.markers);
      saveImage(HOVER1_IMAGE_FILE, storedData.canvases.hover1);
      saveImage(HOVER2_IMAGE_FILE, storedData.canvases.hover2);

      storedData.canvases.foliage = null;
      storedData.canvases.markers = null;
      storedData.canvases.hover1 = null;
      storedData.canvases.hover2 = null;

      console.log('Post Size: ' + JSON.stringify(storedData).length);

      //await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(storedData));
      await saveData(WORLD_DATA_FILE, JSON.stringify(storedData));
    } catch (e) {
      console.warn('Failed to save data to storage!');
      console.log(e);
    }
  })();

}

export function deleteSavedWorld() {
  console.log('Deleting world data');
  cachedData = null;

  (async () => {
    try {
      //await AsyncStorage.removeItem(STORAGE_KEY);
      await FileSystem.deleteAsync(FileSystem.documentDirectory + WORLD_DATA_FILE, {
        idempotent: true,
      });

      await FileSystem.deleteAsync(FileSystem.documentDirectory + FOLIAGE_IMAGE_FILE, {
        idempotent: true,
      });
      await FileSystem.deleteAsync(FileSystem.documentDirectory + MARKERS_IMAGE_FILE, {
        idempotent: true,
      });
      await FileSystem.deleteAsync(FileSystem.documentDirectory + HOVER1_IMAGE_FILE, {
        idempotent: true,
      });
      await FileSystem.deleteAsync(FileSystem.documentDirectory + HOVER2_IMAGE_FILE, {
        idempotent: true,
      });

    } catch (e) {
      // remove error
      console.log(e);
    }
  })();

}

///

async function loadData(dataFile: string): Promise<string | null> {

  const filename = FileSystem.documentDirectory + dataFile;
  let data = '';
  try {
    data = await FileSystem.readAsStringAsync(filename);
  } catch (e) {
    console.log(e);
    return null;
  }

  return data;

}

async function saveData(dataFile: string, data: string): Promise<string> {

  const filename = FileSystem.documentDirectory + dataFile;
  await FileSystem.writeAsStringAsync(filename, data);

  return data;

}

///

async function loadImage(imageFile: string): Promise<string | null> {

  const filename = FileSystem.documentDirectory + imageFile;
  let base64Code = '';
  try {
    base64Code = await FileSystem.readAsStringAsync(filename, {
      encoding: FileSystem.EncodingType.Base64,
    });
  } catch (e) {
    console.log(e);
    return null;
  }

  base64Code = 'data:image/png;base64,' + base64Code;

  return base64Code;

}

async function saveImage(imageFile: string, base64Code: string): Promise<string> {

  base64Code = base64Code.replace('data:image/png;base64,', '');

  const filename = FileSystem.documentDirectory + imageFile;
  await FileSystem.writeAsStringAsync(filename, base64Code, {
    encoding: FileSystem.EncodingType.Base64,
  });

  return base64Code;

}

///

/*
const STORAGE_KEY_PREFIX = 'saved-data';
const MAX_PARTS = 100;
function getStorageKeys(){

  let keys = [];
  for(let i = 1; i <= MAX_PARTS; i++){
    keys.push(STORAGE_KEY_PREFIX+'-'+i);
  }

  return keys;
}
const MAX_BYTE_SIZE = 2097152; // 2 megabytes

let cachedData: any = null;

export async function getSavedData() {

  if (cachedData) {
    return cachedData;
  } else {
    try {
      let results = await AsyncStorage.multiGet(getStorageKeys())

      let finalStr = '';
      for(let result of results){
        if(result[1] != null){
          finalStr += result[1];
        }
      }
      console.log(finalStr.length);

      let finalResult = JSON.parse(finalStr);

      cachedData = finalResult;
      return cachedData;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

}

export function setSavedData(data: any) {
  cachedData = data;

  (async() => {
    try {
      let strData = JSON.stringify(data);

      const chunkSize = MAX_BYTE_SIZE / 2;
      let cArr = strData.split('');

      let parts: [string, string][] = [];
      let count = 1;
      for (let i = 0; i < cArr.length; i += chunkSize) {
        const chunk = cArr.slice(i, i + chunkSize).join('');
        parts.push([STORAGE_KEY_PREFIX+'-'+count, chunk]);
        console.log(chunk.length);
        count++;
      }

      if(parts.length > MAX_PARTS){
        throw `Split data into more parts than max (${parts.length}/${MAX_PARTS})`
      }

      console.log(parts.length);

      await AsyncStorage.multiSet(parts);
    } catch (e) {
      console.warn('Failed to save data to storage!');
      console.log(e);
    }
  })();

}

export function deleteSavedData() {

  cachedData = null;
  (async() => {
    try {
      await AsyncStorage.multiRemove(getStorageKeys());
    } catch (e) {
      // remove error
      console.log(e);
    }
  })();

}
*/