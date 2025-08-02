import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SearchResultType } from '../../api/types';

interface SelectorState {
  amount: number;
  cards: SearchResultType[];
}

const initialState: SelectorState = {
  amount: 0,
  cards: [],
};

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    addCard(state, action: PayloadAction<SearchResultType>) {
      console.log(action);
      state.cards.push(action.payload);
      state.amount += 1;
    },
    deleteCard(state, action: PayloadAction<SearchResultType>) {
      console.log(action);
      state.cards = state.cards.filter(
        (elem) => elem.nasa_id === action.payload.nasa_id
      );
      state.amount -= 1;
    },
  },
});

export default cardSlice.reducer;
