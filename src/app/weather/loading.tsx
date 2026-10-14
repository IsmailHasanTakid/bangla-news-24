export default function Loading() {
    return (
        <main className="mx-auto max-w-4xl animate-pulse space-y-8 p-6" aria-busy="true">
            {/* হেডার */}
            <div className="space-y-3">
                <div className="h-8 w-56 rounded-lg bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-72 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-10 w-full max-w-xs rounded-xl bg-gray-200 dark:bg-gray-700" />
            </div>

            {/* বর্তমান আবহাওয়া */}
            <div className="space-y-4 rounded-2xl border p-6">
                <div className="h-16 w-40 rounded-lg bg-gray-200 dark:bg-gray-700" />
                <div className="h-5 w-48 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="grid grid-cols-2 gap-4 pt-2 sm:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="h-16 rounded-lg bg-gray-200 dark:bg-gray-700" />
                    ))}
                </div>
            </div>

            {/* ৭ দিনের পূর্বাভাস */}
            <div className="space-y-3">
                <div className="h-6 w-40 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
                    {Array.from({ length: 7 }).map((_, i) => (
                        <div key={i} className="h-28 rounded-xl bg-gray-200 dark:bg-gray-700" />
                    ))}
                </div>
            </div>
        </main>
    );
}