import { Card, Label, TextInput, Badge, Button, FooterDivider } from "flowbite-react"
import { useNavigate, useLocation } from "@remix-run/react";
import { useAddCustomerMutation, useGetCustomerQuery, useEditCustomerMutation, PutRequesCustomer, PostRequestCustomer, SupplierItem, CustomerItem } from "~/services/actions";
import { useEffect, useState } from "react";
import { AlertView, InputField, InputTextArea } from "~/components";
import { FetchBaseQueryError, QueryStatus } from "@reduxjs/toolkit/query";
import { getUserToken } from "~/services/models/auth.model";

export default function AddCustomerContainer({ type } :  {type:string }) {
    const navigate = useNavigate()
    const location = useLocation()
    const [errors, setErrors] = useState<any>()
    const [formState, setFormState] = useState<PostRequestCustomer>({
        name: '',
        no_hp: '',
        no_hp_2: '',
        no_hp_3: '',
        note: '',
        bpjs: '',
        pln_token:'',
        gopay_va: '',
        ovo_va:"",
        maxim_id:"",
        dana_va:"",
        shopee_va:""
    })

    const [addCustomer, { isLoading, isError, error, status }] = useAddCustomerMutation()
    const [editCustomer, updateStates ] = useEditCustomerMutation()
    //const customerStates = useGetCustomerQuery(location.state.id)

    const onAdd = async () => {
        const user = (await getUserToken()).user

        try {
            await addCustomer(formState).unwrap()
        } catch (err) {
            console.log("err", err)
            setErrors(err)
        }
    }

    const onEdit = async () => {
        const curStates =  location.state as SupplierItem
        const user = (await getUserToken()).user
        try {
            await editCustomer({...formState, id:curStates.id}).unwrap()
        } catch (err) {
            console.log("err", err)
            setErrors(err)
        }
    }

    const onDelete = async () => {

    }

    useEffect(()=>{
        if( type == "edit" ) {
            const states =  location.state as CustomerItem
            console.log("location", location)
            setFormState({
                name: states.name,
                no_hp: states.no_hp,
                no_hp_2: states.no_hp_2,
                no_hp_3: states.no_hp_3,
                note: states.note,
                bpjs: states.bpjs,
                pln_token: states.pln_token,
                gopay_va: states.gopay_va,
                ovo_va: states.ovo_va,
                maxim_id: states.maxim_id,
                dana_va: states.dana_va,
                shopee_va: states.shopee_va
            })
        }
    },[type])

    useEffect(()=>{
       if( status == QueryStatus.fulfilled || updateStates.status === QueryStatus.fulfilled ) {
        navigate("/customers")
       }
    },[status, updateStates.status])

    const handleChange = ({
        target: { name, value },
    }: React.ChangeEvent<HTMLInputElement>) =>
        setFormState((prev) => ({ ...prev, [name]: value }))

    const handleAreaChange = ({
        target: { name, value },
    }: React.ChangeEvent<HTMLTextAreaElement>) =>
        setFormState((prev) => ({ ...prev, [name]: value }))
    
    return (
        <Card className="max-w-full pb-4">
            {isError && <AlertView title="Info" color="failure">
                {errors?.data?.validated === false ? "Ada kolom yang tidak valid & mohon lengkapi" : "Something error when posting customer"}
            </AlertView>}

            <div className="flex flex-col gap-4">
                <InputField 
                    id="name" placeholder="e.g. Agil" 
                    handleChange={handleChange} required 
                    label="Nama Customer" 
                    value={formState.name} 
                />

                <InputField 
                    id="no_hp"
                    handleChange={handleChange} required 
                    label="No HP" 
                    value={formState.no_hp} 
                />

                <InputTextArea 
                    id="note"
                    handleChange={handleAreaChange} 
                    label="Catatan" 
                    value={formState.note} 
                />

                <FooterDivider />
                
                <div className="flex flex-wrap gap-2">
                    <Badge color="indigo" size="lg">
                       Additional Info
                    </Badge>
                </div>

                <InputField 
                    id="pln_token"
                    handleChange={handleChange} 
                    label="Token PLN" 
                    value={formState.pln_token} 
                />

                <InputField 
                    id="bpjs"
                    handleChange={handleChange} 
                    label="BPJS" 
                    value={formState.bpjs} 
                />

                <InputField 
                    id="maxim_id"
                    handleChange={handleChange} 
                    label="Maxim" 
                    value={formState.maxim_id} 
                />

                <InputField 
                    id="dana_va"
                    handleChange={handleChange} 
                    label="Dana VA" 
                    value={formState.dana_va} 
                />

                <InputField 
                    id="ovo_va"
                    handleChange={handleChange} 
                    label="OVO VA" 
                    value={formState.ovo_va} 
                />

                <InputField 
                    id="shopee_va"
                    handleChange={handleChange} 
                    label="Shopee VA" 
                    value={formState.shopee_va} 
                />



                <FooterDivider />

                {type === "edit" ? 
                    <Button type="button" fullSized={true} size="lg" disabled={updateStates.isLoading} onClick={onEdit}>
                        Update
                    </Button> : 
                    <Button type="button" fullSized={true} size="lg" disabled={isLoading} onClick={onAdd}>
                        Simpan
                    </Button>}
                {/* {type === "edit" && <Button fullSized={true} color="gray" className="mt-6" size="lg" onClick={onDelete}>
                    <span className="text-red-300">Delete</span>
                </Button>} */}
                
            </div>
        </Card>
    )
}