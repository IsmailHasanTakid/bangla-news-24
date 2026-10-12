export default function DetailsLoading() {
    return (
        <main className="mx-auto min-h-screen max-w-5xl px-4 py-8 sm:px-6">
            <div className="animate-pulse">
                {/* Category */}
                <div className="mb-5 h-6 w-28 rounded-full bg-gray-200" />

                {/* Title */}
                <div className="mb-3 h-9 w-full max-w-3xl rounded-lg bg-gray-200" />
                <div className="mb-6 h-9 w-4/5 max-w-2xl rounded-lg bg-gray-200" />

                {/* Date and author */}
                <div className="mb-7 flex flex-wrap items-center gap-4">
                    <div className="h-4 w-28 rounded bg-gray-200" />
                    <div className="h-4 w-32 rounded bg-gray-200" />
                </div>

                {/* Main news image */}
                <div className="mb-8 aspect-video w-full rounded-2xl bg-gray-200" />

                {/* Article description */}
                <div className="space-y-4">
                    <div className="h-5 w-full rounded bg-gray-200" />
                    <div className="h-5 w-full rounded bg-gray-200" />
                    <div className="h-5 w-11/12 rounded bg-gray-200" />
                    <div className="h-5 w-full rounded bg-gray-200" />
                    <div className="h-5 w-4/5 rounded bg-gray-200" />
                </div>

                {/* More article content */}
                <div className="mt-8 space-y-4">
                    <div className="h-5 w-full rounded bg-gray-200" />
                    <div className="h-5 w-11/12 rounded bg-gray-200" />
                    <div className="h-5 w-3/4 rounded bg-gray-200" />
                </div>
            </div>
        </main>
    );
}