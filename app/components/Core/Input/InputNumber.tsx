import { TextInput, Label, TextInputProps, Textarea } from "flowbite-react"
import React, { InputHTMLAttributes, forwardRef, useEffect, useState } from "react"
import { transformErrorsField } from "~/utils/helpers"

type IProps = {
    id:string
    label:string | null
    value:any
    errors?:Object
    readOnly?:boolean
    disabled?:boolean
    containerClass?:string
    labelClass?:string
    sizing?:TextInputProps["sizing"]
    handleChange?:(data:React.ChangeEvent<HTMLInputElement>)=>void
} & TextInputProps

export const InputNumber = forwardRef(function InputField({
    id = "id",
    disabled = false,
    containerClass,
    labelClass = "mb-2 block",
    sizing = "md",
    handleChange,
    value,
    readOnly = false,
    label = "Default",
    errors,
    required,
    placeholder,
    ...rest
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
            {label && <div className={labelClass}>
                <Label htmlFor={id} value={label} /> {required && <span className="text-white">*</span>}
            </div>}
            <TextInput 
                id={id} 
                onChange={(data)=> {
                    if( isError ) setIsError(false)
                    handleChange && handleChange(data)
                }} 
                value={value}
                disabled={disabled}
                type={"number"}
                placeholder={placeholder}
                readOnly={readOnly}
                name={id}
                color={isError ? "failure" : "gray"}
                helperText={isError && getErrors ? <div>
                    {getErrors?.map(value=><div>{value}</div>)}
                </div> : null}
                {...rest}
            />
        </div>
    )
})
