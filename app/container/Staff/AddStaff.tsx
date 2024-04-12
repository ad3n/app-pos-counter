import { Card, Label, TextInput, Badge, Button, FooterDivider, Select } from "flowbite-react"
import { useNavigate, useLocation } from "@remix-run/react";
import { StatesRequestStaff, useAddCStaffMutation, UserRole, useEditStaffMutation, StaffItem } from "~/services/actions";
import { useEffect, useState } from "react";
import { AlertView, InputCheckbox, SectionText, SelectField } from "~/components";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { getUserToken } from "~/services/models/auth.model";
import { InputField } from "~/components";
import { Roles } from "~/data/constant";

export default function AddStaff({ type } :  {type:string }) {
    const navigate = useNavigate()
    const location = useLocation()
    const [errors, setErrors] = useState<any>()
    const [formState, setFormState] = useState<StatesRequestStaff>({
       name:"",
       password:"",
       confirm_password:"",
       email:"",
       no_hp:"",
       begun_at:"",
       exited_at:"",
       flag:0,
       role:UserRole.staff
    })

    const [addStaff, addStates ] = useAddCStaffMutation()
    const [editStaff, updateStates ] = useEditStaffMutation()

    const onAdd = async () => {
        const user = (await getUserToken()).user

        try {
            await addStaff({...formState, merchant_id:user?.merchant_id}).unwrap()
        } catch (err) {
            console.log("err", err)
            setErrors(err)
        }
    }

    const onEdit = async () => {
        const user = (await getUserToken()).user
        const states =  location.state as StaffItem
        try {
            await editStaff({...formState, id:states.id}).unwrap()
        } catch (err) {
            console.log("err", err)
            setErrors(err)
        }
    }

    useEffect(()=>{
        if( type == "edit" ) {
            const states =  location.state as StaffItem
            setFormState({
                name:states.name,
                email:states.email,
                no_hp:states.no_hp,
                begun_at:states.begun_at,
                exited_at: states.exited_at,
                flag: states.flag,
                role:states.role
            })
        }
    },[type])

    useEffect(()=>{
       if( addStates.status == QueryStatus.fulfilled || updateStates.status === QueryStatus.fulfilled ) {
        navigate("/staff")
       }
    },[addStates.status, updateStates.status])

    const handleChange = ({
        target: { name, value },
    }: React.ChangeEvent<HTMLInputElement>) =>
        setFormState((prev) => ({ ...prev, [name]: value }))

    const handleSelectChange = ({
        target: { name, value },
    }: React.ChangeEvent<HTMLSelectElement>) =>
        setFormState((prev) => ({ ...prev, [name]: value }))

    const handlePasswordChange = ({
        target: { name, value },
    }: React.ChangeEvent<HTMLInputElement>) => {
        setFormState((prev) => ({ ...prev, [name]: value }))
        if( formState.password === formState.confirm_password ) {
            setErrors(undefined)
        } else {
            setErrors({
                confirm_password:["Confirm password and password is not matched"]
            })
        }
    }

    const handleCheckboxChange = ({
        target,
    }: React.ChangeEvent<HTMLInputElement>) => {
        setFormState((prev) => ({ ...prev, flag: (target.value == '0' ? 1 : 0) }))
    }

    return (
        <Card className="max-w-full pb-4">
            {addStates.isError || updateStates.isError && <AlertView title="Info" color="failure">
                {errors?.data?.validated === false ? "Ada kolom yang tidak valid & mohon lengkapi" : "Something error when posting staff"}
            </AlertView>}

            <div className="flex flex-col gap-4">
                <InputField  errors={errors?.data?.messages} label="Nama Staff" id="name" type="text" min={3} handleChange={handleChange} value={formState.name} required  placeholder="Masukkan nama staff" />

                <InputField  errors={errors?.data?.messages} label="No HP" id="no_hp" type="text" min={6} handleChange={handleChange} value={formState.no_hp} required  placeholder="Masukkan no HP sebagai akun" />

                <InputField  errors={errors?.data?.messages} label="Email" id="email" type="text" min={6} handleChange={handleChange} value={formState.email} required  placeholder="Masukkan alamat email" />

                <SelectField label="Role" handleChange={handleSelectChange} id="roles" list={Roles} value={formState.role} />
               
                <FooterDivider />
                
                <SectionText label="Jam Kerja"/>

                <InputField  errors={errors?.data?.messages} label="Jam Masuk" id="begun_at" type="time" handleChange={handleChange} value={formState.begun_at} required  placeholder="Pilih jam kerja" />

                <InputField  errors={errors?.data?.messages} label="Jam Keluar" id="exited_at" type="time" handleChange={handleChange} value={formState.exited_at} required  placeholder="Pilih jam kerja" />

                <FooterDivider />

                <SectionText label="Akun"/>

                <InputField errors={errors?.data?.messages} label="Password baru" type="password" id="password" min={6} handleChange={handleChange} value={formState.password} required  placeholder="Masukkan password baru" />

                <InputField errors={errors?.data?.messages ?? errors } label="Konfirmasi password" type="password" min={6} id="confirm_password" handleChange={handlePasswordChange} value={formState.confirm_password} required  placeholder="Masukkan konfirmasi password" />

                <InputCheckbox size={20} value={formState.flag} defaultChecked={location?.state?.flag ?? false} id="flag" name="flag" label="Non-aktif user?" handleChange={handleCheckboxChange} />

                <FooterDivider />

                {type === "add" ? <Button type="button" fullSized={true} size="lg" disabled={addStates.isLoading} onClick={onAdd}>
                    Simpan
                </Button> : <Button type="button" fullSized={true} size="lg" disabled={updateStates.isLoading} onClick={onEdit}>
                    Update
                </Button>}
            
            </div>
        </Card>
    )
}