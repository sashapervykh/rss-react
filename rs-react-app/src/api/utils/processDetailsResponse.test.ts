import { TEST_RESPONSES } from '../../test-utils/mockedAPIResponses';
import {
  mockedAssetRequestResult,
  mockedAssetWithoutDescription,
  mockedAssetWithoutSource,
} from '../../test-utils/mockedCardsData';

import { processDetailsResponse } from './processDetailsResponse';

describe('processDetailsResponse', () => {
  it(`should return correct card data for response with one page`, async () => {
    const cardData = processDetailsResponse(TEST_RESPONSES.simple);

    expect(cardData).toStrictEqual(mockedAssetRequestResult);
  });
  it(`should return correct card data for response without source`, async () => {
    const cardData = processDetailsResponse(TEST_RESPONSES.withoutSource);

    expect(cardData).toStrictEqual(mockedAssetWithoutSource);
  });
  it(`should return correct card data for response without description`, async () => {
    const cardData = processDetailsResponse(TEST_RESPONSES.withoutDescription);

    expect(cardData).toStrictEqual(mockedAssetWithoutDescription);
  });
});
