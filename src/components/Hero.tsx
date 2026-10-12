import Image from "next/image";
import Link from "next/link";
import { ArrowBigDown, ArrowRight, Clock, Flame } from "lucide-react";
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

interface Category {
    slug: string;
    title: string;
}

interface CategoryResponse {
    data: Category[];
}

// Same exclusions as NewsSection (social media / promo lists)
const excludeIds: string[] = [
    "urn:bbc:tipo:list:0de6d7f8-ccae-45b6-b843-7329b6e521b7",
    "urn:bbc:tipo:list:61a6be9c-5bb1-4ab5-ad6e-9855ff26a267",
    "urn:bbc:tipo:list:0ad2eb5d-7a0e-4c74-b8b4-de3de9bc5137",
];

const Hero = async () => {
    const [sectionsData, categoriesData] = await Promise.all([
        getData<ApiResponse>("https://news-api-v2.vercel.app/api/news/sections"),
        getData<CategoryResponse>("https://news-api-v2.vercel.app/api/categories"),
    ]);

    const sections = (sectionsData?.data ?? []).filter(
        (s) => !excludeIds.includes(s.curationId)
    );

    // Top story: first article (with a picture) from the first sections
    const featured =
        sections
            .flatMap((s) => s.articles)
            .find((a) => a.imageUrl && a.title) ?? null;

    // Trending: first headline of each other section (gives variety)
    const trending = sections
        .map((s) => s.articles[0])
        .filter((a): a is NewsArticle => Boolean(a?.title) && a.id !== featured?.id)
        .slice(0, 3);

    // Same category list the Navbar uses
    const topics = (categoriesData?.data ?? [])
        .filter((_, index) => index !== 0 && index !== 7)
        .slice(0, 6);

    const todayLabel = new Intl.DateTimeFormat("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Dhaka",
    }).format(new Date());

    const featuredDate = featured?.firstPublished
        ? new Date(featured.firstPublished).toLocaleDateString("bn-BD", {
            dateStyle: "medium",
        })
        : "";

    return (
        <section className="relative isolate pb-12 pt-8 sm:pb-16 sm:pt-12 lg:pb-24 lg:pt-16">
            <style>{`
                @keyframes hero-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes hero-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
                .hero-rise { opacity: 0; animation: hero-rise .8s cubic-bezier(.2,.7,.2,1) forwards; }
                .hero-float { animation: hero-float 7s ease-in-out infinite; }
                @media (prefers-reduced-motion: reduce) {
                    .hero-rise { opacity: 1; animation: none; }
                    .hero-float { animation: none; }
                }
            `}</style>

            <div
                className={`grid items-center gap-12 lg:gap-10 ${featured ? "lg:grid-cols-[1.05fr_1fr]" : ""
                    }`}
            >
                {/* ───────── Left: message ───────── */}
                <div className="relative">
                    <div
                        className="hero-rise inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/60 px-3.5 py-1.5 text-xs font-medium text-slate-600 shadow-[0_4px_20px_-6px_rgba(15,23,42,0.15),0_1px_0_rgba(255,255,255,0.9)_inset] backdrop-blur-xl"
                        style={{ animationDelay: "0ms" }}
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-60" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-gradient-to-br from-red-500 to-orange-400" />
                        </span>
                        {todayLabel}
                    </div>

                    <h1
                        className="hero-rise mt-5 text-[42px] font-black leading-[1.2] tracking-tight text-slate-950 sm:text-6xl lg:text-[68px]"
                        style={{ animationDelay: "100ms" }}
                    >
                        খবরের সাথে,
                        <br />
                        <span className="bg-gradient-to-r from-red-500 via-red-600 to-orange-500 bg-clip-text text-transparent drop-shadow-[0_6px_24px_rgba(239,68,68,0.25)]">
                            সবসময়
                        </span>
                    </h1>

                    <p
                        className="hero-rise mt-5 max-w-md text-base leading-8 text-slate-600 sm:text-lg"
                        style={{ animationDelay: "200ms" }}
                    >
                        দেশ ও বিশ্বের সর্বশেষ খবর, এক জায়গায়, ঠিক যে মুহূর্তে ঘটে।
                    </p>

                    {/* CTAs */}
                    <div
                        className="hero-rise mt-8 flex flex-wrap items-center gap-3"
                        style={{ animationDelay: "300ms" }}
                    >


                        <Link
                            href="/all-news"
                            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-500 via-red-600 to-orange-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 sm:px-7 sm:py-3.5"
                        >
                            সব খবর দেখুন

                        </Link>



                        {featured && (
                            <Link
                                href={`/details/${featured.id}`}
                                className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/60 px-6 py-3 text-sm font-semibold text-slate-800 shadow-[0_6px_24px_-8px_rgba(15,23,42,0.2),0_1px_0_rgba(255,255,255,0.9)_inset] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90 hover:text-red-600 sm:px-7 sm:py-3.5"
                            >
                                প্রধান খবর
                            </Link>
                        )}
                    </div>

                    {/* Topic chips (real categories) */}
                    {topics.length > 0 && (
                        <div
                            className="hero-rise mt-9 flex flex-wrap items-center gap-2"
                            style={{ animationDelay: "400ms" }}
                        >
                            <span className="mr-1 text-xs font-semibold text-slate-500">
                                জনপ্রিয় বিষয়
                            </span>

                            {topics.map((topic) => (
                                <Link
                                    key={topic.slug}
                                    href={`/category/${topic.slug}`}
                                    className="rounded-full border border-white/80 bg-white/55 px-3 py-1 text-xs font-medium text-slate-700 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-red-600 hover:shadow-[0_6px_16px_-6px_rgba(239,68,68,0.35)]"
                                >
                                    {topic.title}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* ───────── Right: top story + trending ───────── */}
                {featured && (
                    <div
                        className="hero-rise relative mx-auto w-full max-w-[560px] lg:mx-0 lg:ml-auto lg:pb-12"
                        style={{ animationDelay: "250ms" }}
                    >
                        {/* Glow + stacked card behind */}
                        <div className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-gradient-to-br from-red-300/40 via-rose-200/30 to-orange-200/40 blur-3xl" />
                        <div className="pointer-events-none absolute inset-x-5 bottom-0 top-8 -z-10 -rotate-[4deg] rounded-3xl border border-white/60 bg-gradient-to-br from-red-400/25 to-orange-300/25 backdrop-blur-sm" />

                        {/* Top story */}
                        <Link
                            href={`/details/${featured.id}`}
                            className="group relative block overflow-hidden rounded-2xl border border-white/80 bg-white/45 p-2 shadow-[0_30px_80px_-24px_rgba(239,68,68,0.45),0_1px_0_rgba(255,255,255,0.95)_inset] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 sm:rounded-3xl sm:p-2.5"
                        >
                            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-200 sm:rounded-2xl">
                                {featured.imageUrl && (
                                    <Image
                                        src={featured.imageUrl}
                                        alt={featured.imageAlt || featured.title}
                                        fill
                                        priority
                                        sizes="(min-width: 1024px) 540px, 100vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                )}

                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent" />

                                {/* Tags */}
                                <div className="absolute left-3 right-3 top-3 flex items-center justify-between gap-2">
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-3 py-1 text-[11px] font-bold text-white shadow-lg">
                                        <Flame className="h-3 w-3" />
                                        প্রধান খবর
                                    </span>

                                    {featured.category && (
                                        <span className="max-w-[50%] truncate rounded-full border border-white/30 bg-white/20 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
                                            {featured.category}
                                        </span>
                                    )}
                                </div>

                                {/* Title */}
                                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                                    <h2 className="line-clamp-3 text-lg font-extrabold leading-snug text-white drop-shadow-lg sm:text-2xl">
                                        {featured.title}
                                    </h2>

                                    <div className="mt-3 flex items-center justify-between gap-2">
                                        <span className="inline-flex items-center gap-1.5 text-xs text-white/75">
                                            <Clock className="h-3.5 w-3.5" />
                                            {featuredDate}
                                        </span>

                                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur-md transition-all duration-300 group-hover:bg-red-500 group-hover:border-red-400">
                                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        {/* Trending (floats over the card on desktop) */}
                        {trending.length > 0 && (
                            <div className="hero-float relative mt-4 lg:absolute lg:-bottom-2 lg:-left-12 lg:mt-0 lg:w-[310px]">
                                <div className="rounded-2xl border border-white/80 bg-white/70 p-4 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.35),0_1px_0_rgba(255,255,255,0.95)_inset] backdrop-blur-2xl">
                                    <div className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-900">
                                        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-orange-400 text-white">
                                            <Flame className="h-3.5 w-3.5" />
                                        </span>
                                        ট্রেন্ডিং
                                    </div>

                                    <ul className="divide-y divide-slate-200/70">
                                        {trending.map((item, index) => (
                                            <li key={item.id}>
                                                <Link
                                                    href={`/details/${item.id}`}
                                                    className="group/t flex items-start gap-3 py-2.5 first:pt-0 last:pb-0"
                                                >
                                                    <span className="bg-gradient-to-br from-red-500 to-orange-400 bg-clip-text text-xl font-black leading-none text-transparent">
                                                        {index + 1}
                                                    </span>
                                                    <span className="line-clamp-2 text-[13px] font-bold leading-6 text-slate-800 transition-colors group-hover/t:text-red-600">
                                                        {item.title}
                                                    </span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Hero;