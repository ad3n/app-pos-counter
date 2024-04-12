import type { MetaFunction } from "@remix-run/node";
import AddStaffContainer from "~/container/Staff/AddStaff";
import { ScreenContainer } from "~/components/Screen";

export const meta: MetaFunction = () => {
  return [
    { title: "Edit Staff | PInk Cell" },
    { name: "description", content: "Edit Staff" },
  ];
};

export default function EditStaffs() {
  return (
    <ScreenContainer urlBack="/staff" title="Staff">
      <AddStaffContainer type="edit" />
    </ScreenContainer>
  );
}
