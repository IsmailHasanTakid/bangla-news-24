import { Newspaper } from "lucide-react";

const Loading = () => {
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 text-slate-100">
            {/* Background glow */}
            <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />

            <div
                role="status"
                aria-live="polite"
                className="relative flex flex-col items-center rounded-3xl border border-white/10 bg-white/5 px-12 py-10 shadow-2xl shadow-black/30 backdrop-blur-xl"
            >
                {/* Spinner ring with icon in the middle */}
                <div className="relative flex h-20 w-20 items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-4 border-white/10" />
                    <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500" />
                    <Newspaper className="h-7 w-7 text-blue-300" />
                </div>

                <p className="mt-6 text-base font-bold tracking-tight text-white">
                    Bangla News 24
                </p>

                {/* Loading text with bouncing dots */}
                <p className="mt-1 flex items-center gap-1 text-sm text-slate-400">
                    Loading
                    <span className="flex gap-0.5">
                        <span className="h-1 w-1 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
                        <span className="h-1 w-1 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
                        <span className="h-1 w-1 animate-bounce rounded-full bg-slate-400" />
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Loading;