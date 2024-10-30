"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/auth/Button";
import FormInput from "@/components/auth/FormInput";
import { login } from "@/services/requests";
import { useRouter } from "next/navigation";
import MessageBox from "@/components/auth/MessageBox";

const Login = () => {
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const router = useRouter();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const result = await login(emailAddress, password);

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
                router.push("/employer/dashboard");
            }
        }, 3000);
    }

    return (
        <div className="flex flex-col md:flex-row h-screen">
            <MessageBox message={error} isError={true} />
            <MessageBox message={success} isError={false} />

            <div className="w-full md:w-[50%] h-full p-[20px] md:p-[50px] flex flex-col items-start justify-center">
                <h1 className="text-blue-800 text-2xl mb-2 font-bold">Welcome back</h1>
                <p className="text-sm mb-4">Login to your account</p>

                <form className="w-full" onSubmit={handleLogin}>
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

                    <Link href="forgot-password" className="text-slate-600 text-sm">Forgot password?</Link>

                    <Button text={loading ? "Loading..." : "Login"} />
                    <p className="text-center mt-3">
                        Don&rsquo;t have an account? <Link href="register" className="text-blue-800">Register</Link>
                    </p>
                </form>
            </div>

            <div className="hidden md:flex md:w-[50%] bg-blue-100 h-full items-center justify-center relative">
                <Image src="/auth.png" alt="Auth" width={500} height={500} className="object-contain" />
                <h1 className="text-blue-800 text-xl absolute top-[20px] right-[20px]">KHR</h1>
            </div>
        </div>
    );
}

export default Login;
