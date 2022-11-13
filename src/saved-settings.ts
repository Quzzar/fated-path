import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = 'saved-setting-data';

const defaultSettings = {
  tabIndex: 0,
};
let settings = JSON.parse(JSON.stringify(defaultSettings)) as typeof defaultSettings;

///

export function getSettings() {
  return settings;
}

///

export async function loadFromSettingStorage() {

  try {

    let strResult = await AsyncStorage.getItem(STORAGE_KEY);
    let parsedResult = (strResult) ? JSON.parse(strResult) : null;
    if (parsedResult) {

      console.log('Loading settings from storage');
      settings = parsedResult;

    }

  } catch (e) {
    console.log(e);
  }

}

export function saveToSettingStorage() {

  (async () => {
    console.log('Saving setting data');
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.warn('Failed to save data to setting storage!');
      console.log(e);
    }
  })();

}

export function resetSettingStorage() {
  console.log('Resetting setting data');

  settings = JSON.parse(JSON.stringify(defaultSettings));
  saveToSettingStorage();

}
