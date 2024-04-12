import { Card, Button, FooterDivider, Badge, Label, Checkbox } from "flowbite-react"
import { 
    ProductItem, useGetProductsQuery, 
    useGetProductsCategorizedQuery, GetRequestProduct 
} from "~/services/actions"
import { useNavigate } from "@remix-run/react"
import { MdAdd, MdArrowForward } from "react-icons/md"
import { Loader } from "~/components/Core/Spinner"
import { useAccount } from "~/hooks/useAccount"
import { ProductContainer } from "~/components/Screen"
import CategorySelector from "../../components/Prebuilt/CategorySelector"
import { currency } from "~/utils/helpers"
import { EProductTypes } from "~/_types"
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react"
import { TSpacingScreenProduct } from "~/_types"
import clsx from "clsx"

type IProps = {
    type:"screen" | "cart",
    spacing: TSpacingScreenProduct
}

export default function ListProductContainer({type="screen", spacing="narrow"}:IProps) {
    const navigate = useNavigate()
    const { account } = useAccount()  
    const [filterData, setFilterData] = useState<GetRequestProduct>({
        per_page:20,
        offset:0,
        active:true
    })
    const { isLoading, data, refetch } = useGetProductsCategorizedQuery(filterData)

    const onAdd = () => navigate("/products/add")

    const onSearch = (data:any) => {
        setFilterData(prev=>({...prev, keyword:data}))
        //setFilterData(prev=>({...prev, search:data}))
    }

    const onSearchCategory = (id:number) => {
        setFilterData(prev=>({...prev, category_id:id}))
    }

    const toggleSwitchActive = ({target:{name,value}}:ChangeEvent<HTMLInputElement>) => {
        console.log("vlue", value)
        setFilterData(prev=>({...prev, active:value === "on" ? false : true}))
    }

    useEffect(()=>{
        refetch()
    },[filterData, setFilterData])
    
    return (
        <ProductContainer handleChange={onSearch} spacing={spacing}>
            <Card className="max-w-full">
                {type == "screen" && <div className="mb-4 flex items-center justify-between">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Product List</h5>
                    <Button onClick={onAdd}>
                        <MdAdd size={16} /><span className="ml-2">Item</span>
                    </Button>
                </div>}

                {type == "screen" && <FooterDivider theme={{base:"my-2 border-gray-700"}} />}

                <div className="flex">
                    <div className="flex-auto">
                        {account?.user?.merchant_id && <CategorySelector 
                            defaultValue={0} label={null} 
                            handleUpdate={(id)=>onSearchCategory(id)} 
                            merchantId={account?.user?.merchant_id} />}
                    </div>
                    
                     <div className="flex max-w-md gap-4 ml-2 items-center justity-center">
                        <Checkbox color="teal" value={filterData?.active? "on" : "off"} checked={filterData?.active??false} onChange={toggleSwitchActive} />
                        <Label htmlFor="accept" className="flex">
                            Active?
                        </Label>
                     </div>
                </div>
              
            </Card>

            {isLoading ? <Loader /> : (data && data.length > 0) ? <div className="mt-10">
                {data?.map(item => item.products.length === 0 ? null : (
                    <div className="mb-6">
                        <Badge className="inline-flex not-italic" color={"pink"} size={"lg"}>
                            {item.name}
                        </Badge>
                        <ItemCategory type={type} category={item.name} products={item.products} />
                    </div>
                ))}
            
            </div> : <div className="my-8 flex items-center justify-center">
                <span className="text-white align-center">Empty data</span>
            </div>}
           
        </ProductContainer>
    )
}

export const ItemCategory = ( 
    { products, type, category } : 
    { products: ProductItem[], type:IProps["type"], category:string 
}) => {
    return (
        <Card className="max-w-full mt-4">
            {<div className="flow-root">
                {(products && products.length > 0) ? <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {products.map(item => <ItemProduct category={category} linkType={type} item={item} />)}
                </ul> : <div className="my-4">
                    <span className="text-white align-center">No products</span>
                </div>}
            </div>}
        </Card>
    )
}

export const ItemProduct = ( 
    { item, linkType, category } : 
    {item:ProductItem,linkType:IProps["type"], category:string } 
) => {
    const navigate = useNavigate()
    const { name, price, sale_price, type, brand_name, active, total_qty } = item
    const labelType = () => {
        return type === EProductTypes.piece ? "Satuan" : 
            type === EProductTypes.saldo ? "ELektrik" : 
                "Bebas Nominal"
    }

    const isActive = (type === EProductTypes.piece && (!total_qty || total_qty < 0) ) || active === 0 

    const onClick = () => {
        if( linkType == "cart" ) {
            if( isActive ) return
            navigate("/transaction/omzet?type=add", {state:item})
        } else {
            navigate("/products/view", {state:{...item, category} })
        }
    }
    
    return (
        <li className={clsx(["py-3 sm:py-4 cursor-pointer", {'opacity-25':isActive}])} onClick={()=>onClick()}>
            <div className="flex items-center space-x-4">
                <div className="min-w-0 flex-1">
                    <p className="truncate text-md font-medium text-gray-900 dark:text-white">{name}</p>
                    <Badge className="inline-flex not-italic mt-2" color={"gray"} size={"sm"}>{labelType()}</Badge>
                    {brand_name && 
                        <Badge className="inline-flex mt-2 ml-2" color={"indigo"} size={"sm"}>{brand_name}</Badge>}
                </div>
                <div className="flex flex-col items-end font-semibold text-gray-900 dark:text-white"> 
                    {type === EProductTypes.volume && <p className="truncate text-sm font-medium text-gray-300 dark:text-white-200">Profit</p>}       
                    <div className={item.on_sale ? "line-through text-lg dark:text-gray-400" : "text-xl"}>
                        {type === EProductTypes.volume ? "+":""}{currency(price as number)}
                    </div>
                    {Number(item.on_sale) === 1 && <Badge color={"lime"} size={30}> 
                        {currency(sale_price as number)}
                    </Badge>}

                    {type === EProductTypes.piece && (!total_qty || total_qty < 1) ? <Badge color="red" className="mt-1 text-sm font-semibold">
                        Out of Stock
                    </Badge> : null}
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-700 dark:text-gray-500">        
                    {type === EProductTypes.piece && total_qty ? <Badge color="green" className="mr-1 text-md font-bold">
                        {total_qty}
                    </Badge> : null}
                   <MdArrowForward onClick={()=>onClick()} />
                </div>
            </div>
        </li>
    )
}