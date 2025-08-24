import { COUNTRIES } from '../../constants/countries';
import { DataAddedToStore } from '../../test-utils/mockedData';
import { personsReducer, personsSlice } from './reducers';

describe('Person Reducer', () => {
  it('should set the initial state correctly', () => {
    expect(personsReducer(undefined, { type: '' })).toEqual({
      newlyAdded: null,
      uncontrolledData: [],
      rhfData: [],
      countries: COUNTRIES,
    });
  });
  it('should handle controlling last element correctly', () => {
    expect(
      personsReducer(undefined, personsSlice.actions.addNewly('uncontrolled'))
    ).toEqual({
      newlyAdded: 'uncontrolled',
      uncontrolledData: [],
      rhfData: [],
      countries: COUNTRIES,
    });
  });
  it('should handle adding newly element via RHForm correctly', () => {
    expect(
      personsReducer(
        undefined,
        personsSlice.actions.addRHFData(DataAddedToStore)
      )
    ).toEqual({
      newlyAdded: null,
      uncontrolledData: [],
      rhfData: [DataAddedToStore],
      countries: COUNTRIES,
    });
  });
  it('should handle adding newly element via uncontrolled form correctly', () => {
    expect(
      personsReducer(
        undefined,
        personsSlice.actions.addUncontrolledData(DataAddedToStore)
      )
    ).toEqual({
      newlyAdded: null,
      uncontrolledData: [DataAddedToStore],
      rhfData: [],
      countries: COUNTRIES,
    });
  });
});
