export default function Loading() {
    return (
        <main className="mx-auto max-w-5xl animate-pulse space-y-8 p-6" aria-busy="true">
            {/* হেডার */}
            <div className="space-y-3">
                <div className="h-4 w-40 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-8 w-64 rounded-lg bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-72 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-10 w-full max-w-xs rounded-xl bg-gray-200 dark:bg-gray-700" />
            </div>

            {/* চার্ট কার্ড */}
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-3 rounded-2xl border p-4">
                    <div className="h-5 w-52 rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-3 w-36 rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-72 w-full rounded-xl bg-gray-200 dark:bg-gray-700" />
                </div>
            ))}

            {/* সারসংক্ষেপ */}
            <div className="space-y-4 rounded-2xl border p-5">
                <div className="h-6 w-56 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
                <div className="grid gap-4 md:grid-cols-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="h-24 rounded-xl bg-gray-200 dark:bg-gray-700" />
                    ))}
                </div>
            </div>
        </main>
    );
}