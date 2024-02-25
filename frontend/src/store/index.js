import { configureStore} from "@reduxjs/toolkit";

import messagesReducer from './messagesSlice';
import channelsReducer from './channelsSlice';
import authReducer from './authSlice';
import uiReducer from './uiSlice';

export default configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    messages: messagesReducer,
    channels: channelsReducer,
  },
});
