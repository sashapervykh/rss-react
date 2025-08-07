import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { processSearchResponse } from './processSearchResponse';
import { APIDataScheme, type SearchData } from './types';

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
    getTransformedDataFromApi: build.query<SearchData | undefined, QueryParams>(
      {
        query: (params) => ({
          url: 'search',
          params: { ...params, page_size: 10 },
        }),
        transformResponse: (
          response: z.infer<typeof APIDataScheme>,
          meat,
          args
        ) => {
          if (args.q || (!args.q && !args.nasa_id)) {
            return processSearchResponse(response);
          }
          return;
        },
      }
    ),
  }),
});

export const { useGetTransformedDataFromApiQuery } = nasaApi;
