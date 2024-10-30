import React, { SetStateAction } from "react";

type FormInputProps = {
    label: string;
    id: string;
    type: string;
    value: string;
    setValue: React.Dispatch<SetStateAction<string>>
}

const FormInput = ({ label, id, type, value, setValue }: FormInputProps) => {
    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newOtp = value.split('');
        newOtp[index] = e.target.value.slice(-1);
        setValue(newOtp.join(''));
    };

    return (
        <div className="flex flex-col items-start justify-center my-4">
            <label htmlFor={id} className="capitalize mb-2">{label}</label>
            {id === "otp" ? (
                <div className="flex gap-2">
                    {Array(6).fill('').map((_, index) => (
                        <input
                            key={index}
                            type={type}
                            maxLength={1}
                            value={value[index] || ''}
                            onChange={(e) => handleOtpChange(e, index)}
                            className="w-[calc(100%/6-8px)] h-[60px] text-center border focus:outline-none focus:ring-2 focus:ring-blue-800 rounded text-md"
                        />
                    ))}
                </div>
            ) : (
                <input
                    type={type}
                    id={id}
                    name={id}
                    value={value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
                    className="w-full border focus:outline-none focus:ring-2 focus:ring-blue-800 rounded py-1 px-2 text-md"
                />
            )}
        </div>
    );
}

export default FormInput;
