import React, { useEffect, useState } from "react"
import { SelectField } from "~/components"
import { SupplierItem, useGetSuppliersQuery  } from "~/services/actions"
import { DEFAULT_SUPPLIER_SELECTED } from "~/data/constant"
import { TSelectItem } from "~/_types"

type IProps = {
    defaultValue:any
    label:string | null
    handleUpdate:(id:any)=>void
}

export default function SupplierSelector(_props:IProps) {
    const { handleUpdate, label, defaultValue } = _props 
    const { data, isSuccess } = useGetSuppliersQuery()
    const [listData, setListData] = useState<TSelectItem[]>([])

    useEffect(()=>{
        const list:TSelectItem[] = data?.map(
            (item:SupplierItem) => ({ label:item.name, value:item.id })
        ) as TSelectItem[] 
        list?.unshift(DEFAULT_SUPPLIER_SELECTED)
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
            id="supplier" 
            list={listData} />
    </div>)
}