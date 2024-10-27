import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from './auth/slice';
import usersSlice from './users/slice';
import filtersSlice from './filters/slice';
import waterReducer from './water/slice.js';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const usersPersistConfig = {
  key: 'users',
  storage,
  whitelist: ['user'],
};

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const waterPersistConfig = {
  key: 'water',
  storage,
  whitelist: ['dailyNorma'],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authSlice);
const persistedWaterReducer = persistReducer(waterPersistConfig, waterReducer);
const persistedUsersReducer = persistReducer(usersPersistConfig, usersSlice);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    users: persistedUsersReducer,
    filters: filtersSlice,
    water: persistedWaterReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
