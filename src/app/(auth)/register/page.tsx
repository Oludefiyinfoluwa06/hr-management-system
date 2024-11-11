"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/auth/Button";
import FormInput from "@/components/auth/FormInput";
import { register } from "@/services/auth-requests";
import { Roles } from "@/utils/enums";
import MessageBox from "@/components/auth/MessageBox";

const Register = () => {
    const [companyName, setCompanyName] = useState("");
    const [userName, setUserName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const router = useRouter();

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const result = await register(companyName, userName, emailAddress, password, role);

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
        <div className="flex flex-col md:flex-row md:h-screen h-full">
            <MessageBox message={error} isError={true} />
            <MessageBox message={success} isError={false} />

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

                    <label htmlFor="role">Select a Role</label>
                    <select
                        className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        value={role}
                        id="role"
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setRole(e.target.value)}
                    >
                        <option value="">Select a role</option>
                        <option value={Roles.EMPLOYER}>Employer</option>
                        <option value={Roles.JOB_SEEKER}>Job Seeker</option>
                    </select>

                    <Button text={loading ? "Loading..." : "Register"} />
                    <p className="text-center mt-3">Already have an account? <Link href="login" className="text-blue-800">Login</Link></p>
                </form>
            </div>
        </div>
    );
}

export default Register;
