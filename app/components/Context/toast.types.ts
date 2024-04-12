
export type IPropsProvider = {
    children:React.ReactNode
}

export type TShowTypes = "success" | "warning" | "danger" | "info"
export type DefaultContext = {
    message:string 
    showToast:(type:TShowTypes, msg:string)=>void
}
