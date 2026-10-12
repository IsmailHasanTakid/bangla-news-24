"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, LogIn, Mail, LockKeyhole } from "lucide-react";
import { toast } from "react-toastify";
import AuthShell, {
    inputClass,
    primaryButtonClass,
} from "@/components/auth/AuthShell";
import SocialButtons, {
    AuthDivider,
    type SocialProvider,
} from "@/components/auth/SocialButtons";

export default function SignInPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [callbackUrl, setCallbackUrl] = useState("/");
    const [callbackReady, setCallbackReady] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);

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

    const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const { error } = await authClient.signIn.email({
                email,
                password,
            });

            if (error) {
                toast.error(error.message || "Sign in failed");
                return;
            }

            toast.success("Signed in successfully!");
            router.replace(callbackUrl);
            router.refresh();
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleSocialSignIn = async (provider: SocialProvider) => {
        try {
            const { error } = await authClient.signIn.social({
                provider,
                callbackURL: callbackUrl,
            });

            if (error) {
                toast.error(
                    error.message || `Could not sign in with ${provider}`
                );
            }
        } catch {
            toast.error("Something went wrong. Please try again.");
        }
    };

    if (redirecting) return null;





    return (
        <AuthShell>


            {/* Heading */}
            <div className="mb-6">
                <h1 className="text-[28px] font-bold tracking-tight text-white sm:text-[32px]">
                    Welcome back
                </h1>
                <p className="mt-1.5 text-sm text-slate-400">
                    Sign in to continue to Barta24.
                </p>
            </div>

            {/* Social login */}
            <SocialButtons onSelect={handleSocialSignIn} />

            <AuthDivider label="or sign in with email" />

            {/* Sign In Form */}
            <form onSubmit={handleSignin} className="space-y-4">
                <div>
                    <label
                        htmlFor="signin-email"
                        className="mb-1.5 block text-xs font-medium text-slate-300"
                    >
                        Email Address
                    </label>

                    <div className="group relative">
                        <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-red-400" />

                        <input
                            id="signin-email"
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

                <div>
                    <label
                        htmlFor="signin-password"
                        className="mb-1.5 block text-xs font-medium text-slate-300"
                    >
                        Password
                    </label>

                    <div className="group relative">
                        <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-red-400" />

                        <input
                            id="signin-password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            placeholder="Enter your password"
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
                        {submitting ? "Signing in..." : "Sign In"}

                        {!submitting && (
                            <LogIn className="h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                        )}
                    </span>

                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/button:translate-x-full" />
                </button>
            </form>

            {/* Sign Up link */}
            <p className="mt-5 text-center text-sm text-slate-400">
                Don&apos;t have an account?{" "}
                <Link
                    href="/signup"
                    className="font-semibold text-red-400 transition-colors hover:text-white"
                >
                    Create account
                </Link>
            </p>
        </AuthShell>
    );
}