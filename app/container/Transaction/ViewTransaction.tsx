import { Card, Label, Badge, Button, Modal } from "flowbite-react"
import { useNavigate, useLocation } from "@remix-run/react";
import { 
    ProductItem, 
    TPostRequestItemProduct,
    TransactionItem,
    useAddTransactionIncomeMutation,
    useUpdatePaymentStatusMutation
 } from "~/services/actions";
import React, { useCallback, useEffect, useState } from "react";
import { AlertView, InputField, SelectField, InputNumber, HRDivider } from "~/components";
import { getUserToken } from "~/services/models/auth.model";
import { EPaymentMethod, EPaymentStatus, EPaymentTypes, EProductTypes, ExpenseType, TSelectItem } from "~/_types";
import { LIST_PAYMENT_METHODS, LIST_PAYMENT_STATUS } from "~/data/constant";
import { useAccount } from "~/hooks/useAccount";
import ProviderSelector from "../../components/Prebuilt/ProviderSelector";
import ListProductContainer from "../Product/ListProduct";
import { currency } from "~/utils/helpers";
import { LayoutItemDetail } from "~/components";
import CustomerSelector from "~/components/Prebuilt/CustomerSelector";
import { TPostRequestIncome, useRemoveTransactionMutation } from "~/services/actions";
import moment from "moment";
import { QueryStatus } from "@reduxjs/toolkit/query";

