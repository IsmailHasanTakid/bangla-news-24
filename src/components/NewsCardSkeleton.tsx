interface NewsCardSkeletonProps {
    index?: number;
}

const NewsCardSkeleton = ({ index = 0 }: NewsCardSkeletonProps) => {
    return (
        <div
            className="skeleton-card relative rounded-2xl border border-gray-800/80 bg-[#0f0f12] overflow-hidden shadow-lg shadow-black/40"
            style={{ animationDelay: `${index * 120}ms` }}
        >
            {/* Image */}
            <div className="relative">
                <div className="skeleton h-52 sm:h-60 w-full !rounded-none" />

                {/* Bottom fade, like a real photo */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f12] via-transparent to-transparent" />

                {/* Badge */}
                <div className="absolute top-4 left-4 h-7 w-20 rounded-full bg-red-600/50 overflow-hidden">
                    <div className="skeleton h-full w-full !bg-transparent" />
                </div>
            </div>

            <div className="p-5">
                {/* Title (2 lines) */}
                <div className="space-y-3">
                    <div className="skeleton skeleton-line h-5 w-[95%]" />
                    <div className="skeleton skeleton-line h-5 w-[70%]" />
                </div>

                {/* Description (4 lines) */}
                <div className="mt-6 space-y-3">
                    <div className="skeleton h-3.5 w-full" />
                    <div className="skeleton h-3.5 w-[96%]" />
                    <div className="skeleton h-3.5 w-[92%]" />
                    <div className="skeleton h-3.5 w-[55%]" />
                </div>

                {/* Footer */}
                <div className="mt-6 pt-4 border-t border-gray-800 flex items-center justify-between">
                    <div className="skeleton h-3.5 w-24" />

                    <div className="flex items-center gap-2">
                        <div className="h-3.5 w-24 rounded bg-red-600/30 animate-pulse" />
                        <div className="h-3.5 w-5 rounded bg-red-600/50 animate-pulse" />
                    </div>
                </div>
            </div>

            {/* Red bottom line */}
            <div className="absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-r from-transparent via-red-600 to-transparent animate-pulse" />
        </div>
    );
};

export default NewsCardSkeleton;