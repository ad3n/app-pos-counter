import type { MetaFunction } from "@remix-run/node";
import ViewProductContainer from "~/container/Product/ViewProduct";
import { ScreenContainer } from "~/components/Screen";

export const meta: MetaFunction = () => {
  return [
    { title: "View Product | Pink Cell" },
    { name: "description", content: "View Product" },
  ];
};

export default function ViewProducts() {
  return (
    <ScreenContainer urlBack="/products" title="View Product">
      <ViewProductContainer type={"view"} />
    </ScreenContainer>
  );
}
