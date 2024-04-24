import { ListGroup } from "flowbite-react"
import { MdGroup, MdPeopleAlt, MdPersonPinCircle, MdLogout, MdCategory, MdProductionQuantityLimits, MdKey } from "react-icons/md"
import { useNavigate } from "@remix-run/react"
import { removeAuth } from "~/services/actions/auth/auth.slice"
import { useDispatch } from "react-redux"
import { useAccount } from "~/hooks/useAccount"

export const ListMenuProfile = () => {
    const buttonClass = "h-14 text-base	dark:text-white flex items-center w-full border-b border-gray-200 py-2 px-4 dark:border-gray-600"
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isAdmin } = useAccount()
    const onLogout = () => {
        dispatch(removeAuth())
        navigate("/")
    }
    return (
        <div className="flex flex-col w-full justify-center pb-20">
            <div className="my-4">
                <h4 className="text-white">Account</h4>
            </div>
            
            <ListGroup className="w-full">
                <ListGroup.Item  onClick={()=>navigate("/account/change-password")} theme={{link:{base:buttonClass}}} icon={MdKey}>
                    Change Password
                </ListGroup.Item>
                {/* <ListGroup.Item theme={{link:{base:buttonClass}}} icon={MdPeopleAlt}>
                    Edit Profil
                </ListGroup.Item> */}
              
            </ListGroup>

            <div className="my-4">
                <h4 className="dark:text-white">Manage</h4>
            </div>
           
            <ListGroup className="w-full">
                <ListGroup.Item onClick={()=>navigate("/suppliers")} theme={{link:{base:buttonClass}}} icon={MdProductionQuantityLimits}>
                    Supplier
                </ListGroup.Item>
                <ListGroup.Item onClick={()=>navigate("/customers")} theme={{link:{base:buttonClass}}} icon={MdPeopleAlt}>
                    Customer
                </ListGroup.Item>
                {/* <ListGroup.Item onClick={()=>navigate("/category")} theme={{link:{base:buttonClass}}} icon={MdCategory}>
                    Kategori
                </ListGroup.Item> */}
                { isAdmin() && <ListGroup.Item onClick={()=>navigate("/staff")} theme={{link:{base:buttonClass}}} icon={MdPersonPinCircle}>
                    Staff
                </ListGroup.Item> }
            </ListGroup>

            <div className="my-4">
                <h4 className="dark:text-white">Exit</h4>
            </div>

            <ListGroup className="w-full">
               
                <ListGroup.Item onClick={onLogout} theme={{link:{base:buttonClass}}} icon={MdLogout}>
                    Log out
                </ListGroup.Item>
            </ListGroup>
        </div>
    )
}