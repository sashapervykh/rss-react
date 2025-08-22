import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Person {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: 'man' | 'woman';
}

export type PersonStorage = Person[];

export interface PersonsState {
  newlyAdded: Person | null;
  uncontrolledData: PersonStorage;
  rhfData: PersonStorage;
}

const initialState: PersonsState = {
  newlyAdded: null,
  uncontrolledData: [],
  rhfData: [],
};

export const personsSlice = createSlice({
  name: 'persons',
  initialState,
  reducers: {
    addNewly(state, action: PayloadAction<Person>) {
      state.newlyAdded = action.payload;
    },
    clearNewly(state) {
      state.newlyAdded = null;
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
