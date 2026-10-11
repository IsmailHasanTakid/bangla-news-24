import NewsCardSkeleton from "@/components/NewsCardSkeleton";

const Loading = () => {
    return (
        <div className="max-w-7xl mx-auto px-1 py-5 sm:px-5">
            <div className="flex items-center gap-3 mb-6">
                <div className="h-7 w-1.5 rounded bg-red-600" />
                <div className="skeleton h-7 w-40" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                    <NewsCardSkeleton key={i} index={i} />
                ))}
            </div>
        </div>
    );
};

export default Loading;