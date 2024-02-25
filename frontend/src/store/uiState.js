import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeChannelId: '1',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveChannel: (state, action) => {
      const { id } = action.payload;
    },
  }
});

export const getToken = () => localStorage.getItem('token');
export const getUsername = () => localStorage.getItem('username');

export const { login, logout } = uiSlice.actions;
export default uiSlice.reducer;
