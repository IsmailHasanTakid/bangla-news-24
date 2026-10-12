import { getData } from "@/lib/getData";
import { notFound } from "next/navigation";
import CategoryGrid from "./CategoryGrid";

interface CategoryNews {
    id: string;
    title: string;
    description: string | null;
    imageUrl: string | null;
    imageAlt: string | null;
    firstPublished: string | null;
}

interface CategoryResponse {
    data?: CategoryNews[];
}

interface CategoryPageProps {
    params: Promise<{ slug: string }>;
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
    const { slug } = await params;

    const data = await getData<CategoryResponse>(
        `https://news-api-v2.vercel.app/api/category/${slug}`
    );

    // No data at all (wrong slug or API failure) -> 404 page
    if (!data?.data) {
        notFound();
    }

    const NewsData: CategoryNews[] = data.data;

    // Valid category but no stories yet
    if (NewsData.length === 0) {
        return (
            <div className="mx-auto max-w-7xl px-1 py-20 text-center text-gray-500 sm:px-5">
                এই ক্যাটাগরিতে এখন কোনো খবর নেই।
            </div>
        );
    }

    // Format the date on the server so server and client render the same text
    const items = NewsData.map((news) => ({
        ...news,
        dateLabel: news.firstPublished
            ? new Date(news.firstPublished).toLocaleDateString("bn-BD", {
                dateStyle: "medium",
            })
            : "",
    }));

    return (
        <div className="max-w-7xl mx-auto px-1 pt-6 pb-10 sm:px-5 sm:pt-8 sm:pb-16">
            <CategoryGrid items={items} />
        </div>
    );
};

export default CategoryPage;