import { Button, Modal } from "flowbite-react"
import { 
    PostProductStock,
    PutProductStock,
    useAddStockMutation,
    useEditStockMutation
 } from "~/services/actions";
import { useEffect, useState, useCallback } from "react";
import { InputField, LayoutItemDetail } from "~/components";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { AlertView } from "~/components";

export const AddQtyModal = (
    {product_id, staff_id, open=false, toggleStockModal}:
    {product_id:number, staff_id:number,open:boolean, toggleStockModal:()=>void
}) => {
    const [formState, setFormState] = useState<PostProductStock>({
        qty:1,
        product_id: Number(product_id),
        employee_id: staff_id
    })
    const [errors, setErrors] = useState<any>()
    const [addStock, addStates] = useAddStockMutation()

    const handleChange = useCallback(({
        target: { name, value },
    }: React.ChangeEvent<HTMLInputElement>) => {
        setFormState((prev) => ({ ...prev, [name]: value }))
    },[setFormState, formState])

    const onConfirm = () => {
        try {
            const adata = addStock(formState).unwrap()
        } catch (error) {
            setErrors(error)
        }
    }

    useEffect(()=>{
        if( addStates.status === QueryStatus.fulfilled ) {
            toggleStockModal()
        }
    },[addStates.status, addStates.isSuccess])

    return (
        <Modal size={"sm"} show={open} onClose={toggleStockModal}>
            <Modal.Header>Tambah Stok</Modal.Header>
            <Modal.Body>
                {(addStates.isError) && <AlertView title="Info" color="failure">
                    {errors?.data?.validated === false ? "Ada kolom yang tidak valid & mohon lengkapi" : "Something error when posting supplier"}
                </AlertView>}
                <InputField value={formState.qty} type="number" min={1} max={50} label={"Qty"} id="qty" handleChange={handleChange} />
            </Modal.Body>
            <Modal.Footer>
                <Button fullSized onClick={onConfirm} color="green">Simpan</Button>
                <Button fullSized outline={true} color="gray" onClick={toggleStockModal}>Batal</Button>
            </Modal.Footer>
        </Modal>
    )
}


export const UpdateQtyModal = (
    {id, staff_id, qty, open=false, toggleStockModal}:
    {id:number, qty:number, staff_id:number,open:boolean, toggleStockModal:()=>void
}) => {
    const [formState, setFormState] = useState<PutProductStock>({
        qty:qty,
        id: Number(id),
        employee_id: staff_id
    })
    const [errors, setErrors] = useState<any>()
    const [updateStock, updateStates] = useEditStockMutation()

    const handleChange = useCallback(({
        target: { name, value },
    }: React.ChangeEvent<HTMLInputElement>) => {
        setFormState((prev) => ({ ...prev, [name]: value }))
    },[setFormState, formState])

    const onUpdate = () => {
        try {
            const adata = updateStock(formState).unwrap()
        } catch (error) {
            setErrors(error)
        }
    }

    useEffect(()=>{
        if( updateStates.status === QueryStatus.fulfilled ) {
            toggleStockModal()
        }
    },[updateStates.status, updateStates.isSuccess])

    return (
        <Modal size={"sm"} show={open} onClose={toggleStockModal}>
            <Modal.Header>Update Stok</Modal.Header>
            <Modal.Body>
                {(updateStates.isError) && <AlertView title="Info" color="failure">
                    {errors?.data?.validated === false ? "Ada kolom yang tidak valid & mohon lengkapi" : "Something error when putting stock qty"}
                </AlertView>}
                <InputField value={formState.qty} type="number" min={1} max={50} label={"Qty"} id="qty" handleChange={handleChange} />
            </Modal.Body>
            <Modal.Footer>
                <Button fullSized onClick={onUpdate} color="green">Simpan</Button>
                <Button fullSized outline={true} color="gray" onClick={toggleStockModal}>Batal</Button>
            </Modal.Footer>
        </Modal>
    )
}