import type { MetaFunction } from "@remix-run/node";
import ListCustomerContainer from "~/container/Customer/ListCustomer";
import { ScreenContainer } from "~/components/Screen";

export const meta: MetaFunction = () => {
  return [
    { title: "Manage Customers | Pink Cell" },
    { name: "description", content: "Manage Customers" },
  ];
};

export default function Customers() {
  return (
    <ScreenContainer urlBack="/account" title="Customers">
      <ListCustomerContainer />
    </ScreenContainer>
  );
}
