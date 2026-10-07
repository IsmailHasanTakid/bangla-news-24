"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface GridItem {
    id: string;
    title: string;
    description: string | null;
    imageUrl: string | null;
    imageAlt: string | null;
    dateLabel: string;
}

const INITIAL_COUNT = 8;

const CategoryGrid = ({ items }: { items: GridItem[] }) => {
    const [showAll, setShowAll] = useState(false);

    const visible = showAll ? items : items.slice(0, INITIAL_COUNT);
    const remaining = items.length - INITIAL_COUNT;

    return (
        <>
            {/* News grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">

                {visible.map((news) => (
                    <Link
                        href={`/details/${news.id}`}
                        key={news.id}
                        className="group relative flex h-auto flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-red-100 hover:shadow-2xl hover:shadow-red-100/60 sm:h-[460px] sm:rounded-3xl"
                    >

                        {/* Image */}
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 sm:aspect-auto sm:h-48">
                            {news.imageUrl && (
                                <Image
                                    src={news.imageUrl}
                                    alt={news.imageAlt || news.title}
                                    width={600}
                                    height={600}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            )}

                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="flex flex-1 flex-col gap-2 p-2.5 sm:gap-3 sm:p-5">

                            <h1 className="line-clamp-3 text-[13px] font-extrabold leading-6 text-gray-900 transition-colors duration-300 group-hover:text-red-600 sm:line-clamp-2 sm:text-base sm:leading-snug">
                                {news.title}
                            </h1>

                            <p className="hidden line-clamp-4 text-sm leading-7 text-gray-500 sm:block">
                                {news.description}
                            </p>

                            {/* Footer */}
                            <div className="mt-auto flex items-center justify-between gap-1 border-t border-gray-100 pt-2 sm:pt-4">
                                <span className="text-[10px] text-gray-400 sm:text-xs">
                                    {news.dateLabel}
                                </span>

                                <span className="flex shrink-0 items-center gap-1 text-sm font-semibold text-red-600">
                                    <span className="hidden sm:inline">পড়ুন</span>
                                    <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                                        →
                                    </span>
                                </span>
                            </div>

                        </div>

                        {/* Bottom red line (grows on hover) */}
                        <span className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-red-500 to-rose-700 transition-all duration-500 group-hover:w-full" />

                    </Link>
                ))}

            </div>

            {/* View More button */}
            {!showAll && remaining > 0 && (
                <div className="mt-8 flex justify-center sm:mt-10">
                    <button
                        type="button"
                        onClick={() => setShowAll(true)}
                        className="cursor-pointer rounded-full bg-gradient-to-r from-red-500 to-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-red-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 active:translate-y-0 sm:px-8 sm:py-3"
                    >
                        View More ({remaining})
                    </button>
                </div>
            )}
        </>
    );
};

export default CategoryGrid;