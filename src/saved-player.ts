import AsyncStorage from "@react-native-async-storage/async-storage";
import { store } from './store';
import {
  setCurrentHealth,
  setMaxHealth,
  setTempHealth,
  setCoins,
  
  setLocationID,
  setEventID,
} from './slices/playerSlice';

const STORAGE_KEY = 'saved-player-data';

export async function loadFromPlayerStorage() {

  try {

    let strResult = await AsyncStorage.getItem(STORAGE_KEY);
    let parsedResult = (strResult) ? JSON.parse(strResult) : null;
    if (!parsedResult) {
      // Default values

      console.log('Setting player to default values');

      store.dispatch(setCurrentHealth(10));
      store.dispatch(setMaxHealth(10));
      store.dispatch(setTempHealth(0));
      store.dispatch(setCoins(0));

      store.dispatch(setLocationID(-1));
      store.dispatch(setEventID(''));

    } else {
      // Existing values

      console.log('Loading player from storage');

      store.dispatch(setCurrentHealth(parsedResult.currentHealth));
      store.dispatch(setMaxHealth(parsedResult.maxHealth));
      store.dispatch(setTempHealth(parsedResult.tempHealth));
      store.dispatch(setCoins(parsedResult.coins));

      store.dispatch(setLocationID(parsedResult.locationID));
      store.dispatch(setEventID(parsedResult.eventID));

    }

  } catch (e) {
    console.log(e);
  }

}

export function saveToPlayerStorage() {

  (async () => {
    console.log('Saving player data');
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState().player));
    } catch (e) {
      console.warn('Failed to save data to player storage!');
      console.log(e);
    }
  })();

}

export function deletePlayerStorage() {
  console.log('Deleting player data');

  (async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      // remove error
      console.log(e);
    }
  })();

}
