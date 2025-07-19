export const TEST_REQUESTS = {
  simple: 'simple',
  withoutDescription: 'without description',
  empty: '',
  severalResults: 'several results',
  notFound: 'not found',
  unavailableServer: 'unavailable server',
  serverError: 'server error',
  clientError: 'client error',
};

export const mockedSimpleRequestResult = [
  {
    title: TEST_REQUESTS.simple,
    description: `Testing data for ${TEST_REQUESTS.simple}`,
    media_type: 'image',
    source: 'test.com',
  },
];

export const mockedRequestResultWithoutDescription = [
  {
    title: TEST_REQUESTS.withoutDescription,
    description: `NASA did not provide any description for this item(((`,
    media_type: 'video',
    source: 'test.com',
  },
];

export const mockedEmptyRequestResult = [
  {
    title: TEST_REQUESTS.empty,
    description: `Testing data for ${TEST_REQUESTS.empty}`,
    media_type: 'audio',
    source: 'test.com',
  },
];
