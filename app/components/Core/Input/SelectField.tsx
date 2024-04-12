import { Label, TextInputProps, Checkbox, Select, SelectProps } from "flowbite-react"
import React, { InputHTMLAttributes, forwardRef, useEffect, useState } from "react"
import { transformErrorsField } from "~/utils/helpers"

type IProps = {
    id:string
    label:string | null
    value:any
    list:any,
    errors?:Object
    readOnly?:boolean
    defaultChecked?:boolean
    containerClass?:string
    labelClass?:string
    size?:number
    handleChange?:(data:React.ChangeEvent<HTMLSelectElement>)=>void
} & SelectProps

export const SelectField = forwardRef(function InputCheckbox({
    id = "id",
    containerClass,
    labelClass = "mb-2 block",
    handleChange,
    value,
    readOnly = false,
    list,
    label,
    errors,
    required
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
                
            {label ? <div className={labelClass}>
                <Label htmlFor={id} value={label} /> {required && <span className="text-white">*</span>}
            </div> : null }

            <Select onChange={handleChange} id={id} name={id} value={value}>
                {list.map((item:any)=><option value={item.value}>{item?.label}</option>)}
            </Select>

            { isError && getErrors && <div className="text-red"> 
                {getErrors?.map(value=><div>{value}</div>)} 
            </div> }

        </div>
    )
})