import { useState } from "react";

const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({
            ...value,
            [name]: value,
        });
    };

    return [values, handleChange];
};

export default useForm;