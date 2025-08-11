import { TEST_RESPONSES } from '../../test-utils/mockedAPIResponses';
import {
  mockedRequestResultWithoutDescription,
  mockedResultWithoutSource,
  mockedSeveralResults,
  mockedSimpleRequestResult,
} from '../../test-utils/mockedCardsData';

import { processSearchResponse } from './processSearchResponse';

describe('processSearchResponse', () => {
  it(`should return correct card data for response with one page`, async () => {
    const cardData = processSearchResponse(TEST_RESPONSES.simple);

    expect(cardData).toStrictEqual(mockedSimpleRequestResult);
  });
  it(`should return correct card data for response with several pages`, async () => {
    const cardData = processSearchResponse(TEST_RESPONSES.severalResults);

    expect(cardData).toStrictEqual(mockedSeveralResults);
  });
  it(`should return correct card data for response without description`, async () => {
    const cardData = processSearchResponse(TEST_RESPONSES.withoutDescription);

    expect(cardData).toStrictEqual(mockedRequestResultWithoutDescription);
  });
  it(`should return correct card data for response without source`, async () => {
    const cardData = processSearchResponse(TEST_RESPONSES.withoutSource);

    expect(cardData).toStrictEqual(mockedResultWithoutSource);
  });
});
