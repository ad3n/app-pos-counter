import { Card, Label, TextInput, Badge, Button, FooterDivider, ToggleSwitch, Modal } from "flowbite-react"
import { useNavigate, useLocation } from "@remix-run/react";
import { 
    useAddProductMutation,
    useEditProductMutation,
    useGetSuppliersQuery,
    ProductItem,
    PostRequestProduct,
    useActivateOrDeactivateMutation,
    useGetStocksQuery,
    PostProductStock,
    useAddStockMutation,
    useEditStockMutation
 } from "~/services/actions";
import { useEffect, useState, useCallback } from "react";
import { HRDivider, InputCheckbox, InputField, LayoutItemDetail } from "~/components";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { getUserToken } from "~/services/models/auth.model";
import { EProductTypes, TSelectItem } from "~/_types";
import { useAccount } from "~/hooks/useAccount";
import { currency } from "~/utils/helpers";
import { Loader } from "~/components/Core/Spinner";
import { MdAdd } from "react-icons/md";
import moment from "moment";
import { AlertView } from "~/components";
import { useToaster } from "~/components/Context/Toast";
import { MdEdit, MdDelete } from "react-icons/md";
import { AddQtyModal, UpdateQtyModal, DeleteQtyModal } from "./components";

export default function ViewProductContainer({ type } :  {type:string }) {
    const navigate = useNavigate()
    const location = useLocation()
    const { showToast } = useToaster()
    const { account } = useAccount()   
    const curStates =  location.state as ProductItem
    const { id, name, brand_name,  code, price, regular_price, on_sale, capital_cost } = curStates
    const [errors, setErrors] = useState<any>()
    const [listSuppliers, setListSuppliers] = useState<any>()
    const [openmodal, setOpenmodal] = useState<boolean>()
    const [addProduct, addStates] = useAddProductMutation()
    const [editProduct, updateStates] = useEditProductMutation()
    const [activateOrDeactivate, activeStates] = useActivateOrDeactivateMutation()
    const [active, setActive] = useState<boolean>(curStates?.active ===1?true:false)

    useEffect(()=>{
        if( activeStates.status === QueryStatus.fulfilled ) {
            showToast && showToast("success", active ? "Aktifkan berhasil" : "Non-aktifkan berhasil")
        }
    },[activeStates.status])

    const labelType = () => {
        return curStates.type === EProductTypes.piece ? "Satuan" : 
            curStates.type === EProductTypes.saldo ? "ELektrik" : 
                "Bebas Nominal"
    }

    const onStateActivation = async (key:boolean) => {
        setActive(key)
        const curStates = location.state as ProductItem
        try {
            await activateOrDeactivate({active:key, id:curStates.id}).unwrap()
        } catch (err) {
            console.log("err", err)
            setErrors(err)
        }
    }

    const toggleStockModal = () => {
        setOpenmodal(!openmodal)
    }
    
    return (<div>
           
            <Card className="max-w-full pb-4">
                <p className="truncate text-lg font-medium text-gray-900 dark:text-white">{name}</p>
                <div className="flex items-center justify-between space-x-4">
                    <div className="flex flex-col">
                        <div className="flex">
                            {brand_name && <Badge className="inline-flex" color={"dark"} 
                                size={"xs"}>{brand_name}</Badge>}

                            <Badge className="inline-flex ml-2" color={ curStates.active ? "green" : "red"} 
                                size={"sm"}>{curStates.active ? "Active" : "Non-active"}</Badge>
                        </div>
                        
                    </div>
                    {curStates.type === EProductTypes.piece && <div>
                        <Button onClick={()=>setOpenmodal(true)}>
                            <MdAdd size={16} />
                                <span className="ml-2">Stock</span>
                        </Button>
                    </div>}
                </div>
            </Card>

            <HRDivider size="md" noBorder={true} />

            <Card className="max-w-full">

                <LayoutItemDetail labelSize="md" label="Kategori">
                    <span>{curStates.category ?? ""}</span>
                </LayoutItemDetail>

                {code && <LayoutItemDetail labelSize="md" label="Kode Produk">
                    <span>{code}</span>
                </LayoutItemDetail>}


                {brand_name && <LayoutItemDetail labelSize="md" label="Merk">
                    <span>{brand_name}</span>
                </LayoutItemDetail>}

                {curStates.supplier_name && <LayoutItemDetail labelSize="md" label="Supplier Dari">
                    <span>{curStates.supplier_name}</span>
                </LayoutItemDetail>}

                <LayoutItemDetail labelSize="md" label="Tipe Produk">
                    <span>{labelType()}</span>
                </LayoutItemDetail>

                <LayoutItemDetail labelSize="md" label={EProductTypes.volume === curStates.type ? "Profit":"Harga"}>
                    <span>
                        {EProductTypes.volume === curStates.type ? "+ ":""}{currency(curStates.price ?? 0)}</span>
                </LayoutItemDetail>

                {Number(on_sale) === 1 && <LayoutItemDetail labelSize="md" label="Harga Sale">
                    <span>{currency(curStates.sale_price ?? 0)}</span>
                </LayoutItemDetail>}

                {capital_cost && <LayoutItemDetail labelSize="md" label="Harga Modal">
                    <span>{currency(capital_cost ?? 0)}</span>
                </LayoutItemDetail>}

            </Card>

            <HRDivider size="md" noBorder={true} />

            <Card className="max-w-full">
                <div className="flex justify-between items-center">
                    <Label htmlFor={'active'}  
                        value={active ? "Non-aktifkan produk ini?" : "Aktifkan lagi produk ini?"} />

                    <ToggleSwitch id="active" className="" checked={active??false} 
                        sizing={"md"} 
                        onChange={(state2)=>onStateActivation(state2)} />
                </div>
            </Card>

            <HRDivider size="md" noBorder={true} />

            {curStates.type === EProductTypes.piece && <ItemStocks staff_id={account?.user?.id as number} product_id={id} />}

            <HRDivider size="md" noBorder={true} />

            <Button type="button" 
                fullSized={true} size="lg" onClick={()=>navigate("/products/edit",{state:curStates})}>
                Edit Produk
            </Button>
        
            <div className="h-10 mb-10"/>

            {(account?.user?.id && openmodal) && <AddQtyModal 
                product_id={id} 
                open={Boolean(openmodal)} 
                staff_id={account?.user?.id} 
                toggleStockModal={toggleStockModal}
            />}   
    
        </div>
    )
}

