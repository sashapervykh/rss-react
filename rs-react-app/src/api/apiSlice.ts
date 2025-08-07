import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { processDetailsResponse } from './processDetailsResponse';
import { processSearchResponse } from './processSearchResponse';
import {
  APIDataScheme,
  type APIResponseType,
  type AssetType,
  type SearchData,
} from './types';

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
    getTransformedDataFromApi: build.query<SearchData | AssetType, QueryParams>(
      {
        query: (params) => ({
          url: 'search',
          params: { ...params, page_size: 10 },
        }),
        rawResponseSchema: APIDataScheme,
        transformResponse: (response: APIResponseType, _, args) => {
          if (args.q || (!args.q && !args.nasa_id)) {
            return processSearchResponse(response);
          }
          return processDetailsResponse(response);
        },
      }
    ),
  }),
});

export const { useGetTransformedDataFromApiQuery } = nasaApi;
