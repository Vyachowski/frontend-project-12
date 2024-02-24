import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { token, username } = action.payload;
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
    },
    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    }
  }
});

export const getToken = () => localStorage.getItem('token');
export const getUsername = () => localStorage.getItem('username');

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
