import React from "react";
import { getData } from "@/lib/getData";
import NewsSectionGrid from "./NewsSectionGrid";

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

    const categoriesData = await getData<CategoryResponse>(
        "https://news-api-v2.vercel.app/api/categories"
    );

    // Render nothing if the API failed
    if (!data?.data) return null;

    // Map category title -> slug (same list the Navbar uses)
    const slugByTitle = new Map<string, string>(
        (categoriesData?.data ?? []).map((c) => [c.title.trim(), c.slug])
    );

    const NewsData = data.data.filter(
        (n) => !excludeIds.includes(n.curationId)
    );

    return (
        <div className="flex flex-col gap-10 sm:gap-14">
            {NewsData.map((n) => {
                // Format the date on the server so server and client render the same text
                const items = n.articles.map((news) => ({
                    id: news.id,
                    title: news.title,
                    description: news.description,
                    imageUrl: news.imageUrl,
                    imageAlt: news.imageAlt,
                    categoryLabel: news.category || n.title,
                    dateLabel: news.firstPublished
                        ? new Date(news.firstPublished).toLocaleDateString("bn-BD", {
                            dateStyle: "medium",
                        })
                        : "",
                }));

                // 1) section title, 2) first article's category
                const categorySlug =
                    slugByTitle.get(n.title.trim()) ??
                    slugByTitle.get((n.articles[0]?.category ?? "").trim());

                // TEMP DEBUG: terminal e dekhbe kon section match hoyni
                if (!categorySlug) {
                    console.log("NO CATEGORY MATCH:", n.title, "|", n.articles[0]?.category);
                }

                return (
                    <section key={n.curationId}>

                        {/* Section header */}
                        <div className="flex items-center gap-3 sm:gap-4">
                            <span className="h-7 w-1.5 shrink-0 rounded-full bg-gradient-to-b from-red-500 to-rose-800 sm:h-9" />

                            <h1 className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">
                                {n.title}
                            </h1>

                            <span className="h-px flex-1 bg-gradient-to-r from-red-200 via-gray-200 to-transparent" />
                        </div>

                        <NewsSectionGrid
                            items={items}
                            categoryHref={
                                categorySlug ? `/category/${categorySlug}` : undefined
                            }
                        />

                    </section>
                );
            })}
        </div>
    );
};

export default NewsSection;