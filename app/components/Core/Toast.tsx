import { Toast } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";
import type {TShowTypes } from "../Context/toast.types"

type IProps = {
    content:string
    type:TShowTypes
}

export const ToastView = ({
    content,
    type
}:IProps) => {
  return (
    <Toast 
        duration={300}
        theme={{
            root:{
                base:"fixed flex w-full max-w-md justify-center items-center rounded-lg bg-white p-4 text-gray-500 shadow dark:text-gray-800"
            },
            toggle:{
                base:"-m-1.5 ml-auto inline-flex h-8 w-8 rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white"
            }
        }}>
            {type === "success" && <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                <HiCheck className="h-5 w-5" />
            </div>}

            {type === "danger" && <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                <HiX className="h-5 w-5" />
            </div>}

            {type === "warning" && <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
                <HiExclamation className="h-5 w-5" />
            </div>}
            
            <div className="ml-3 text-sm font-normal">{content}</div>
        <Toast.Toggle />
    </Toast>
  );
}