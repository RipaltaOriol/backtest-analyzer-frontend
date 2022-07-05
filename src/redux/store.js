import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '../api/apiSlice';

import authReducer from '../features/auth/authSlice';
import setupReucer from '../features/setups/setupSlice';
import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    setup: setupReucer,
    counter: counterReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
});