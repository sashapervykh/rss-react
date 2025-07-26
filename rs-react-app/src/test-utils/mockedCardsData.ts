import type { SearchResultType } from '../api/types';

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

export const mockedSimpleRequestResult: {
  max: number;
  results: SearchResultType[];
} = {
  max: 1,
  results: [
    {
      title: TEST_REQUESTS.simple,
      description: `Testing data for ${TEST_REQUESTS.simple}`,
      media_type: 'image',
      source: 'test.com',
      nasa_id: TEST_REQUESTS.simple,
    },
  ],
};

export const mockedRequestResultWithoutDescription: {
  max: number;
  results: SearchResultType[];
} = {
  max: 1,
  results: [
    {
      title: TEST_REQUESTS.withoutDescription,
      description: `NASA did not provide any description for this item(((`,
      media_type: 'video',
      source: 'test.com',
      nasa_id: TEST_REQUESTS.withoutDescription,
    },
  ],
};

export const mockedEmptyRequestResult: {
  max: number;
  results: SearchResultType[];
} = {
  max: 1,
  results: [
    {
      title: TEST_REQUESTS.empty,
      description: `Testing data for ${TEST_REQUESTS.empty}`,
      media_type: 'audio',
      source: 'test.com',
      nasa_id: TEST_REQUESTS.empty,
    },
  ],
};

export const mockedResultWithoutSource: {
  max: number;
  results: SearchResultType[];
} = {
  max: 1,
  results: [
    {
      title: TEST_REQUESTS.simple,
      description: `Testing data for ${TEST_REQUESTS.simple}`,
      media_type: 'image',
      source: undefined,
      nasa_id: TEST_REQUESTS.simple,
    },
  ],
};

export const mockedSeveralResults: {
  max: number;
  results: SearchResultType[];
} = {
  max: 1,
  results: Array.from({ length: 10 }, (_, index) =>
    index % 2 === 0
      ? mockedSimpleRequestResult.results[0]
      : mockedRequestResultWithoutDescription.results[0]
  ),
};
