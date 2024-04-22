import { Button, Modal } from "flowbite-react"
import { 
    PostProductStock,
    PutProductStock,
    useAddStockMutation,
    useEditStockMutation,
    useRemoveStockMutation
 } from "~/services/actions";
import { useEffect, useState, useCallback } from "react";
import { InputField, LayoutItemDetail } from "~/components";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { AlertView } from "~/components";


export const DeleteQtyModal = (
    {id, staff_id, open=false, toggleStockModal}:
    {id:number, staff_id:number, open:boolean, toggleStockModal:()=>void
}) => {
    const [formState, setFormState] = useState({
        id: Number(id),
        employee_id: staff_id
    })
    const [errors, setErrors] = useState<any>()
    const [show, setShow] = useState<boolean>()
    const [removeStock, removeStates] = useRemoveStockMutation()

    useEffect(()=>{
        setShow(open)
    },[open])

    const onDelete = () => {
        try {
            const adata = removeStock(id).unwrap()
        } catch (error) {
            setErrors(error)
        }
    }

    useEffect(()=>{
        if( removeStates.status === QueryStatus.fulfilled ) {
            toggleStockModal()
        }
    },[removeStates.status, removeStates.isSuccess])

    return (
        <Modal size={"sm"} show={show} onClose={toggleStockModal}>
            <Modal.Header>Konfirmasi Hapus Stok</Modal.Header>
            <Modal.Body>
                <p className="text-white">Apakah Anda Yakin Hapus Stok ini?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button fullSized onClick={onDelete} color="green">Ya, Hapus</Button>
                <Button fullSized outline={true} color="gray" onClick={toggleStockModal}>Batal</Button>
            </Modal.Footer>
        </Modal>
    )
}