const Loading = () => {
    return (
        <div
            className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100"
            aria-busy="true"
            aria-live="polite"
        >
            {/* Background glow */}
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl sm:h-96 sm:w-96" />
            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-purple-600/20 blur-3xl sm:h-96 sm:w-96" />

            <div className="relative mx-auto max-w-4xl animate-pulse px-3 pb-14 pt-4 sm:px-6 sm:pb-20 sm:pt-6">
                {/* Top bar */}
                <header className="mb-5 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 backdrop-blur-md sm:mb-8 sm:px-5 sm:py-3">
                    <div className="space-y-2">
                        <div className="h-4 w-32 rounded bg-white/10" />
                        <div className="h-3 w-16 rounded bg-white/10" />
                    </div>
                    <div className="h-8 w-20 rounded-xl bg-white/10 sm:h-9 sm:w-24" />
                </header>

                {/* Profile card */}
                <section className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl sm:rounded-3xl sm:p-8">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
                        {/* Avatar */}
                        <div className="mx-auto h-20 w-20 shrink-0 rounded-full bg-white/10 sm:mx-0 sm:h-24 sm:w-24" />

                        {/* User info */}
                        <div className="min-w-0 flex-1">
                            <div className="mx-auto h-7 w-48 rounded bg-white/10 sm:mx-0 sm:h-8 sm:w-64" />
                            <div className="mt-4 space-y-2.5">
                                <div className="mx-auto h-4 w-56 rounded bg-white/10 sm:mx-0 sm:w-72" />
                                <div className="mx-auto h-4 w-40 rounded bg-white/10 sm:mx-0 sm:w-52" />
                            </div>
                        </div>

                        {/* News read count */}
                        <div className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 sm:justify-start sm:py-4">
                            <div className="h-7 w-7 rounded bg-white/10" />
                            <div className="space-y-2">
                                <div className="h-6 w-10 rounded bg-white/10" />
                                <div className="h-3 w-16 rounded bg-white/10" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Reading history */}
                <section className="mt-8 sm:mt-10">
                    <div className="mb-4 flex items-end justify-between gap-3 sm:mb-5">
                        <div className="space-y-2">
                            <div className="h-6 w-40 rounded bg-white/10" />
                            <div className="h-3 w-56 rounded bg-white/10" />
                        </div>
                        <div className="h-8 w-24 rounded-xl bg-white/10 sm:h-9" />
                    </div>

                    <ul className="space-y-2.5 sm:space-y-3">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <li
                                key={i}
                                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-md sm:gap-4 sm:p-4"
                            >
                                <div className="hidden h-16 w-24 shrink-0 rounded-xl bg-white/10 sm:block" />

                                <div className="min-w-0 flex-1 space-y-2.5">
                                    <div className="h-4 w-full rounded bg-white/10" />
                                    <div className="h-4 w-2/3 rounded bg-white/10" />
                                    <div className="h-3 w-32 rounded bg-white/10" />
                                </div>

                                <div className="h-9 w-9 shrink-0 rounded-xl bg-white/10" />
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default Loading;