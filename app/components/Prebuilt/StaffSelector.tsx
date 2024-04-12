import React, { useEffect, useState } from "react"
import { SelectField } from "~/components"
import { useGetStaffsQuery } from "~/services/actions"
import { DEFAULT_STAFF_SELECTED } from "~/data/constant"
import { TSelectItem } from "~/_types"

type IProps = {
    label:string | null
    defaultValue?:any
    handleUpdate:(id:any)=>void
}

export default function StaffSelector(_props:IProps) {
    const { defaultValue, handleUpdate, label } = _props 
    const { data, isSuccess } = useGetStaffsQuery()
    const [listData, setListData] = useState<TSelectItem[]>([])

    useEffect(()=>{
        const list:TSelectItem[] = data?.map(item=> ({ label:item.name, value:item.id })) as TSelectItem[] 
        list?.unshift(DEFAULT_STAFF_SELECTED)
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

    if( !listData ) {
        return null
    }
    return (<div>
        <SelectField 
            label={label}
            value={id} 
            handleChange={handleChange} 
            id="staffs" 
            list={listData} />
    </div>)
}