import { Navbar, Button } from 'flowbite-react';

export function NavbarContainer() {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/dash" className="">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Pink Cell</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Button>Get started</Button>
      </div>
    </Navbar>
  );
}