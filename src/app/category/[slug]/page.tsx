import Image from "next/image";
import Link from "next/link";
import { getData } from "@/lib/getData";
import { notFound } from "next/navigation";

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

    return (
        <div className="max-w-7xl mx-auto px-5 pb-16">

            {/* News grid */}
            <div className="grid grid-cols-4 gap-6">

                {NewsData.map((news) => (
                    <Link
                        href={`/details/${news.id}`}
                        key={news.id}
                        className="group relative flex h-[460px] flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-red-100 hover:shadow-2xl hover:shadow-red-100/60"
                    >

                        {/* Image */}
                        <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                            {news.imageUrl && (
                                <Image
                                    src={news.imageUrl}
                                    alt={news.imageAlt || news.title}
                                    width={600}
                                    height={600}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            )}

                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="flex flex-1 flex-col gap-3 p-5">

                            <h1 className="line-clamp-2 text-base font-extrabold leading-snug text-gray-900 transition-colors duration-300 group-hover:text-red-600">
                                {news.title}
                            </h1>

                            <p className="line-clamp-4 text-sm leading-7 text-gray-500">
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
                                    পড়ুন
                                    <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                                        →
                                    </span>
                                </span>
                            </div>

                        </div>

                        {/* Bottom red line (grows on hover) */}
                        <span className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-red-500 to-rose-700 transition-all duration-500 group-hover:w-full" />

                    </Link>
                ))}

            </div>

        </div>
    );
};

export default CategoryPage;