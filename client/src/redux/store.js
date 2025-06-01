import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from './Slices/authSlice';
import adminSlice from './Slices/adminSlice'
import teacherSlice from './Slices/teacherSlice'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import resultSlice from './Slices/resultSlice';
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const rootReducer = combineReducers({
  auth : authSlice,
  admin : adminSlice,
  teacher : teacherSlice,
  result : resultSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)
let store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;