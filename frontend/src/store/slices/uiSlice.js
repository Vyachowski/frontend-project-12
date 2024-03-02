import { createSlice } from '@reduxjs/toolkit';
import { postMessage } from './messagesSlice';
import { login, signup } from './authSlice';
import { postChannel } from './channelsSlice';

const initialState = {
  auth: {
    showPasswordConfirmationOverlay: false,
    showLoginPageWarningOverlay: false,
    showSignupPageOverlay: false,
    showUserNameOverlay: false,
    showPasswordOverlay: false,
  },
  chat: {
    activeChannelId: '1',
    editingChannel: null,
    messageText: '',
  },
  modal: {
    modalWindowForm: 'AddChannel',
    showModalWindow: false,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setShowSignupPageOverlay: (state, action) => {
      state.auth.showSignupPageOverlay = action.payload.showSignupPageOverlay;
    },
    setActiveChannel: (state, action) => {
      state.chat.activeChannelId = action.payload.activeChannelId;
    },
    setEditingChannel: (state, action) => {
      state.chat.editingChannel = action.payload.editingChannel;
    },
    setMessageText: (state, action) => {
      state.chat.messageText = action.payload.messageText;
    },
    setShowChannelModal: (state, action) => {
      state.modal.showChannelModal = action.payload.showChannelModal;
    },
    setModalWindowForm: (state, action) => {
      state.modal.modalWindowForm = action.payload.modalWindowForm;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postMessage.fulfilled, (state) => {
        state.chat.messageText = '';
      })
      .addCase(login.fulfilled, (state) => {
        state.auth.loginPageWarningOverlay = false;
      })
      .addCase(login.pending, (state) => {
        state.auth.loginPageWarningOverlay = false;
      })
      .addCase(login.rejected, (state) => {
        state.auth.loginPageWarningOverlay = true;
      })
      .addCase(signup.fulfilled, (state) => {
        state.auth.showSignupPageOverlay = false;
      })
      .addCase(signup.pending, (state) => {
        state.auth.showSignupPageOverlay = false;
      })
      .addCase(signup.rejected, (state) => {
        state.auth.showSignupPageOverlay = true;
      })
      .addCase(postChannel.fulfilled, (state, action) => {
        state.chat.activeChannelId = action.payload.id;
      });
  },
});

export const {
  setActiveChannel,
  setMessageText,
  setShowChannelModal,
  setEditingChannel,
  setModalWindowForm,
  setShowSignupPageOverlay,
} = uiSlice.actions;
export default uiSlice.reducer;
