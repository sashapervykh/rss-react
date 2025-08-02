import { combineReducers, configureStore } from '@reduxjs/toolkit';
import CardReducer from './reducers/CardSlice';

const reducers = combineReducers({
  CardReducer,
});

export const setupStore = () =>
  configureStore({
    reducer: reducers,
  });

export type Reducers = ReturnType<typeof reducers>;
export type Store = ReturnType<typeof setupStore>;
export type Dispatch = Store['dispatch'];
