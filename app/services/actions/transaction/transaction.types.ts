import { EPaymentStatus, EPaymentTypes, TSelectItem } from "~/_types"
import { CollectionTransaction, CollectionExpenseTransaction, CollectionIncomeTransaction, JoinDateRaw } from "~/services/rest.types"
import { CustomerItem, ProductItem, ProviderItem, StaffItem } from ".."

export type TransactionProductItem = {
    id:number 
    price:number 
    name:string 
    qty:number 
    total:number 
    product_id:number 
    credit:number 
    debit:number 
    transaction_id:number 
    product:ProductItem
}

export type TransactionItem = {
    id:number 
    name:string
    order_no:string
    price:number
    cost:number
    total_cost:number
    total:number
    qty:number 
    saldo:number 
    status:string
    type:TSelectItem
    debit:number
    credit:number
    expense_type:TSelectItem
    payment_method:TSelectItem
    payment_status:TSelectItem
    paid_date:JoinDateRaw
    work_date:JoinDateRaw
    created_date:JoinDateRaw
    customer:CustomerItem
    provider:ProviderItem
    staff:StaffItem
    items:TransactionProductItem[]
}

export type TPostRequestItemProduct = {
    id:number
    name:string
    qty:number
    cost:number
    custom_price?:number
    category_id?:number
    employee_id:number
}

export type TPostRequestItemExpense = {
    name:string
    price:number
    total:number
}

export type TPostRequestIncome = {
    type:string
    work_date:string 
    payment_status: string 
    payment_method: string
    employee_id: number 
    customer_id?: number
    provider_id?: number
    items?:TPostRequestItemProduct[]
}

export type TPostRequestExpense = {
    name:string
    type:string
    price:number
    total:number
    work_date:string 
    expense_type:string
    payment_status: string 
    payment_method: string
    employee_id: number 
    provider_id?: number
    supplier_id? : number
    items?:TPostRequestItemExpense[]
}

export type TGetRequestTransaction = {
    per_page:number
    offset:number
    merchant_id:Number
    payment_status:string
    employee_id:number
    category_id:number
    type:string
    date:"latest" | "all" | string
}

export type TPostRequestCart = {
    type:string
}

export type TPutDeleteTransaction = string

export type TUpdatePaymentStatus = {
    status:string
    orderNo:string
}


export type CartAddResponse = {
    success:true,
    order_no:string
}

export type TransactionListResponse = CollectionTransaction<TransactionItem[]>

export type TransactionListExpenseResponse = CollectionExpenseTransaction<TransactionItem[]>

export type TransactionListIncomeResponse = CollectionIncomeTransaction<TransactionItem[]>