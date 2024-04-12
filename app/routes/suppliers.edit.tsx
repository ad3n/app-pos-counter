import type { MetaFunction } from "@remix-run/node";
import AddSupplierContainer from "~/container/Supplier/AddSupplier";
import { ScreenContainer } from "~/components/Screen";

export const meta: MetaFunction = () => {
  return [
    { title: "Dashboard | PInk Cell" },
    { name: "description", content: "Dashboard" },
  ];
};

export default function EditSuppliers() {
  return (
    <ScreenContainer urlBack="/suppliers" title="Supplier">
      <div className="text-lg text-white mb-4">Edit Supplier</div>
      <AddSupplierContainer type={"edit"} />
    </ScreenContainer>
  );
}
