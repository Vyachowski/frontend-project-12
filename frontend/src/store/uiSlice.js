import { createSlice } from "@reduxjs/toolkit";
import { postMessage } from "./messagesSlice";

const initialState = {
  activeChannelId: '1',
  messageText: '',
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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postMessage.fulfilled, (state) => {
        state.messageText = '';
      })
  }
});

export const { setActiveChannel, setMessageText } = uiSlice.actions;
export default uiSlice.reducer;
