import { createApi, fetchBaseQuery,  } from '@reduxjs/toolkit/query/react'
import { BaseQueryFn } from '@reduxjs/toolkit/query/react'
import { AppStore, store, RootState } from "./store"
import { getUserToken } from './models/auth.model'
 
export const baseQuery = fetchBaseQuery({ 
    baseUrl: import.meta.env.VITE_STAFF_API_URL,
    mode:'cors',
    prepareHeaders: async (headers, { getState }) => {
        const auth = await getUserToken()
        //const token = (getState() as any)?.auth?.token
        // // If we have a token set in state, let's assume that we should be passing it.
        //headers.append("Access-Control-Allow-Origin", '*');
        headers.append("Content-Type", 'application/json');

        if (auth?.token) {
            headers.set('authorization', `Bearer ${auth?.token}`);
        }
        return headers;
      },
  })