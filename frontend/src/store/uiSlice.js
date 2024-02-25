import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeChannelId: '1',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveChannel: (state, action) => {
      state.activeChannelId = action.payload.id;
    },
  }
});

export const { setActiveChannel } = uiSlice.actions;
export default uiSlice.reducer;
