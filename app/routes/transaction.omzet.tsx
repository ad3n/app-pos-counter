import type { MetaFunction } from "@remix-run/node";
import AddOmzetContainer from "~/container/Transaction/AddOmzet";
import ListIncomeContainer from "~/container/Transaction/ListIncome";
import { ScreenContainer } from "~/components/Screen";
import { useLocation  } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Add Income Transactions | Pink Cell" },
    { name: "description", content: "Add Income Transactions" },
  ];
};

export default function OmzetTransaction() {
    const location = useLocation()
    const params = new URLSearchParams(location.search)

    return (
        <ScreenContainer title={params.get("type") ? "List Income" : "Add Income"} urlBack="/transaction">
            {params.get("type") === "list" ? 
              <ListIncomeContainer /> :
              <AddOmzetContainer type={params.get("type") ?? "cart"} />}

        </ScreenContainer>
    );
}
