import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ToastView } from "../Core/Toast";
import type {TShowTypes, IPropsProvider, DefaultContext } from "./toast.types"

export const ToastContext = createContext<Partial<DefaultContext>>({})

export const ToastProvider = ({ children }:IPropsProvider) => {
    const [message, setMessage] = useState("")
    const [type, setType] = useState<TShowTypes>("success")
    const [open, setOpen] = useState<boolean>(false)

    const showToast = (type:TShowTypes, msg:string) => {
        setMessage(msg)
        setType(type)
        setOpen(true)
    }

    const MemoizedToast = useMemo(()=> open && <ToastView content={message} type={type} />,[open])

    useEffect(()=>{
        const timeoutd = setTimeout(()=>{
            setOpen(false)
        }, 1200)
        return () => {
            clearTimeout(timeoutd)
        }
    },[open, setOpen])

    return (
        <ToastContext.Provider value={{message, showToast}}>
            {MemoizedToast}
            {children}
        </ToastContext.Provider>
    )
}

export const useToaster = () => {
    const toaster = useContext(ToastContext)
    
    return toaster
}