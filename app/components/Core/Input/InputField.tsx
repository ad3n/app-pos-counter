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
    type?:InputHTMLAttributes<TextInputProps>["type"]
    sizing?:TextInputProps["sizing"]
    handleChange?:(data:React.ChangeEvent<HTMLInputElement>)=>void
} & TextInputProps

export const InputField = forwardRef(function InputField({
    id = "id",
    disabled = false,
    containerClass,
    labelClass = "mb-2 block",
    type = "text",
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
                type={type}
                readOnly={readOnly}
                name={id}
                placeholder={placeholder}
                required={required}
                sizing={sizing}
                color={isError ? "failure" : "gray"}
                helperText={isError && getErrors ? <div>
                    {getErrors?.map(value=><div>{value}</div>)}
                </div> : null}
                {...rest}
            />
        </div>
    )
})

type IPropsArea = {
    id:string
    label:string
    value:any
    readOnly?:boolean
    disabled?:boolean
    containerClass?:string
    labelClass?:string
    handleChange?:(data:React.ChangeEvent<HTMLTextAreaElement>)=>void
} & TextInputProps

export const InputTextArea = ({
    id = "id",
    disabled = false,
    containerClass,
    labelClass = "mb-2 block",
    handleChange,
    value,
    readOnly = false,
    label = "Default"
}:IPropsArea) => {
    return (
        <div className={containerClass}>
            <div className={labelClass}>
                <Label htmlFor={id} value={label} />
            </div>
            <Textarea 
                id={id} 
                onChange={handleChange} 
                value={value}
                disabled={disabled}
                readOnly={readOnly}
                name={id}
                className="p-3"
                rows={3}
            />
        </div>
    )
}