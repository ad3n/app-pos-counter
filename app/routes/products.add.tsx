import type { MetaFunction } from "@remix-run/node";
import AddProductContainer from "~/container/Product/AddProduct";
import { ScreenContainer } from "~/components/Screen";

export const meta: MetaFunction = () => {
  return [
    { title: "Add Product | Pink Cell" },
    { name: "description", content: "Add Product" },
  ];
};

export default function AddProducts() {
  return (
    <ScreenContainer urlBack="/products" title="Add new product">
      <AddProductContainer type={"add"} />
    </ScreenContainer>
  );
}
