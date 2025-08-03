import { describe, it, expect } from 'vitest';
import cardReducer, { cardSlice } from '../reducers/CardSlice';
import {
  mockedEmptyRequestResult,
  mockedSimpleRequestResult,
} from '../../test-utils/mockedCardsData';

describe('card reducer reducer', () => {
  it('should set the initial state correctly', () => {
    expect(cardReducer(undefined, { type: '' })).toEqual({
      amount: 0,
      cards: [],
    });
  });
  it('should handle adding card correctly', () => {
    expect(
      cardReducer(
        undefined,
        cardSlice.actions.addCard(mockedSimpleRequestResult.results[0])
      )
    ).toEqual({
      amount: 1,
      cards: [mockedSimpleRequestResult.results[0]],
    });
  });
  it('should handle removing card correctly', () => {
    expect(
      cardReducer(
        {
          amount: 2,
          cards: [
            mockedSimpleRequestResult.results[0],
            mockedEmptyRequestResult.results[0],
          ],
        },
        cardSlice.actions.deleteCard(mockedSimpleRequestResult.results[0])
      )
    ).toEqual({
      amount: 1,
      cards: [mockedEmptyRequestResult.results[0]],
    });
  });
  it('should handle clearing cards correctly', () => {
    expect(
      cardReducer(
        {
          amount: 2,
          cards: [
            mockedSimpleRequestResult.results[0],
            mockedEmptyRequestResult.results[0],
          ],
        },
        cardSlice.actions.clear()
      )
    ).toEqual({
      amount: 0,
      cards: [],
    });
  });
});
