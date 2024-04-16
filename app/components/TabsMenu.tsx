
import { Tabs, Button } from "flowbite-react"
import { MdDashboard, MdOutbox, MdNotes, MdPerson2, MdAccountBox } from "react-icons/md"
import { useNavigate, useLocation } from "@remix-run/react";

export default function TabsMenu() {
    const navigate = useNavigate()
    const location = useLocation()
    const onDashboard = () => {
        navigate("/dash")
    }

    const onProduct = () => {
        navigate("/products")
    }

    const onAccount = () => {
        navigate("/account")
    }
    
    const onTransaction = () => {
        navigate("/transaction")
    }

    const isActivelink = (key:string) => {
        return location.pathname.startsWith(key) 
    }

    const toggleColor = (key:string) => isActivelink(key) ? "pink" : "dark"

    const innerTheme = {inner:{base:"flex flex-col items-center text-center justify-center"}}
    return (
        <div className="fixed xl:w-128 sm:w-full  bottom-0">
            <Button.Group className="flex max-w-full shadow-md" theme={{
                position: { 
                    none: "rounded-none",
                    start: "rounded-none border-l-none focus:ring-2",
                    middle: "rounded-none border-l-0 pl-0 focus:ring-2",
                    end: "rounded-l-none border-l-0 pl-0 focus:ring-2"
                }
            }}>
                <Button theme={innerTheme} 
                    className="flex-auto flex-col rounded-none border-b-0 border-l-0" onClick={onDashboard} 
                    color={toggleColor("/dash")}>
                    <MdDashboard size={60} className="h-6 w-5" />
                    <div className="text-sm">Dasbor</div>
                </Button>
                <Button theme={innerTheme} className="flex-auto  flex-col" onClick={onTransaction} 
                    color={toggleColor("/transaction")} >
                    <MdNotes className="h-6 w-6" />
                    <div>Riwayat</div>
                </Button>
                <Button theme={innerTheme} className="flex-auto h-16" onClick={onProduct} 
                    color={toggleColor("/products")}>
                    <MdOutbox size={"2em"} className="h-6 w-6" />
                    <div>Produk</div>
                </Button>
                <Button theme={innerTheme} className="flex-auto rounded-none border-r-0" onClick={onAccount} 
                    color={toggleColor("/account")}>
                    <MdAccountBox className="h-6 w-6" />
                    <div>Settings</div>
                </Button>
            </Button.Group>
        </div>
    )
}