import type { MetaFunction } from "@remix-run/node";
import ListTransactionContainer from "~/container/Transaction/ListTransaction";
import AppContainer from "~/components/Screen/AppContainer";

export const meta: MetaFunction = () => {
  return [
    { title: "Transactions | Pink Cell" },
    { name: "description", content: "Manage Transactions" },
  ];
};

export default function Products() {
  return (
    <AppContainer>
      <ListTransactionContainer />
    </AppContainer>
  );
}
