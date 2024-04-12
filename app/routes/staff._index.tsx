import type { MetaFunction } from "@remix-run/node";
import ListStaffContainer from "~/container/Staff/ListStaff";
import { ScreenContainer } from "~/components/Screen";

export const meta: MetaFunction = () => {
  return [
    { title: "Staff | Pink Cell" },
    { name: "description", content: "Manage Staff" },
  ];
};

export default function Staffs() {
  return (
    <ScreenContainer urlBack="/account" title="Staff">
      <ListStaffContainer />
    </ScreenContainer>
  );
}
