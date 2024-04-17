
import { EProductTypes } from "~/_types"
import { Collection, JoinDateRaw, TOrder, SuccessResponse } from "~/services/rest.types"

export type ProductItem = {
    id: number
    regular_price?:number
    brand_name?:string 
    supplier_name?:string
    category?:string
    total_qty:number | null
} & PostRequestProduct
    
export type PostRequestProduct = {
    name:string
    code:string
    type:EProductTypes 
    category_id:number
    price?:number
    sale_price?:number 
    supplier_id?:number 
    brand_id?:number 
    on_sale?:boolean 
    capital_cost?:number
    merchant_id?:number
    active?: boolean | number
} 

export type BrandItem = {
    id:number 
    name:string 
    join_date:JoinDateRaw
}

export type StockItem = {
    id:number 
    qty:number 
    type:string 
    created_at:string 
    updated_at:string
    product_id:number
}
   
export type PutRequesProduct = { id: number } & PostRequestProduct
  
export type ProductListResponse = Collection<ProductItem[]>

export type GetRequestProduct = {
  offset:number
  per_page:number
  order_by?: string
  order?: TOrder
  category_id?:number 
  search?:string 
  keyword?:string
  code?:string
  active?:boolean
}

export type ProductCategoryItem = {
  id:number
  name:string
  products:ProductItem[]
}

export type GetRequestProductCategory = {
  merchant_id?:number
}

export type ProductCategoryResponse = ProductCategoryItem[]

export type BrandResponse = BrandItem[]

export type TProductStockResponse = SuccessResponse<StockItem[]> & {
  total:number
  edit:StockItem
}

export type PostProductStock = {
  product_id:number
  merchant_id?:number
  employee_id:number
  qty:number
}

export type PutProductStock = {
  id:number
  merchant_id?:number
  employee_id:number
  qty:number
}