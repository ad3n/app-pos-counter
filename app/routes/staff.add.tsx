import type { MetaFunction } from "@remix-run/node";
import AddStaffContainer from "~/container/Staff/AddStaff";
import { ScreenContainer } from "~/components/Screen";

export const meta: MetaFunction = () => {
  return [
    { title: "Add Staff | PInk Cell" },
    { name: "description", content: "Add Staff" },
  ];
};

export default function AddStaffs() {
  return (
    <ScreenContainer urlBack="/staff" title="Staff">
      <AddStaffContainer type="add" />
    </ScreenContainer>
  );
}
