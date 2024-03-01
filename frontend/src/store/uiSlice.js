import { createSlice } from '@reduxjs/toolkit';
import { postMessage } from './messagesSlice';
import { login, signup } from './authSlice';
import { postChannel } from './channelsSlice';

const initialState = {
  activeChannelId: '1',
  messageText: '',
  showChannelModal: false,
  channelModalType: 'AddChannel',
  loginPageWarningOverlay: false,
  userNameOverlay: false,
  passwordOverlay: false,
  passwordConfirmationOverlay: false,
  showSignupPageOverlay: false,
  editingChannel: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveChannel: (state, action) => {
      state.activeChannelId = action.payload.activeChannelId;
    },
    setMessageText: (state, action) => {
      state.messageText = action.payload.messageText;
    },
    setChannelModal: (state, action) => {
      state.showChannelModal = action.payload.showChannelModal;
    },
    setChannelModalType: (state, action) => {
      state.channelModalType = action.payload.channelModalType;
    },
    setEditingChannel: (state, action) => {
      state.editingChannel = action.payload.editingChannel;
    },
    setShowSignupPageOverlay: (state, action) => {
      state.showSignupPageOverlay = action.payload.showSignupPageOverlay;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postMessage.fulfilled, (state) => {
        state.messageText = '';
      })
      .addCase(login.fulfilled, (state) => {
        state.loginPageWarningOverlay = false;
      })
      .addCase(login.pending, (state) => {
        state.loginPageWarningOverlay = false;
      })
      .addCase(login.rejected, (state) => {
        state.loginPageWarningOverlay = true;
      })
      .addCase(signup.fulfilled, (state) => {
        state.showSignupPageOverlay = false;
      })
      .addCase(signup.pending, (state) => {
        state.showSignupPageOverlay = false;
      })
      .addCase(signup.rejected, (state) => {
        state.showSignupPageOverlay = true;
      })
      .addCase(postChannel.fulfilled, (state, action) => {
        state.activeChannelId = action.payload.id;
      });
  },
});

export const {
  setActiveChannel,
  setMessageText,
  setChannelModal,
  setEditingChannel,
  setChannelModalType,
  setShowSignupPageOverlay,
} = uiSlice.actions;
export default uiSlice.reducer;
