import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { personsReducer } from './reducers/reducers';

const rootReducer = combineReducers({ personsReducer });

export const setupStore = () => {
  return configureStore({ reducer: rootReducer });
};

export type RootType = ReturnType<typeof rootReducer>;
export type AppType = ReturnType<typeof setupStore>;
export type AppDispatch = AppType['dispatch'];
