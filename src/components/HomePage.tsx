import Image from "next/image";
import Link from "next/link";
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

    // Show a message if the main news could not be loaded
    if (articles.length === 0) {
        return (
            <p className="p-10 text-center text-gray-500">
                খবর লোড করা যায়নি, একটু পরে আবার চেষ্টা করুন।
            </p>
        );
    }

    const FirstNews: NewsArticle = articles[0];
    const OtherNews: NewsArticle[] = articles.slice(1, 5);
    const MostReads: MostReadItem[] = data2?.data ?? [];

    return (
        <main className="mx-auto max-w-7xl px-4 sm:px-5 pb-20">

            {/* Top story + main news list */}
            <section className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">

                <Link
                    href={`/details/${FirstNews.id}`}
                    className="group relative lg:col-span-2 min-h-[420px] sm:min-h-[520px] lg:h-[580px] overflow-hidden rounded-3xl bg-gray-900 shadow-lg shadow-gray-200/70"
                >
                    {FirstNews.imageUrl && (
                        <Image
                            src={FirstNews.imageUrl}
                            alt={FirstNews.imageAlt || FirstNews.title}
                            width={1000}
                            height={700}
                            priority
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                        />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/5 opacity-95 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-4 p-5 sm:p-8 lg:p-10">

                        <span className="w-fit rounded-full border border-white/20 bg-red-600 px-4 py-2 text-xs font-bold tracking-wide text-white shadow-lg shadow-red-900/30">
                            {FirstNews.category}
                        </span>

                        <h1 className="max-w-3xl text-2xl font-black leading-snug text-white sm:text-3xl lg:text-4xl transition-colors duration-300 group-hover:text-red-200">
                            {FirstNews.title}
                        </h1>

                        <p className="max-w-2xl line-clamp-2 sm:line-clamp-3 text-sm sm:text-base leading-7 text-gray-200">
                            {FirstNews.description}
                        </p>

                        <div className="flex items-center justify-between border-t border-white/20 pt-5 mt-1">
                            <span className="text-xs sm:text-sm text-gray-300">
                                {formatDate(FirstNews.firstPublished)}
                            </span>

                            <span className="flex items-center gap-3 text-sm font-bold text-white">
                                বিস্তারিত পড়ুন
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 transition-all duration-300 group-hover:translate-x-2 group-hover:bg-red-500">
                                    →
                                </span>
                            </span>
                        </div>
                    </div>

                    <div className="absolute right-6 top-6 hidden sm:flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-2 backdrop-blur-md">
                        <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-xs font-semibold text-white">
                            TOP STORY
                        </span>
                    </div>
                </Link>

                <aside className="flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-lg shadow-gray-200/40">

                    <div className="relative overflow-hidden bg-gradient-to-r from-red-700 via-red-600 to-rose-800 px-6 py-6">
                        <div className="absolute -right-8 -top-12 h-36 w-36 rounded-full border-[20px] border-white/10" />

                        <div className="relative flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold tracking-[0.2em] text-red-100">
                                    BREAKING UPDATES
                                </p>

                                <h2 className="mt-2 text-xl font-extrabold text-white">
                                    প্রধান খবর
                                </h2>
                            </div>

                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md">
                                <span className="text-xl text-white">✦</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-1 flex-col divide-y divide-gray-100">
                        {OtherNews.map((news, i) => (
                            <Link
                                href={`/details/${news.id}`}
                                key={news.id}
                                className="group relative flex flex-1 flex-col justify-center gap-2 overflow-hidden px-6 py-5 transition-all duration-300 hover:bg-red-50/70"
                            >
                                <div className="absolute left-0 top-0 h-full w-1 origin-bottom scale-y-0 bg-red-600 transition-transform duration-300 group-hover:scale-y-100" />

                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-red-600">
                                        {news.category}
                                    </span>

                                    <span className="text-xs font-bold text-gray-300 transition-colors group-hover:text-red-400">
                                        0{i + 1}
                                    </span>
                                </div>

                                <h3 className="line-clamp-3 text-sm font-bold leading-7 text-gray-800 transition-colors duration-300 group-hover:text-red-700">
                                    {news.title}
                                </h3>

                                <span className="flex items-center gap-1 text-xs font-semibold text-gray-400 transition-all duration-300 group-hover:gap-3 group-hover:text-red-600">
                                    বিস্তারিত পড়ুন →
                                </span>
                            </Link>
                        ))}
                    </div>

                    <div className="h-1 bg-gradient-to-r from-red-600 via-rose-400 to-transparent" />

                </aside>
            </section>

            {/* Most read */}
            {MostReads.length > 0 && (
                <section className="mt-16">

                    <div className="flex items-center gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-700">
                            <span className="text-xl">↗</span>
                        </div>

                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-red-600">
                                Trending News
                            </p>

                            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-gray-900">
                                সর্বাধিক পঠিত
                            </h2>
                        </div>

                        <span className="h-px flex-1 bg-gradient-to-r from-red-200 via-gray-200 to-transparent" />
                    </div>

                    <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 rounded-3xl border border-gray-100 bg-gradient-to-br from-white via-white to-red-50/60 p-4 sm:p-7 shadow-sm">

                        {MostReads.map((most, i) => (
                            <Link
                                href={`/details/${most.id}`}
                                key={most.id}
                                className="group flex items-center gap-4 rounded-2xl border border-transparent p-4 transition-all duration-300 hover:border-red-100 hover:bg-white hover:shadow-lg hover:shadow-red-100/60"
                            >
                                <span
                                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xl font-black transition-all duration-300 group-hover:scale-110 ${i === 0
                                            ? "bg-red-600 text-white shadow-lg shadow-red-200"
                                            : i === 1
                                                ? "bg-red-100 text-red-700"
                                                : "bg-gray-100 text-gray-500 group-hover:bg-red-100 group-hover:text-red-700"
                                        }`}
                                >
                                    {(i + 1).toLocaleString("bn-BD")}
                                </span>

                                <div className="min-w-0 flex-1">
                                    <h3 className="line-clamp-2 text-sm font-bold leading-7 text-gray-800 transition-colors duration-300 group-hover:text-red-700">
                                        {most.title}
                                    </h3>

                                    <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-gray-400 transition-colors group-hover:text-red-500">
                                        বিস্তারিত পড়ুন
                                        <span className="transition-transform group-hover:translate-x-1">
                                            →
                                        </span>
                                    </span>
                                </div>
                            </Link>
                        ))}

                    </div>
                </section>
            )}

            {/* More news sections */}
            <section className="mt-16">

                <div className="mb-7 flex items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-700">
                        <span className="text-xl">▤</span>
                    </div>

                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-red-600">
                            More Updates
                        </p>

                        <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                            আরও খবর
                        </h2>
                    </div>

                    <span className="h-px flex-1 bg-gradient-to-r from-red-200 via-gray-200 to-transparent" />
                </div>

                <NewsSection />

            </section>

        </main>
    );
};

export default HomePage;