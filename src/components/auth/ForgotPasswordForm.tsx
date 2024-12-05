import React, { SetStateAction, useState } from "react";
import Link from "next/link";
import FormInput from "./FormInput";
import Button from "./Button";
import MessageBox from "./MessageBox";
import { requestOtp } from "@/services/auth-requests";

type ForgotPasswordFormProps = {
    step: number;
    setStep: React.Dispatch<SetStateAction<number>>;
    setEmail: React.Dispatch<SetStateAction<string>>;
}

const ForgotPasswordForm = ({ step, setStep, setEmail }: ForgotPasswordFormProps) => {
    const [emailAddress, setEmailAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleReceiveOtp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const result = await requestOtp(emailAddress);

        if (result) {
            setLoading(false);

            if (result.error) {
                setError(Array.isArray(result.error) ? result.error[0] : result.error);
            } else {
                setSuccess(result.response);
            }
        }

        setTimeout(() => {
            setError("");
            setSuccess("");

            if (result.response) {
                setEmail(emailAddress);
                setStep(step + 1);
            }
        }, 3000);
    }

    return (
        <>
            <div className="w-full md:w-[50%] h-full p-[20px] md:p-[50px] flex flex-col items-start justify-center">
                <MessageBox message={error} isError={true} />
                <MessageBox message={success} isError={false} />

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

                    <Button text={loading ? "Loading" : "Continue"} />
                    <p className="text-center mt-3">
                        <Link href="login" className="text-blue-800">Back to login</Link>
                    </p>
                </form>
            </div>
        </>
    );
}

export default ForgotPasswordForm;