export const ItemStocks = ( 
    { product_id, staff_id } : 
    { product_id: number, staff_id:number
}) => {
    const [qty, setQty] = useState<number>()
    const [id, setId] = useState<number>()
    const [openmodal, setOpenmodal] = useState<boolean>()
    const [openremove, setOpenremove] = useState<boolean>()
    const {isLoading, data, refetch, isSuccess} = useGetStocksQuery(product_id)
    const dateShow = (date:string) => {
        return moment(date).add(7, "hours").format("DD MMM YYYY - HH:mm")
    }

    const toggleStockModal = () => {
        setOpenmodal(!openmodal)
    }

    const toggleRemoveModal = () => {
        setOpenremove(!open)
    }

    const onOpenModal = (id:number, qty:number) => {
       setId(id) 
       setQty(qty)
       setOpenmodal(true)
    }

    const onOpenModalRemove = (id:number) => {
        setId(id) 
        setOpenremove(true)
     }

    const isFirstEditable = (index:number) => data?.edit.id === index

    return (<div>
        <div className="flex mb-2 items-center">
            <h3 className="dark:text-white font-2xl mr-2">Riwayat Stock</h3>
            <Badge color="light" className="font-lg font-bold">
                <span className="font-bold">{data?.total}</span>
            </Badge>
        </div>
       
        <Card className="max-w-full mt-4">
            {isLoading ? <Loader /> : <div className="flow-root">
                {(isSuccess && data?.data && data?.data?.length > 0) ? <ul 
                    className="divide-y divide-gray-200 dark:divide-gray-700">
                    {data.data.map((item,index) => <li className="py-4">
                        <div className="flex items-center space-x-4">
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-md font-medium text-gray-900 dark:text-white">
                                    {item.qty > 0 ? "Tambah Stock": "Stock Terbeli"}
                                </p>
                                <Badge className="inline-flex not-italic mt-2" color={"gray"} size={"sm"}>
                                    {dateShow(item.created_at)}
                                </Badge>
                                <Badge 
                                    className="inline-flex not-italic mt-2 ml-2" color={
                                        item.type === "in" ? "cyan" : "gray"} 
                                        size={"sm"}>
                                            {item.type === "in" ? "In" : "Out"}
                                </Badge>
                            </div>
                            <div className="flex flex-col items-end font-bold text-gray-900 dark:text-white"> 
                                <Badge color={item.type === "in" ? "green" : "red"} className="text-xl">
                                    {item.qty > 0 ? "+":""}{item.qty}
                                </Badge>
                                {index > -1 && isFirstEditable(item.id) && <div 
                                    className="flex flex-row space-gap-2">
                                    <div 
                                        onClick={()=>onOpenModal(item.id,item.qty)} 
                                        className="rounded cursor-pointer px-2 py-1 mt-2 border border-gray-900 bg-gray-700">
                                        <MdEdit />
                                    </div>

                                    <div 
                                        onClick={()=>onOpenModalRemove(item.id)} 
                                        className="rounded cursor-pointer px-2 py-1 mt-2 border border-gray-900 bg-gray-700">
                                        <MdDelete />
                                    </div>
                                </div>}
                                
                            </div>
                        </div>
                    </li>)}
                </ul> : <div className="my-4">
                    <span className="text-white align-center">No stock</span>
                </div>}
            </div>}
        </Card>

            {(openmodal) && <UpdateQtyModal 
                id={Number(id)} 
                qty={Number(qty)} 
                open={Boolean(openmodal)} 
                staff_id={staff_id} 
                toggleStockModal={toggleStockModal}
            />}   

            {(openremove) && <DeleteQtyModal 
                id={Number(id)} 
                open={Boolean(openremove)} 
                staff_id={staff_id} 
                toggleStockModal={toggleRemoveModal}
            />} 
            
    </div>
    )
}
