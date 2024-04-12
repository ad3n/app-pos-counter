import { JwtPayload } from "jwt-decode"
import { UserAuth } from "./actions/auth"

export type Errors = {
    error:boolean
    messages:string
}

export type JoinDateRaw = {
    raw:string 
    long:string
    short:string
}

export interface JWTAuth<T> extends JwtPayload {
    user:T
}

export type SuccessResponse<T> = {
    success:true 
    messages:string
    data?:T
}

export type CollectionResponse<T> = {
    count:number 
    data:T 
    limit:number 
    offset:number
}

export type CollectionDataResponse<T> = {
    success:true 
    data:T
}

export type Collection<T> = {
    count:number 
    items:T
}

export type CollectionTransaction<T> = {
    success:boolean 
    items:T
    total:number 
    expenses:TSummaryTotal
    withdrawal:TSummaryTotal
    state:{date:string}
    transactions_debit?:TSummaryTotal
    transactions_credit?:TSummaryTotal
}

export type CollectionIncomeTransaction<T> = {
    success:boolean 
    items:T
    state:{date:string}
    total:number 
    expenses:TSummaryTotal
    transactions_debit?:TSummaryTotal
    transactions_credit?:TSummaryTotal
    transfer:TSummaryTotal
    elektrik:TSummaryTotal
    sp:TSummaryTotal
    voucher:TSummaryTotal
    ewallet:TSummaryTotal
    accessories:TSummaryTotal
    withdrawal:TSummaryTotal & { profit: number }
}


export type CollectionExpenseTransaction<T> = {
    success:boolean 
    items:T
    state:{date:string}
    expenses:TSummaryTotal
    withdrawal:TSummaryTotal & { profit: number }
    spending:TSummaryTotal
    loan:TSummaryTotal
    cashbon:TSummaryTotal
}

export type TSummaryTotal = {
    count:number 
    total:number
}
export enum TOrder {
    DESC = "desc",
    ASC = "asc"
}