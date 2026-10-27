import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

/* Shared styles so Sign In / Sign Up always match */
export const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 pl-11 pr-4 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none placeholder:text-slate-500 transition-all duration-300 hover:border-white/20 focus:border-red-400/60 focus:bg-white/[0.07] focus:ring-4 focus:ring-red-500/10";

export const primaryButtonClass =
    "group/button relative w-full cursor-pointer overflow-hidden rounded-xl border border-red-300/30 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 py-3 text-sm font-semibold text-white shadow-[0_8px_30px_-6px_rgba(239,68,68,0.55),inset_0_1px_0_rgba(255,255,255,0.25)] transition-all duration-300 hover:shadow-[0_10px_38px_-6px_rgba(239,68,68,0.75),inset_0_1px_0_rgba(255,255,255,0.3)] active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-60";

const BrandMark = () => (
    <div className="flex items-center gap-3">
        <div className="relative">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-red-500 to-orange-400 opacity-50 blur-md" />
            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-orange-400 p-[1.5px]">
                <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[#0a0b10]">
                    <Image
                        src="/logo.webp"
                        alt="Barta24 Logo"
                        width={40}
                        height={40}
                        className="h-8 w-8 object-contain"
                    />
                </div>
            </div>
        </div>
        <span className="text-xl font-black tracking-tight text-white">
            Barta
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                24
            </span>
        </span>
    </div>
);

const AuthShell = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="relative isolate flex w-full items-center justify-center overflow-hidden bg-[#06070b] px-3 py-3 sm:px-6 sm:py-10 lg:min-h-[calc(100vh-150px)]">
            {/* Ambient background */}
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,rgba(239,68,68,0.14),transparent_55%),radial-gradient(ellipse_at_100%_100%,rgba(249,115,22,0.10),transparent_45%)]" />
            <div className="pointer-events-none absolute -left-40 top-1/4 -z-10 h-80 w-80 rounded-full bg-red-600/15 blur-[120px]" />
            <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-80 w-80 rounded-full bg-orange-500/15 blur-[120px]" />
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_72%)]" />

            <div className="relative z-10 w-full max-w-[1020px]">
                {/* Animated border (the one signature moment) */}
                <div className="relative isolate overflow-hidden rounded-[32px] p-[1px] shadow-[0_0_60px_rgba(239,68,68,0.10),0_30px_90px_rgba(0,0,0,0.6)]">
                    <div className="pointer-events-none absolute -inset-[150%] -z-10 animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_250deg,#dc2626_285deg,#f97316_315deg,#fbbf24_338deg,transparent_360deg)]" />

                    <div className="relative grid overflow-hidden rounded-[31px] bg-[#0a0b10]/95 backdrop-blur-2xl lg:grid-cols-[1fr_1.02fr]">
                        {/* Left: brand showcase (desktop only) */}
                        <aside className="relative hidden flex-col justify-between overflow-hidden border-r border-white/[0.06] bg-gradient-to-br from-red-950/40 via-[#0a0b10] to-[#0a0b10] p-10 lg:flex">
                            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-red-600/25 blur-[90px]" />
                            <div className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-orange-500/20 blur-[90px]" />

                            <div className="relative">
                                <BrandMark />
                            </div>

                            <div className="relative">
                                <h2 className="text-4xl font-black leading-tight tracking-tight text-white xl:text-[42px]">
                                    খবরের সাথে,
                                    <br />
                                    <span className="bg-gradient-to-r from-red-400 via-red-500 to-orange-400 bg-clip-text text-transparent">
                                        সবসময়
                                    </span>
                                </h2>
                                <p className="mt-3 max-w-xs text-sm leading-6 text-slate-400">
                                    Sign in to Barta24 and follow the stories that matter to you.
                                </p>
                            </div>

                            {/* Decorative glass cards */}
                            <div className="relative mt-10 h-[210px]" aria-hidden="true">
                                <div className="absolute left-0 top-0 w-[76%] -rotate-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl">
                                    <div className="flex items-center gap-2">
                                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.9)]" />
                                        <span className="h-2 w-14 rounded-full bg-white/20" />
                                    </div>
                                    <div className="mt-3 h-2.5 w-full rounded-full bg-white/25" />
                                    <div className="mt-2 h-2.5 w-4/5 rounded-full bg-white/15" />
                                    <div className="mt-2 h-2 w-2/5 rounded-full bg-white/10" />
                                </div>

                                <div className="absolute bottom-0 right-0 w-[68%] rotate-3 rounded-2xl border border-red-300/15 bg-gradient-to-br from-red-500/15 to-orange-400/5 p-4 shadow-[0_20px_50px_-15px_rgba(239,68,68,0.35),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl">
                                    <div className="h-14 w-full rounded-xl bg-gradient-to-br from-red-500/40 via-orange-400/25 to-transparent" />
                                    <div className="mt-3 h-2.5 w-full rounded-full bg-white/25" />
                                    <div className="mt-2 h-2 w-3/5 rounded-full bg-white/15" />
                                </div>
                            </div>
                        </aside>

                        {/* Right: form area */}
                        <section className="relative px-4 py-4 sm:px-9 sm:py-8">
                            <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-red-300/60 to-transparent" />

                            <div className="mb-6 flex items-center justify-between gap-3">
                                <Link
                                    href="/"
                                    className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-400 backdrop-blur-xl transition-all hover:border-red-400/30 hover:bg-red-500/[0.07] hover:text-white"
                                >
                                    <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                                    Back to Home
                                </Link>

                                <div className="lg:hidden">
                                    <BrandMark />
                                </div>
                            </div>

                            {children}

                            <div className="mt-6 flex items-center justify-center gap-1.5 border-t border-white/[0.06] pt-4">
                                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400/80" />
                                <span className="text-[11px] tracking-wide text-slate-500">
                                    Secure authentication · Protected connection
                                </span>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AuthShell;