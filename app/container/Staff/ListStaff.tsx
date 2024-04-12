import { Card, Label, TextInput, Checkbox, Button, FooterDivider, Badge } from "flowbite-react"
import { useGetStaffsQuery, StaffItem } from "~/services/actions"
import { useNavigate } from "@remix-run/react"
import { MdAdd, MdArrowForward } from "react-icons/md"
import { Loader } from "~/components/Core/Spinner"
import _ from "lodash"

export default function ListStaffContainer() {
    const navigate = useNavigate()
    const { isLoading, data } = useGetStaffsQuery()
    const onAdd = () => navigate("/staff/add")
    
    return (
        <Card className="max-w-full">
            <div className="mb-4 flex items-center justify-between">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Staf List</h5>
                <Button onClick={onAdd}>
                    <MdAdd size={16} /><span className="ml-2">Item</span>
                </Button>
            </div>

            <FooterDivider theme={{base:"my-2 border-gray-700"}} />
            
            {isLoading ? <Loader /> : <div className="flow-root">
                {data ? <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {data.map(item => <ItemStaff item={item} />)}
                </ul> : <div className="my-4">
                    <span className="text-white align-center">No data</span>
                </div>}
            </div>}

        </Card>
    )
}

export const ItemStaff = ( { item }: {item:StaffItem} ) => {
    const navigate = useNavigate()
    const { name, no_hp, role, begun_at, exited_at, flag } = item
    return (
        <li className="py-3 sm:py-4 cursor-pointer" onClick={()=>navigate("/staff/edit", {state:item})}>
            <div className="flex items-center space-x-4">
                <div className="min-w-0 flex-1">
                    <p className="truncate text-base font-medium text-gray-900 dark:text-white">{name}</p>
                    <p className="truncate text-sm text-gray-500 dark:text-gray-400">{no_hp}</p>
                    {(begun_at && exited_at) && <p className="truncate text-sm text-gray-500 dark:text-gray-400">{begun_at.slice(0,5)} - {exited_at.slice(0,5)}</p>}
                </div>
                <div className="flex flex-col items-end text-base font-semibold text-gray-900 dark:text-white">        
                    {_.upperFirst(role)}
                    {flag === 1 && <div className="mt-1">
                        <Badge color={"red"}>Flagged</Badge>  
                    </div>}
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-700 dark:text-gray-500">        
                   <MdArrowForward onClick={()=>navigate("/staff/edit", {state:item})} />
                </div>
            </div>
        </li>
    )
}