import type { MetaFunction } from "@remix-run/node";
import AddCustomerContainer from "~/container/Customer/AddCustomer";
import { ScreenContainer } from "~/components/Screen";

export const meta: MetaFunction = () => {
  return [
    { title: "Edit Customer | Pink Cell" },
    { name: "description", content: "Edit Customer" },
  ];
};

export default function EditCustomers() {
  return (
    <ScreenContainer urlBack="/customers" title="Edit Customer">
      <AddCustomerContainer type="edit" />
    </ScreenContainer>
  );
}
