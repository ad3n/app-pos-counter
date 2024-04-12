import type { MetaFunction } from "@remix-run/node";
import ListProductContainer from "~/container/Product/ListProduct";
import AppContainer from "~/components/Screen/AppContainer";

export const meta: MetaFunction = () => {
  return [
    { title: "Product | Pink Cell" },
    { name: "description", content: "Manage Product" },
  ];
};

export default function Products() {
  return (
    <AppContainer>
      <ListProductContainer />
    </AppContainer>
  );
}
