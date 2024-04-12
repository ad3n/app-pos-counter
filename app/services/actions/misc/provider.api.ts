import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from "../../rest"
import { SuccessResponse } from '~/services/rest.types'
import { ProviderListResponse } from "./provider.types"

export const providerApi = createApi({
  baseQuery,
  tagTypes: ['Providers'],
  reducerPath:'providers',
  endpoints: (build) => ({
    getProviders: build.query<ProviderListResponse, void>({
      query: () => '/providers',
      providesTags: (result, error, arg) =>
        result?.data && result.data.length > 0
          ? [...result.data.map(({ id }) => ({ type: 'Providers' as const, id })), 'Providers']
          : ['Providers'],
    })
  }),
})

// Auto-generated hooks
export const { useGetProvidersQuery } = providerApi