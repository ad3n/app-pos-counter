import { Card, Label, TextInput, Checkbox, Button, FooterDivider } from "flowbite-react"
import { SupplierItem, useGetSuppliersQuery } from "~/services/actions"
import { useNavigate } from "@remix-run/react"
import { MdAdd, MdArrowForward } from "react-icons/md"
import { Loader } from "~/components/Core/Spinner"


export default function ListSupplierContainer() {
    const navigate = useNavigate()
    const { isLoading, data } = useGetSuppliersQuery()
    const onAdd = () => navigate("/suppliers/add")
    console.log("data", data)
    return (
        <Card className="max-w-full">
            <div className="mb-4 flex items-center justify-between">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Supplier List</h5>
                <Button onClick={onAdd}>
                    <MdAdd size={16} /><span className="ml-2">Item</span>
                </Button>
            </div>
            <FooterDivider theme={{base:"my-2 border-gray-700"}} />
            
            {isLoading ? <Loader /> : <div className="flow-root">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {data?.map(item => <ItemSupplier item={item} />)}
                </ul>
            </div>}

        </Card>
    )
}

export const ItemSupplier = ( { item }: {item:SupplierItem} ) => {
    const navigate = useNavigate()
    const { name, sales_person, sales_contact } = item
    return (
        <li className="py-3 sm:py-4 cursor-pointer" onClick={()=>navigate("/suppliers/edit", {state:item})}>
            <div className="flex items-center space-x-4">
                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{name}</p>
                    <p className="truncate text-sm text-gray-500 dark:text-gray-400">{sales_person}</p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">        
                    {sales_contact}
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">        
                   <MdArrowForward onClick={()=>navigate("/suppliers/edit", {state:item})} />
                </div>
            </div>
        </li>
    )
}