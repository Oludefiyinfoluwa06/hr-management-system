"use client";

import React, { useState } from "react";
import Image from "next/image";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

const ForgotPassword = () => {
    const [step, setStep] = useState(1);

    return (
        <div className="flex flex-col md:flex-row h-screen">
            <div className="hidden md:flex md:w-[50%] bg-blue-100 h-full items-center justify-center relative">
                <Image src="/auth.png" alt="Auth" width={500} height={500} className="object-contain" />
                <h1 className="text-blue-800 text-xl absolute top-[20px] left-[20px]">KHR</h1>
            </div>

            {step === 1 ? (
                <ForgotPasswordForm step={step} setStep={setStep} />
            ) : (
                <ResetPasswordForm step={step} setStep={setStep} />
            )}
        </div>
    );
}

export default ForgotPassword;
