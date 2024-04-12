import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from "../../rest"
import { SuccessResponse } from '~/services/rest.types'
import { StaffItem, PutRequesStaff, PostRequestStaff, StaffListResponse, StaffDetailResponse } from "./staff.types"

export const staffApi = createApi({
  baseQuery,
  tagTypes: ['Staffs'],
  reducerPath:'Staffs',
  endpoints: (build) => ({
    getStaffs: build.query<StaffListResponse, void>({
      query: () => '/employee',
      providesTags: (result, error, arg) =>
        result 
          ? [...result.map(({ id }) => ({ type: 'Staffs' as const, id })), 'Staffs']
          : ['Staffs'],
    }),

    addCStaff: build.mutation<SuccessResponse<StaffItem>, PostRequestStaff>({
      query: (body) => { 
        return {
          url: `employee/new`,
          method: 'POST',
          body
        }
      },
      invalidatesTags: ['Staffs'],
    }),

    editStaff: build.mutation<SuccessResponse<StaffItem>, PutRequesStaff>({
      query: (body) => { 
        return {
          url: `employee/edit/${body.id}`,
          method: 'POST',
          body
        }
      },
      invalidatesTags: ['Staffs'],
    }),

    detailStaff: build.query<StaffDetailResponse, number>({
      query: (id) => `/employee/me/${id}`
    }),
  }),
})

// Auto-generated hooks
export const { 
  useGetStaffsQuery, 
  useAddCStaffMutation, 
  useEditStaffMutation,
  useDetailStaffQuery
} = staffApi