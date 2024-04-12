import type { MetaFunction } from "@remix-run/node";
import ChangePasswordContainer from "~/container/Profile/ChangePassword";
import { ScreenContainer } from "~/components/Screen";

export const meta: MetaFunction = () => {
  return [
    { title: "Change Password | Pink Cell" },
    { name: "description", content: "Change Password" },
  ];
};

export default function ChangePassword() {
  return (
    <ScreenContainer urlBack="/account" title="Change Password">
      <ChangePasswordContainer />
    </ScreenContainer>
  );
}
