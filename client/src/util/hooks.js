import { useState } from 'react'

export const useForm = (callback, initalState = {}) => {
    const [ values, setvalues ] = useState(initalState);

	const onChange = (event) => {
		setvalues({ ...values, [event.target.name]: event.target.value });
    };
    
    const onSubmit = (event) => {
        event.preventDefault();
        callback()
    };
    
    return {
        onChange,
        onSubmit,
        values
    }
}