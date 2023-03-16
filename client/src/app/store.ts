import storage from 'redux-persist/lib/storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore, REGISTER, PERSIST } from 'redux-persist';

import authReducer from './authSlice';

const persistConfig = {
  key: 'root',
  storage
};

const rootReducer = combineReducers({
  auth: authReducer
});

const presistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: presistedReducer,
  // https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: { ignoredActions: [PERSIST, REGISTER] } })
});

export const presistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
