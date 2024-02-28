import { configureStore } from '@reduxjs/toolkit';

import messagesReducer from './messagesSlice';
import channelsReducer from './channelsSlice';
import authReducer from './authSlice';
import appReducer from './appSlice';
import uiReducer from './uiSlice';

export default configureStore({
  reducer: {
    ui: uiReducer,
    app: appReducer,
    auth: authReducer,
    messages: messagesReducer,
    channels: channelsReducer,
  },
});
