import type { MetaFunction } from "@remix-run/node";
import { Button } from "flowbite-react"
import DashboardContainer from "~/container/Dashboard";
import AppContainer from "~/components/Screen/AppContainer";

export const meta: MetaFunction = () => {
  return [
    { title: "Dashboard | Pink Cell" },
    { name: "description", content: "Dashboard" },
  ];
};

export default function Dash() {
  return (
    <AppContainer>
      <DashboardContainer />
    </AppContainer>
  );
}
