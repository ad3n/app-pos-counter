import { Card, Label, TextInput, Badge, Button, FooterDivider, ToggleSwitch } from "flowbite-react"
import { useNavigate, useLocation } from "@remix-run/react";
import { 
    useAddProductMutation,
    useEditProductMutation,
    useGetSuppliersQuery,
    ProductItem,
    PostRequestProduct,
    PutRequesProduct,
    useActivateOrDeactivateMutation
 } from "~/services/actions";
import { useCallback, useEffect, useState } from "react";
import { AlertView, InputField, SelectField, InputNumber, HRDivider, InputCheckbox } from "~/components";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { getUserToken } from "~/services/models/auth.model";
import { EProductTypes, TSelectItem } from "~/_types";
import { DEFAULT_SUPPLIER_SELECTED } from "~/data/constant";
import { useAccount } from "~/hooks/useAccount";
import CategorySelector from "../../components/Prebuilt/CategorySelector";
import BrandSelector from "../../components/Prebuilt/BrandSelector";
import ProductTypeSelector from "../../components/Prebuilt/ProductTypeSelector";

export default function AddProductContainer({ type } :  {type:string }) {
    const navigate = useNavigate()
    const location = useLocation()
    const { account } = useAccount()   
    const [errors, setErrors] = useState<any>()
    const [formState, setFormState] = useState<Partial<PostRequestProduct>>({
        name:'',
        code:'',
        type:EProductTypes.piece,
        category_id:0,
        price:0,
        sale_price:0,
        capital_cost:0,
        on_sale:false,
        supplier_id:0,
        brand_id:0,
        active:true
    })
    const [active, setActive] = useState<boolean>()
    const [listSuppliers, setListSuppliers] = useState<any>()
    const suppliers = useGetSuppliersQuery()

    useEffect(()=>{
        const list:TSelectItem[] = suppliers.data?.map(item => 
            ({ label:item.name, value:item.id })) as TSelectItem[] 
        list?.unshift(DEFAULT_SUPPLIER_SELECTED)
        setListSuppliers(list)
    },[suppliers.data, suppliers.isSuccess])
    
    const [addProduct, addStates] = useAddProductMutation()
    const [editProduct, updateStates] = useEditProductMutation()
    const [activateOrDeactivate, activeStates] = useActivateOrDeactivateMutation()

    const onAdd = async () => {
        const user = (await getUserToken()).user
        const body = {
            ...formState, 
            on_sale: (Number(formState.sale_price) === 1 ? true : false) as boolean,
            merchant_id: user?.merchant_id
        }
        try {
            await addProduct(body).unwrap()
        } catch (err) {
            console.log("err", err)
            setErrors(err)
        }
    }

    const onEdit = async () => {
        const curStates =  location.state as ProductItem
        const user = (await getUserToken()).user
        try {
            await editProduct({...formState, id:curStates.id}).unwrap()
        } catch (err) {
            console.log("err", err)
            setErrors(err)
        }
    }

    const onDelete = async () => {

    }

    useEffect(()=>{
        if( type == "edit" ) {
            const states =  location.state as ProductItem
            setFormState({
                name: states.name,
                code: states.code,
                type: states.type,
                capital_cost: states.capital_cost,
                price: states.price,
                sale_price: states.sale_price,
                on_sale:Number(states.on_sale) === 1 ? true : false,
                category_id:states.category_id,
                brand_id:states.brand_id,
                supplier_id:states.supplier_id,
                active:states.active,
            })
            setActive(states?.active??false)
        }
    },[])

    useEffect(()=>{
        if( addStates.status == QueryStatus.fulfilled || 
            updateStates.status === QueryStatus.fulfilled || 
            activeStates.status === QueryStatus.fulfilled ) {
            navigate("/products")
        }
    },[addStates.status, updateStates.status, activeStates.status])

    const handleChange = useCallback(({
        target: { name, value },
    }: React.ChangeEvent<HTMLInputElement>) => {
        setFormState((prev) => ({ ...prev, [name]: value }))
    },[setFormState, formState])
        

    const handleSelectChange = ({
        target: { name, value },
    }: React.ChangeEvent<HTMLSelectElement>) =>
        setFormState((prev) => ({ ...prev, [name]: value }))

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
    
    return (<div>
            <Card className="max-w-full pb-4">
                {(addStates.isError || updateStates.isError) && <AlertView title="Info" color="failure">
                    {errors?.data?.validated === false ? "Ada kolom yang tidak valid & mohon lengkapi" : "Something error when posting supplier"}
                </AlertView>}

                <div className="flex flex-col gap-4">
                    {account?.user?.merchant_id && <CategorySelector 
                        label="Kategori"
                        defaultValue={formState.category_id}
                        handleUpdate={(id)=>setFormState({...formState, category_id:id})} 
                        merchantId={account?.user?.merchant_id} />}

                    <BrandSelector 
                        defaultValue={formState.brand_id}
                        handleUpdate={(id)=>setFormState({...formState, brand_id:id})} />

                    {listSuppliers && <SelectField label={"Supplier"} 
                        list={listSuppliers} 
                        id="supplier_id" 
                        value={formState.supplier_id} 
                        handleChange={handleSelectChange} />}
                </div>
            </Card>

            <FooterDivider />

            <Card className="max-w-full pb-4">
                <div className="flex flex-col gap-4">
                    <ProductTypeSelector defaultValue={formState.type} handleUpdate={(id)=>setFormState({...formState, type:id})} />

                    <InputField errors={errors?.data?.messages} label="Nama Produk" id="name" min={2} handleChange={handleChange} value={formState.name} required placeholder="Masukkan nama produk" />

                    {formState.type === EProductTypes.piece && <InputField  errors={errors?.data?.messages} label="Kode Produk" id="code" min={3} handleChange={handleChange} value={formState.code} placeholder="(Opsional) Masukkan kode produk" />}

                    <InputNumber errors={errors?.data?.messages} label={formState.type === EProductTypes.saldo ? "Harga Jual" : formState.type === EProductTypes.volume ? "Profit Harga Jual" : "Harga Reguler"} id="price" min={3} handleChange={handleChange} value={formState.price} required  placeholder="Masukkan harga normal" />

                    {(formState.type === EProductTypes.piece || formState.type === EProductTypes.saldo) && <InputNumber  errors={errors?.data?.messages} label="Harga Sale" id="sale_price" min={3} handleChange={handleChange} value={formState.sale_price} placeholder="Masukkan harga sale" />}

                    {(formState.type === EProductTypes.piece || formState.type === EProductTypes.saldo) && <InputNumber  errors={errors?.data?.messages} label="Harga Modal" id="capital_cost" min={3} handleChange={handleChange} value={formState.capital_cost} placeholder="Masukkan harga modal" />}

                </div>
            </Card>

            <HRDivider size="sm" />

            <Label htmlFor={'active'} className="mb-3" value={formState.active ? "Non-aktifkan produk ini?" : "Aktifkan lagi produk ini?"} />

            <ToggleSwitch id="active" className="mt-2" checked={active??false} 
                label="Status" sizing={"md"} 
                onChange={(state2)=>onStateActivation(state2)} />

            <HRDivider size="sm" />
            
            {type === "edit" ? 
                <Button type="button" 
                    fullSized={true} size="lg" disabled={updateStates.isLoading || activeStates.isLoading} onClick={onEdit}>
                    Update
                </Button> : 
                <Button type="button" 
                    fullSized={true} size="lg" disabled={addStates.isLoading} onClick={onAdd}>
                    Simpan
                </Button>}
            {type === "edit" && <Button fullSized={true} color="gray" className="mt-6" size="lg" onClick={onDelete}>
                <span className="text-red-300">Delete</span>
            </Button>}

            <div className="h-10 mb-10"/>
            
        </div>
    )
}