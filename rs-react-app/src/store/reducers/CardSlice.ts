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
      state.cards.push(action.payload);
      state.amount += 1;
      console.log(state.amount, state.cards);
    },
    deleteCard(state, action: PayloadAction<SearchResultType>) {
      state.cards = state.cards.filter(
        (elem) => elem.nasa_id !== action.payload.nasa_id
      );
      state.amount -= 1;
      console.log(state.amount, state.cards);
    },
    clear(state) {
      state.amount = 0;
      state.cards = [];
    },
  },
});

export default cardSlice.reducer;
