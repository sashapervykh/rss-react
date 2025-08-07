import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { processDetailsResponse } from './processDetailsResponse';
import { processSearchResponse } from './processSearchResponse';
import {
  APIDataScheme,
  type APIResponseType,
  type AssetType,
  type SearchData,
} from './types';

interface ResultsParams {
  q?: string;
  page: number;
}
interface DetailsParams {
  nasa_id: string;
  page: number;
}

export const nasaApi = createApi({
  reducerPath: 'nasaApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://images-api.nasa.gov',
  }),
  endpoints: (build) => ({
    getResults: build.query<SearchData, ResultsParams>({
      query: (params) => {
        if (!params.q)
          return {
            url: 'search',
            params: { ...params, media_type: 'image', page_size: 10 },
          };
        return {
          url: 'search',
          params: { ...params, page_size: 10 },
        };
      },
      rawResponseSchema: APIDataScheme,
      transformResponse: (response: APIResponseType) => {
        return processSearchResponse(response);
      },
    }),
    getDetails: build.query<AssetType, DetailsParams>({
      query: (params) => ({
        url: 'search',
        params: { ...params, page_size: 10 },
      }),
      rawResponseSchema: APIDataScheme,
      transformResponse: (response: APIResponseType) => {
        return processDetailsResponse(response);
      },
    }),
  }),
});

export const { useGetResultsQuery, useGetDetailsQuery } = nasaApi;
