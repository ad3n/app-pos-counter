import { Alert, AlertProps } from "flowbite-react"
import React from "react"
import { HiInformationCircle } from "react-icons/hi"

type IProps = {
    title:string
    color:AlertProps["color"]
    children:React.ReactNode
}

export const AlertView = ( { children, title="Info", color }:IProps ):React.JSX.Element => {
    return (
        <Alert color={color} icon={HiInformationCircle}>
            <span className="font-medium">{title}</span>: <span>{children}</span>
        </Alert>
    )
}