import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse } from '../types/types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    searchPeople: builder.query<ApiResponse, { query: string; page: number }>({
      query: ({ query, page }) => `people/?search=${query}&page=${page}`,
    }),
  }),
});

export const { useSearchPeopleQuery } = api;
