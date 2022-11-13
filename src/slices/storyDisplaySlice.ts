import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state
interface StoryDisplayState {
  loadIndex: number,
}

// Define the initial state using that type
const initialState: StoryDisplayState = {
  loadIndex: 0,
}

export const storyDisplaySlice = createSlice({
  name: 'story-display',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setLoadIndex: (state, action: PayloadAction<number>) => {
      state.loadIndex = action.payload;
    },
  }
})

export const {
  setLoadIndex,
} = storyDisplaySlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectLoadIndex = (state: RootState) => state.storyDisplay.loadIndex;

export default storyDisplaySlice.reducer;