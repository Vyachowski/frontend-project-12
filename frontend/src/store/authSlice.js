import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  token: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    set: (state, action) => {
      state.token = action.payload;
    }
  }
});

export const { set } = authSlice.actions;

export default authSlice.reducer;
