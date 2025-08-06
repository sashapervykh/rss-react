import {
  mockedAssetRequestResult,
  mockedAssetWithoutSource,
  TEST_REQUESTS,
} from '../test-utils/mockedCardsData';

import { getOneAssetFromApi } from './getOneAssetFromApi';

describe('getOneAssetFromApi', () => {
  it(`should return mock data for simple request`, async () => {
    const result = await getOneAssetFromApi(TEST_REQUESTS.simple);

    expect(result).toEqual(mockedAssetRequestResult);
  });
  it(`should return mock data for request without source`, async () => {
    const result = await getOneAssetFromApi(TEST_REQUESTS.withoutSource);

    expect(result).toEqual(mockedAssetWithoutSource);
  });
});
