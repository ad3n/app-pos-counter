import { createSlice } from '@reduxjs/toolkit'
import { authApi } from "./auth.api"
import { AuthState, UserAuth } from "./auth.types"
import type { RootState } from '../../store'
import { jwtDecode, JwtPayload } from 'jwt-decode'
import { JWTAuth } from '~/services/rest.types'
import { setUserAuth, removeAuthToken, isTokenExists } from '~/services/models/auth.model'

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null } as AuthState,
  reducers: {
    removeAuth:(state)=>{
      removeAuthToken()
    }
  },
  selectors:{
    isAuthtoken:(state)=>state.token ? true:false
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        const decoded = jwtDecode<JWTAuth<UserAuth>>(payload.token)
        // remove old data
        removeAuthToken()
        // set new token
        setUserAuth({user:decoded.user, token:payload.token})

        state.token = payload.token
        state.user = decoded.user
      },
    )
  },
})

export default authSlice.reducer

export const { removeAuth } = authSlice.actions

export const selectCurrentUser = (state: RootState) => state.auth.user

export const isAuthtoken = (state: RootState) => state.auth.token ? true : false
