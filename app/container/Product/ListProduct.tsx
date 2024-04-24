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
    const { isLoading, data, refetch } = useGetProductsCategorizedQuery(filterData, {skip:false})

    const onAdd = () => navigate("/products/add")

    const onSearch = (data:any) => {
        setFilterData(prev=>({...prev, keyword:data}))
        //setFilterData(prev=>({...prev, search:data}))
    }

    const onSearchCategory = (id:number) => {
        setFilterData(prev=>({...prev, category_id:id}))
    }

    const toggleSwitchActive = ({target:{name,value}}:ChangeEvent<HTMLInputElement>) => {
        setFilterData(prev=>({...prev, active:value === "on" ? false : true}))
    }
    
    return (
        <ProductContainer handleChange={onSearch} spacing={spacing}>
            <Card className="max-w-full">
                {type == "screen" && <div className="flex items-center justify-between">
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
                        <Checkbox color="teal" 
                            value={filterData?.active ? "on" : "off"} 
                            checked={filterData?.active ?? false} 
                            onChange={toggleSwitchActive} 
                        />
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
                        <ItemCategory type={type} 
                            catId={Number(filterData.category_id)} 
                            category={item.name} 
                            products={item.products} />
                    </div>
                ))}
            
            </div> : <div className="my-8 flex items-center justify-center">
                <span className="text-white align-center">Empty data</span>
            </div>}
           
        </ProductContainer>
    )
}

export const ItemCategory = ( 
    { products, type, category, catId } : 
    { products: ProductItem[], type:IProps["type"], category:string, catId:number }
) => {
    return (
        <Card className="max-w-full mt-4" theme={{root:{
            children:"flex h-full flex-col justify-center gap-4 p-4"}}}>
            {<div className="flow-root">
                {(products && products.length > 0) ? <ul 
                    className="divide-y divide-gray-200 dark:divide-gray-700">
                    {products.map(item => <ItemProduct 
                        selectedCatId={catId} category={category} linkType={type} item={item} />)}
                </ul> : <div className="my-4">
                    <span className="text-white align-center">No products</span>
                </div>}
            </div>}
        </Card>
    )
}

export const ItemProduct = ( 
    { item, linkType, category, selectedCatId } : 
    {item:ProductItem,linkType:IProps["type"], category:string, selectedCatId:number } 
) => {
    const navigate = useNavigate()
    const { name, price, sale_price, type, brand_name, active, total_qty } = item
    const labelType = () => {
        return type === EProductTypes.piece ? "Satuan" : 
            type === EProductTypes.saldo ? "Elektrik" : 
                "Bebas Nominal"
    }

    const isActive = (type === EProductTypes.piece && (!total_qty || total_qty < 0) ) || active === 0 

    const onClick = () => {
        if( linkType == "cart" ) {
            if( isActive ) return
            navigate("/transaction/omzet?type=add", {state:item})
        } else {
            navigate(`/products/view?=catId=${selectedCatId}`, {state:{...item, category} })
        }
    }
    
    return (
        <li className={clsx(["py-3 sm:py-4 cursor-pointer", {'opacity-50':isActive}])} onClick={()=>onClick()}>
            <p className="truncate lg:text-md sm:text-sm font-medium text-gray-900 dark:text-white">{name}</p>
            <div className="flex items-center space-x-2">
                <div className="min-w-0 flex-1">
                    <Badge className="inline-flex not-italic" color={"gray"} size={"xs"}>{labelType()}</Badge>
                    {brand_name && 
                        <Badge className="inline-flex ml-2" color={"indigo"} size={"xs"}>{brand_name}</Badge>}
                </div>
                <div className="flex flex-col items-end font-semibold text-gray-900 dark:text-white"> 
                    <div className={item.on_sale ? "line-through text-lg dark:text-gray-400" : "text-lg"}>
                        {type === EProductTypes.volume ? "+":""}{currency(price as number)}
                    </div>
                    {Number(item.on_sale) === 1 && <Badge color={"lime"} size={30}> 
                        {currency(sale_price as number)}
                    </Badge>}
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-700 dark:text-gray-500">        
                    {type === EProductTypes.piece && (total_qty && total_qty > 0) ? <Badge color="green" className="mr-1 text-md font-bold">
                        {total_qty}
                    </Badge> : null}
                    {type === EProductTypes.piece && (!total_qty || total_qty < 1) ? <Badge color="red" size={"xs"} 
                        className="mt-1 text-sm font-semibold">
                        out
                    </Badge> : null}
                   <MdArrowForward onClick={()=>onClick()} />
                </div>
            </div>
        </li>
    )
}