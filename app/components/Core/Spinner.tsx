import { Spinner } from "flowbite-react";

export const Loader = () => {
    return (
        <div className="flex items-center justify-center gap-2 my-4 ">
            <div className="text-center">
                <Spinner aria-label="Center-aligned spinner loading" size="xl" />
            </div>
        </div>
        
    )
}

export const LoaderCenter = () => {
    return (
        <div className="h-screen w-screen">
            <div className="flex h-screen items-center justify-center gap-2">
                <div className="text-center">
                    <Spinner aria-label="Center-aligned spinner loading" size="xl" />
                    <div className="mt-2 text-white">Loading page...</div>
                </div>
            </div>
        </div>
        
    )
}