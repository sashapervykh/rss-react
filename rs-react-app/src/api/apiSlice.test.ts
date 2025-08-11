import { setupStore } from '../store/store';
import {
  mockedAssetRequestResult,
  mockedEmptyRequestResult,
  mockedSimpleRequestResult,
  TEST_REQUESTS,
} from '../test-utils/mockedCardsData';

import { nasaApi } from './apiSlice';

describe('apiSlice', () => {
  it(`should return correct data for id request`, async () => {
    const store = setupStore();

    const result = await store.dispatch(
      nasaApi.endpoints.getDetails.initiate({ nasa_id: TEST_REQUESTS.simple })
    );

    expect(result.data).toStrictEqual(mockedAssetRequestResult);
  });
  it(`should return correct data for card list request`, async () => {
    const store = setupStore();

    const result = await store.dispatch(
      nasaApi.endpoints.getResults.initiate({
        q: TEST_REQUESTS.simple,
        page: 1,
      })
    );

    expect(result.data).toStrictEqual(mockedSimpleRequestResult);
  });
  it(`should return correct data for empty card list request`, async () => {
    const store = setupStore();

    const result = await store.dispatch(
      nasaApi.endpoints.getResults.initiate({
        page: 1,
      })
    );

    expect(result.data).toStrictEqual(mockedEmptyRequestResult);
  });
  it(`should return correct data for empty card list request`, async () => {
    const store = setupStore();

    const result = await store.dispatch(
      nasaApi.endpoints.getResults.initiate({
        q: TEST_REQUESTS.notFound,
        page: 1,
      })
    );

    expect(result.error).toStrictEqual({
      status: 'API Error',
      data: 'The requested resource is not found. Status code: 404',
    });
  });
});
