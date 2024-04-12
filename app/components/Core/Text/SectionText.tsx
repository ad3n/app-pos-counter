import { Badge, BadgeProps } from "flowbite-react"

type IProps = {
    label:string
    color?:BadgeProps["color"]
    size?:BadgeProps["size"]
}
export const SectionText = ({ label, color = "indigo", size = "lg" }:IProps) => {
    return (
        <div className="flex flex-wrap gap-2">
            <Badge color={color} size={size}>
                {label}
            </Badge>
        </div>
    )
}