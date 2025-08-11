import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { nasaApi } from '../api/apiSlice';

import CardReducer from './reducers/CardSlice';

const reducers = combineReducers({
  CardReducer,
  [nasaApi.reducerPath]: nasaApi.reducer,
});

export const setupStore = () =>
  configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(nasaApi.middleware),
  });

export type Reducers = ReturnType<typeof reducers>;
export type Store = ReturnType<typeof setupStore>;
export type Dispatch = Store['dispatch'];
