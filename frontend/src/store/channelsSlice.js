import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { getAuthConfig, getChannelsUrl } from "../utils/routes";

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async (_, { getState }) => {
    const state = getState();
    const token = state.auth.token;
    const response = await axios.get(getChannelsUrl(), getAuthConfig(token));
    return response.data;
  }
);

export const postChannel = createAsyncThunk(
  'channels/postChannel',
  async (name, { getState }) => {
    const state = getState();
    const token = state.auth.token;
    const response = await axios.post(getChannelsUrl(), { name }, getAuthConfig(token));
    return response.data;
  }
);

export const renameChannel = createAsyncThunk(
  'channels/renameChannel',
  async ({ id, name }, { getState }) => {
    const state = getState();
    const token = state.auth.token;
    const response = await axios.patch(getChannelsUrl(id), { name }, getAuthConfig(token));
    return response.data;
  }
);

export const removeChannel = createAsyncThunk(
  'channels/removeChannel',
  async (id, { getState }) => {
    const state = getState();
    const token = state.auth.token;
    const response = await axios.delete(getChannelsUrl(id), getAuthConfig(token));
    return response.data;
  }
);

const channelsAdapter = createEntityAdapter();

const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState({ loadingStatus: 'idle', error: null }),
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    removeChannel: channelsAdapter.removeOne,
    renameChannel: channelsAdapter.updateOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        channelsAdapter.addMany(state, action);
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      })
      .addCase(postChannel.pending, (state) => {
          state.loadingStatus = 'loading';
          state.error = null;
        })
      .addCase(postChannel.fulfilled, (state) => {
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(postChannel.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  }
});

export const { addChannel, addChannels } = channelsSlice.actions;

export default channelsSlice.reducer;
