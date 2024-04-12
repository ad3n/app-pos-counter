export interface TSelectItem {
    label:string 
    value:any
}

export enum EProductTypes {
    piece = "piece", 
    saldo = "saldo", 
    volume = "volume"
}

export enum EPaymentMethod {
    cash = "cash",
    dana = "dana",
    transfer = "debit_card",
    bca = "bca",
    ovo = "ovo",
    shopee_pay = "shopee"
}

export enum EPaymentStatus {
    paid = "paid",
    credit = "credit"
}

export enum EPaymentTypes {
    income = "income",
    expense = "expense"
}

export enum ExpenseType {
    withdrawal = "tarik_tunai",
    spending = "belanja",
    casbon = "kasbon",
    loan = "pinjaman",
    other = "lain"
}

export type TSpacingScreenProduct = "wide" | "narrow" | "full"