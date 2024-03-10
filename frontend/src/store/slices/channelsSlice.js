import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import i18n from 'i18next';

import axios from 'axios';

import { getAuthConfig, getChannelsUrl } from '../../utils/routes';

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async (_, { getState }) => {
    const state = getState();
    const { token } = state.auth;
    const response = await axios.get(getChannelsUrl(), getAuthConfig(token));
    return response.data;
  },
);

export const postChannel = createAsyncThunk(
  'channels/postChannel',
  async (name, { getState }) => {
    const state = getState();
    const { token } = state.auth;
    const response = await axios.post(getChannelsUrl(), { name }, getAuthConfig(token));
    return response.data;
  },
);

export const patchChannel = createAsyncThunk(
  'channels/renameChannel',
  async ({ id, name }, { getState }) => {
    const state = getState();
    const { token } = state.auth;
    const response = await axios.patch(getChannelsUrl(id), { name }, getAuthConfig(token));
    return response.data;
  },
);

export const deleteChannel = createAsyncThunk(
  'channels/removeChannel',
  async (id, { getState }) => {
    const state = getState();
    const { token } = state.auth;
    const response = await axios.delete(getChannelsUrl(id), getAuthConfig(token));
    return response.data;
  },
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

        toast.success(i18n.t('components.addChannelForm.request.success'), {
          toastId: 1,
        });
      })
      .addCase(postChannel.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;

        toast.error(i18n.t('components.addChannelForm.request.networkError'), {
          toastId: 2,
        });
      })
      .addCase(patchChannel.fulfilled, (state) => {
        state.loadingStatus = 'idle';
        state.error = null;

        toast.info(i18n.t('components.renameChannelForm.request.success'), {
          toastId: 3,
        });
      })
      .addCase(patchChannel.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;

        toast.error(i18n.t('components.renameChannelForm.request.networkError'), {
          toastId: 4,
        });
      })
      .addCase(deleteChannel.fulfilled, (state) => {
        state.loadingStatus = 'idle';
        state.error = null;

        toast.info(i18n.t('components.removeChannelForm.request.success'), {
          toastId: 5,
        });
      })
      .addCase(deleteChannel.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;

        toast.error(i18n.t('components.removeChannelForm.request.networkError'), {
          toastId: 6,
        });
      });
  },
});

export const { addChannel, renameChannel, removeChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
