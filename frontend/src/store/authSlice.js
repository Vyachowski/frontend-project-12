import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  username: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { token, username } = action.payload;
      localStorage.setItem('token', token);
      state.username = username;
    },
    logout: (state) => {
      localStorage.removeItem('token');
      state.username = null;
    }
  }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
