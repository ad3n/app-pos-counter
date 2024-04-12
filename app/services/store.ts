
import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { 
  productsApi, 
  supplierApi, 
  authApi, 
  customerApi, 
  accountApi,
  staffApi,
  providerApi,
  transactionApi
} from './actions'
import authSlice from './actions/auth/auth.slice'
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer =  combineReducers({
  [productsApi.reducerPath]: productsApi.reducer,
  [supplierApi.reducerPath]: supplierApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [customerApi.reducerPath]: customerApi.reducer,
  [accountApi.reducerPath]: accountApi.reducer,
  [staffApi.reducerPath]: staffApi.reducer,
  [providerApi.reducerPath]: providerApi.reducer,
  [transactionApi.reducerPath]: transactionApi.reducer,
  auth: authSlice
})

export const makeStore = configureStore({
  reducer:rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productsApi.middleware, 
      supplierApi.middleware, 
      authApi.middleware,
      customerApi.middleware,
      staffApi.middleware,
      providerApi.middleware,
      transactionApi.middleware
    ),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(makeStore.dispatch)

export const store = makeStore
export type RootState = ReturnType<typeof store.getState>
export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]

// // Infer the type of `store`
// export type AppStore = typeof store
// // Infer the `AppDispatch` t>ype from the store itself
// export type AppDispatch = AppStore["dispatch"]

// import type { Action, ThunkAction } from "@reduxjs/toolkit"
// import { combineSlices, configureStore } from "@reduxjs/toolkit"
// import { setupListeners } from "@reduxjs/toolkit/query"

// // `combineSlices` automatically combines the reducers using
// // their `reducerPath`s, therefore we no longer need to call `combineReducers`.
// const rootReducer = combineSlices(counterSlice, quotesApiSlice)
// // Infer the `RootState` type from the root reducer
// export type RootState = ReturnType<typeof rootReducer>

// // The store setup is wrapped in `makeStore` to allow reuse
// // when setting up tests that need the same store config
// export const makeStore = (preloadedState?: Partial<RootState>) => {
//   const store = configureStore({
//     reducer: rootReducer,
//     // Adding the api middleware enables caching, invalidation, polling,
//     // and other useful features of `rtk-query`.
//     middleware: getDefaultMiddleware => {
//       return getDefaultMiddleware().concat(quotesApiSlice.middleware)
//     },
//     preloadedState,
//   })
//   // configure listeners using the provided defaults
//   // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
//   setupListeners(store.dispatch)
//   return store
// }

// export const store = makeStore()

// // Infer the type of `store`
// export type AppStore = typeof store
// // Infer the `AppDispatch` type from the store itself
// export type AppDispatch = AppStore["dispatch"]
// export type AppThunk<ThunkReturnType = void> = ThunkAction<
//   ThunkReturnType,
//   RootState,
//   unknown,
//   Action