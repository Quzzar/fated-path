import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state
interface WorldDisplayState {
  data: any,
}

// Define the initial state using that type
const initialState: WorldDisplayState = {
  data: null,
}

export const worldDisplaySlice = createSlice({
  name: 'world-display',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
  }
})

export const {
  setData,
} = worldDisplaySlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectData = (state: RootState) => state.worldDisplay.data;

export default worldDisplaySlice.reducer;