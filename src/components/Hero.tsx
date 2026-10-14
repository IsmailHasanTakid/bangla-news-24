import Link from "next/link";
import { Flame } from "lucide-react";
import Image from "next/image";
import { getData } from "@/lib/getData";
import HeroBackground from "./HeroBackground";

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

interface HeroProps {
    skipIds: string[];
}

const Hero = async ({ skipIds }: HeroProps) => {
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
            .find(
                (a) =>
                    a.imageUrl &&
                    a.title &&
                    !skipIds.includes(a.id)
            ) ?? null;

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

    return (
        // মোবাইলে min-h দেওয়া হয়েছে যাতে লেখাগুলো স্ক্রিনের মাঝখানে সুন্দরভাবে বসে
        <section className="relative isolate mb-5 flex min-h-[60svh] items-center justify-center overflow-hidden px-5 pb-12 pt-24 sm:min-h-0 sm:px-4 sm:pb-10 sm:pt-20 lg:pb-14 lg:pt-24">
            <style>{`
                @keyframes hero-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
                .hero-rise { opacity: 0; animation: hero-rise .8s cubic-bezier(.2,.7,.2,1) forwards; }
                @media (prefers-reduced-motion: reduce) {
                    .hero-rise { opacity: 1; animation: none; }
                }
            `}</style>

            {/* Background image loop */}
            <HeroBackground />

            {/* ───────── Centered content ───────── */}
            <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                <div
                    className="hero-rise inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3.5 py-1.5 text-xs font-medium text-white shadow-lg backdrop-blur-xl"
                    style={{ animationDelay: "0ms" }}
                >
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-gradient-to-br from-red-500 to-orange-400" />
                    </span>
                    {todayLabel}
                </div>

                <h1
                    className="hero-rise mt-6 text-[40px] font-black leading-[1.25] tracking-tight text-white drop-shadow-lg sm:mt-8 sm:text-6xl sm:leading-[1.2] lg:text-[68px]"
                    style={{ animationDelay: "100ms" }}
                >
                    খবরের সাথে,{" "}
                    {/* মোবাইলে "সবসময়" আলাদা লাইনে নেমে আসবে */}
                    <span className="block bg-gradient-to-r from-red-400 via-red-500 to-orange-400 bg-clip-text text-transparent sm:inline">
                        সবসময়
                    </span>
                </h1>

                <p
                    className="hero-rise mt-4 max-w-xs text-[15px] leading-7 text-white/85 sm:mt-2 sm:max-w-md sm:text-lg sm:leading-8"
                    style={{ animationDelay: "200ms" }}
                >
                    দেশ ও বিশ্বের সর্বশেষ খবর, এক জায়গায়, ঠিক যে মুহূর্তে ঘটে।
                </p>

                {/* CTAs: মোবাইলে উপর-নিচ করে সাজানো, ডেস্কটপে পাশাপাশি */}
                <div
                    className="hero-rise mt-8 flex w-full max-w-xs flex-col items-center justify-center gap-3 sm:mt-3 sm:max-w-none sm:flex-row"
                    style={{ animationDelay: "300ms" }}
                >
                    <Link
                        href="/all-news"
                        className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-500 via-red-600 to-orange-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-900/30 transition-all duration-300 hover:-translate-y-0.5 sm:w-auto sm:px-7"
                    >
                        সব খবর দেখুন
                    </Link>

                    {featured && (
                        <Link
                            href={`/details/${featured.id}`}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/40 bg-white/15 px-6 py-3.5 text-sm font-semibold text-white shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-red-600 sm:w-auto sm:px-7"
                        >
                            প্রধান খবর
                        </Link>
                    )}
                </div>

                {/* Topic chips (real categories), শুধু ডেস্কটপ/ট্যাবলেটে */}
                {topics.length > 0 && (
                    <div
                        className="hero-rise mt-10 hidden flex-wrap items-center justify-center gap-3 md:flex"
                        style={{ animationDelay: "400ms" }}
                    >
                        <span className="mr-1 border-white/20 bg-white/10 px-4 py-2 text-sm font-bold tracking-wide text-white shadow-lg backdrop-blur-xl">
                            জনপ্রিয় বিষয়
                        </span>

                        {topics.map((topic) => (
                            <Link
                                key={topic.slug}
                                href={`/category/${topic.slug}`}
                                className="group relative overflow-hidden rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white hover:text-red-600 hover:shadow-xl hover:shadow-red-500/10 active:scale-95"
                            >
                                <span className="relative z-10">
                                    {topic.title}
                                </span>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Trending: মোবাইলে hidden, sm এবং তার উপরে দেখা যাবে */}
                {trending.length > 0 && (
                    <div
                        className="hero-rise mt-10 hidden w-full rounded-2xl border border-white/25 bg-black/30 p-4 text-left backdrop-blur-xl sm:block"
                        style={{ animationDelay: "500ms" }}
                    >
                        <div className="mb-3 flex items-center justify-center gap-2 text-sm font-bold text-white">
                            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-orange-400">
                                <Flame className="h-3.5 w-3.5" />
                            </span>
                            ট্রেন্ডিং
                        </div>

                        <ul className="grid gap-3 sm:grid-cols-3">
                            {trending.map((item, index) => (
                                <li key={item.id}>
                                    <Link
                                        href={`/details/${item.id}`}
                                        className="group/t flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-white/10"
                                    >
                                        {/* ছোট ছবি */}
                                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-700 sm:h-14 sm:w-14 lg:h-16 lg:w-16">
                                            {item.imageUrl ? (
                                                <Image
                                                    src={item.imageUrl}
                                                    alt={item.imageAlt || item.title}
                                                    fill
                                                    sizes="64px"
                                                    className="object-cover transition-transform duration-500 group-hover/t:scale-110"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center text-white/40">
                                                    <Flame className="h-5 w-5" />
                                                </div>
                                            )}

                                            {/* নম্বর ব্যাজ */}
                                            <span className="absolute left-0 top-0 flex h-5 w-5 items-center justify-center rounded-br-lg bg-gradient-to-br from-red-500 to-orange-400 text-[11px] font-black text-white">
                                                {(index + 1).toLocaleString("bn-BD")}
                                            </span>
                                        </div>

                                        {/* লেখা */}
                                        <span className="line-clamp-3 text-[13px] font-semibold leading-5 text-white/90 transition-colors group-hover/t:text-orange-300">
                                            {item.title}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Hero;