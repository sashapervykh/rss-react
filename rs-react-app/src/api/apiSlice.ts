import { createApi, type BaseQueryFn } from '@reduxjs/toolkit/query/react';

import { processAPIFailure } from './utils/processAPIFailure';
import { processDetailsResponse } from './utils/processDetailsResponse';
import { processSearchResponse } from './utils/processSearchResponse';
import {
  APIDataScheme,
  type APIResponseType,
  type AssetType,
  type SearchData,
} from './utils/types';

interface ResultsParams {
  q?: string;
  page: number;
}
interface DetailsParams {
  nasa_id: string;
}

interface ArgsParams {
  url: string;
  params: {
    media_type?: string;
    page_size?: number;
    q?: string | undefined;
    page?: number;
    nasa_id?: string;
  };
}

const customBaseQuery: BaseQueryFn<ArgsParams, unknown, unknown> = async (
  args
) => {
  try {
    let result: Response;
    const { url, params } = args;

    switch (true) {
      case 'nasa_id' in params:
        result = await fetch(
          `https://images-api.nasa.gov/${url}?nasa_id=${params.nasa_id}`
        );

        break;
      case 'q' in params && 'page' in params:
        if (!params.page)
          throw new Error('Data about the page is not received!');
        result = await fetch(
          `https://images-api.nasa.gov/${url}?q=${params.q}&page=${params.page.toString()}&page_size=10`
        );
        break;
      default:
        if (!params.page)
          throw new Error('Data about the page is not received!');
        result = await fetch(
          `https://images-api.nasa.gov/${url}?media_type=image&page=${params.page.toString()}&page_size=10`
        );
        break;
    }

    processAPIFailure(result);
    const body = await result.json();
    return { data: body };
  } catch (error) {
    if (error instanceof Error) {
      return { error: { status: 'API Error', data: error.message } };
    }
    return {
      error: {
        status: 'API Error',
        data: 'There is an unknown error in API request. Try again later...',
      },
    };
  }
};

export const nasaApi = createApi({
  reducerPath: 'nasaApi',
  baseQuery: customBaseQuery,
  keepUnusedDataFor: 600,
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
        params: { ...params },
      }),
      rawResponseSchema: APIDataScheme,
      transformResponse: (response: APIResponseType) => {
        return processDetailsResponse(response);
      },
    }),
  }),
});

export const { useGetResultsQuery, useGetDetailsQuery } = nasaApi;