export default function ViewTransactionContainer() {
    const location = useLocation()
    const navigate = useNavigate()
    const states = location.state as TransactionItem
    const { 
        name, qty, payment_method, 
        payment_status, total, order_no, 
        created_date, items, provider,
        type, staff, expense_type, paid_date, 
        customer
    } = states
    const { account } = useAccount()
    const [openmodal, setOpenmodal] = useState<boolean>(false)
    const [paidmodal, setPaidmodal] = useState<boolean>(false)
    const [removeTransaction, deleteStates] = useRemoveTransactionMutation()
    const [updatePaymentStatus, updateStates] = useUpdatePaymentStatusMutation()
    const [errors, setErrors] = useState<any>()

    const dateShow = () => {
        return moment(created_date.raw, "DD-MM-YYYY HH:mm:ss")
            .utcOffset(7).format("DD MMM YYYY - HH:mm")
    }

    const datePaidShow = () => {
        return moment(paid_date.raw, "DD-MM-YYYY HH:mm:ss")
            .utcOffset(7).format("DD MMM YYYY - HH:mm")
    }

    const onConfirmDelete = () => {
        setOpenmodal(true)
    }

    useEffect(()=>{
        if( deleteStates.status === QueryStatus.fulfilled || updateStates.status === QueryStatus.fulfilled ) {
            navigate("/transaction")
        }
    },[deleteStates.status, updateStates.status])

    const onClose = () => setOpenmodal(false)
    const onClosePaid = () => setPaidmodal(false)


    const onDelete = async () => {
        try {
            await removeTransaction(order_no).unwrap()
        } catch (error) {
            setErrors(errors)
            console.log("err", error)  
        } 
    }

    const onReadyPaid = async () => {
        try {
            await updatePaymentStatus({orderNo:order_no,status:"paid"}).unwrap()
        } catch (error) {
            setErrors(errors)
            console.log("err", error)  
        } 
    }

    const productType = items[0]?.product?.type
    const productPrice = items[0]?.price ?? 0
    const productCost = items[0].cost
    const debit = items[0]?.debit ?? 0
    const credit = items[0]?.credit ?? 0

    return (
        <div className="pt-4">
            <Card className="max-w-full mb-4">
                <div className="flex items-center justify-center space-x-4">
                    <div className="flex  items-center flex-col">
                        <p className="truncate text-lg font-medium text-gray-900 dark:text-white">{name}</p>
                        <div className="flex">
                            <Badge className="inline-flex mt-2 ml-2" color={
                                type.value === EPaymentTypes.income ? "green" : "red"} 
                                size={"sm"}>{type.label}</Badge>

                            <Badge className="inline-flex mt-2 ml-2" color={
                                payment_status.value === EPaymentStatus.credit ? "purple" : "dark"} 
                                size={"sm"}>{payment_status.label}</Badge>

                            {provider ? <Badge className="inline-flex mt-2 ml-2" color={"cyan"} 
                                size={"sm"}>{provider.name}</Badge> : null }
                            
                        </div>
                    </div>
                </div>
            </Card>

            <Card className="max-w-full">
                {(deleteStates.isError) && <AlertView title="Info" color="failure">
                    {errors?.data?.validated === false ? "Ada kolom yang tidak valid & mohon lengkapi" : "Something error when deleting transaction"}
                </AlertView>}

                <LayoutItemDetail labelSize="md" className="mb-3" label="Kode Order">
                    {order_no}
                </LayoutItemDetail>

                <LayoutItemDetail labelSize="md" className="mb-3" label="Tgl. Transaksi">
                    {dateShow()}
                </LayoutItemDetail>

                {paid_date?.raw && <LayoutItemDetail labelSize="md" className="mb-3" label="Tgl. Bayar">
                    {datePaidShow()}
                </LayoutItemDetail>}

                <LayoutItemDetail labelSize="md" className="mb-3" label="Metoda Bayar">
                    {payment_method.label}
                </LayoutItemDetail>

                <LayoutItemDetail labelSize="md" className="mb-3" label="Tipe Transaksi">
                    <Badge className="inline-flex mt-2 ml-2" color={
                        type.value === EPaymentTypes.income ? "green" : "red"} 
                        size={"sm"}>{type.label}</Badge>
                </LayoutItemDetail>

                {type.value === EPaymentTypes.expense && <LayoutItemDetail labelSize="md" className="mb-3" label="Jenis Pengeluaran">
                    <Badge className="inline-flex mt-2 ml-2" color={"pink"} 
                        size={"sm"}>{expense_type.label}</Badge>
                </LayoutItemDetail>}

                {(type.value === EPaymentTypes.expense && expense_type.value === ExpenseType.withdrawal) &&     <LayoutItemDetail labelSize="md" className="mb-3" label="Profit">
                    {currency(credit)}
                </LayoutItemDetail>}

                {(productType && productPrice > 0) && <LayoutItemDetail labelSize="md" className="mb-3" label={
                    `Harga ${productType === EProductTypes.piece ? "Satuan": "Jual"}`}>
                    {productType === EProductTypes.piece ? currency(productPrice) : currency(productPrice)}
                </LayoutItemDetail>}

                {(productCost > 0) && <LayoutItemDetail labelSize="md" className="mb-3" label={'Harga Modal'}>
                    {currency(productCost)}
                </LayoutItemDetail>}

                {(productType === EProductTypes.piece && productPrice) && <LayoutItemDetail labelSize="md" className="mb-3" label={'Margin Profit'}>
                    <span className="text-green-500">+{currency((Number(productPrice) - Number(productCost)))}</span>
                </LayoutItemDetail>}

                {productType === EProductTypes.piece && 
                    <LayoutItemDetail labelSize="md" className="mb-3" label={`Qty`}>
                        {qty}
                    </LayoutItemDetail>}
                
                <LayoutItemDetail labelSize="md" className="mb-3" label={
                    type.value === EPaymentTypes.expense ? `Total Pengeluaran` :`Total Harga`}>
                    {currency(total)}
                </LayoutItemDetail>

                {provider ? <LayoutItemDetail labelSize="md" className="mb-3" label={`Agen Provider`}>
                    {provider.name}
                </LayoutItemDetail> : null}

                {staff ? <LayoutItemDetail labelSize="md" className="mb-3" label={`Staff`}>
                    {staff.name}
                </LayoutItemDetail> : null}

            </Card>
                
            <HRDivider size="md" noBorder={true} />

            {customer && <h3 className="dark:text-white font-2xl mb-4">Customer</h3>}

            {customer && <Card className="max-w-full">
                <LayoutItemDetail labelSize="md" className="mb-3" label="Nama Pelanggan">
                    {customer.name}
                </LayoutItemDetail>

                {customer.no_hp && <LayoutItemDetail labelSize="md" className="mb-3" label="No. HP (1)">
                    {customer.no_hp}
                </LayoutItemDetail>}

                {customer.no_hp_2 && <LayoutItemDetail labelSize="md" className="mb-3" label="No. HP (2)">
                    {customer.no_hp_2}
                </LayoutItemDetail>}

                {customer.no_hp_3 && <LayoutItemDetail labelSize="md" className="mb-3" label="No. HP (3)">
                    {customer.no_hp_3}
                </LayoutItemDetail>}

                {customer.dana_va && <LayoutItemDetail labelSize="md" className="mb-3" label="Dana No. HP">
                    {customer.dana_va}
                </LayoutItemDetail>}

                {customer.shopee_va && <LayoutItemDetail labelSize="md" className="mb-3" label="Shopee No. HP">
                    {customer.shopee_va}
                </LayoutItemDetail>}

                {customer.ovo_va && <LayoutItemDetail labelSize="md" className="mb-3" label="OVO No. HP">
                    {customer.ovo_va}
                </LayoutItemDetail>}

                {customer.gopay_va && <LayoutItemDetail labelSize="md" className="mb-3" label="OVO No. HP">
                    {customer.gopay_va}
                </LayoutItemDetail>}

                {customer.maxim_id && <LayoutItemDetail labelSize="md" className="mb-3" label="Maxim ID">
                    {customer.maxim_id}
                </LayoutItemDetail>}

                {customer.pln_token && <LayoutItemDetail labelSize="md" className="mb-3" label="PLN Token">
                    {customer.pln_token}
                </LayoutItemDetail>}

                {customer.bpjs && <LayoutItemDetail labelSize="md" className="mb-3" label="BPJS ID">
                    {customer.bpjs}
                </LayoutItemDetail>}
            </Card>}

            {customer && payment_status.value === EPaymentStatus.credit && <Button className="mt-4" 
                fullSized onClick={()=>setPaidmodal(true)} 
                color="green">Lunaskan</Button>}

            <HRDivider size="md" />

            <Button fullSized outline={true} className="mb-4" onClick={onConfirmDelete} color="red">Delete</Button>

            <HRDivider noBorder={true} size="md" />

            <Modal size={"sm"} show={openmodal} onClose={onClose}>
                <Modal.Header>Konfirmasi Hapus</Modal.Header>
                <Modal.Body>
                    <p className="text-white">Apakah Anda Yakin Hapus Transaksi ini?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button fullSized onClick={onDelete} color="red">Ok</Button>
                    <Button fullSized outline={true} color="gray" onClick={onClose}>Batal</Button>
                </Modal.Footer>
            </Modal>

            <Modal size={"sm"} show={paidmodal} onClose={onClosePaid}>
                <Modal.Header>Konfirmasi Pelunasan</Modal.Header>
                <Modal.Body>
                    <p className="text-white">Apakah Anda Yakin Lunasi Transaksi ini?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button fullSized onClick={onReadyPaid} color="green">Ok</Button>
                    <Button fullSized outline={true} color="gray" onClick={onClosePaid}>Batal</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}