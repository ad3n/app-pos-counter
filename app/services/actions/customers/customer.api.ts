import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from "../../rest"
import { SuccessResponse } from '~/services/rest.types'
import { CustomerListResponse, PostRequestCustomer, PutRequesCustomer, CustomerItem } from "./customer.types"

export const customerApi = createApi({
  baseQuery,
  tagTypes: ['Customers'],
  reducerPath:'customers',
  endpoints: (build) => ({
    getCustomers: build.query<CustomerListResponse, void>({
      query: () => '/customers',
      providesTags: (result, error, arg) =>
        result && result?.count > 0 
          ? [...result.data.map(({ id }) => ({ type: 'Customers' as const, id })), 'Customers']
          : ['Customers'],
    }),

    getCustomer: build.query<CustomerItem, void>({
      query: (id) => `/customers/transactions`,
    }),

    addCustomer: build.mutation<SuccessResponse<CustomerItem>, PostRequestCustomer>({
      query: (body) => { 
        return {
          url: `customers/new`,
          method: 'POST',
          body
        }
      },
      invalidatesTags: ['Customers'],
    }),

    editCustomer: build.mutation<SuccessResponse<CustomerItem>, PutRequesCustomer>({
      query: (body) => { 
        return {
          url: `customers/edit/${body.id}`,
          method: 'POST',
          body
        }
      },
      invalidatesTags: ['Customers'],
    }),

  }),
})

// Auto-generated hooks
export const { useGetCustomersQuery, useGetCustomerQuery, useAddCustomerMutation, useEditCustomerMutation } = customerApi