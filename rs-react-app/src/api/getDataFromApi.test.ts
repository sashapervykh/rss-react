import {
  mockedEmptyRequestResult,
  mockedRequestResultWithoutDescription,
  mockedSimpleRequestResult,
  TEST_REQUESTS,
} from '../test-utils/mockedCardsData';

import { getDataFromApi } from './getDataFromApi';

describe('getDataFromApi', () => {
  it(`should return mock data for simple request`, async () => {
    const result = await getDataFromApi({ input: TEST_REQUESTS.simple });

    expect(result).toEqual(mockedSimpleRequestResult);
  });
  it(`should return mock data for response without description`, async () => {
    const result = await getDataFromApi({
      input: TEST_REQUESTS.withoutDescription,
    });

    expect(result).toEqual(mockedRequestResultWithoutDescription);
  });
  it(`should throw Error with correct description for status 404`, async () => {
    await expect(
      getDataFromApi({ input: TEST_REQUESTS.notFound })
    ).rejects.toThrowError(
      'There is a problem with API response. The requested resource is not found. Status code: 404'
    );
  });
  it(`should throw Error with correct description for status 503`, async () => {
    await expect(
      getDataFromApi({ input: TEST_REQUESTS.unavailableServer })
    ).rejects.toThrowError(
      'There is a problem with API response. The server is unavailable now. Try again later. Status code: 503'
    );
  });
  it(`should throw Error with correct description for status >= 400 & <500`, async () => {
    await expect(
      getDataFromApi({ input: TEST_REQUESTS.clientError })
    ).rejects.toThrowError(
      'There is a problem with API response. This is a client-side problem. Status code: 403'
    );
  });
  it(`should throw Error with correct description for status >= 500`, async () => {
    await expect(
      getDataFromApi({ input: TEST_REQUESTS.serverError })
    ).rejects.toThrowError(
      'There is a problem with API response. This is a server-side problem. Status code: 504'
    );
  });
  it(`should return mock data for Empty response`, async () => {
    const result = await getDataFromApi({ input: TEST_REQUESTS.empty });

    expect(result).toEqual(mockedEmptyRequestResult);
  });
});
