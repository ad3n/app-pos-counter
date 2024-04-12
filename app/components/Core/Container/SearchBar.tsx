import { Navbar } from 'flowbite-react';
import { MdSearch } from "react-icons/md"
import { TextInput, Label } from 'flowbite-react';
import { useCallback, useEffect, useState } from 'react';
import useDebounce from '~/hooks/useDebounce';

type IProps = {
    placeholder:string 
    handleChange:(data:any)=>void
}

export const SearchBarContainer = (_props:IProps) => {
    const { handleChange } = _props
    const [inputValue, setInputValue] = useState('');
    const debouncedInputValue = useDebounce(inputValue, 300);

    const onChange = useCallback(({ target: { name, value }} : React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(value)
    },[inputValue, setInputValue])

    useEffect(()=>{
        handleChange(debouncedInputValue)
    },[debouncedInputValue])

    return (
        <Navbar fluid rounded>
             <div className="w-full">
                <TextInput type="text" icon={MdSearch} onChange={onChange} 
                    placeholder={_props.placeholder} 
                    required />
            </div>
        </Navbar>
    );
}