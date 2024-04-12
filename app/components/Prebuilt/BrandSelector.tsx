import { Card, Label, TextInput, Checkbox, Button, FooterDivider } from "flowbite-react"
import React, { useEffect, useState } from "react"
import { SelectField } from "~/components"
import { useGetBrandsQuery } from "~/services/actions"
import { DEFAULT_BRAND_SELECTED } from "~/data/constant"
import { TSelectItem } from "~/_types"

type IProps = {
    defaultValue?:any
    handleUpdate:(id:any)=>void
}

export default function BrandSelector(_props:IProps) {
    const { defaultValue, handleUpdate } = _props 
    const { data, isSuccess } = useGetBrandsQuery()
    const [listData, setListData] = useState<TSelectItem[]>([])

    useEffect(()=>{
        const list:TSelectItem[] = data?.map(item=> ({ label:item.name, value:item.id })) as TSelectItem[] 
        list?.unshift(DEFAULT_BRAND_SELECTED)
        setListData(list)
    },[data, isSuccess])

    const [id, setId] = useState<number>()

    const handleChange = ({target:{value}}:React.ChangeEvent<HTMLSelectElement>) => {
        const catId = value as unknown
        setId(catId as number)
        handleUpdate(catId)
    }

    useEffect(()=>{
        setId(defaultValue)
    }, [defaultValue])

    if( !listData) {
        return null
    }
    return (<div>
        <SelectField 
            label={"Merk"} 
            value={id} 
            handleChange={handleChange} 
            id="brands" 
            list={listData} />
    </div>)
}