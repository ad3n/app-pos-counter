import type { MetaFunction } from "@remix-run/node";
import { Button } from "flowbite-react"
import AccountContainer from "~/container/Account";
import AppContainer from "~/components/Screen/AppContainer";

export const meta: MetaFunction = () => {
  return [
    { title: "Account | Pink Cell" },
    { name: "description", content: "Account" },
  ];
};

export default function Account() {
  return (
    <AppContainer>
      <AccountContainer />
    </AppContainer>
  );
}
