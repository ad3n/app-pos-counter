import { useNavigate } from "@remix-run/react";
import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react"
import { useAccount } from "~/hooks/useAccount";
import { useDetailStaffQuery } from "~/services/actions";
import { MdStar } from "react-icons/md";

export function ProfileHero(props:any) {
    const {account, role } = useAccount()
    const navigate = useNavigate()
    const [userid, setUserid] = useState<number>(account?.user?.id ?? 0)

    const { isLoading, data, refetch, } = useDetailStaffQuery(userid ,{skip:userid > 0 ? false:true })

    useEffect(()=>{
        setUserid(account?.user?.id as number)
    },[account?.user?.id])

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-4 px-4 mx-auto max-w-screen-xl text-center">
                <div className="flex flex-col items-center pb-6">
                    <img
                        alt="Bonnie image"
                        height="96"
                        src={"https://i.pravatar.cc/300"}
                        width="96"
                        className="mb-3 rounded-full shadow-lg"
                    />
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{account?.user?.name}</h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{role}</span>
                    <div className="mt-4 flex space-x-3 lg:mt-6">
                        <Button onClick={()=>navigate("/account/change-password")}>
                            Change password
                        </Button>
                     </div>
                     {data?.stars && <div className="flex items-center mt-4 text-gray-300">
                        <MdStar className="mr-2" />
                        <span>{data.stars} Transaksi</span>
                     </div>}
                </div>
            </div>
        </section>
    );
}