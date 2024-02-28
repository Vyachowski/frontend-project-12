import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { getAuthConfig, getUserUrl } from '../utils/routes';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { getState }) => {
    const state = getState();
    const { token } = state.auth;
    const response = await axios.post(getUserUrl(), credentials, getAuthConfig(token));
    return response.data;
  },
);

export const signup = createAsyncThunk(
  'auth/signup',
  async (credentials) => {
    const response = await axios.post(getUserUrl('signup'), credentials);
    return response.data;
  },
);

const getUsername = () => localStorage.getItem('username');
const getToken = () => localStorage.getItem('token');

const initialState = {
  isAuthenticated: getUsername() && getToken(),
  username: getUsername(),
  token: getToken(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');

      state.isAuthenticated = false;
      state.username = null;
      state.token = null;
    },
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
        state.username = username;
        state.token = token;
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

        state.isAuthenticated = true;
        state.username = username;
        state.token = token;
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(signup.rejected, (state) => {
        state.loadingStatus = 'error';
        state.error = null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
