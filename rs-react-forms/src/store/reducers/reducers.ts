import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Person } from '../../models/types';
import { COUNTRIES } from '../../constants/countries';

export type PersonStorage = Person[];

export interface PersonsState {
  newlyAdded: 'rhf' | 'uncontrolled' | null;
  uncontrolledData: PersonStorage;
  rhfData: PersonStorage;
  countries: string[];
}

const initialState: PersonsState = {
  newlyAdded: null,
  uncontrolledData: [],
  rhfData: [],
  countries: COUNTRIES,
};

export const personsSlice = createSlice({
  name: 'persons',
  initialState,
  reducers: {
    addNewly(state, action: PayloadAction<'rhf' | 'uncontrolled'>) {
      state.newlyAdded = action.payload;
    },

    addRHFData(state, action: PayloadAction<Person>) {
      state.rhfData.push(action.payload);
    },
    addUncontrolledData(state, action: PayloadAction<Person>) {
      state.uncontrolledData.push(action.payload);
    },
  },
});

export const personsReducer = personsSlice.reducer;
