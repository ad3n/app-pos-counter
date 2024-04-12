import React, { useEffect, useState } from "react"
import { SelectField } from "~/components"
import { CustomerItem, useGetCustomersQuery  } from "~/services/actions"
import { DEFAULT_CUSTOMER_SELECTED } from "~/data/constant"
import { TSelectItem } from "~/_types"

type IProps = {
    defaultValue:any
    label:string | null
    handleUpdate:(id:any)=>void
}

export default function CustomerSelector(_props:IProps) {
    const { handleUpdate, label, defaultValue } = _props 
    const { data, isSuccess } = useGetCustomersQuery()
    const [listData, setListData] = useState<TSelectItem[]>([])

    useEffect(()=>{
        const list:TSelectItem[] = data?.data.map(
            (item:CustomerItem) => ({ label:item.name, value:item.id })
        ) as TSelectItem[] 
        list?.unshift(DEFAULT_CUSTOMER_SELECTED)
        setListData(list)
    },[data, isSuccess])

    const [id, setId] = useState<number>()

    const handleChange = ({target:{value}}:React.ChangeEvent<HTMLSelectElement>) => {
        const catId = value as unknown
        setId(catId as number)
        handleUpdate(catId)
    }

    useEffect(()=>{
        setId(defaultValue as number)
    },[defaultValue])

    if( !listData) {
        return null
    }
    
    return (<div>
        <SelectField 
            label={label} 
            value={id} 
            handleChange={handleChange} 
            id="customer" 
            list={listData} />
    </div>)
}