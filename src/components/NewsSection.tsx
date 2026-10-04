import Image from "next/image";
import React from "react";
import Link from "next/link";
import { getData } from "@/lib/getData";

interface NewsArticle {
    id: string;
    title: string;
    description: string | null;
    imageUrl: string | null;
    imageAlt: string | null;
    category: string;
    firstPublished: string | null;
}

interface NewsSectionData {
    title: string;
    curationId: string;
    articles: NewsArticle[];
}

interface ApiResponse {
    data: NewsSectionData[];
}

// Sections that should not be shown (social media / promo lists)
const excludeIds: string[] = [
    "urn:bbc:tipo:list:0de6d7f8-ccae-45b6-b843-7329b6e521b7",
    "urn:bbc:tipo:list:61a6be9c-5bb1-4ab5-ad6e-9855ff26a267",
    "urn:bbc:tipo:list:0ad2eb5d-7a0e-4c74-b8b4-de3de9bc5137",
];

const NewsSection = async () => {
    const data = await getData<ApiResponse>(
        "https://news-api-v2.vercel.app/api/news/sections"
    );

    // Render nothing if the API failed
    if (!data?.data) return null;

    const NewsData = data.data.filter(
        (n) => !excludeIds.includes(n.curationId)
    );

    return (
        <div className="flex flex-col gap-14">
            {NewsData.map((n) => (
                <section key={n.curationId}>

                    {/* Section header */}
                    <div className="flex items-center gap-4">
                        <span className="h-9 w-1.5 rounded-full bg-gradient-to-b from-red-500 to-rose-800" />

                        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
                            {n.title}
                        </h1>

                        <span className="h-px flex-1 bg-gradient-to-r from-red-200 via-gray-200 to-transparent" />
                    </div>

                    {/* Card grid */}
                    <div className="grid grid-cols-3 gap-6 mt-6">
                        {n.articles.map((news) => (
                            <div key={news.id}>

                                <Link
                                    href={`/details/${news.id}`}
                                    className="group relative flex h-[500px] flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-red-100 hover:shadow-2xl hover:shadow-red-100/60"
                                >

                                    {/* Image */}
                                    <div className="relative h-56 w-full overflow-hidden bg-gray-100">
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

                                        <span className="absolute left-4 top-4 rounded-full bg-red-600/90 px-3 py-1 text-xs font-semibold text-white shadow-lg backdrop-blur-sm">
                                            {news.category || n.title}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-1 flex-col gap-3 p-5">

                                        <h2 className="line-clamp-2 text-lg font-extrabold leading-snug text-gray-900 transition-colors duration-300 group-hover:text-red-600">
                                            {news.title}
                                        </h2>

                                        <p className="line-clamp-5 text-sm leading-7 text-gray-500">
                                            {news.description}
                                        </p>

                                        {/* Footer */}
                                        <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                                            <span className="text-xs text-gray-400">
                                                {news.firstPublished
                                                    ? new Date(news.firstPublished).toLocaleDateString("bn-BD", {
                                                        dateStyle: "medium",
                                                    })
                                                    : ""}
                                            </span>

                                            <span className="flex items-center gap-1 text-sm font-semibold text-red-600">
                                                বিস্তারিত পড়ুন
                                                <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                                                    →
                                                </span>
                                            </span>
                                        </div>

                                    </div>

                                    {/* Bottom red line (grows on hover) */}
                                    <span className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-red-500 to-rose-700 transition-all duration-500 group-hover:w-full" />

                                </Link>

                            </div>
                        ))}
                    </div>

                </section>
            ))}
        </div>
    );
};

export default NewsSection;