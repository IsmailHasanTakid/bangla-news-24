"use client";

import { authClient } from "@/lib/auth-client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff, LogIn } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3.5 text-base text-white outline-none placeholder:text-gray-500 transition duration-300 sm:text-sm";

const SignUpPage = () => {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);

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
        setSubmitting(true);

        try {
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
        } finally {
            setSubmitting(false);
        }
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
        });
    };

    return (
        <div className="relative flex min-h-screen items-start justify-center overflow-hidden bg-[#070b14] px-4 pb-10 pt-6 sm:pt-10">

            <ToastContainer position="top-center" autoClose={4000} theme="dark" />

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

                    {step === "form" ? (
                        <>
                            <div className="mb-6 text-center sm:mb-8">
                                <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                                    Create Account
                                </h1>

                                <p className="mt-2 text-sm text-gray-400">
                                    Create your account and get started
                                </p>
                            </div>

                            <form onSubmit={handleSignUp} className="space-y-4 sm:space-y-5">

                                {/* Name */}
                                <div>
                                    <label
                                        htmlFor="signup-name"
                                        className="mb-2 block text-sm font-medium text-gray-300"
                                    >
                                        Full Name
                                    </label>

                                    <input
                                        id="signup-name"
                                        type="text"
                                        autoComplete="name"
                                        placeholder="Enter your name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className={`${inputClass} focus:border-purple-500/60 focus:bg-white/[0.08] focus:ring-4 focus:ring-purple-500/10`}
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label
                                        htmlFor="signup-email"
                                        className="mb-2 block text-sm font-medium text-gray-300"
                                    >
                                        Email Address
                                    </label>

                                    <input
                                        id="signup-email"
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
                                        htmlFor="signup-password"
                                        className="mb-2 block text-sm font-medium text-gray-300"
                                    >
                                        Password
                                    </label>

                                    <div className="relative">
                                        <input
                                            id="signup-password"
                                            type={showPassword ? "text" : "password"}
                                            autoComplete="new-password"
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
                                    disabled={submitting}
                                    className="group relative w-full cursor-pointer overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-600/20 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
                                >
                                    <span className="relative z-10">
                                        {submitting ? "Creating account..." : "Sign Up"}
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
                                onClick={handleWithGoogleSignUp}
                                className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.05] py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-white/20 hover:bg-white/[0.1] active:scale-[0.98]"
                            >
                                <LogIn className="h-5 w-5" />
                                Continue with Google
                            </button>

                            {/* Link to Sign in */}
                            <p className="mt-6 text-center text-sm text-gray-400">
                                Already have an account?{" "}
                                <Link
                                    href="/signin"
                                    className="font-semibold text-blue-400 transition hover:text-blue-300"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </>
                    ) : (
                        <>
                            <div className="mb-6 text-center sm:mb-8">
                                <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                                    Verify Your Email
                                </h1>

                                <p className="mt-2 text-sm text-gray-400">
                                    Enter the 6-digit code we sent to
                                </p>
                                <p className="mt-1 break-all text-sm font-medium text-gray-200">
                                    {email}
                                </p>
                            </div>

                            <form onSubmit={handleVerify} className="space-y-4 sm:space-y-5">

                                <div>
                                    <label
                                        htmlFor="signup-otp"
                                        className="mb-2 block text-sm font-medium text-gray-300"
                                    >
                                        Verification Code
                                    </label>

                                    <input
                                        id="signup-otp"
                                        type="text"
                                        inputMode="numeric"
                                        autoComplete="one-time-code"
                                        maxLength={6}
                                        placeholder="••••••"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                                        required
                                        className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3.5 text-center text-2xl font-semibold tracking-[0.35em] text-white outline-none placeholder:text-gray-600 transition duration-300 focus:border-blue-500/60 focus:bg-white/[0.08] focus:ring-4 focus:ring-blue-500/10 sm:tracking-[0.5em]"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={verifying || otp.length !== 6}
                                    className="group relative w-full cursor-pointer overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-600/20 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                                >
                                    <span className="relative z-10">
                                        {verifying ? "Verifying..." : "Verify Email"}
                                    </span>

                                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition duration-700 group-hover:translate-x-full" />
                                </button>

                            </form>

                            <div className="mt-5 flex items-center justify-between gap-3 text-sm">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setStep("form");
                                        setOtp("");
                                    }}
                                    className="cursor-pointer py-1 text-gray-400 transition hover:text-white"
                                >
                                    Change email
                                </button>

                                <button
                                    type="button"
                                    onClick={handleResend}
                                    disabled={cooldown > 0}
                                    className="cursor-pointer py-1 font-medium text-blue-400 transition hover:text-blue-300 disabled:cursor-not-allowed disabled:text-gray-500"
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