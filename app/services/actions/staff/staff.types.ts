import { CollectionResponse } from "~/services/rest.types"
import { UserRole } from ".."

export type StaffItem = {
    id: number
  } & PostRequestStaff
    
export type PostRequestStaff = {
    name:string
    no_hp:string
    role:UserRole
    email:string 
    flag:number
    begun_at:string 
    exited_at:string 
    password?:string
    address?:string 
    photo?:string 
    active_work?:boolean
    merchant_id?:number
} 

export type StatesRequestStaff = {
    confirm_password?:string
} & PostRequestStaff
   
export type PutRequesStaff = { id: number } & PostRequestStaff
  
export type StaffListResponse = StaffItem[]

export type StaffDetailResponse = { user: StaffItem, stars:number }