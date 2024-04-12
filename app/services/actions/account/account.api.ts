import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from "../../rest"
import { PostChangePasswordRequest, ChangePasswordSuccess } from "./account.types"

export const accountApi = createApi({
  baseQuery,
  tagTypes: ['Account'],
  reducerPath:'account',
  endpoints: (build) => ({
    changePassword: build.mutation<ChangePasswordSuccess, PostChangePasswordRequest>({
      query: (body) => ({
        url: `employee/password/${body.userId}`,
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
export const { useChangePasswordMutation } = accountApi