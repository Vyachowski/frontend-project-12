import { configureStore} from "@reduxjs/toolkit";

import messagesReducer from './messagesSlice';
import channelsReducer from './channelsSlice';
import authReducer from './authSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    messages: messagesReducer,
    channels: channelsReducer,
  },
});
