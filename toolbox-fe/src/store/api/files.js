import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8080/'
})

export const api = createApi({
  baseQuery,
  endpoints: builder => ({
    fetchFilesData: builder.query({
      query: fileName =>
        fileName === undefined
          ? 'files/data'
          : `files/data?fileName=${fileName}`,
      transformResponse: response => response.data,
      transformErrorResponse: response => response.error
    }),
    fetchFilesList: builder.query({
      query: () => 'files/list',
      transformResponse: response => response.data,
      transformErrorResponse: response => response.error
    })
  })
})

export const { useFetchFilesDataQuery, useFetchFilesListQuery } = api
