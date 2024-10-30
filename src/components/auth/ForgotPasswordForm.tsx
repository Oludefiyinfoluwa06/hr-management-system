import React, { SetStateAction, useState } from "react";
import Link from "next/link";
import FormInput from "./FormInput";
import Button from "./Button";

type ForgotPasswordFormProps = {
    step: number;
    setStep: React.Dispatch<SetStateAction<number>>;
}

const ForgotPasswordForm = ({ step, setStep }: ForgotPasswordFormProps) => {
    const [emailAddress, setEmailAddress] = useState("");

    const handleReceiveOtp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(emailAddress);
        setStep(step + 1);
    }

    return (
        <>
            <div className="w-full md:w-[50%] h-full p-[20px] md:p-[50px] flex flex-col items-start justify-center">
                <h1 className="text-blue-800 text-2xl mb-2 font-bold">Forgot Password?</h1>
                <p className="text-sm mb-4">Enter your email to reset your password</p>

                <form className="w-full" onSubmit={handleReceiveOtp}>
                    <FormInput
                        label="Email Address"
                        id="email"
                        type="email"
                        value={emailAddress}
                        setValue={setEmailAddress}
                    />

                    <Button text="Continue" />
                    <p className="text-center mt-3">
                        <Link href="login" className="text-blue-800">Back to login</Link>
                    </p>
                </form>
            </div>
        </>
    );
}

export default ForgotPasswordForm;