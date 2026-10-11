const DetailsLoading = () => {
    return (
        <div className="max-w-6xl mx-auto px-1 py-3 sm:p-5">
            {/* Title */}
            <div className="skeleton h-8 w-full sm:h-9" />
            <div className="skeleton h-8 w-2/3 mt-3 sm:h-9" />

            {/* Byline + date */}
            <div className="flex gap-3 mt-4">
                <div className="skeleton h-4 w-28" />
                <div className="skeleton h-4 w-36" />
            </div>

            {/* Main image */}
            <div className="skeleton w-full h-56 sm:h-96 mt-5 !rounded-xl" />
            <div className="skeleton h-3 w-1/2 mt-3" />

            {/* Paragraphs */}
            {Array.from({ length: 3 }).map((_, p) => (
                <div key={p} className="mt-6 space-y-3">
                    <div className="skeleton h-4 w-full" />
                    <div className="skeleton h-4 w-full" />
                    <div className="skeleton h-4 w-11/12" />
                    <div className="skeleton h-4 w-4/5" />
                </div>
            ))}
        </div>
    );
};

export default DetailsLoading;