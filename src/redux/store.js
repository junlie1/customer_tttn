import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from "./slides/userSlide";
import bookReducer from './slides/bookingSlide';
import scheduleReducer from "./slides/scheduleSlide";

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


const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['user']
}
const rootReducer = combineReducers({
  user: userReducer,
  book: bookReducer,
  schedules: scheduleReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store)