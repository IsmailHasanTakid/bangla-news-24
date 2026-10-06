import Link from "next/link";
import { Home, Newspaper, SearchX } from "lucide-react";

const NotFound = () => {
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 text-slate-100">
            {/* Background glow */}
            <div className="absolute -left-20 -top-10 h-90 w-96 rounded-full bg-blue-600/20 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />

            <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-12">
                {/* Icon */}
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-blue-300 ring-1 ring-white/10">
                    <SearchX className="h-8 w-8" />
                </div>

                {/* 404 */}
                <h1 className="mt-6 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-8xl font-black tracking-tight text-transparent sm:text-9xl">
                    404
                </h1>

                <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                    Page not found
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                    আপনি যে পেজটি খুঁজছেন সেটি সরানো হয়েছে, মুছে ফেলা হয়েছে
                    অথবা কখনো ছিলই না।
                </p>

                {/* Actions */}
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-900/40 transition hover:opacity-90"
                    >
                        <Home className="h-4 w-4" />
                        Back to Home
                    </Link>

                    <Link
                        href="/profile"
                        className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:border-blue-400/40 hover:bg-blue-500/10 hover:text-white"
                    >
                        <Newspaper className="h-4 w-4" />
                        My Profile
                    </Link>
                </div>

                <p className="mt-8 text-xs text-slate-500">Bangla News 24</p>
            </div>
        </div>
    );
};

export default NotFound;