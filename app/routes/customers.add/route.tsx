import type { MetaFunction } from "@remix-run/node";
import AddCustomerContainer from "~/container/Customer/AddCustomer";
import { ScreenContainer } from "~/components/Screen";

export const meta: MetaFunction = () => {
  return [
    { title: "Add Customer | Pink Cell" },
    { name: "description", content: "Add Customer" },
  ];
};

export default function AddCustomers() {
  return (
    <ScreenContainer urlBack="/customers" title="Add Customer">
      <AddCustomerContainer type="add" />
    </ScreenContainer>
  );
}
