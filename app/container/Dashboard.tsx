import { Card, Badge } from "flowbite-react"
import { TGetRequestTransaction, useGetTransactionsQuery } from "~/services/actions"
import { currency } from "~/utils/helpers"
import { useState } from "react"
import { useAccount } from "~/hooks/useAccount"
import { useNavigate } from "@remix-run/react"
import moment from "moment"

export default function DashboardContainer() {
    const navigate = useNavigate()
    const { account } = useAccount()  
    const [date, setDate] = useState(moment(new Date()).toDate())
    const [filterData, setFilterData] = useState<Partial<TGetRequestTransaction>>({
        merchant_id:account?.user?.merchant_id as number,
        per_page:-1,
        date: moment(new Date()).format("YYYY-MM-DD")
    })  
    const { isLoading, data, refetch } = useGetTransactionsQuery({
        merchant_id:account?.user?.merchant_id as number,
        ...filterData,
    })

    const onListExpense = () => navigate("/transaction/expense?type=list")
    const onListIncome = () => navigate("/transaction/omzet?type=list")

    return (
        <div className="container mx-auto pt-9 px-2">
            <h2 className="dark:text-white text-center mt-12 my-5 text-2xl">Hello, Admin</h2>

            <Card className="max-w-full">
                <span className="dark:text-gray-400 text-xl text-gray-400">
                    {moment(date).format("dddd, DD MMMM YYYY")}
                </span>
            </Card>

            <Card className="max-w-full mt-5">
                <div className="flex flex-col items-center justify-center">
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
                        <h3 onClick={onListIncome} className="text-green-700 mb-2 font-bold text-2xl">
                            {currency(data?.transactions_debit?.total??0)} &larr;
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
                        <h3 onClick={onListExpense} className="text-pink-500 font-bold mb-2 text-2xl">{currency(
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
        </div>
    )
}