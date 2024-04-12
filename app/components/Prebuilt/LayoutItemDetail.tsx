import React from "react"
import clsx from "clsx"
import { FlowbiteSizes } from "flowbite-react"

type IProps = {
    label:string 
    labelSize:string
    className?:string
    children:React.ReactNode
}

export const LayoutItemDetail = ({label, children, className, labelSize = "xl"} :IProps) => {
    return (
        <div className={clsx(["flex items-center space-x-4", className])}>
            <div className="min-w-0 flex-1">
                <p className={`truncate text-${labelSize} font-medium text-gray-900 dark:text-white`}>
                   {label}
                </p>
            </div>
            <div className="flex flex-col items-end font-semibold text-gray-900 dark:text-white">
               {children}
            </div>
        </div>
    )
}