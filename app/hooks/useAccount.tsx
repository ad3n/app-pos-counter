import { useEffect, useState } from "react";
import { AuthState, UserRole } from "~/services/actions";
import { getUserToken, isTokenExists } from "~/services/models/auth.model";

export const useAccount = () => {
    const [account, setAccount] = useState<AuthState>()
    const [isAuthtoken, setIsAuthtoken] = useState<boolean>(false)
    const [isProcess, setIsProcess] = useState<boolean>(true)
    useEffect(()=>{
        getUserToken().then((user)=>{
            setAccount(user)
            setIsAuthtoken(true)
            setIsProcess(false)
        }).catch(()=>{
            setIsProcess(true)
        })
    },[])

    const getRole = () => {
        if( account ) {
            return account.user?.role
        }
        return ""
    }

    const isAdmin = () => account?.user?.role === UserRole.administrator

    return { account, role:getRole(), isAdmin, isAuthtoken, isProcess }
}