"use client";

import { authClient } from "@/lib/auth-client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpPage = () => {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



    const [step, setStep] = useState<"form" | "otp">("form");
    const [otp, setOtp] = useState("");
    const [verifying, setVerifying] = useState(false);
    const [cooldown, setCooldown] = useState(0);


    useEffect(() => {
        if (cooldown <= 0) return;
        const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
        return () => clearTimeout(timer);
    }, [cooldown]);

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { error } = await authClient.signUp.email({
            name,
            email,
            password,
        });

        if (error) {
            toast.error(error.message || "Sign up failed");
            return;
        }

        toast.success("We sent a 6-digit code to your email.");
        setStep("otp");
        setCooldown(60);
    };

    const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setVerifying(true);

        const { error } = await authClient.emailOtp.verifyEmail({
            email,
            otp,
        });

        setVerifying(false);

        if (error) {
            toast.error(error.message || "Invalid or expired code");
            return;
        }

        toast.success("Email verified successfully");
        router.push("/");
        router.refresh();
    };

    const handleResend = async () => {
        if (cooldown > 0) return;

        const { error } = await authClient.emailOtp.sendVerificationOtp({
            email,
            type: "email-verification",
        });

        if (error) {
            toast.error(error.message || "Could not resend the code");
            return;
        }

        toast.success("A new code has been sent");
        setCooldown(60);
    };

    const handleWithGoogleSignUp = () => {
        authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        })
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#070b14] flex items-start justify-center px-4 pt-10">

            <ToastContainer position="top-right" autoClose={4000} theme="dark" />

            {/* Background Glow */}
            <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[130px]" />
            <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[130px]" />
            <div className="absolute top-1/2 left-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />

            {/* Main Card */}
            <div className="relative z-10 w-full max-w-md">

                <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-2xl backdrop-blur-2xl">

                    {step === "form" ? (
                        <>
                            <div className="mb-8 text-center">

                                <h1 className="text-3xl font-bold tracking-tight text-white">
                                    Create Account
                                </h1>

                                <p className="mt-2 text-sm text-gray-400">
                                    Create your account and get started
                                </p>
                            </div>

                            <form
                                onSubmit={handleSignUp}
                                className="space-y-5"
                            >

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-300">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3.5 text-sm text-white outline-none placeholder:text-gray-500 transition duration-300 focus:border-purple-500/60 focus:bg-white/[0.08] focus:ring-4 focus:ring-purple-500/10"
                                    />
                                </div>

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

                                <button
                                    type="submit"
                                    className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-600/20 active:scale-[0.98]"
                                >
                                    <span className="relative z-10">
                                        Sign Up
                                    </span>

                                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition duration-700 group-hover:translate-x-full" />
                                </button>

                            </form>
                            <button
                                type="button"
                                onClick={handleWithGoogleSignUp}
                                className="mt-4 w-full cursor-pointer rounded-xl border border-blue-100 bg-blue-50 py-3 font-semibold text-gray-800 shadow-sm transition-all duration-300 hover:bg-blue-100 hover:border-blue-200 hover:shadow-md active:scale-[0.98]">
                                SignUp With Google
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="mb-8 text-center">

                                <h1 className="text-3xl font-bold tracking-tight text-white">
                                    Verify Your Email
                                </h1>

                                <p className="mt-2 text-sm text-gray-400">
                                    Enter the 6-digit code we sent to
                                </p>
                                <p className="mt-1 text-sm font-medium text-gray-200 break-all">
                                    {email}
                                </p>
                            </div>

                            <form
                                onSubmit={handleVerify}
                                className="space-y-5"
                            >

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-300">
                                        Verification Code
                                    </label>

                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        autoComplete="one-time-code"
                                        maxLength={6}
                                        placeholder="••••••"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                                        required
                                        className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3.5 text-center text-2xl font-semibold tracking-[0.5em] text-white outline-none placeholder:text-gray-600 transition duration-300 focus:border-blue-500/60 focus:bg-white/[0.08] focus:ring-4 focus:ring-blue-500/10"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={verifying || otp.length !== 6}
                                    className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-600/20 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                                >
                                    <span className="relative z-10">
                                        {verifying ? "Verifying..." : "Verify Email"}
                                    </span>

                                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition duration-700 group-hover:translate-x-full" />
                                </button>

                            </form>

                            <div className="mt-5 flex items-center justify-between text-sm">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setStep("form");
                                        setOtp("");
                                    }}
                                    className="cursor-pointer text-gray-400 transition hover:text-white"
                                >
                                    Change email
                                </button>

                                <button
                                    type="button"
                                    onClick={handleResend}
                                    disabled={cooldown > 0}
                                    className="cursor-pointer font-medium text-blue-400 transition hover:text-blue-300 disabled:cursor-not-allowed disabled:text-gray-500"
                                >
                                    {cooldown > 0 ? `Resend code in ${cooldown}s` : "Resend code"}
                                </button>
                            </div>
                        </>
                    )}

                </div>


                <div className="mx-auto mt-5 h-px w-32 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

            </div>
        </div>
    );
};

export default SignUpPage;