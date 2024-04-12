
export type SupplierItem = {
  id: number
  country_id:number
  province_id:number 
  regency_id:number 
} & PostRequestSupplier
  
export type PostRequestSupplier = {
  name:string
  address:string 
  phone:string 
  sales_person:string 
  sales_contact:string 
  telp:string 
  merchant_id?:number
} 
 
export type PutRequestSupplier = { id: number } & PostRequestSupplier

export type SupplierListResponse = SupplierItem[]