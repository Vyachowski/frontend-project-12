import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { authConfig, getChannelsUrl, getToken, getUsername, getUserUrl } from "../utils/routes";

export const login = createAsyncThunk(
  'auth/login',
  async (credentials) => {
    const response = await axios.post(getUserUrl(), credentials, authConfig);
    return response.data;
  }
);

export const signup = createAsyncThunk(
  'auth/signup',
  async (credentials) => {
    const response = await axios.post(getChannelsUrl(), credentials, authConfig);
    return response.data;
  }
);

const initialState = {
  isAuthenticated: getUsername() && getToken(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');

      state.isAuthenticated = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { token, username } = action.payload;

        localStorage.setItem('token', token);
        localStorage.setItem('username', username);

        state.isAuthenticated = true;
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(login.rejected, (state) => {
        state.loadingStatus = 'error';
        state.error = null;
      })
      .addCase(signup.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        const { token, username } = action.payload;
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);

        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(signup.rejected, (state) => {
        state.loadingStatus = 'error';
        state.error = null;
      })
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
