import { configureStore} from "@reduxjs/toolkit";
import authReducer from './authSlice.js';
import { channelsApi } from "./channelsApi";
import {messagesApi} from "./messagesApi";

export default configureStore({
  reducer: {
    auth: authReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  }
});
