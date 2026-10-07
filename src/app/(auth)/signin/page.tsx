"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";
import { ArrowLeft, Eye, EyeOff, LogIn } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3.5 text-base text-white outline-none placeholder:text-gray-500 transition duration-300 sm:text-sm";

const SignInPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await authClient.signIn.email({
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
        } finally {
            setLoading(false);
        }
    };

    const handleWithGoogle = () => {
        authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });
    };

    return (
        <div className="relative flex min-h-screen items-start justify-center overflow-hidden bg-[#070b14] px-4 pb-10 pt-6 sm:pt-10">
            <ToastContainer position="top-center" autoClose={3000} theme="dark" />

            {/* Background Glow */}
            <div className="absolute -left-40 -top-40 h-[300px] w-[300px] rounded-full bg-blue-600/20 blur-[110px] sm:h-[500px] sm:w-[500px] sm:blur-[130px]" />
            <div className="absolute -bottom-40 -right-40 h-[300px] w-[300px] rounded-full bg-purple-600/20 blur-[110px] sm:h-[500px] sm:w-[500px] sm:blur-[130px]" />
            <div className="absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[100px] sm:h-[350px] sm:w-[350px] sm:blur-[120px]" />

            {/* Main Card */}
            <div className="relative z-10 w-full max-w-md">

                {/* Back to home */}
                <Link
                    href="/"
                    className="mb-4 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                </Link>

                <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-2xl sm:p-8">

                    {/* Heading */}
                    <div className="mb-6 text-center sm:mb-8">
                        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                            Welcome Back
                        </h1>

                        <p className="mt-2 text-sm text-gray-400">
                            Sign in to continue to your account
                        </p>
                    </div>

                    <form onSubmit={handleSignIn} className="space-y-4 sm:space-y-5">

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="signin-email"
                                className="mb-2 block text-sm font-medium text-gray-300"
                            >
                                Email Address
                            </label>

                            <input
                                id="signin-email"
                                type="email"
                                autoComplete="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className={`${inputClass} focus:border-blue-500/60 focus:bg-white/[0.08] focus:ring-4 focus:ring-blue-500/10`}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="signin-password"
                                className="mb-2 block text-sm font-medium text-gray-300"
                            >
                                Password
                            </label>

                            <div className="relative">
                                <input
                                    id="signin-password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className={`${inputClass} pr-12 focus:border-purple-500/60 focus:bg-white/[0.08] focus:ring-4 focus:ring-purple-500/10`}
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword((s) => !s)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    className="absolute inset-y-0 right-0 flex w-12 cursor-pointer items-center justify-center text-gray-400 transition hover:text-white"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full cursor-pointer overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-600/20 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
                        >
                            <span className="relative z-10">
                                {loading ? "Signing in..." : "Sign In"}
                            </span>

                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition duration-700 group-hover:translate-x-full" />
                        </button>

                    </form>

                    {/* Divider */}
                    <div className="my-5 flex items-center gap-3 sm:my-6">
                        <div className="h-px flex-1 bg-white/10" />
                        <span className="text-xs uppercase tracking-widest text-gray-500">or</span>
                        <div className="h-px flex-1 bg-white/10" />
                    </div>

                    {/* Google */}
                    <button
                        type="button"
                        onClick={handleWithGoogle}
                        className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.05] py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-white/20 hover:bg-white/[0.1] active:scale-[0.98]"
                    >
                        <LogIn className="h-5 w-5" />
                        Continue with Google
                    </button>

                    {/* Link to Sign up */}
                    <p className="mt-6 text-center text-sm text-gray-400">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/signup"
                            className="font-semibold text-blue-400 transition hover:text-blue-300"
                        >
                            Sign up
                        </Link>
                    </p>

                </div>

                {/* Bottom Glow Line */}
                <div className="mx-auto mt-5 h-px w-32 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

            </div>
        </div>
    );
};

export default SignInPage;