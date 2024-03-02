import { createSlice } from '@reduxjs/toolkit';
import { login, signup } from './authSlice';

const initialState = {
  loginPageErrors: null,
  signupPageErrors: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
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

export default appSlice.reducer;
