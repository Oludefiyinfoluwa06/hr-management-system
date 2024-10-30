import React, { SetStateAction } from "react";

type FormInputProps = {
    label: string;
    id: string;
    type: string;
    value: string;
    setValue: React.Dispatch<SetStateAction<string>>
}

const FormInput = ({ label, id, type, value, setValue }: FormInputProps) => {
    return (
        <div className="flex flex-col items-start justify-center my-4">
            <label htmlFor={id} className="capitalize mb-2">{label}</label>
            <input
                type={type}
                id={id}
                name={id}
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
                className="w-full border focus:outline-none focus:ring-2 focus:ring-blue-800 rounded py-1 px-2 text-md"
            />
        </div>
    );
}

export default FormInput;
