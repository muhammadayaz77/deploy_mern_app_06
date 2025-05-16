// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice'
// import studentReducer from '../slices/studentSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // student: studentReducer,
    // Add other reducers here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable if you have non-serializable values
    }),
});

export default store;