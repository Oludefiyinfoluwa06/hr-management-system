"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/auth/Button";
import FormInput from "@/components/auth/FormInput";

const Register = () => {
    const [companyName, setCompanyName] = useState("");
    const [userName, setUserName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(companyName, userName, emailAddress, password);
    }

    return (
        <div className="flex flex-col md:flex-row h-screen">
            <div className="hidden md:flex md:w-[50%] bg-blue-100 h-full items-center justify-center relative">
                <Image src="/auth.png" alt="Auth" width={500} height={500} className="object-contain" />
                <h1 className="text-blue-800 text-xl absolute top-[20px] left-[20px]">KHR</h1>
            </div>

            <div className="w-full md:w-[50%] h-full p-[20px] md:p-[50px] flex flex-col items-start justify-center">
                <h1 className="text-blue-800 text-2xl mb-4 font-bold">Register your account</h1>

                <form className="w-full" onSubmit={handleRegister}>
                    <FormInput
                        label="Company Name"
                        id="companyName"
                        type="text"
                        value={companyName}
                        setValue={setCompanyName}
                    />
                    <FormInput
                        label="Username"
                        id="username"
                        type="text"
                        value={userName}
                        setValue={setUserName}
                    />
                    <FormInput
                        label="Email Address"
                        id="email"
                        type="email"
                        value={emailAddress}
                        setValue={setEmailAddress}
                    />
                    <FormInput
                        label="Password"
                        id="password"
                        type="password"
                        value={password}
                        setValue={setPassword}
                    />

                    <Button text="Register" />
                    <p className="text-center mt-3">Already have an account? <Link href="login" className="text-blue-800">Login</Link></p>
                </form>
            </div>
        </div>
    );
}

export default Register;
