import { UserRole } from "~/services/actions";
import { EPaymentStatus, TSelectItem } from "../_types"
import { EProductTypes, EPaymentMethod, ExpenseType } from "../_types";

export const Roles = [
    {label:UserRole.administrator, value:UserRole.administrator},
    {label:UserRole.manager, value:UserRole.manager},
    {label:UserRole.staff, value:UserRole.staff}
]

export const LIST_PRODUCT_TYPES:TSelectItem[] = [
    {label:"Satuan", value:EProductTypes.piece},
    {label:"Elektrik", value:EProductTypes.saldo},
    {label:"Volume (Tentatif)", value:EProductTypes.volume}
]

export const LIST_PAYMENT_METHODS:TSelectItem[] = [
    {label:"Tunai", value:EPaymentMethod.cash},
    {label:"BCA", value:EPaymentMethod.bca},
    {label:"Transfer Bank", value:EPaymentMethod.transfer},
    {label:"Dana", value:EPaymentMethod.dana},
    {label:"Ovo", value:EPaymentMethod.ovo},
    {label:"Shopee Pay", value:EPaymentMethod.shopee_pay}
]

export const LIST_PAYMENT_STATUS:TSelectItem[] = [
    {label:"Cash", value:EPaymentStatus.paid},
    {label:"Hutang (Credit)", value:EPaymentStatus.credit}
]

export const LIST_EXPENSE_TYPE:TSelectItem[] = [
    {label:"Tarik Tunai", value:ExpenseType.withdrawal},
    {label:"Belanja", value:ExpenseType.spending},
    {label:"Pinjaman", value:ExpenseType.loan},
    {label:"Kasbon", value:ExpenseType.casbon},
    {label:"Lainnya", value:ExpenseType.other}
]

export const DEFAULT_PRODUCT_CATEGORY_SELECTED:TSelectItem = {
    label:"--Pilih Kategori--",
    value:Number(0) as number
}

export const DEFAULT_SUPPLIER_SELECTED:TSelectItem = {
    label:"--Pilih Supplier--",
    value:Number(0) as number
}

export const DEFAULT_BRAND_SELECTED:TSelectItem = {
    label:"--Pilih Merk--",
    value:Number(0) as number
}

export const DEFAULT_STAFF_SELECTED:TSelectItem = {
    label:"--Semua Staff--",
    value:Number(0) as number
}

export const DEFAULT_CUSTOMER_SELECTED:TSelectItem = {
    label:"--Pilih Customer--",
    value:Number(0) as number
}

export const DEFAULT_PROVIDER_SELECTED:TSelectItem = {
    label:"--Pilih Provider--",
    value:Number(0) as number
}
