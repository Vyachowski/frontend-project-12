import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { getAuthConfig, getMessageUrl } from "../utils/routes";

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (_, { getState }) => {
    const state = getState();
    const token = state.auth.token;
    const response = await axios.get(getMessageUrl(), getAuthConfig(token));
    return response.data;
  }
);

export const postMessage = createAsyncThunk(
  'messages/postMessage',
  async (newMessage) => {
    const response = await axios.post(getMessageUrl(), newMessage, getAuthConfig());
    return response.data;
  }
);

const messagesAdapter = createEntityAdapter();

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState({ loadingStatus: 'idle', error: null }),
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        messagesAdapter.addMany(state, action);
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      })
      .addCase(postMessage.pending, (state) => {
          state.loadingStatus = 'loading';
          state.error = null;
        })
      .addCase(postMessage.fulfilled, (state) => {
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(postMessage.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  }
});

export const { addMessage, addMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
