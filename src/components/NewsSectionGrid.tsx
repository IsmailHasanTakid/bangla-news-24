
import Image from "next/image";
import Link from "next/link";

interface GridItem {
    id: string;
    title: string;
    description: string | null;
    imageUrl: string | null;
    imageAlt: string | null;
    categoryLabel: string;
    dateLabel: string;
}

interface NewsSectionGridProps {
    items: GridItem[];
    categoryHref?: string;
    horizontalScroll?: boolean;
}

const INITIAL_COUNT = 6;

const buttonClass =
    "inline-block cursor-pointer rounded-full bg-gradient-to-r from-red-500 to-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-red-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 active:translate-y-0 sm:px-8 sm:py-3";

const LG_SPANS: Record<number, string[]> = {
    1: ["lg:col-span-12"],
    2: ["lg:col-span-6", "lg:col-span-6"],
    3: ["lg:col-span-4", "lg:col-span-4", "lg:col-span-4"],
    4: [
        "lg:col-span-3",
        "lg:col-span-3",
        "lg:col-span-3",
        "lg:col-span-3",
    ],
    5: [
        "lg:col-span-4",
        "lg:col-span-4",
        "lg:col-span-4",
        "lg:col-span-6",
        "lg:col-span-6",
    ],
};

type Variant = "featured" | "default" | "wide";

const NewsCard = ({
    news,
    variant,
    spanClass,
}: {
    news: GridItem;
    variant: Variant;
    spanClass: string;
}) => {
    const isFeatured = variant === "featured";
    const isWide = variant === "wide";
    const horizontal = isFeatured || isWide;

    return (
        <Link
            href={`/details/${news.id}`}
            className={`group relative flex h-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-red-100 hover:shadow-2xl hover:shadow-red-100/60 sm:rounded-xl ${horizontal ? "lg:flex-row" : ""
                } ${spanClass}`}
        >
            <div
                className={`relative w-full shrink-0 overflow-hidden bg-gray-100 ${isFeatured
                    ? "aspect-[16/10] lg:aspect-auto lg:min-h-[400px] lg:w-3/5"
                    : isWide
                        ? "aspect-[4/3] sm:aspect-auto sm:h-44 lg:h-auto lg:min-h-[200px] lg:w-2/5"
                        : "aspect-[4/3] sm:aspect-auto sm:h-44"
                    }`}
            >
                {news.imageUrl && (
                    <Image
                        src={news.imageUrl}
                        alt={news.imageAlt || news.title}
                        fill
                        sizes={
                            isFeatured
                                ? "(min-width: 1024px) 60vw, 100vw"
                                : "(min-width: 1024px) 33vw, 50vw"
                        }
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                <span className="absolute left-2 top-2 max-w-[calc(100%-1rem)] truncate rounded-full bg-red-600/90 px-2 py-0.5 text-[10px] font-semibold text-white shadow-lg backdrop-blur-sm sm:left-3 sm:top-3 sm:max-w-none sm:px-3 sm:py-1 sm:text-xs">
                    {news.categoryLabel}
                </span>
            </div>

            <div
                className={`flex flex-1 flex-col gap-2 p-3 sm:gap-2.5 lg:gap-3 lg:p-4 ${isFeatured ? "lg:!p-7" : ""
                    }`}
            >
                {isFeatured ? (
                    <h3 className="line-clamp-3 text-base font-extrabold leading-snug text-gray-900 transition-colors duration-300 group-hover:text-red-600 sm:text-xl lg:text-2xl">
                        {news.title}
                    </h3>
                ) : (
                    <h3 className="line-clamp-3 text-[13px] font-extrabold leading-6 text-gray-900 transition-colors duration-300 group-hover:text-red-600 sm:line-clamp-2 sm:text-base sm:leading-snug">
                        {news.title}
                    </h3>
                )}

                <div className="hidden sm:block">
                    <p
                        className={`text-sm text-gray-500 ${isFeatured
                            ? "line-clamp-4 leading-7"
                            : isWide
                                ? "line-clamp-3 leading-6"
                                : "line-clamp-4 leading-6"
                            }`}
                    >
                        {news.description}
                    </p>
                </div>

                <div className="mt-auto flex items-center justify-between gap-1 border-t border-gray-100 pt-2 sm:gap-2 sm:pt-3">
                    <span className="text-[10px] text-gray-400 sm:text-xs">
                        {news.dateLabel}
                    </span>

                    <span className="flex shrink-0 items-center gap-1 whitespace-nowrap text-sm font-semibold text-red-600">
                        <span className="hidden sm:inline">
                            বিস্তারিত পড়ুন
                        </span>
                        <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                            →
                        </span>
                    </span>
                </div>
            </div>

            <span className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-red-500 to-rose-700 transition-all duration-500 group-hover:w-full" />
        </Link>
    );
};

const NewsSectionGrid = ({
    items,
    categoryHref,
    horizontalScroll = false,
}: NewsSectionGridProps) => {
    const visible = items.slice(0, INITIAL_COUNT);

    const hasFeatured = visible.length !== 2;
    const featured = hasFeatured ? visible[0] : undefined;
    const rest = hasFeatured ? visible.slice(1) : visible;

    const lgSpans = LG_SPANS[rest.length] ?? [];

    const mobileSpan = (index: number) =>
        rest.length % 2 === 1 && index === rest.length - 1
            ? "col-span-2"
            : "col-span-1";

    return (
        <>
            <div
                className={`mt-5 grid gap-3 sm:mt-6 sm:gap-5 lg:grid-cols-12 lg:gap-4 ${horizontalScroll
                    ? "grid-cols-[75%_75%_75%_75%_75%_75%] overflow-x-auto pb-3 sm:grid-cols-2"
                    : "grid-cols-2"
                    }`}
            >
                {featured && (
                    <NewsCard
                        news={featured}
                        variant="featured"
                        spanClass={
                            horizontalScroll
                                ? "col-span-1 min-w-0 lg:col-span-12"
                                : "col-span-2 lg:col-span-12"
                        }
                    />
                )}

                {rest.map((news, index) => {
                    const lgSpan =
                        lgSpans[index] ?? "lg:col-span-4";

                    return (
                        <NewsCard
                            key={news.id}
                            news={news}
                            variant={
                                lgSpan === "lg:col-span-6"
                                    ? "wide"
                                    : "default"
                            }
                            spanClass={
                                horizontalScroll
                                    ? `col-span-1 min-w-0 ${lgSpan}`
                                    : `${mobileSpan(index)} ${lgSpan}`
                            }
                        />
                    );
                })}
            </div>

            {categoryHref && (
                <div className="mt-6 flex justify-center sm:mt-8">
                    <Link href={categoryHref} className={buttonClass}>
                        সব খবর দেখুন →
                    </Link>
                </div>
            )}
        </>
    );
};

export default NewsSectionGrid;
