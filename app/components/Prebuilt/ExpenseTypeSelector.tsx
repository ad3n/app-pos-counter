import React, { useEffect, useState } from "react"
import { SelectField } from "~/components"
import { LIST_EXPENSE_TYPE } from "~/data/constant"
import { TSelectItem } from "~/_types"

type IProps = {
    defaultValue?:any
    handleUpdate:(id:any)=>void
}

export default function ExpenseTypeSelector(_props:IProps) {
    const { defaultValue, handleUpdate } = _props 
    const [listData, setListData] = useState<TSelectItem[]>(LIST_EXPENSE_TYPE)
    const [id, setId] = useState<string>()

    const handleChange = ({target:{value}}:React.ChangeEvent<HTMLSelectElement>) => {
        const catId = value as unknown
        setId(catId as string)
        handleUpdate(catId)
    }

    useEffect(()=>{
        setId(defaultValue as string)
    },[defaultValue])

    if( !listData) {
        return null
    }
    return (<div>
        <SelectField 
            label={"Tipe Expense"} 
            value={id} 
            handleChange={handleChange} 
            id="expense_type" 
            sizing={"lg"}
            list={listData} />
    </div>)
}