import { useNavigate, useHref, useLocation } from "@remix-run/react";
import { SearchBarContainer } from "../Core";
import clsx from "clsx"
import { TSpacingScreenProduct } from "~/_types";

type IProps = {
    children:React.ReactNode
    spacing?: TSpacingScreenProduct
    handleChange:(data:any)=>void
}   

export function ProductContainer(_props:IProps) {
    const navigate = useNavigate()
    const onChange = (data:any) => {
        _props.handleChange(data)
    }
    return (<>
        <SearchBarContainer handleChange={onChange} placeholder="Search product"/>
            <div className={clsx([
                "container mx-auto max-h-full",
                {"pt-5 px-2": _props.spacing === "narrow"},
                {"pt-1": _props.spacing === "full"}
            ])}>
                {_props.children}
            </div>
        </>)
} 