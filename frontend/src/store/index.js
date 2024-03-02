import { configureStore } from '@reduxjs/toolkit';

import messagesReducer from './slices/messagesSlice';
import channelsReducer from './slices/channelsSlice';
import authReducer from './slices/authSlice';
import appReducer from './slices/appSlice';
import uiReducer from './slices/uiSlice';

export default configureStore({
  reducer: {
    ui: uiReducer,
    app: appReducer,
    auth: authReducer,
    messages: messagesReducer,
    channels: channelsReducer,
  },
});
