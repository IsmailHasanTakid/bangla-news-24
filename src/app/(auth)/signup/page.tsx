"use client";

import { authClient } from "@/lib/auth-client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    Eye,
    EyeOff,
    ShieldCheck,
    Mail,
    UserRound,
} from "lucide-react";
import { toast } from "react-toastify";
import AuthShell, {
    inputClass,
    primaryButtonClass,
} from "@/components/auth/AuthShell";
import SocialButtons, {
    AuthDivider,
    type SocialProvider,
} from "@/components/auth/SocialButtons";

const SignUpPage = () => {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [callbackUrl, setCallbackUrl] = useState("/");
    const [callbackReady, setCallbackReady] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [step, setStep] = useState<"form" | "otp">("form");
    const [otp, setOtp] = useState("");
    const [verifying, setVerifying] = useState(false);
    const [cooldown, setCooldown] = useState(0);

    const { data: session, isPending } = authClient.useSession();
    const sessionChecked = useRef(false);
    const [redirecting, setRedirecting] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const requestedUrl = params.get("callbackUrl");

        if (
            requestedUrl?.startsWith("/") &&
            !requestedUrl.startsWith("//")
        ) {
            setCallbackUrl(requestedUrl);
        }

        setCallbackReady(true);
    }, []);

    useEffect(() => {
        if (isPending || !callbackReady || sessionChecked.current) return;

        sessionChecked.current = true;

        if (session) {
            setRedirecting(true);
            router.replace(callbackUrl);
        }
    }, [isPending, session, router, callbackReady, callbackUrl]);

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
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setVerifying(true);

        try {
            const { error } = await authClient.emailOtp.verifyEmail({
                email,
                otp,
            });

            if (error) {
                toast.error(error.message || "Invalid or expired code");
                return;
            }

            toast.success("Email verified successfully");

            router.replace(callbackUrl);
            router.refresh();
        } catch {
            toast.error("Verification failed. Please try again.");
        } finally {
            setVerifying(false);
        }
    };

    const handleResend = async () => {
        if (cooldown > 0) return;

        try {
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
        } catch {
            toast.error("Could not resend the code. Please try again.");
        }
    };

    const handleSocialSignUp = async (provider: SocialProvider) => {
        try {
            const { error } = await authClient.signIn.social({
                provider,
                callbackURL: callbackUrl,
            });

            if (error) {
                toast.error(
                    error.message || `Could not sign up with ${provider}`
                );
            }
        } catch {
            toast.error("Something went wrong. Please try again.");
        }
    };

    if (redirecting) return null;

    return (
        <AuthShell>

            {step === "form" ? (
                <>
                    {/* Heading */}
                    <div className="mb-6">
                        <h1 className="text-[28px] font-bold tracking-tight text-white sm:text-[32px]">
                            Create your account
                        </h1>
                        <p className="mt-1.5 text-sm text-slate-400">
                            Join Barta24 and get started in a minute.
                        </p>
                    </div>

                    {/* Social signup */}
                    <SocialButtons onSelect={handleSocialSignUp} />

                    <AuthDivider label="or sign up with email" />

                    <form onSubmit={handleSignUp} className="space-y-3.5">
                        {/* Name */}
                        <div>
                            <label
                                htmlFor="signup-name"
                                className="mb-1.5 block text-xs font-medium text-slate-300"
                            >
                                Full Name
                            </label>

                            <div className="group relative">
                                <UserRound className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-red-400" />

                                <input
                                    id="signup-name"
                                    type="text"
                                    autoComplete="name"
                                    placeholder="Enter your full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="signup-email"
                                className="mb-1.5 block text-xs font-medium text-slate-300"
                            >
                                Email Address
                            </label>

                            <div className="group relative">
                                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-red-400" />

                                <input
                                    id="signup-email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="signup-password"
                                className="mb-1.5 block text-xs font-medium text-slate-300"
                            >
                                Password
                            </label>

                            <div className="group relative">
                                <ShieldCheck className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-red-400" />

                                <input
                                    id="signup-password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className={`${inputClass} pr-11`}
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword((s) => !s)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    className="absolute inset-y-0 right-0 flex w-11 cursor-pointer items-center justify-center text-slate-500 transition-colors hover:text-red-300"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-[17px] w-[17px]" />
                                    ) : (
                                        <Eye className="h-[17px] w-[17px]" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className={`${primaryButtonClass} mt-1`}
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {submitting ? "Creating account..." : "Create Account"}
                                {!submitting && (
                                    <ArrowLeft className="h-4 w-4 rotate-180 transition-transform group-hover/button:translate-x-1" />
                                )}
                            </span>

                            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/button:translate-x-full" />
                        </button>
                    </form>

                    {/* Sign in */}
                    <p className="mt-5 text-center text-sm text-slate-400">
                        Already have an account?{" "}
                        <Link
                            href="/signin"
                            className="font-semibold text-red-400 transition-colors hover:text-white"
                        >
                            Sign in
                        </Link>
                    </p>
                </>
            ) : (
                <>
                    {/* OTP heading */}
                    <div className="mb-6 text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-red-300/20 bg-red-500/[0.09] shadow-[0_0_30px_rgba(239,68,68,0.18)]">
                            <Mail className="h-6 w-6 text-red-300" />
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-[28px]">
                            Verify your email
                        </h1>

                        <p className="mt-2 text-sm leading-5 text-slate-400">
                            Enter the 6-digit code sent to
                        </p>

                        <p className="mt-1 break-all text-sm font-medium text-red-200">
                            {email}
                        </p>
                    </div>

                    <form onSubmit={handleVerify} className="space-y-4">
                        <div>
                            <label
                                htmlFor="signup-otp"
                                className="mb-2 block text-xs font-medium text-slate-300"
                            >
                                Verification Code
                            </label>

                            <input
                                id="signup-otp"
                                type="text"
                                inputMode="numeric"
                                autoComplete="one-time-code"
                                maxLength={6}
                                placeholder="000000"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                                required
                                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-center text-2xl font-semibold tracking-[0.55em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition-all placeholder:text-slate-700 focus:border-red-400/60 focus:bg-white/[0.07] focus:ring-4 focus:ring-red-500/10"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={verifying || otp.length !== 6}
                            className={primaryButtonClass}
                        >
                            <span className="relative z-10">
                                {verifying ? "Verifying..." : "Verify Email"}
                            </span>

                            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/button:translate-x-full" />
                        </button>
                    </form>

                    <div className="mt-4 flex items-center justify-between gap-3 text-xs">
                        <button
                            type="button"
                            onClick={() => {
                                setStep("form");
                                setOtp("");
                            }}
                            className="cursor-pointer text-slate-400 transition-colors hover:text-white"
                        >
                            Change email
                        </button>

                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={cooldown > 0}
                            className="cursor-pointer font-medium text-red-400 transition-colors hover:text-white disabled:cursor-not-allowed disabled:text-slate-500"
                        >
                            {cooldown > 0
                                ? `Resend code in ${cooldown}s`
                                : "Resend code"}
                        </button>
                    </div>
                </>
            )}
        </AuthShell>
    );
};

export default SignUpPage;