"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SignInPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { data, error } = await authClient.signIn.email({
            email,
            password,
        });

        if (error) {
            toast.error(error.message || "Sign In Failed");
            return;
        }

        toast.success("Signed in Successfully");
        router.push("/");
        router.refresh();
    };


    const handleWithGoogle = () => {
        authClient.signIn.social({
            provider: "google",
            callbackURL: "/"
        })
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#070b14] flex items-start justify-center px-4 pt-10">
            <ToastContainer position="top-right" autoClose={3000} theme="dark" />
            {/* Background Glow */}
            <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[130px]" />
            <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[130px]" />
            <div className="absolute top-1/2 left-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />

            {/* Main Card */}
            <div className="relative z-10 w-full max-w-md">

                <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-2xl backdrop-blur-2xl">

                    {/* Heading */}
                    <div className="mb-8 text-center">

                        <h1 className="text-3xl font-bold tracking-tight text-white">
                            Welcome Back
                        </h1>

                        <p className="mt-2 text-sm text-gray-400">
                            Sign in to continue to your account
                        </p>
                    </div>

                    <form
                        onSubmit={handleSignIn}
                        className="space-y-5"
                    >

                        {/* Email */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-300">
                                Email Address
                            </label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3.5 text-sm text-white outline-none placeholder:text-gray-500 transition duration-300 focus:border-blue-500/60 focus:bg-white/[0.08] focus:ring-4 focus:ring-blue-500/10"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-300">
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3.5 text-sm text-white outline-none placeholder:text-gray-500 transition duration-300 focus:border-purple-500/60 focus:bg-white/[0.08] focus:ring-4 focus:ring-purple-500/10"
                            />
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-600/20 active:scale-[0.98]"
                        >
                            <span className="relative z-10">
                                Sign In
                            </span>

                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition duration-700 group-hover:translate-x-full" />
                        </button>

                    </form>

                    <button
                        type="button"
                        onClick={handleWithGoogle}
                        className="mt-4 w-full cursor-pointer rounded-xl border border-blue-100 bg-blue-50 py-3 font-semibold text-gray-800 shadow-sm transition-all duration-300 hover:bg-blue-100 hover:border-blue-200 hover:shadow-md active:scale-[0.98]"
                    >
                        SignIn With Google
                    </button>

                </div>

                {/* Bottom Glow Line */}
                <div className="mx-auto mt-5 h-px w-32 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

            </div>
        </div>
    );
};

export default SignInPage;