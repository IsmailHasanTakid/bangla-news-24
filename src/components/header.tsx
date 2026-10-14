import Image from "next/image";
import Link from "next/link";
import SignInUp from "./SignInUp";

const Header = () => {
    return (
        <header className="relative isolate overflow-hidden bg-gradient-to-b from-[#0b0d14] via-[#0d1018] to-[#12090c]">
            {/* Ambient Mesh Glow */}
            <div className="pointer-events-none absolute -left-28 -top-32 -z-10 h-72 w-72 rounded-full bg-red-600/30 blur-3xl" />
            <div className="pointer-events-none absolute left-1/3 -top-28 -z-10 h-56 w-56 rounded-full bg-rose-500/15 blur-3xl" />
            <div className="pointer-events-none absolute -right-24 -top-28 -z-10 h-72 w-72 rounded-full bg-orange-500/25 blur-3xl" />

            {/* Fine grid texture */}
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

            <div className="mx-auto max-w-7xl px-3 py-2 sm:px-6 sm:py-2.5 lg:px-8">
                {/* Glass Panel */}
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 shadow-[0_10px_40px_-10px_rgba(239,68,68,0.35),0_1px_0_0_rgba(255,255,255,0.12)_inset] ring-1 ring-white/[0.04] backdrop-blur-2xl backdrop-saturate-150 sm:px-5 sm:py-2.5">
                    {/* Specular highlight */}
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.08] to-transparent" />
                    <div className="pointer-events-none absolute -left-10 top-0 h-full w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

                    <div className="relative flex items-center justify-between gap-4">
                        {/* Logo and Website Info */}
                        <Link href="/" className="group flex min-w-0 items-center gap-3 sm:gap-4">
                            {/* Logo tile with gradient ring */}
                            <div className="relative shrink-0">
                                <div className="absolute -inset-1 rounded-[18px] bg-gradient-to-br from-red-500 via-rose-500 to-orange-400 opacity-50 blur-md transition-all duration-500 group-hover:opacity-90 group-hover:blur-lg" />
                                <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 via-red-500 to-orange-400 p-[1.5px] shadow-[0_8px_24px_-6px_rgba(239,68,68,0.6)] transition-all duration-500 group-hover:-translate-y-0.5 group-hover:rotate-[-3deg] sm:h-14 sm:w-14">
                                    <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[#0d1018]/90 backdrop-blur-xl sm:rounded-[15px]">
                                        <Image
                                            src="/logo.webp"
                                            alt="Barta24 Logo"
                                            width={56}
                                            height={56}
                                            priority
                                            className="h-8 w-8 object-contain drop-shadow-[0_2px_8px_rgba(239,68,68,0.5)] transition-transform duration-500 group-hover:scale-110 sm:h-10 sm:w-10"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="min-w-0">
                                <div className="flex items-center">
                                    <div className="relative">
                                        <span className="absolute -inset-1 rounded-lg bg-cyan-400/20 opacity-0 blur-md transition duration-500 group-hover:opacity-100" />

                                        <span className="relative text-xl font-black tracking-tight text-white sm:text-2xl">
                                            <span className="block sm:inline">TAKID</span>
                                            <span className="hidden text-cyan-400 sm:inline">-</span>
                                            <span className="block text-cyan-400 sm:inline">BARTA</span>
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-1 hidden items-center gap-2 sm:flex">
                                    <span className="h-[2px] w-7 shrink-0 rounded-full bg-gradient-to-r from-red-500 to-orange-400 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />

                                    <p className="text-xs font-medium tracking-wide text-slate-400">
                                        খবরের সাথে, সবসময়
                                    </p>
                                </div>
                            </div>



                        </Link>

                        {/* Sign In / Sign Up */}
                        <div className="flex shrink-0 items-center">
                            <SignInUp />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Accent */}
            <div className="relative h-[2px] w-full bg-gradient-to-r from-transparent via-red-500/80 to-transparent">
                <div className="absolute inset-x-0 -top-px mx-auto h-[3px] w-1/2 bg-gradient-to-r from-transparent via-orange-400 to-transparent blur-[3px]" />
            </div>
        </header>
    );
};

export default Header;