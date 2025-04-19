import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const quotesApi = createApi({
  reducerPath: 'quotesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    getQuotes: builder.query({
      query: ({ limit = 6, skip = 0 }) => `quotes?limit=${limit}&skip=${skip}`,
      transformResponse: (response) => ({
        quotes: response.quotes,
        total: response.total
      })
    })
  })
});

export const { useGetQuotesQuery } = quotesApi;