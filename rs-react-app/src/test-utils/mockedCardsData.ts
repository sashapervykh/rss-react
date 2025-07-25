import type { SearchResultType } from '../api/getDataFromApi';

export interface MockResultType {
  title: string;
  description: string;
  source: string;
  media_type: 'audio' | 'video' | 'image';
}

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

export const mockedSimpleRequestResult: MockResultType[] = [
  {
    title: TEST_REQUESTS.simple,
    description: `Testing data for ${TEST_REQUESTS.simple}`,
    media_type: 'image',
    source: 'test.com',
  },
];

export const mockedRequestResultWithoutDescription: MockResultType[] = [
  {
    title: TEST_REQUESTS.withoutDescription,
    description: `NASA did not provide any description for this item(((`,
    media_type: 'video',
    source: 'test.com',
  },
];

export const mockedEmptyRequestResult: MockResultType[] = [
  {
    title: TEST_REQUESTS.empty,
    description: `Testing data for ${TEST_REQUESTS.empty}`,
    media_type: 'audio',
    source: 'test.com',
  },
];

export const mockedResultWithoutSource: SearchResultType[] = [
  {
    title: TEST_REQUESTS.simple,
    description: `Testing data for ${TEST_REQUESTS.simple}`,
    media_type: 'image',
    source: undefined,
  },
];

export const mockedSeveralResults = Array.from({ length: 10 }, (elem, index) =>
  index % 2 === 0
    ? mockedSimpleRequestResult[0]
    : mockedRequestResultWithoutDescription[0]
);
