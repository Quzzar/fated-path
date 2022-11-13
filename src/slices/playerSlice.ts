import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state
export interface PlayerState {
  currentHealth: number,
  maxHealth: number,
  tempHealth: number,
  coins: number,
  locationID: number,
}

// Define the initial state using that type
const initialState: PlayerState = {
  currentHealth: 0,
  maxHealth: 0,
  tempHealth: 0,
  coins: 0,
  locationID: -1,
}

export const playerSlice = createSlice({
  name: 'player',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCurrentHealth: (state, action: PayloadAction<number>) => {
      state.currentHealth = action.payload;
    },
    setMaxHealth: (state, action: PayloadAction<number>) => {
      state.maxHealth = action.payload;
    },
    setTempHealth: (state, action: PayloadAction<number>) => {
      state.tempHealth = action.payload;
    },
    setCoins: (state, action: PayloadAction<number>) => {
      state.coins = action.payload;
    },
    setLocationID: (state, action: PayloadAction<number>) => {
      state.locationID = action.payload;
    },
  }
})

export const {
  setCurrentHealth,
  setMaxHealth,
  setTempHealth,
  setCoins,
  setLocationID,
} = playerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCurrentHealth = (state: RootState) => state.player.currentHealth;
export const selectMaxHealth = (state: RootState) => state.player.maxHealth;
export const selectTempHealth = (state: RootState) => state.player.tempHealth;
export const selectCoins = (state: RootState) => state.player.coins;
export const selectLocationID = (state: RootState) => state.player.locationID;

export default playerSlice.reducer;