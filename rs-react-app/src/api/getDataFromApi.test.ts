import { getDataFromApi } from './getDataFromApi';
import {
  mockedEmptyRequestResult,
  mockedRequestResultWithoutDescription,
  mockedSimpleRequestResult,
} from '../test-utils/mockedCardsData';

describe('getDataFromApi', () => {
  it(`should return mock data for simple request`, async () => {
    const result = await getDataFromApi({ input: 'simpleRequest' });

    expect(result).toEqual(mockedSimpleRequestResult);
  });
  it(`should return mock data for response without description`, async () => {
    const result = await getDataFromApi({ input: 'without description' });

    expect(result).toEqual(mockedRequestResultWithoutDescription);
  });
  it(`should throw Error with correct description for status 404`, async () => {
    expect(getDataFromApi({ input: 'not found' })).rejects.toThrowError(
      'There is a problem with API response. The requested resource is not found. Status code: 404'
    );
  });
  it(`should throw Error with correct description for status 503`, async () => {
    expect(
      getDataFromApi({ input: 'unavailable server' })
    ).rejects.toThrowError(
      'There is a problem with API response. The server is unavailable now. Try again later. Status code: 503'
    );
  });
  it(`should throw Error with correct description for status >= 400`, async () => {
    expect(getDataFromApi({ input: 'client error' })).rejects.toThrowError(
      'There is a problem with API response. This is a client-side problem. Status code: 403'
    );
  });
  it(`should throw Error with correct description for status >= 500`, async () => {
    expect(getDataFromApi({ input: 'server error' })).rejects.toThrowError(
      'There is a problem with API response. This is a server-side problem. Status code: 504'
    );
  });
  it(`should return mock data for Empty response`, async () => {
    const result = await getDataFromApi({ input: '' });

    expect(result).toEqual(mockedEmptyRequestResult);
  });
});
