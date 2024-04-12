import clsx from "clsx"

type IProps = {
    size:"sm" | "md" | "lg" | "xl",
    noBorder?:boolean
}

export const HRDivider = ({ size="md", noBorder=false }:IProps) => {
    return (
        <div className={clsx([
            "w-full",
            {
                "my-4": size === "sm",
                "my-8": size === "md",
                "my-12": size === "lg",
                "my-16": size === "xl",
                "border border-gray-700":noBorder === false
            }
        ])} />
    )
}