import Image from "next/image";
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

const excludeIds = [
    "urn:bbc:tipo:list:0de6d7f8-ccae-45b6-b843-7329b6e521b7",
    "urn:bbc:tipo:list:61a6be9c-5bb1-4ab5-ad6e-9855ff26a267",
    "urn:bbc:tipo:list:0ad2eb5d-7a0e-4c74-b8b4-de3de9bc5137",
];

export default async function AllNewsPage() {
    const response = await getData<ApiResponse>(
        "https://news-api-v2.vercel.app/api/news/sections"
    );

    const sections = (response?.data ?? []).filter(
        (section) => !excludeIds.includes(section.curationId)
    );

    const allNews = Array.from(
        new Map(
            sections.flatMap((section) =>
                section.articles.map((article) => [
                    article.id,
                    {
                        ...article,
                        category: article.category || section.title,
                    },
                ])
            )
        ).values()
    );

    return (
        <main className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-8">
                <p className="mb-2 text-sm font-semibold text-red-600">
                    BARTA 24
                </p>

                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    সব খবর
                </h1>

                <p className="mt-2 text-gray-600">
                    সব বিভাগের সর্বশেষ খবর এক জায়গায়
                </p>
            </div>

            {allNews.length === 0 ? (
                <p className="py-16 text-center text-gray-500">
                    এই মুহূর্তে কোনো খবর পাওয়া যাচ্ছে না।
                </p>
            ) : (
                <>
                    <p className="mb-5 text-sm text-gray-500">
                        মোট {allNews.length.toLocaleString("bn-BD")} টি খবর
                    </p>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {allNews.map((news) => (
                            <Link
                                key={news.id}
                                href={`/details/${news.id}`}
                                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl"
                            >
                                <div className="relative aspect-video overflow-hidden bg-gray-100">
                                    {news.imageUrl && (
                                        <Image
                                            src={news.imageUrl}
                                            alt={news.imageAlt || news.title}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    )}
                                </div>

                                <div className="p-5">
                                    <span className="inline-block rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                                        {news.category}
                                    </span>

                                    <h2 className="mt-3 line-clamp-2 text-lg font-bold leading-8 text-gray-900 transition-colors group-hover:text-red-600">
                                        {news.title}
                                    </h2>

                                    {news.description && (
                                        <p className="mt-2 line-clamp-3 text-sm leading-7 text-gray-600">
                                            {news.description}
                                        </p>
                                    )}

                                    <p className="mt-4 text-xs text-gray-500">
                                        {news.firstPublished
                                            ? new Date(
                                                news.firstPublished
                                            ).toLocaleDateString("bn-BD", {
                                                dateStyle: "medium",
                                            })
                                            : ""}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </main>
    );
}
