
import { CollectionResponse } from "~/services/rest.types"
export type CustomerItem = {
    id: number
    credits_total:number 
    credits_count:number 
    trx_count:number
  } & PostRequestCustomer
    
export type PostRequestCustomer = {
    name:string
    no_hp:string
    no_hp_2?:string
    no_hp_3?:string 
    note?:string 
    pln_token?:string 
    bpjs?:string 
    gopay_va?:string
    dana_va?:string
    shopee_va?:string
    ovo_va?:string 
    maxim_id?:string
    merchant_id?:number
} 
   
export type PutRequesCustomer = { id: number } & PostRequestCustomer
  
export type CustomerListResponse = CollectionResponse<CustomerItem[]>