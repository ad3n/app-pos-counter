import type { MetaFunction } from "@remix-run/node";
import AddProductContainer from "~/container/Product/AddProduct";
import { ScreenContainer } from "~/components/Screen";

export const meta: MetaFunction = () => {
  return [
    { title: "Edit Product | Pink Cell" },
    { name: "description", content: "Edit Product" },
  ];
};

export default function EditProducts() {
  return (
    <ScreenContainer urlBack="/products" title="Edit product">
      <AddProductContainer type={"edit"} />
    </ScreenContainer>
  );
}
