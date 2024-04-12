import TabsMenu from "~/components/TabsMenu";

type IProps = {
    children:React.ReactNode
}

export default function AppContainer(_props:IProps) {
    return (
        <div className="container mx-auto sm:max-w-full max-h-full max-w-lg dark:bg-gray-900">
            {_props.children}
            <TabsMenu />
        </div>
    )
} 