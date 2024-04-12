import { Card, Label, Badge, Button, Datepicker } from "flowbite-react"
import { useNavigate, useLocation } from "@remix-run/react";
import { 
    ProductItem, 
    TPostRequestItemProduct,
    useAddTransactionIncomeMutation
 } from "~/services/actions";
import React, { useCallback, useEffect, useState } from "react";
import { AlertView, InputField, SelectField, InputNumber, HRDivider } from "~/components";
import { getUserToken } from "~/services/models/auth.model";
import { EPaymentMethod, EPaymentStatus, EPaymentTypes, EProductTypes, TSelectItem } from "~/_types";
import { LIST_PAYMENT_METHODS, LIST_PAYMENT_STATUS } from "~/data/constant";
import { useAccount } from "~/hooks/useAccount";
import ProviderSelector from "../../components/Prebuilt/ProviderSelector";
import ListProductContainer from "../Product/ListProduct";
import { currency } from "~/utils/helpers";
import { LayoutItemDetail } from "~/components";
import CustomerSelector from "~/components/Prebuilt/CustomerSelector";
import { TPostRequestIncome } from "~/services/actions";
import moment from "moment";


export default function AddOmzetContainer({ type } :  {type:string }) {
    const navigate = useNavigate()
    const location = useLocation()

    return (<div>
            {type === "cart" && <ListProductContainer spacing="wide" type="cart" />}
            {type === "add" && <OmzetInputContainer />}
        </div>
    )
}

