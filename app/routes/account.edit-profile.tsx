import type { MetaFunction } from "@remix-run/node";
import EditProfileContainer from "~/container/Profile/EditProfile";
import { ScreenContainer } from "~/components/Screen";

export const meta: MetaFunction = () => {
  return [
    { title: "Edit Profile | PInk Cell" },
    { name: "description", content: "Edit Profile" },
  ];
};

export default function EditProfile() {
  return (
    <ScreenContainer urlBack="/account" title="Edit Profile">
      <EditProfileContainer />
    </ScreenContainer>
  );
}
