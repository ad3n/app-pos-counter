import { Card, Label, TextInput, Checkbox, Button } from "flowbite-react"
import { ProfileHero, NavbarContainer, ListMenuProfile } from "~/components"

export default function AccountContainer() {
  
    return (<>
        <div className="container mx-auto pt-9 px-4">
            <Card className="max-w-full">
                <ProfileHero />
            </Card>

            <ListMenuProfile />
        </div>
    </>)
}