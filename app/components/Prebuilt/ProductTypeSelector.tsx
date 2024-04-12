import React, { useEffect, useState } from "react"
import { SelectField } from "~/components"
import { DEFAULT_BRAND_SELECTED, LIST_PRODUCT_TYPES } from "~/data/constant"
import { TSelectItem } from "~/_types"

type IProps = {
    defaultValue?:any
    handleUpdate:(id:any)=>void
}

export default function ProductTypeSelector(_props:IProps) {
    const { defaultValue, handleUpdate } = _props 
    const [listData, setListData] = useState<TSelectItem[]>(LIST_PRODUCT_TYPES)
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
            label={"Tipe Produk"} 
            value={id} 
            handleChange={handleChange} 
            id="productType" 
            list={listData} />
    </div>)
}