import type { MetaFunction } from "@remix-run/node";
import AddExpenseContainer from "~/container/Transaction/AddExpense";
import ListExpenseContainer from "~/container/Transaction/ListExpense";
import { ScreenContainer } from "~/components/Screen";
import { useLocation  } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Expense Transactions | Pink Cell" },
    { name: "description", content: "Expense Transactions" },
  ];
};

export default function ExpenseTransaction() {
    const location = useLocation()
    const params = new URLSearchParams(location.search)

    return (
        <ScreenContainer title={params.get("type") ? "List Expense" : "Add Expense"} urlBack="/transaction">
            {params.get("type") === "list" ? 
              <ListExpenseContainer /> :
              <AddExpenseContainer />}
        </ScreenContainer>
    );
}
