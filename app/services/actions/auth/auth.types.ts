import type { Errors, JoinDateRaw } from "../../rest.types"

export type LoginSuccess = {
    success:true
    token:string
}

export enum UserRole {
    administrator = "administrator", 
    staff = "staff", 
    manager = "manager"
}

export type UserAuth = {
    id: number,
    merchant_id: number,
    no_hp: string,
    name: string,
    address: string,
    role: UserRole,
    email: string,
    photo: null | string,
    flag: 0 | 1,
    begun_at: null | string,
    exited_at: null | string,
    active_work: 0 | 1,
    device_no: null | string,
    user_agent: null | string,
    ip_address: null | string,
    created_at: string,
    updated_at: null | null,
    join_date:JoinDateRaw
}

export type LoginResponse = LoginSuccess | Errors

export type LoginRequest = {
    no_hp:string
    password:string
}

export type AuthState = {
    user: UserAuth | null
    token: string | null
}
  