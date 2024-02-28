import { createSlice } from '@reduxjs/toolkit';
import { login, signup } from './authSlice';

const initialState = {
  loginPageErrors: null,
  signupPageErrors: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.activeChannelId = action.payload.activeChannelId;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.rejected, (state, { error }) => {
        const { message, code } = error;
        const statusCode = message.split(' ').at(-1);
        state.loginPageErrors = { statusCode, code };
      })
      .addCase(signup.rejected, (state, { error }) => {
        const { message, code } = error;
        const statusCode = message.split(' ').at(-1);
        state.signupPageErrors = { statusCode, code };
      });
  },
});

export const {
  setError,
} = appSlice.actions;
export default appSlice.reducer;
