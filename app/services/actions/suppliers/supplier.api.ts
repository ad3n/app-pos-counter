import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQuery } from "../../rest"
import { SuccessResponse } from '~/services/rest.types'
import { SupplierListResponse, SupplierItem, PostRequestSupplier, PutRequestSupplier } from "./supplier.types"
import { getUserToken  } from '~/services/models/auth.model'


export const supplierApi = createApi({
  baseQuery,
  tagTypes: ['Suppliers'],
  endpoints: (build) => ({
    getSuppliers: build.query<SupplierListResponse, void>({
      query: () => '/suppliers',
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Suppliers' as const, id })), 'Suppliers']
          : ['Suppliers'],
    }),

    addSupplier: build.mutation<SuccessResponse<SupplierItem>, PostRequestSupplier>({
      query: (body) => { 
        return {
          url: `suppliers/new`,
          method: 'POST',
          body
        }
      },
      invalidatesTags: ['Suppliers'],
    }),

    editSupplier: build.mutation<SuccessResponse<SupplierItem>, PutRequestSupplier>({
      query: (body) => { 
        return {
          url: `suppliers/edit/${body.id}`,
          method: 'POST',
          body
        }
      },
      invalidatesTags: ['Suppliers'],
    }),

  }),
})

// Auto-generated hooks
export const { useGetSuppliersQuery, useAddSupplierMutation, useEditSupplierMutation } = supplierApi