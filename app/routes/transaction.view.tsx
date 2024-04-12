import type { MetaFunction } from "@remix-run/node";
import ViewTransactionContainer from "~/container/Transaction/ViewTransaction";
import { ScreenContainer } from "~/components/Screen";
import { useLocation  } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "View Transactions | Pink Cell" },
    { name: "description", content: "View Transactions" },
  ];
};

export default function ViewTransaction() {
    const location = useLocation()
    const params = new URLSearchParams(location.search)

    return (
        <ScreenContainer title={"View Transasction"} urlBack="/transaction">
            <ViewTransactionContainer />
        </ScreenContainer>
    );
}
