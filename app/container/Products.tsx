import { Card, Label, TextInput, Checkbox, Button } from "flowbite-react"
import {  useGetPostsQuery} from "../services/actions"

export default function ProductsContainer() {
    const { isLoading, data } = useGetPostsQuery()
    return (
            <div className="container mx-auto pt-9 px-8">
                <h2 className="dark:text-white text-center mt-6 my-5 text-2xl">Products</h2>

                <Card className="max-w-full">
                   
                </Card>
            </div>
        )
}