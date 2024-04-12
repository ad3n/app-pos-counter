import { Card, Label, TextInput, Badge, Button, FooterDivider } from "flowbite-react"
import { useNavigate, useLocation } from "@remix-run/react";
import { useChangePasswordMutation, StateChangePasswordRequest, PostChangePasswordRequest, SupplierItem, useEditSupplierMutation } from "~/services/actions";
import { useEffect, useState } from "react";
import { AlertView } from "~/components";
import { FetchBaseQueryError, QueryStatus } from "@reduxjs/toolkit/query";
import { getUserToken } from "~/services/models/auth.model";
import { InputField } from "~/components";

export default function ChangePassword() {
    const navigate = useNavigate()
    const location = useLocation()
    const [errors, setErrors] = useState<any>()
    const [formState, setFormState] = useState<StateChangePasswordRequest>({
       old_password:"",
       password:"",
       new_password:""
    })

    const [changePassword, { isLoading, isError, error, status }] = useChangePasswordMutation()

    const onChange = async () => {
        const user = (await getUserToken()).user

        try {
            const params:PostChangePasswordRequest = {
                userId:user ? user.id : 0,
                old_password:formState.old_password,
                password:formState.password
            }
            await changePassword(params).unwrap()
        } catch (err) {
            console.log("err", err)
            setErrors(err)
        }
    }

    useEffect(()=>{
      
    },[])

    useEffect(()=>{
       if( status == QueryStatus.fulfilled ) {
        navigate("/account")
       }
    },[status])

    const handleChange = ({
        target: { name, value },
    }: React.ChangeEvent<HTMLInputElement>) =>
        setFormState((prev) => ({ ...prev, [name]: value }))

    return (
        <Card className="max-w-full pb-4">
            {isError && <AlertView title="Info" color="failure">
                {errors?.data?.validated === false ? "Ada kolom yang tidak valid & mohon lengkapi" : "Something error when change password"}
            </AlertView>}

            <div className="flex flex-col gap-4">
                <InputField  errors={errors?.data?.messages} label="Password lama" id="old_password" type="password" min={6} handleChange={handleChange} value={formState.old_password} required  placeholder="Masukkan password lama" />

                <InputField errors={errors?.data?.messages} label="Password baru" type="password" id="password" min={6} handleChange={handleChange} value={formState.password} required  placeholder="Masukkan password baru" />

                <InputField errors={errors?.data?.messages} label="Konfirmasi password baru" type="password" min={6} id="new_password" handleChange={handleChange} value={formState.new_password} required  placeholder="Masukkan konfirmasi password baru" />

                <FooterDivider />

                <Button type="button" fullSized={true} size="lg" disabled={isLoading} onClick={onChange}>
                    Simpan
                </Button>
            
            </div>
        </Card>
    )
}