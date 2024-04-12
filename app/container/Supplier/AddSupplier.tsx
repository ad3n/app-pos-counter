import { Card, Label, TextInput, Badge, Button, FooterDivider } from "flowbite-react"
import { useNavigate, useLocation } from "@remix-run/react";
import { useAddSupplierMutation, PostRequestSupplier, PutRequestSupplier, SupplierItem, useEditSupplierMutation } from "~/services/actions";
import { useEffect, useState } from "react";
import { AlertView } from "~/components";
import { FetchBaseQueryError, QueryStatus } from "@reduxjs/toolkit/query";
import { getUserToken } from "~/services/models/auth.model";

export default function AddSupplierContainer({ type } :  {type:string }) {
    const navigate = useNavigate()
    const location = useLocation()
    const [errors, setErrors] = useState<any>()
    const [formState, setFormState] = useState<PostRequestSupplier>({
        name: '',
        address: '',
        sales_contact: '',
        sales_person: '',
        telp:'-',
        phone: ''
    })

    const [addSupplier, { isLoading, isError, error, status }] = useAddSupplierMutation()
    const [editSupplier, updateStates ] = useEditSupplierMutation()
    const onAdd = async () => {
        const user = (await getUserToken()).user
        try {
            await addSupplier({
                ...formState, 
                merchant_id: user?.merchant_id
            }).unwrap()
        } catch (err) {
            console.log("err", err)
            setErrors(err)
        }
    }

    const onEdit = async () => {
        const curStates =  location.state as SupplierItem
        const user = (await getUserToken()).user
        try {
            await editSupplier({...formState, merchant_id: user?.merchant_id, id:curStates.id}).unwrap()
        } catch (err) {
            console.log("err", err)
            setErrors(err)
        }
    }

    const onDelete = async () => {

    }

    useEffect(()=>{
        if( type == "edit" ) {
            const states =  location.state as SupplierItem
            setFormState({
                name: states.name,
                address: states.address,
                sales_contact: states.sales_contact,
                sales_person: states.sales_person,
                telp: '-',
                phone: states.phone
            })
        }
    },[type])

    useEffect(()=>{
       if( status == QueryStatus.fulfilled || updateStates.status === QueryStatus.fulfilled ) {
        navigate("/suppliers")
       }
    },[status, updateStates.status])

    const handleChange = ({
        target: { name, value },
    }: React.ChangeEvent<HTMLInputElement>) =>
        setFormState((prev) => ({ ...prev, [name]: value }))

    return (
        <Card className="max-w-full pb-4">
            {isError && <AlertView title="Info" color="failure">
                {errors?.data?.validated === false ? "Ada kolom yang tidak valid & mohon lengkapi" : "Something error when posting supplier"}
            </AlertView>}

            <div className="flex flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="name" value="Nama Supplier" />
                    </div>
                    <TextInput 
                        id="name" 
                        onChange={handleChange} 
                        value={formState.name}
                        type="text" 
                        name="name"
                        placeholder="e.g. XL" 
                        required 
                        sizing={"lg"}
                    />
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="address" value="Alamat" />
                    </div>
                    <TextInput 
                        id="address" 
                        onChange={handleChange} 
                        value={formState.address}
                        type="text" 
                        name="address"
                        sizing={"lg"}
                    />
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="no_hp" value="No HP" />
                    </div>
                    <TextInput 
                        id="no_hp" 
                        onChange={handleChange} 
                        type="text" 
                        value={formState.phone}
                        name="phone"
                        sizing={"lg"}
                    />
                </div>
                <FooterDivider />
                
                <div className="flex flex-wrap gap-2">
                    <Badge color="indigo" size="lg">
                        Sales Info
                    </Badge>
                </div>
             

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="sales_person" value="Sales Person" />
                    </div>
                    <TextInput 
                        id="sales_person" 
                        onChange={handleChange} 
                        value={formState.sales_person}
                        type="text" 
                        name="sales_person"
                        sizing={"lg"}
                    />
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="sales_contact" value="Sales Contact" />
                    </div>
                    <TextInput 
                        id="sales_contact" 
                        onChange={handleChange} 
                        value={formState.sales_contact}
                        type="text" 
                        name="sales_contact"
                        sizing={"lg"}
                    />
                </div>
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