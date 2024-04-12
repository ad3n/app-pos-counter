import React, { useEffect, useState } from "react"
import { SelectField } from "~/components"
import { ProviderItem, useGetProvidersQuery  } from "~/services/actions"
import { DEFAULT_PROVIDER_SELECTED } from "~/data/constant"
import { TSelectItem } from "~/_types"

type IProps = {
    defaultValue:any
    label:string | null
    handleUpdate:(id:any)=>void
}

export default function ProviderSelector(_props:IProps) {
    const { handleUpdate, label, defaultValue } = _props 
    const { data, isSuccess } = useGetProvidersQuery()
    const [listData, setListData] = useState<TSelectItem[]>([])

    useEffect(()=>{
        const list:TSelectItem[] = data?.data?.map(
            (item:ProviderItem) => ({ label:item.name, value:item.id })
        ) as TSelectItem[] 
        list?.unshift(DEFAULT_PROVIDER_SELECTED)
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
            id="provider" 
            list={listData} />
    </div>)
}