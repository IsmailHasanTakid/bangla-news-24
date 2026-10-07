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

    // Empty list if the API failed
    const NewsData: CategoryNews[] = data?.data ?? [];

    if (!NewsData) {
        notFound();
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
        <div className="max-w-7xl mx-auto px-1 pb-10 sm:px-5 sm:pb-16">
            <CategoryGrid items={items} />
        </div>
    );
};

export default CategoryPage;