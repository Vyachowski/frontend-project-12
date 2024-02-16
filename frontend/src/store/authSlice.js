import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  token: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const {payload} = action;
      console.log(payload);
      state.token = payload;
    }
  }
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
