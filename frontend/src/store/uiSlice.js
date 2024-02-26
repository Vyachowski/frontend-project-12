import { createSlice } from "@reduxjs/toolkit";
import { postMessage } from "./messagesSlice";
import { login } from "./authSlice";
import { postChannel } from "./channelsSlice";

const initialState = {
  activeChannelId: '1',
  messageText: '',
  showChannelModal: false,
  channelModalType: 'AddChannel',
  loginPageWarningOverlay: false,
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
    }
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
      .addCase(postChannel.fulfilled, (state, action) => {
        state.activeChannelId = action.payload.id;
      })
  }
});

export const { setActiveChannel, setMessageText, setChannelModal, setChannelModalType } = uiSlice.actions;
export default uiSlice.reducer;
