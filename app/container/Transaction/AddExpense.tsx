import { Card, Label, Badge, Button, Datepicker } from "flowbite-react"
import { useNavigate, useLocation } from "@remix-run/react";
import { 
    ProductItem, 
    TPostRequestItemProduct,
    useAddTransactionExpenseMutation,
    useAddCartMutation
 } from "~/services/actions";
import React, { useEffect, useState } from "react";
import { AlertView, InputField, SelectField, InputNumber, HRDivider } from "~/components";
import { EPaymentMethod, EPaymentStatus, EPaymentTypes, EProductTypes, ExpenseType, TSelectItem } from "~/_types";
import { LIST_PAYMENT_METHODS, LIST_PAYMENT_STATUS } from "~/data/constant";
import { useAccount } from "~/hooks/useAccount";
import ProviderSelector from "../../components/Prebuilt/ProviderSelector";
import ExpenseTypeSelector from "../../components/Prebuilt/ExpenseTypeSelector";
import SupplierSelector from "../../components/Prebuilt/SupplierSelector";
import { TPostRequestExpense } from "~/services/actions";
import { LayoutItemDetail } from "~/components";
import { currency } from "~/utils/helpers";
import moment from "moment";


export default function AddExpenseContainer() {
    const location = useLocation()
    const navigate = useNavigate()
    const states = location.state as ProductItem
    const { account } = useAccount()
    const [errors, setErrors] = useState<any>()
    const [profit, setProfit] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)
    const [date, setDate] = useState<Date>(new Date())
    const [cartNo, setCartNo] = useState<string>("")
    const [formState, setFormState] = useState<Partial<TPostRequestExpense>>({
        name:"",
        provider_id: undefined,
        payment_method: EPaymentMethod.cash,
        payment_status: EPaymentStatus.paid,
        expense_type: ExpenseType.spending,
        work_date: "",
    })

    const [addTransactionExpense, addStates] = useAddTransactionExpenseMutation()
    const [addCart, cartStates] = useAddCartMutation()

    const handleChangeProfit = (
        { target: { value }}: React.ChangeEvent<HTMLInputElement>) => {
            setProfit(Number(value ?? "") as number)
    }

    const handleChangeTotal = (
        { target: { value }}: React.ChangeEvent<HTMLInputElement>) => {
            setTotal(Number(value ?? "") as number)
    }

    const handleChangeProvider = (
        id:number):void => setFormState((prev)=>({...prev, provider:id}))

    const handleChangeSupplier = (
        id:number):void => setFormState((prev)=>({...prev, supplier_id:id}))

    const handleChangeExpense = (
        id:string):void => setFormState((prev)=>({...prev, expense_type:id}))

    const handleChange = (
        { target :{name, value}}:React.ChangeEvent<HTMLSelectElement>) => {
        setFormState((prev)=>({...prev, [name]:value}))
    }

    const handleChangeField = (
        { target :{name, value}}:React.ChangeEvent<HTMLInputElement>) => {
        setFormState((prev)=>({...prev, [name]:value}))
    }

    const handleChangeDate = (date:Date) => setDate(date)

    useEffect(()=>{
        setProfit( Number(profit) )
    },[profit, setProfit])

    useEffect(()=>{
        if( addStates.isSuccess ) {
            navigate("/transaction")
        }
    },[addStates.isSuccess])

    const onBuy = async () => {
        const dateWork = moment(date).format("YYYY-MM-DD")

        const params: TPostRequestExpense = {
            name: formState.expense_type === ExpenseType.withdrawal ? "Tarik Tunai" : formState?.name as string,
            price: formState.expense_type === ExpenseType.withdrawal ? profit as number : total as number,
            total: total as number, 
            type: EPaymentTypes.expense,
            expense_type: formState.expense_type as string,
            work_date: dateWork,
            payment_status: formState.payment_status as string,
            payment_method: formState.payment_method as string,
            employee_id: account?.user?.id as number,
            provider_id: formState?.provider_id,
            supplier_id: formState?.supplier_id
        }

        try {
            await addTransactionExpense(params).unwrap()
        } catch (err) {
            console.log("err", err)
            setErrors(err)
        }
    }

    return (
        <div className="pt-4">
            <Card className="max-w-full mb-4">
                <div className="flex items-center justify-center space-x-4">
                    <div className="flex  items-center flex-col">
                        <p className="truncate text-lg font-medium text-gray-900 dark:text-white">
                            {"Tambah Expense"}
                        </p>
                    </div>
                </div>
             </Card>

             <Card className="max-w-full pb-4">
                {(addStates.isError) && <AlertView title="Info" color="failure">
                    {errors?.data?.validated === false ? "Ada kolom yang tidak valid & mohon lengkapi" : "Something error when posting supplier"}
                </AlertView>}

                <ExpenseTypeSelector defaultValue={formState.expense_type} 
                    handleUpdate={handleChangeExpense} />

                {formState.expense_type !== ExpenseType.withdrawal && <InputField 
                    value={formState.name} 
                    label={"Nama"} 
                    id="name" 
                    placeholder="Nama pengeluaran"
                    handleChange={handleChangeField}
                    theme={{field:{input:{
                        base:"txt-large block w-full border disabled:cursor-not-allowed disabled:opacity-50"
                    }}}}
                />}
    
                {formState.expense_type === ExpenseType.withdrawal && <InputNumber 
                    value={profit == 0 ? "" : profit} 
                    label={"Margin Profit"} 
                    id="profit" 
                    placeholder="Harga Profit"
                    handleChange={handleChangeProfit}
                    theme={{field:{input:{
                        base:"txt-large block w-full border disabled:cursor-not-allowed disabled:opacity-50"
                    }}}}
                />}

                <InputNumber 
                    value={total == 0 ? "" : total} 
                    label={formState.expense_type === ExpenseType.withdrawal ? "Total tarik tunai" : "Total"} 
                    id="total" 
                    placeholder={formState.expense_type === ExpenseType.withdrawal ? "Total Tarik Tunai" : ""}
                    handleChange={handleChangeTotal}
                    theme={{field:{input:{
                        base:"txt-large block w-full border disabled:cursor-not-allowed disabled:opacity-50"
                    }}}}
                />

                {formState.expense_type === ExpenseType.spending && 
                <SupplierSelector label={"Supplier"} defaultValue={formState.expense_type} 
                    handleUpdate={handleChangeSupplier}/>}

                <HRDivider size="sm" />

                <LayoutItemDetail className="mb-3 mt-2" label="Total">
                    <div>
                        <span className={"text-xl"}>
                            {currency((total) - (profit))}
                        </span>
                    </div>
                </LayoutItemDetail>

             </Card>

             <Card className="max-w-full pb-4 mt-4">
                <Datepicker autoHide 
                    onSelectedDateChanged={handleChangeDate} 
                    defaultDate={date} maxDate={date} />

                {formState.expense_type === ExpenseType.withdrawal && 
                    <ProviderSelector defaultValue={formState.provider_id} 
                        label={"Agen Provider"} 
                        handleUpdate={handleChangeProvider} />}

                <SelectField label={"Metoda Bayar"} id="payment_method" 
                    value={formState.payment_method} 
                    list={LIST_PAYMENT_METHODS} 
                    handleChange={handleChange} />

                <SelectField label={"Status Bayar"} id="payment_status" 
                    value={formState.payment_status} 
                    list={LIST_PAYMENT_STATUS} 
                    handleChange={handleChange}/>

             </Card>

            <Button type="button" 
                fullSized={true} className="mt-4" size="lg" disabled={false} onClick={onBuy}>
                Simpan
            </Button>

            <HRDivider size="md" />
        </div>
    )
}