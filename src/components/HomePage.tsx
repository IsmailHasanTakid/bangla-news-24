import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import NewsSection from "./NewsSection";
import Hero from "./Hero";
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

// Shared light-glass look for the three news panels
const glassPanel =
    "overflow-hidden rounded-xl border border-white/80 bg-white/60 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.35),0_1px_0_rgba(255,255,255,0.95)_inset] backdrop-blur-xl";

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
                <div className="w-full max-w-md rounded-2xl border border-white/80 bg-white/70 px-5 py-10 text-center shadow-sm backdrop-blur-xl sm:px-8 sm:py-12">
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
    const OtherNews: NewsArticle[] = articles.slice(2, 6);
    const MostReads: MostReadItem[] = data2?.data ?? [];

    // Stories already shown in the 3-column block, so the Hero picks a different one
    const shownIds = [FirstNews.id, ...OtherNews.map((n) => n.id)];

    return (
        <main className="mx-auto max-w-[1500px] px-4 pb-12 sm:px-6 sm:pb-20 lg:px-8">

            {/* ============ HERO ============ */}

            <Hero skipIds={shownIds} />

            {/* ======= MAIN 3 COLUMN NEWS LAYOUT (Hero button scrolls here) ======= */}

            <section
                id="news"
                className="grid scroll-mt-24 grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-3"
            >

                {/* ============ COLUMN 1 — FEATURED NEWS ============ */}

                <Link
                    href={`/details/${FirstNews.id}`}
                    className={`group ${glassPanel} transition-all duration-300 hover:-translate-y-1 hover:border-red-100 hover:shadow-[0_30px_70px_-28px_rgba(239,68,68,0.4),0_1px_0_rgba(255,255,255,0.95)_inset]`}
                >

                    {/* Image */}

                    {FirstNews.imageUrl && (
                        <div className="relative h-[210px] overflow-hidden sm:h-[330px] lg:h-[280px]">

                            <Image
                                src={FirstNews.imageUrl}
                                alt={FirstNews.imageAlt || FirstNews.title}
                                width={900}
                                height={600}
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            {/* Image overlay */}

                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        </div>
                    )}

                    <div className="p-4 sm:p-5">

                        {/* Category */}

                        <div className="mb-3 sm:mb-4">
                            <span className="text-sm font-bold text-red-600">
                                {FirstNews.category}
                            </span>
                        </div>

                        {/* Title */}

                        <h2 className="text-lg font-bold leading-[1.6] text-slate-900 transition-colors duration-300 group-hover:text-red-600 sm:text-2xl">
                            {FirstNews.title}
                        </h2>

                        <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-500 sm:mt-4">
                            {FirstNews.description}
                        </p>

                        <div className="mt-4 border-t border-slate-200/70 pt-3 sm:mt-5 sm:pt-4">
                            <span className="text-xs text-slate-400">
                                {formatDate(FirstNews.firstPublished)}
                            </span>
                        </div>

                    </div>

                </Link>


                {/* ============ COLUMN 2 — MAIN NEWS ============ */}

                <div className={glassPanel}>

                    <div className="border-b border-slate-200/70 px-4 py-4 sm:px-5 sm:py-5">
                        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 sm:text-xl">
                            <span className="h-5 w-1 rounded-full bg-gradient-to-b from-red-500 to-orange-400" />
                            প্রধান খবর
                        </h2>
                    </div>

                    {/* News list */}

                    <div>

                        {OtherNews.map((news, i) => (
                            <Link
                                href={`/details/${news.id}`}
                                key={news.id}
                                className="group relative block border-b border-slate-200/70 px-4 py-4 transition-colors duration-300 last:border-b-0 hover:bg-white/70 sm:px-5 sm:py-5"
                            >

                                <div className="absolute bottom-0 left-0 top-0 w-[3px] origin-bottom scale-y-0 bg-gradient-to-b from-red-500 to-orange-400 transition-transform duration-300 group-hover:scale-y-100" />

                                {/* Category */}

                                <span className="text-xs font-bold text-red-600">
                                    {news.category}
                                </span>

                                <h3 className="mt-2 line-clamp-3 text-[15px] font-semibold leading-7 text-slate-900 transition-colors duration-300 group-hover:text-red-600 sm:text-base">
                                    {news.title}
                                </h3>

                                <div className="mt-2 text-xs font-bold text-slate-400 sm:mt-3">
                                    {String(i + 1).padStart(2, "0")}
                                </div>

                            </Link>
                        ))}

                    </div>

                </div>


                {/* ============ COLUMN 3 — MOST READ (click to expand) ============ */}

                {MostReads.length > 0 && (
                    <aside className={`self-start ${glassPanel}`}>
                        <details className="group/mr">

                            {/* Button (heading) */}
                            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 transition-colors duration-300 hover:bg-white/70 sm:px-5 sm:py-5 [&::-webkit-details-marker]:hidden">
                                <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 sm:text-xl">
                                    <span className="h-5 w-1 rounded-full bg-gradient-to-b from-red-500 to-orange-400" />
                                    সর্বাধিক পঠিত
                                </h2>

                                <ChevronDown className="h-5 w-5 shrink-0 text-red-500 transition-transform duration-300 group-open/mr:rotate-180" />
                            </summary>

                            {/* Most read list (shows after click) */}
                            <div className="border-t border-slate-200/70">

                                {MostReads.map((most, i) => (
                                    <Link
                                        href={`/details/${most.id}`}
                                        key={most.id}
                                        className="group flex gap-3 border-b border-slate-200/70 px-4 py-3.5 transition-colors duration-300 last:border-b-0 hover:bg-white/70 sm:gap-4 sm:px-5 sm:py-4"
                                    >

                                        {/* Ranking number */}

                                        <span className="shrink-0 bg-gradient-to-br from-red-500 to-orange-400 bg-clip-text text-xl font-black text-transparent sm:text-2xl">
                                            {i + 1}
                                        </span>

                                        {/* News */}

                                        <div className="min-w-0 flex-1">
                                            <h3 className="line-clamp-3 text-sm font-semibold leading-7 text-slate-900 transition-colors duration-300 group-hover:text-red-600">
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


            {/* ============ MORE NEWS ============ */}

            <section className="mt-12 sm:mt-16">

                <div className="mb-7 flex items-center gap-3 sm:mb-10 sm:gap-4">

                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-300" />

                    <p className="shrink-0 whitespace-nowrap text-xs font-bold uppercase tracking-[0.15em] text-red-500 sm:tracking-[0.2em]">
                        More Updates
                    </p>

                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-300" />

                </div>

                <NewsSection />

            </section>

        </main>
    );
};

export default HomePage;