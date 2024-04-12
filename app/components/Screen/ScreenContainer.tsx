import { useNavigate, useHref, useLocation } from "@remix-run/react";
import { HeadingBarContainer } from "../Core";

type IProps = {
    children:React.ReactNode
    title:string
    urlBack:string
}   

export function ScreenContainer(_props:IProps) {
    const navigate = useNavigate()
    const onBack = () => {
        navigate(_props.urlBack)
    }
    return (<>
        <HeadingBarContainer onBack={onBack} title={_props.title} />
        <div className="container mx-auto pt-2 px-4 max-h-full">
            {_props.children}
        </div>
    </>)
} 