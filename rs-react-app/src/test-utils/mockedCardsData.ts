import type { AssetType, SearchResultType } from '../api/utils/types';

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
  withoutSource: 'without source',
  zeroResults: 'zero results',
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
      source: 'test.jpg',
      nasa_id: TEST_REQUESTS.simple,
    },
  ],
};

export const mockedAssetRequestResult: AssetType = {
  title: TEST_REQUESTS.simple,
  description: `Testing data for ${TEST_REQUESTS.simple}`,
  media_type: 'image',
  source: 'test.jpg',
  keywords: [TEST_REQUESTS.simple],
};

export const mockedAssetWithoutSource: AssetType = {
  title: TEST_REQUESTS.withoutSource,
  description: `Testing data for ${TEST_REQUESTS.withoutSource}`,
  media_type: 'video',
  source: undefined,
  keywords: [TEST_REQUESTS.withoutSource],
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
      source: 'test.jpg',
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
      source: 'test.jpg',
      nasa_id: TEST_REQUESTS.empty,
    },
  ],
};

export const mockedSeveralResults: {
  max: number;
  results: SearchResultType[];
} = {
  max: 2,
  results: Array.from({ length: 10 }, (_, index) =>
    index % 2 === 0
      ? mockedSimpleRequestResult.results[0]
      : mockedRequestResultWithoutDescription.results[0]
  ).map((elem, index) => {
    return { ...elem, nasa_id: elem.nasa_id + index.toString() };
  }),
};
