import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  options: [],
  schedulePicked: null
};

export const pickerSlice = createSlice({
  name: 'picker',
  initialState,
  reducers: {
    setSchedules: (state, action) => {
      state.options = null;
      state.options = action.payload;
    },
    pickSchedule: (state, action) => {
      state.schedulePicked = action.payload;
    }
  }
});


export const { setSchedules, pickSchedule } = pickerSlice.actions;
export default pickerSlice.reducer;