export const OmzetInputContainer = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const states = location.state as ProductItem
    const { account } = useAccount()
    const { id, name, price, sale_price, type, brand_name, on_sale, category_id, total_qty, capital_cost } = states
    const [errors, setErrors] = useState<any>()
    const [qty, setQty] = useState<number>(1)
    const [nominal, setNominal] = useState<number>(0)
    const [cost, setCost] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)
    const [date, setDate] = useState<Date>(new Date())
    const [formState, setFormState] = useState<Partial<TPostRequestIncome>>({
        provider_id: undefined,
        payment_method: EPaymentMethod.cash,
        payment_status: EPaymentStatus.paid,
        work_date: '',
        customer_id: undefined
    })

    const [addTransactionIncome, addStates] = useAddTransactionIncomeMutation()

    const labelType = () => {
        return type === EProductTypes.piece ? "Satuan" : 
            type === EProductTypes.saldo ? "ELektrik" : 
                "Bebas Nominal"
    }

    const handleChangeNominal = (
        { target: { value }}: React.ChangeEvent<HTMLInputElement>) => {
            setNominal(Number(value ?? "") as number)
    }

    const handleChangeCost = (
        { target: { value }}: React.ChangeEvent<HTMLInputElement>) => {
            setCost(Number(value ?? "") as number)
    }

    const handleChangeQty =  (
        { target: { value }}: React.ChangeEvent<HTMLInputElement>) => {
            setQty(Number(value ?? 1) as number)
    }

    const handleChangeProvider = (
        id:number):void => setFormState((prev)=>({...prev, provider:id}))

    const handleChangeCustomer = (
        id:number):void => setFormState((prev)=>({...prev, customer_id:id}))

    const handleChange = (
        { target :{name, value}}:React.ChangeEvent<HTMLSelectElement>) => {
        setFormState((prev)=>({...prev, [name]:value}))
    }

    const handleChangeDate = (date:Date) => setDate(date)

    useEffect(()=>{
        setTotal( (Number(nominal) + Number(price)) * qty )
    },[nominal, setNominal, qty, setQty])

    useEffect(()=>{
        if( addStates.isSuccess ) {
            navigate("/transaction")
        }
    },[addStates.isSuccess])

    const onBuy = async () => {
        const dateWork = moment(date).format("YYYY-MM-DD")

        const items:TPostRequestItemProduct = { 
            id, 
            name, 
            qty, 
            cost:Number(capital_cost),
            category_id, 
            employee_id: account?.user?.id as number
        }

        if( type !== EProductTypes.piece ) {
            items.custom_price = nominal
        }

        if( type === EProductTypes.volume ) {
            items.cost = cost
        }


        const params: TPostRequestIncome = {
            type:EPaymentTypes.income,
            work_date:dateWork,
            payment_status:formState.payment_status as string,
            payment_method:formState.payment_method as string,
            employee_id: account?.user?.id as number,
            customer_id: formState?.customer_id,
            provider_id: formState?.provider_id,
            items:[items]
        }

        try {
            await addTransactionIncome(params).unwrap()
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
                        <p className="truncate text-lg font-medium text-gray-900 dark:text-white">{name}</p>
                        <div className="flex">
                            <Badge className="inline-flex not-italic mt-2" color={"gray"} size={"sm"}>
                                {labelType()}
                            </Badge>
                            {brand_name && <Badge className="inline-flex mt-2 ml-2" color={"indigo"} size={"sm"}>{brand_name}</Badge>}
                        </div>
                    </div>
                </div>
             </Card>

             <Card className="max-w-full pb-4">
                {(addStates.isError) && <AlertView title="Info" color="failure">
                    {errors?.data?.validated === false ? "Ada kolom yang tidak valid & mohon lengkapi" : "Something error when posting supplier"}
                </AlertView>}

                <LayoutItemDetail labelSize="xl" className="mb-3" label="Harga">
                    <div>
                        <span className={on_sale ? "line-through text-lg font-lg dark:text-gray-400" : "text-xl"}>
                            {type === EProductTypes.volume ? "+":""}{currency(price as number)}
                        </span> 
                        {Number(on_sale) > 0 && <span className={"text-xl"}>
                            {currency(sale_price as number)}
                        </span>}
                    </div>
                </LayoutItemDetail>

                {type === EProductTypes.volume && <LayoutItemDetail labelSize="xl" label="Nominal">
                    <span className="inline-flex items-center text-xl">
                        <span className="mr-2">Rp</span>
                        <InputNumber 
                            value={nominal == 0 ? "" : nominal} 
                            containerClass="text-center w-32" 
                            label={null} id="nominal" 
                            handleChange={handleChangeNominal}
                            theme={{field:{input:{
                                base:"txt-large block w-full border disabled:cursor-not-allowed disabled:opacity-50"
                            }}}}
                        />
                    </span>
                </LayoutItemDetail>}

                {type === EProductTypes.volume && <LayoutItemDetail labelSize="xl" label="Modal">
                    <span className="inline-flex items-center text-xl">
                        <span className="mr-2">Rp</span>
                        <InputNumber 
                            value={cost == 0 ? "" : cost} 
                            containerClass="text-center w-32" 
                            label={null} id="cost" 
                            handleChange={handleChangeCost}
                            theme={{field:{input:{
                                base:"txt-large block w-full border disabled:cursor-not-allowed disabled:opacity-50"
                            }}}}
                        />
                    </span>
                </LayoutItemDetail>}

                {type === EProductTypes.piece && <LayoutItemDetail labelSize="xl" label="Qty">
                    <span className="text-xl">
                        <InputNumber  
                             theme={{field:{input:{
                                base:"txt-large block w-full border disabled:cursor-not-allowed disabled:opacity-50"
                            }}}}
                            min={1}
                            max={total_qty??1}
                            maxLength={2}
                            handleChange={handleChangeQty}
                            containerClass="w-16 text-center" 
                            label={null} 
                            value={qty === 0 ? "" : qty} id="qty" />
                    </span>
                </LayoutItemDetail>}

                {(capital_cost && capital_cost > 0) && <LayoutItemDetail labelSize="md" className="mb-1" label="Modal">
                    <div>
                        <span className={"text-md"}>
                            {currency(capital_cost as number)}
                        </span>
                    </div>
                </LayoutItemDetail>}

                {(capital_cost && capital_cost > 0) && <LayoutItemDetail labelSize="md" className="mb-1" label="Profit">
                    <div>
                        <span className={"text-md text-green-500"}>
                            +{currency(total-(capital_cost*qty))}
                        </span>
                    </div>
                </LayoutItemDetail>}

                <LayoutItemDetail labelSize="xl" className="mb-3" label="Total">
                    <div>
                        <span className={"text-xl"}>
                            {currency(total as number)}
                        </span>
                    </div>
                </LayoutItemDetail>

             </Card>

             <Card className="max-w-full pb-4 mt-4">
                <Datepicker autoHide 
                    onSelectedDateChanged={handleChangeDate} 
                    defaultDate={date} maxDate={date} />

                {type !== EProductTypes.piece && <ProviderSelector defaultValue={formState.provider_id} 
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

                {formState.payment_status === EPaymentStatus.credit && 
                    <CustomerSelector defaultValue={formState.customer_id}
                        label={"Customer"} 
                        handleUpdate={handleChangeCustomer} />}
             </Card>

            <Button type="button" 
                fullSized={true} className="mt-4" size="lg" disabled={false} onClick={onBuy}>
                Simpan
            </Button>
        </div>
    )
}