import React, { SetStateAction, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import FormInput from "./FormInput";
import Button from "./Button";
import MessageBox from "./MessageBox";
import { resetPassword } from "@/services/requests";

type ResetPasswordFormProps = {
    step: number;
    setStep: React.Dispatch<SetStateAction<number>>;
    email: string
}

const ResetPasswordForm = ({ step, setStep, email }: ResetPasswordFormProps) => {
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const router = useRouter();

    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        if (password !== confirmPassword) {
            setLoading(false);
            return setError("Passwords do not match");
        }

        const result = await resetPassword(otp, email, password);

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
                router.push("/employer/login");
            }
        }, 3000);
    }

    return (
        <>
            <div className="w-full md:w-[50%] h-full p-[20px] md:p-[50px] flex flex-col items-start justify-center">
                <MessageBox message={error} isError={true} />
                <MessageBox message={success} isError={false} />

                <div className="flex flex-row items-center justify-start mb-2">
                    <FaArrowLeft className="mr-2 cursor-pointer text-blue-800" onClick={() => setStep(step - 1)} />
                    <h1 className="text-blue-800 text-2xl font-bold">Reset Password</h1>
                </div>
                <p className="text-sm mb-4">An OTP has been sent to your email</p>

                <form className="w-full" onSubmit={handleResetPassword}>
                    <FormInput
                        label="Verify OTP"
                        id="otp"
                        type="text"
                        value={otp}
                        setValue={setOtp}
                    />

                    <FormInput
                        label="Password"
                        id="password"
                        type="password"
                        value={password}
                        setValue={setPassword}
                    />

                    <FormInput
                        label="Confirm Password"
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        setValue={setConfirmPassword}
                    />

                    <Button text={loading ? "Loading..." : "Reset Password"} />
                    <p className="text-center mt-3">
                        <Link href="login" className="text-blue-800">Back to login</Link>
                    </p>
                </form>
            </div>
        </>
    );
}

export default ResetPasswordForm;
