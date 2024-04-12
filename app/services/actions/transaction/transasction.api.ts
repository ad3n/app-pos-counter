import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from "../../rest"
import { SuccessResponse } from '~/services/rest.types'
import { 
  TransactionListResponse, 
  TransactionListExpenseResponse,
  TransactionItem, 
  TPostRequestIncome, 
  TGetRequestTransaction, 
  TPostRequestExpense,
  TPostRequestCart,
  TPutDeleteTransaction,
  TUpdatePaymentStatus,
  CartAddResponse,
  TransactionListIncomeResponse
} from "./transaction.types"

export const transactionApi = createApi({
  baseQuery,
  tagTypes: ['Transactions', 'Expenses', 'Incomes'],
  reducerPath:'transactions',
  endpoints: (build) => ({
    getTransactions: build.query<TransactionListResponse, Partial<TGetRequestTransaction>>({
      query: (params) => ({
        url:`transaction/list`,
        params
      }),
      providesTags: (result, error, arg) =>
        result?.items && result.items.length > 0
          ? [...result.items.map(({ id }) => ({ type: 'Transactions' as const, id })), 'Transactions']
          : ['Transactions'],
    }),

    getIncomes: build.query<TransactionListIncomeResponse, Partial<TGetRequestTransaction>>({
      query: (params) => ({
        url:`transaction/list/income`,
        params
      }),
      providesTags: (result, error, arg) =>
        result?.items && result.items.length > 0
          ? [...result.items.map(({ id }) => ({ type: 'Incomes' as const, id })), 'Incomes']
          : ['Incomes'],
    }),

    getExpenses: build.query<TransactionListExpenseResponse, Partial<TGetRequestTransaction>>({
      query: (params) => ({
        url:`transaction/list/expense`,
        params
      }),
      providesTags: (result, error, arg) =>
        result?.items && result.items.length > 0
          ? [...result.items.map(({ id }) => ({ type: 'Expenses' as const, id })), 'Expenses']
          : ['Expenses'],
    }),

    addTransactionIncome: build.mutation<SuccessResponse<TransactionItem>, TPostRequestIncome>({
      query: (body) => { 
        return {
          url: `transaction/add`,
          method: 'POST',
          body
        }
      },
      invalidatesTags: ['Transactions'],
    }),

    addTransactionExpense: build.mutation<SuccessResponse<TransactionItem>, TPostRequestExpense>({
      query: (body) => { 
        return {
          url: `transaction/new/expense`,
          method: 'POST',
          body
        }
      },
      invalidatesTags: ['Transactions'],
    }),

    addCart: build.mutation<CartAddResponse, TPostRequestCart>({
      query: (params) => ({
        url:`cart/new/${params.type}`,
        params
      })
    }),

    removeTransaction: build.mutation<SuccessResponse<any>, TPutDeleteTransaction>({
      query:(orderNo) => ({
        url:`transaction/${orderNo}/delete`,
        method:"DELETE"
      })
    }),

    updatePaymentStatus: build.mutation<SuccessResponse<any>, TUpdatePaymentStatus>({
      query:(params) => ({
        url:`transaction/payment/${params.orderNo}/set`,
        method:"POST",
        body:params
      })
    }),
  }),
})

// Auto-generated hooks
export const { 
  useGetTransactionsQuery,
  useGetExpensesQuery,
  useGetIncomesQuery,
  useAddTransactionIncomeMutation,
  useAddTransactionExpenseMutation,
  useAddCartMutation,
  useRemoveTransactionMutation,
  useUpdatePaymentStatusMutation
} = transactionApi