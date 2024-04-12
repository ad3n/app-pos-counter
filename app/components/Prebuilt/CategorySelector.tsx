import React, { useEffect, useState } from "react"
import { SelectField } from "~/components"
import { ProductCategoryItem, useGetCategoryProductsQuery } from "~/services/actions"
import { DEFAULT_PRODUCT_CATEGORY_SELECTED } from "~/data/constant"
import { TSelectItem } from "~/_types"

type IProps = {
    defaultValue:any
    label:string | null
    merchantId:number
    handleUpdate:(id:any, item:TSelectItem|undefined)=>void
}

export default function CategorySelector(_props:IProps) {
    const { merchantId, handleUpdate, label, defaultValue } = _props 
    const { data, isSuccess } = useGetCategoryProductsQuery({merchant_id:merchantId})
    const [listData, setListData] = useState<TSelectItem[]>([])

    useEffect(()=>{
        const list:TSelectItem[] = data?.map(
            (item:ProductCategoryItem) => ({ label:item.name, value:item.id })
        ) as TSelectItem[] 
        list?.unshift(DEFAULT_PRODUCT_CATEGORY_SELECTED)
        setListData(list)
    },[data, isSuccess])

    const [id, setId] = useState<number>()

    const handleChange = ({target:{value}}:React.ChangeEvent<HTMLSelectElement>) => {
        const catId = value as unknown
        let item = catId==0 ? undefined : listData.find(it=>it.value==catId)
        setId(catId as number)
        handleUpdate(catId, item)
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
            id="category" 
            list={listData} />
    </div>)
}