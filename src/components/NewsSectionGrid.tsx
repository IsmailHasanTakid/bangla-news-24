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
}

const INITIAL_COUNT = 6;

const buttonClass =
    "inline-block cursor-pointer rounded-full bg-gradient-to-r from-red-500 to-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-red-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 active:translate-y-0 sm:px-8 sm:py-3";

const NewsSectionGrid = ({ items, categoryHref }: NewsSectionGridProps) => {
    const visible = items.slice(0, INITIAL_COUNT);

    return (
        <>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-6 sm:gap-6 lg:grid-cols-3">
                {visible.map((news) => (
                    <div key={news.id}>

                        <Link
                            href={`/details/${news.id}`}
                            className="group relative flex h-auto flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-red-100 hover:shadow-2xl hover:shadow-red-100/60 sm:h-[500px] sm:rounded-3xl"
                        >

                            {/* Image */}
                            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 sm:aspect-auto sm:h-56">
                                {news.imageUrl && (
                                    <Image
                                        src={news.imageUrl}
                                        alt={news.imageAlt || news.title}
                                        width={600}
                                        height={600}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                )}

                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                                <span className="absolute left-2 top-2 max-w-[calc(100%-1rem)] truncate rounded-full bg-red-600/90 px-2 py-0.5 text-[10px] font-semibold text-white shadow-lg backdrop-blur-sm sm:left-4 sm:top-4 sm:max-w-none sm:px-3 sm:py-1 sm:text-xs">
                                    {news.categoryLabel}
                                </span>
                            </div>

                            <div className="flex flex-1 flex-col gap-2 p-2.5 sm:gap-3 sm:p-5">

                                <h2 className="line-clamp-3 text-[13px] font-extrabold leading-6 text-gray-900 transition-colors duration-300 group-hover:text-red-600 sm:line-clamp-2 sm:text-lg sm:leading-snug">
                                    {news.title}
                                </h2>

                                <p className="hidden line-clamp-5 text-sm leading-7 text-gray-500 sm:block">
                                    {news.description}
                                </p>

                                <div className="mt-auto flex items-center justify-between gap-1 border-t border-gray-100 pt-2 sm:gap-2 sm:pt-4">
                                    <span className="text-[10px] text-gray-400 sm:text-xs">
                                        {news.dateLabel}
                                    </span>

                                    <span className="flex shrink-0 items-center gap-1 whitespace-nowrap text-sm font-semibold text-red-600">
                                        <span className="hidden sm:inline">বিস্তারিত পড়ুন</span>
                                        <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                                            →
                                        </span>
                                    </span>
                                </div>

                            </div>

                            <span className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-red-500 to-rose-700 transition-all duration-500 group-hover:w-full" />

                        </Link>

                    </div>
                ))}
            </div>

            {/* Link to the category page (only when the section has one) */}
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