import { Label, TextInputProps, Checkbox, CheckboxProps } from "flowbite-react"
import React, { InputHTMLAttributes, forwardRef, useEffect, useState } from "react"
import { transformErrorsField } from "~/utils/helpers"

type IProps = {
    id:string
    label:string
    value:any
    errors?:Object
    readOnly?:boolean
    defaultChecked?:boolean
    containerClass?:string
    labelClass?:string
    type?:InputHTMLAttributes<TextInputProps>["type"]
    size:number
    handleChange?:(data:React.ChangeEvent<HTMLInputElement>)=>void
} & CheckboxProps

export const InputCheckbox = forwardRef(function InputCheckbox({
    id = "id",
    defaultChecked = false,
    containerClass,
    labelClass = "mb-2 block",
    size = 20,
    handleChange,
    value,
    readOnly = false,
    label = "Default",
    errors
}:IProps, ref) {
    const [isError, setIsError] = useState<boolean>(false)
    const getErrors = errors ? transformErrorsField(errors, id) : null;

    useEffect(()=>{
        if( getErrors ) {
            setIsError(true)
        }
    },[getErrors])

    return (
        <div className={containerClass}>
            <div className="flex items-center gap-2">
                <Checkbox id={id} size={size} defaultChecked={defaultChecked} value={value} onChange={handleChange} name={id} />
                <div className={labelClass}>
                    <Label htmlFor={id} value={label} />
                </div>
            </div>
            { isError && getErrors && <div className="text-red"> 
                {getErrors?.map(value=><div>{value}</div>)} 
            </div> }
        </div>
    )
})