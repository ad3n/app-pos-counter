import type { MetaFunction } from "@remix-run/node";
import { Button } from "flowbite-react"
import ListSupplierContainer from "~/container/Supplier/ListSupplier";
import { ScreenContainer}  from "~/components/Screen";

export const meta: MetaFunction = () => {
  return [
    { title: "Dashboard | PInk Cell" },
    { name: "description", content: "Dashboard" },
  ];
};

export default function Suppliers() {
  return (
    <ScreenContainer urlBack="/account" title="Supplier">
      <ListSupplierContainer />
    </ScreenContainer>
  );
}
