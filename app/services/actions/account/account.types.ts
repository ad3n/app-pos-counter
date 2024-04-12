import type { Errors, JoinDateRaw } from "../../rest.types"

export type ChangePasswordSuccess = {
    success:true
    messages:string
}

export type PostChangePasswordRequest = {
    userId:number
    old_password:string
    password:string
}

export type StateChangePasswordRequest = {
    old_password:string
    password:string
    new_password:string
}