import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import NewsSection from "./NewsSection";
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

interface SectionData {
    title: string;
    articles: NewsArticle[];
}

interface SectionsResponse {
    data: SectionData[];
}

interface MostReadItem {
    id: string;
    title: string;
}

interface MostReadResponse {
    data: MostReadItem[];
}

const formatDate = (value: string | null): string =>
    value
        ? new Date(value).toLocaleDateString("bn-BD", {
            dateStyle: "medium",
        })
        : "";

const HomePage = async () => {
    const data = await getData<SectionsResponse>(
        "https://news-api-v2.vercel.app/api/news/sections"
    );

    const data2 = await getData<MostReadResponse>(
        "https://news-api-v2.vercel.app/api/news/most-read"
    );

    const articles: NewsArticle[] = data?.data?.[0]?.articles ?? [];

    if (articles.length === 0) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center px-4 sm:px-5">
                <div className="w-full max-w-md rounded-2xl border border-gray-300 bg-white px-5 py-10 text-center shadow-sm sm:px-8 sm:py-12">
                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-xl font-bold text-red-600">
                        !
                    </div>

                    <p className="font-semibold text-gray-600">
                        খবর লোড করা যায়নি, একটু পরে আবার চেষ্টা করুন।
                    </p>
                </div>
            </div>
        );
    }

    const FirstNews: NewsArticle = articles[0];
    const OtherNews: NewsArticle[] = articles.slice(1, 5);
    const MostReads: MostReadItem[] = data2?.data ?? [];

    return (
        <main className="mx-auto max-w-[1500px] px-4 pb-12 sm:px-6 sm:pb-20 lg:px-8">

            {/* ===========MAIN 3 COLUMN NEWS LAYOUT= */}

            <section className="mt-4 grid grid-cols-1 gap-4 sm:mt-6 sm:gap-5 lg:grid-cols-3">

                {/* ============COLUMN 1 — FEATURED NEWS=========== */}

                <Link
                    href={`/details/${FirstNews.id}`}
                    className="group overflow-hidden rounded-xl border border-gray-700 bg-[#111111] transition-all duration-300 hover:border-gray-500"
                >

                    {/* Image */}

                    {FirstNews.imageUrl && (
                        <div className="relative h-[210px] overflow-hidden sm:h-[330px] lg:h-[280px]">

                            <Image
                                src={FirstNews.imageUrl}
                                alt={
                                    FirstNews.imageAlt ||
                                    FirstNews.title
                                }
                                width={900}
                                height={600}
                                priority
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            {/* Image overlay */}

                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        </div>
                    )}


                    <div className="p-4 sm:p-5">

                        {/* Category */}

                        <div className="mb-3 sm:mb-4">
                            <span className="text-sm font-bold text-red-500">
                                {FirstNews.category}
                            </span>
                        </div>

                        {/* Title */}

                        <h1 className="text-lg font-bold leading-[1.6] text-white transition-colors duration-300 group-hover:text-red-400 sm:text-2xl">
                            {FirstNews.title}
                        </h1>


                        <p className="mt-3 line-clamp-3 text-sm leading-7 text-gray-400 sm:mt-4">
                            {FirstNews.description}
                        </p>



                        <div className="mt-4 border-t border-gray-800 pt-3 sm:mt-5 sm:pt-4">

                            <span className="text-xs text-gray-500">
                                {formatDate(
                                    FirstNews.firstPublished
                                )}
                            </span>

                        </div>

                    </div>

                </Link>


                {/* ==================== COLUMN 2 — MAIN NEWS================ */}

                <div className="overflow-hidden rounded-xl border border-gray-700 bg-[#111111]">

                    <div className="border-b border-gray-700 px-4 py-4 sm:px-5 sm:py-5">

                        <h2 className="text-lg font-bold text-white sm:text-xl">
                            প্রধান খবর
                        </h2>

                    </div>


                    {/* News list */}

                    <div>

                        {OtherNews.map((news, i) => (
                            <Link
                                href={`/details/${news.id}`}
                                key={news.id}
                                className="group relative block border-b border-gray-800 px-4 py-4 last:border-b-0 transition-colors duration-300 hover:bg-[#181818] sm:px-5 sm:py-5"
                            >

                                <div className="absolute bottom-0 left-0 top-0 w-[3px] origin-bottom scale-y-0 bg-red-500 transition-transform duration-300 group-hover:scale-y-100" />

                                {/* Category */}

                                <span className="text-xs font-bold text-red-500">
                                    {news.category}
                                </span>

                                <h3 className="mt-2 line-clamp-3 text-[15px] font-semibold leading-7 text-white transition-colors duration-300 group-hover:text-red-400 sm:text-base">
                                    {news.title}
                                </h3>

                                <div className="mt-2 text-xs font-bold text-gray-600 sm:mt-3">
                                    {String(i + 1).padStart(2, "0")}
                                </div>

                            </Link>
                        ))}

                    </div>

                </div>


                {/* ===== COLUMN 3 — MOST READ (click to expand) === */}

                {MostReads.length > 0 && (
                    <aside className="self-start overflow-hidden rounded-xl border border-gray-700 bg-[#111111]">
                        <details className="group/mr">

                            {/* Button (heading) */}
                            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 transition-colors duration-300 hover:bg-[#181818] sm:px-5 sm:py-5 [&::-webkit-details-marker]:hidden">
                                <h2 className="text-lg font-bold text-white sm:text-xl">
                                    সর্বাধিক পঠিত
                                </h2>

                                <ChevronDown className="h-5 w-5 shrink-0 text-red-500 transition-transform duration-300 group-open/mr:rotate-180" />
                            </summary>

                            {/* Most read list (shows after click) */}
                            <div className="border-t border-gray-700">

                                {MostReads.map((most, i) => (
                                    <Link
                                        href={`/details/${most.id}`}
                                        key={most.id}
                                        className="group flex gap-3 border-b border-gray-800 px-4 py-3.5 last:border-b-0 transition-colors duration-300 hover:bg-[#181818] sm:gap-4 sm:px-5 sm:py-4"
                                    >

                                        {/* Ranking number */}

                                        <span
                                            className={`shrink-0 text-xl font-bold sm:text-2xl ${i === 0
                                                ? "text-red-500"
                                                : "text-red-500/80"
                                                }`}
                                        >
                                            {i + 1}
                                        </span>

                                        {/* News */}

                                        <div className="min-w-0 flex-1">

                                            <h3 className="line-clamp-3 text-sm font-semibold leading-7 text-white transition-colors duration-300 group-hover:text-red-400">
                                                {most.title}
                                            </h3>

                                        </div>

                                    </Link>
                                ))}

                            </div>

                        </details>
                    </aside>
                )}

            </section>


            {/* ===== MORE NEWS== */}

            <section className="mt-10 sm:mt-14">

                <div className="mb-7 flex items-center gap-3 mt-6 sm:mt-10 sm:mb-15 sm:gap-4">

                    <div className="h-px flex-1 bg-gray-300" />

                    <p className="shrink-0 whitespace-nowrap text-xs font-bold uppercase tracking-[0.15em] text-red-500 sm:tracking-[0.2em]">
                        More Updates
                    </p>

                    <div className="h-px flex-1 bg-gray-300" />

                </div>

                <NewsSection />

            </section>

        </main>
    );
};

export default HomePage;