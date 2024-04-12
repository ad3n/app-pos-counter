import { Card, Button, FooterDivider, Badge } from "flowbite-react"
import { 
    useGetExpensesQuery, 
    useGetProductsCategorizedQuery, 
    useGetCategoryProductsQuery, 
    GetRequestProduct, 
    TransactionItem, 
    TGetRequestTransaction 
} from "~/services/actions"
import { useNavigate } from "@remix-run/react"
import { MdAdd, MdArrowForward } from "react-icons/md"
import { Loader } from "~/components/Core/Spinner"
import { useAccount } from "~/hooks/useAccount"
import { currency } from "~/utils/helpers"
import { EProductTypes, EPaymentStatus, EPaymentTypes } from "~/_types"
import { useCallback, useEffect, useState } from "react"
import { FilterDateTransactions } from "~/components/Core/Dropdown"
import StaffSelector from "~/components/Prebuilt/StaffSelector"
import moment from "moment"
import clsx from "clsx"

export default function ListExpenseContainer() {
    const navigate = useNavigate()
    const { account, isAdmin } = useAccount()  
    const [date, setDate] = useState(moment(new Date()).toDate())
    const [filterData, setFilterData] = useState<Partial<TGetRequestTransaction>>({
        merchant_id:account?.user?.merchant_id as number,
        employee_id:undefined,
        //date: moment(new Date()).subtract(1,"day").format("YYYY-MM-DD"),
        date: moment(new Date()).format("YYYY-MM-DD")
    })  
    const { isLoading, data, refetch } = useGetExpensesQuery({
        merchant_id:account?.user?.merchant_id as number,
        ...filterData,
    })

    const onFilterStaff = useCallback((id:number)=>{
        setFilterData((prev)=>({...prev, employee_id:id}))
    },[filterData, setFilterData])

    const onFilterDate = (date:Date)=> {
        let parsedDate = moment(date).format("YYYY-MM-DD")
        setDate(date)
        setFilterData((prev)=>({...prev, date:parsedDate}))
    }

    useEffect(()=>{
        refetch()
    },[filterData, setFilterData])
    
    return (
        <div className="pb-2">
            <Card className="max-w-full">
                <div className="flex items-center justify-between">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                        Riwayat Pengeluaran
                    </h5>
                    <FilterDateTransactions handleUpdate={onFilterDate} />
                </div>

                <FooterDivider theme={{base:"my-2 border-gray-700"}} />

                {isAdmin() && <StaffSelector label={null} 
                    handleUpdate={onFilterStaff} 
                    defaultValue={filterData.employee_id} />}

            </Card>

            <Card className="max-w-full mt-5">
                <div className="flex flex-col items-center justify-center">
                    <span className="dark:text-gray-400 text-sm text-gray-400">
                        {moment(date).format("DD MMM YYYY")}
                    </span>
                    <h5 className="text-xl mb-1 leading-none text-gray-900 dark:text-white">
                        Total Pengeluaran
                    </h5>
                    <h3 className="text-pink-500 font-bold text-2xl">
                        {currency(data?.expenses?.total ?? 0)}
                    </h3>
                </div>
                <div className="flex items-center justify-between border-t border-gray-700 pt-4">
                    <div>
                        <h5 className="text-xl mb-1 leading-none text-gray-900 dark:text-white">
                            Belanja
                        </h5>
                        <h3 className="text-pink-500 mb-2 font-bold text-2xl">
                            {currency(data?.spending?.total??0)}
                        </h3>
                    </div>

                    <div className="text-right">
                        <h5 className="text-xl mb-1 leading-none text-gray-900 dark:text-white">
                            Tarik Tunai
                        </h5>
                        <h3 className="text-pink-500 font-bold mb-2 text-2xl">{currency(
                            data?.withdrawal?.total??0
                        )}</h3>
                    </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-700 pt-4">
                    <div>
                        <h5 className="text-xl mb-1 leading-none text-gray-900 dark:text-white">
                            Pinjaman
                        </h5>
                        <h3 className="text-pink-500 mb-2 font-bold text-2xl">
                            {currency(data?.loan?.total??0)}
                        </h3>
                    </div>

                    <div className="text-right">
                        <h5 className="text-xl mb-1 leading-none text-gray-900 dark:text-white">
                            Kasbon
                        </h5>
                        <h3 className="text-pink-500 font-bold mb-2 text-2xl">{currency(
                            data?.cashbon?.total??0
                        )}</h3>
                    </div>
                </div>

            </Card>

            {isLoading ? <Loader /> : (data && data.items.length > 0) ? <div className="mt-10 mb-40">
                <Card className="max-w-full mt-4">
                    {<div className="flow-root">
                        {(data?.items && data.items.length > 0) ? <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                            {data.items.map(item => <ItemTransaction key={item.id} item={item} />)}
                        </ul> : <div className="my-4">
                            <span className="text-white align-center">No transaction</span>
                        </div>}
                    </div>}
                </Card>
            </div> : <div className="my-8 flex items-center justify-center">
                <span className="text-white align-center">Empty data</span>
            </div>}

            <div className="mb-6" />
            
        </div>
    )
}

export const ItemTransaction = ( { item }: {item:TransactionItem} ) => {
    const navigate = useNavigate()
    const { name, total, order_no, items, type, qty, created_date, payment_method, expense_type } = item
    const dateShow = () => {
        return moment(created_date.raw, "DD-MM-YYYY HH:mm:ss").utcOffset(7).format("DD MMM - HH:mm")
    }
    return (
        <li className="py-3 sm:py-4 cursor-pointer" onClick={()=>navigate("/products/edit", {state:item})}>
            <div className="flex items-center space-x-4">
                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-normal text-gray-400">{order_no}</p>
                    <p className="truncate text-md font-medium text-gray-900 dark:text-white">{name}</p>
                    <Badge className="inline-flex not-italic mt-2" color={"gray"} size={"sm"}>{dateShow()}</Badge>
                    <Badge className="inline-flex mt-2 ml-2" color={"dark"} size={"sm"}>{payment_method.label}</Badge>
                </div>
                <div className="flex flex-col items-end font-semibold text-gray-900 dark:text-white"> 
                    {qty > 1 && <p className="truncate text-sm font-medium text-gray-300 dark:text-white-200">
                        {qty} x {currency(items[0]?.price)}
                    </p>}
                    <span className={clsx(["text-xl",
                        {'text-pink-500': type.value === EPaymentTypes.expense},
                    ])}>
                       {currency(total as number)}
                    </span>
                    {expense_type && <Badge className="inline-flex not-italic mt-2" color={"teal"} size={"sm"}>
                        {expense_type.label}
                    </Badge>}
                   
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-700 dark:text-gray-500">        
                   <MdArrowForward onClick={()=>navigate("/products/edit", {state:item})} />
                </div>
            </div>
        </li>
    )
}