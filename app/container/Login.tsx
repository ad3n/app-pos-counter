import { Card, Label, TextInput, Checkbox, Button } from "flowbite-react"
import { useNavigate } from "@remix-run/react";
import { useLoginMutation } from "~/services/actions";
import { useEffect, useState } from "react";
import { LoginRequest } from "~/services/actions";
import { AlertView } from "~/components";
import { FetchBaseQueryError, QueryStatus } from "@reduxjs/toolkit/query";
import { useSelector } from "react-redux";
import { isAuthtoken } from "~/services/actions/auth/auth.slice";
import { RootState } from "~/services/store";
import { useAccount } from "~/hooks/useAccount";

export default function LoginContainer() {
    const navigate = useNavigate()
    const { account } = useAccount()

    if( account?.token ) navigate("/dash")
    else return <LoginForm />    
}

function LoginForm() {
    const navigate = useNavigate()
    const [errors, setErrors] = useState<any>()
    const [formState, setFormState] = useState<LoginRequest>({
        no_hp: '',
        password: '',
    })

    const [login, { isLoading, isError, error, status }] = useLoginMutation()
    const onLogin = async () => {
        try {
            await login(formState).unwrap()
        } catch (err) {
            console.log("err", err)
            setErrors(err)
        }
    }

    useEffect(()=>{
       if( status == QueryStatus.fulfilled) {
        navigate("/dash")
       }
    },[status])

    const handleChange = ({
        target: { name, value },
      }: React.ChangeEvent<HTMLInputElement>) =>
        setFormState((prev) => ({ ...prev, [name]: value }))

    return (
            <div className="container mx-auto pt-9 px-8 h-screen">
                <h2 className="dark:text-white text-center mt-16 my-5 text-2xl">Login as Staff</h2>
                <Card className="max-w-full">
                    {isError && <AlertView title="Info" color="failure">
                        {errors?.data?.messages}
                    </AlertView>}

                    <div className="flex flex-col gap-4">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="hp" value="No Hp" />
                            </div>
                            <TextInput id="hp" 
                                onChange={handleChange} 
                                type="text" 
                                name="no_hp"
                                placeholder="Masukkan No. HP" 
                                required 
                                sizing={"lg"}
                            />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password1" value="Password" />
                            </div>
                            <TextInput 
                                onChange={handleChange} 
                                name="password" 
                                id="password1" 
                                placeholder="Masukkan password"
                                type="password" required  sizing={"lg"} />
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox id="is_admin" />
                            <Label htmlFor="is_admin">Sebagai Admin</Label>
                        </div>
                        <Button type="button" size="xl" disabled={isLoading} onClick={onLogin}>Masuk</Button>
                    </div>
                </Card>
            </div>

        )
}