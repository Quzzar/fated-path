
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';

const WORLD_IMAGE_FILE = 'worldimage.png';

export type WorldState = {
  pngBase64: string,
};


let g_worldExists = false;

export async function initializeWorld() {

  try {
    let result = await AsyncStorage.getItem('world-exist');
    g_worldExists = (result == 'true') ? true : false;
  } catch(e) {
    g_worldExists = false;
  }

}

///

export async function loadWorld(): Promise<WorldState | null> {

  let worldExist = doesWorldExist();
  if(!worldExist){
    return null;
  }

  const filename = FileSystem.documentDirectory + WORLD_IMAGE_FILE;
  let base64Code = '';
  try {
    base64Code = await FileSystem.readAsStringAsync(filename, {
      encoding: FileSystem.EncodingType.Base64,
    });
  } catch(e) {
    console.error(e);
    return null;
  }

  return {
    pngBase64: base64Code,
  };

}

export async function setNewWorld(base64Code: string): Promise<WorldState | null> {
  
  try {
    g_worldExists = true;
    await AsyncStorage.setItem('world-exist', 'true');
  } catch(e) {
    console.error(e);
    return null;
  }

  const filename = FileSystem.documentDirectory + WORLD_IMAGE_FILE;
  await FileSystem.writeAsStringAsync(filename, base64Code, {
    encoding: FileSystem.EncodingType.Base64,
  });

  return {
    pngBase64: base64Code,
  };

}

export function doesWorldExist() {
  return g_worldExists;
}

export async function deleteWorld(){

  console.log('Deleting world.');

  const filename = FileSystem.documentDirectory + WORLD_IMAGE_FILE;
  await FileSystem.deleteAsync(filename, {
    idempotent: true,
  });

  try {
    g_worldExists = false;
    await AsyncStorage.setItem('world-exist', 'false');
  } catch(e) {
    console.error(e);
    return false;
  }

  return true;

}


/*
export async function printOutFileSystem(){

  let dir = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory + '');
  console.log(dir);

}*/