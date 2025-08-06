import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { type SearchResultType } from './types';

interface QueryParams {
  q?: string;
  nasa_id?: string;
  page: number;
}

export const nasaApi = createApi({
  reducerPath: 'nasaApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://images-api.nasa.gov',
  }),
  endpoints: (build) => ({
    getTransformedDataFromApi: build.query<SearchResultType, QueryParams>({
      query: (params) => ({
        url: 'search',
        params: { ...params, page_size: 10 },
      }),
    }),
  }),
});

export const { useGetTransformedDataFromApiQuery } = nasaApi;
