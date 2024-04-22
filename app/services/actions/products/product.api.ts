import { createApi, fetchBaseQuery, FetchArgs } from '@reduxjs/toolkit/query/react'
import { baseQuery } from "../../rest"
import { SuccessResponse } from '~/services/rest.types'
import { 
  ProductItem, ProductListResponse, PostRequestProduct, PutRequesProduct, BrandResponse, GetRequestProductCategory, GetRequestProduct, ProductCategoryResponse, TProductStockResponse, 
  PostProductStock, PutProductStock
} from "./product.types"

export const productsApi = createApi({
  baseQuery,
  tagTypes: ['Products', 'Brands', 'Stocks', 'Categories'],
  reducerPath:'products',
  endpoints: (build) => ({
    getProducts: build.query<ProductListResponse, GetRequestProduct>({
      query: (params) => ({
        url:'product/list/p',
        params:params
      }),
      providesTags: (result) =>
        result && result.count > 0 ? result.items.map(({ id }) => ({ type: 'Products', id })) : [],
    }),
    getProductsCategorized: build.query<ProductCategoryResponse, GetRequestProduct>({
      query: (params) => ({
        url:'product/categorized',
        params:params
      }),
      providesTags: (result) =>
        result ? result.map(({ id }) => ({ type: 'Products', id })) : [],
    }),
    getCategoryProducts: build.query<ProductCategoryResponse, GetRequestProductCategory>({
      query:(params) => ({
        url:`categories`,
        params:params
      }),
      keepUnusedDataFor:60 * 60 * 60,
      providesTags: (result) =>
        result && result.length > 0 ? result.map(({ id }) => ({ type: 'Categories', id })) : [],
    }),
    getBrands: build.query<BrandResponse, void>({
      query:()=> `brands`,
      providesTags: (result) =>
        result ? result.map(({ id }) => ({ type: 'Brands', id })) : [],
    }),
    addProduct: build.mutation<ProductItem, Partial<ProductItem>>({
      query: (body) => ({
        url: `product/new`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Products'],
    }),
    editProduct: build.mutation<ProductItem, Partial<ProductItem>>({
      query: (body) => ({
        url: `product/edit/${body.id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Products'],
    }),

    activateOrDeactivate: build.mutation<ProductItem, Pick<ProductItem, "id" | "active">>({
      query: (body) => ({
        url: `product/active/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Products'],
    }),

    getStocks: build.query<TProductStockResponse, number>({
      query: (id) => `product/stocks/${id}`,
      providesTags: (result) =>
        result?.data && result.data.length > 0 ? result.data.map(({ id }) => ({ type: 'Stocks', id })) : [],
    }),

    addStock: build.mutation<TProductStockResponse, PostProductStock>({
      query: (body) => ({
        url: `product/stocks/${body.product_id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Stocks'],
    }),

    editStock: build.mutation<TProductStockResponse, PutProductStock>({
      query: (body) => ({
        url: `product/stocks/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Stocks'],
    }),

    removeStock: build.mutation<TProductStockResponse, number>({
      query: (id) => ({
        url: `product/stocks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Stocks'],
    }),

  }),
})

// Auto-generated hooks
export const { 
  useGetProductsCategorizedQuery,
  useGetProductsQuery, 
  useAddProductMutation, 
  useGetCategoryProductsQuery, 
  useEditProductMutation,
  useActivateOrDeactivateMutation,
  useGetBrandsQuery,
  useGetStocksQuery,
  useAddStockMutation,
  useEditStockMutation,
  useRemoveStockMutation
} = productsApi
