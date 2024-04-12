import { Navbar, Button } from 'flowbite-react';
import { MdArrowBack } from "react-icons/md"

type IProps = {
    title:string 
    onBack:()=>void
}

export const HeadingBarContainer = (_props:IProps) => {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand>
        <MdArrowBack className='text-white text-base ml-4 mr-4' onClick={_props.onBack} />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            {_props.title}
        </span>
      </Navbar.Brand>
      
    </Navbar>
  );
}