import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQuery } from "../../rest"
import { LoginResponse, LoginSuccess, LoginRequest } from "./auth.types"

export const authApi = createApi({
  baseQuery,
  tagTypes: ['Authentication'],
  reducerPath:'authentication',
  endpoints: (build) => ({
    login: build.mutation<LoginSuccess, LoginRequest>({
      query: (body) => ({
        url: `login`,
        method: 'POST',
        body,
      }),
      async onCacheEntryAdded(arg, { getState }) {
        console.log("onCacheEntryAdded", getState())
      }
    }),
  })
})

// Auto-generated hooks
export const { useLoginMutation } = authApi