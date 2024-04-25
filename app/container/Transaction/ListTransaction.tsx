import { Card, Button, FooterDivider, Badge } from "flowbite-react"
import { 
    ProductItem, useGetTransactionsQuery, useGetProductsCategorizedQuery, useGetCategoryProductsQuery, GetRequestProduct, TransactionItem, TGetRequestTransaction 
} from "~/services/actions"
import { useNavigate } from "@remix-run/react"
import { MdAdd, MdArrowForward } from "react-icons/md"
import { Loader } from "~/components/Core/Spinner"
import { useAccount } from "~/hooks/useAccount"
import { currency } from "~/utils/helpers"
import { EPaymentStatus, EPaymentTypes } from "~/_types"
import { useCallback, useEffect, useState } from "react"
import { FilterDateTransactions } from "~/components/Core/Dropdown"
import StaffSelector from "~/components/Prebuilt/StaffSelector"
import moment from "moment"
import clsx from "clsx"

export default function ListTransactionContainer() {
    const navigate = useNavigate()
    const { account, isAdmin } = useAccount()  
    const [date, setDate] = useState(moment(new Date()).toDate())
    const [skip, setSkip] = useState(true)
    const [filterData, setFilterData] = useState<Partial<TGetRequestTransaction>>({
        merchant_id:account?.user?.merchant_id as number,
        employee_id:isAdmin() ? undefined : account?.user?.id as number,
        per_page:-1,
        date: moment(new Date()).format("YYYY-MM-DD")
    })  
    const { isLoading, data, refetch } = useGetTransactionsQuery(filterData, {skip:skip})

    const onAddIncome = () => navigate("/transaction/omzet?type=cart")
    const onAddExpense = () => navigate("/transaction/expense")
    const onListExpense = () => navigate("/transaction/expense?type=list")
    const onListIncome = () => navigate("/transaction/omzet?type=list")

    const onFilterStaff = useCallback((id:number)=>{
        setFilterData((prev)=>({...prev, employee_id:id}))
    },[filterData, setFilterData])

    const onFilterDate = (date:Date)=> {
        let parsedDate = moment(date).format("YYYY-MM-DD")
        setDate(date)
        setFilterData((prev)=>({...prev, date:parsedDate}))
    }

    useEffect(()=>{
        if( account?.user?.merchant_id ) {
            setFilterData({
                ...filterData,
                merchant_id:account.user.merchant_id,
                employee_id:isAdmin() ? undefined : account?.user?.id as number,
            })
            setSkip(false)
        }
    },[account?.user?.merchant_id])
    // useEffect(()=>{
    //     refetch()
    // },[filterData, setFilterData])
    
    return (
        <div className="pb-2 px-2 pt-6">
            <Card className="max-w-full">
                <div className="flex items-center justify-between">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                        Riwayat Transaksi
                    </h5>
                    <FilterDateTransactions handleUpdate={onFilterDate} />
                </div>

                <FooterDivider theme={{base:"my-2 border-gray-700"}} />

                <div className="flex items-center justify-between">
                    <Button color="green" fullSized={true} className="mr-3" onClick={onAddIncome}>
                        <MdAdd size={16} /><span className="ml-2">Penjualan</span>
                    </Button>
                    <Button color="red" fullSized={true} className="ml-3" onClick={onAddExpense}>
                        <MdAdd size={16} /><span className="ml-2">Pengeluaran</span>
                    </Button>
                </div>

                <FooterDivider theme={{base:"my-2 border-gray-700"}} />

                {isAdmin() && <StaffSelector 
                    label={null} 
                    handleUpdate={onFilterStaff} 
                    defaultValue={filterData.employee_id} />}
            </Card>

            <Card className="max-w-full mt-5">
                <div className="flex flex-col items-center justify-center">
                    <span className="dark:text-gray-400 text-sm text-gray-400">
                        {moment(date).format("DD MMM YYYY")}
                    </span>
                    <h5 className="text-xl mb-1 leading-none text-gray-900 dark:text-white">
                        Balance
                    </h5>
                    <h3 className="text-green-500 font-bold text-2xl">
                        {currency(data?.total??0)}
                    </h3>
                </div>
                <div className="flex items-center justify-between border-t border-gray-700 pt-4">
                    <div>
                        <h5 className="text-xl mb-1 leading-none text-gray-900 dark:text-white">
                            Penjualan
                        </h5>
                        <h3 onClick={onListIncome} className="text-green-700 mb-2 font-bold text-xl">
                            &larr; {currency(data?.transactions_debit?.total??0)} 
                        </h3>
                        <h5 className="text-md mb-1 leading-none text-gray-400">
                            Terhutang
                        </h5>
                        <Badge size={"md"} className="inline-flex justify-start" color={"gray"}>
                           {currency(data?.transactions_credit?.total??0)}
                        </Badge>
                    </div>

                    <div className="text-right">
                        <h5 className="text-xl mb-1 leading-none text-gray-900 dark:text-white">
                            Pengeluaran
                        </h5>
                        <h3 onClick={onListExpense} className="text-pink-500 font-bold mb-2 text-xl">{currency(
                            data?.expenses?.total??0
                        )} &rarr; </h3>
                        <h5 className="text-md mb-1 leading-none text-gray-400">
                            Tarik Tunai
                        </h5>
                        <Badge size={"md"} className="inline-flex justify-end" color={"gray"}>
                           {currency(data?.withdrawal?.total ?? 0)}
                        </Badge>
                    </div>
                </div>
            </Card>

            {isLoading ? <Loader /> : (data && data.items.length > 0) ? <div className="mt-4 mb-40">
                <h3 className="dark:text-white">Total Transaksi : {data.items.length}</h3>
                <Card className="max-w-full mt-2">
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
    const { name, total, order_no, items, type, qty, created_date, payment_status } = item
    const dateShow = () => {
        return created_date.long
    }
    return (
        <li className="py-3 sm:py-4 cursor-pointer" onClick={()=>navigate("/transaction/view", {state:item})}>
            <div className="flex items-center space-x-2">
                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-normal text-gray-400">{order_no}</p>
                    <p className="truncate text-md font-medium text-gray-900 dark:text-white">{name}</p>
                    <Badge className="inline-flex not-italic mt-2" color={"gray"} size={"xs"}>{dateShow()}</Badge>
                    <Badge className="inline-flex mt-2 ml-2" color={payment_status.value === EPaymentStatus.credit ? "purple" : "dark"} size={"xs"}>{payment_status.label}</Badge>
                </div>
                <div className="flex flex-col items-end font-semibold text-gray-900 dark:text-white"> 
                    {qty > 1 && <p className="truncate text-sm font-medium text-gray-300 dark:text-white-200">
                        {qty} x {currency(items[0]?.price)}
                    </p>}
                    <span className={clsx(["text-lg",
                        {'text-pink-500': type.value === EPaymentTypes.expense},
                    ])}>
                       {type.value === EPaymentTypes.expense ? "-" : ""} {currency(total as number)}
                    </span>
                    {/* {Number(item.on_sale) === 1 && <Badge color={"lime"} size={30}> {currency(sale_price as number)}</Badge>} */}
                </div>
                <div onClick={()=>navigate("/transaction/view", {state:item})} className="inline-flex items-center h-16 text-base font-semibold text-gray-700 dark:text-gray-500">        
                   <MdArrowForward />
                </div>
            </div>
        </li>
    )
}