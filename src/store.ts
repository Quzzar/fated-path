import { configureStore } from '@reduxjs/toolkit';

import playerReducer from './slices/playerSlice';
import storyDisplayReducer from './slices/storyDisplaySlice';
import worldDisplayReducer from './slices/worldDisplaySlice';

export const store = configureStore({
  reducer: {
    player: playerReducer,
    storyDisplay: storyDisplayReducer,
    worldDisplay: worldDisplayReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {player: PlayerState, }
export type AppDispatch = typeof store.dispatch;