import Image from "next/image";
import { getData } from "@/lib/getData";

interface BodyItem {
    type: string;
    text?: string;
    url?: string;
    width?: number;
    height?: number;
    caption?: string | null;
    altText?: string | null;
}

interface ArticleDetail {
    id: string;
    title: string;
    firstPublished: string | null;
    byline?: { name: string }[];
    body?: BodyItem[];
}

interface ArticleResponse {
    data?: ArticleDetail;
}

interface SectionArticle {
    id: string;
    title: string;
    description: string | null;
    imageUrl: string | null;
    imageAlt: string | null;
}

interface SectionsResponse {
    data?: { articles: SectionArticle[] }[];
}

interface DetailsPageProps {
    params: Promise<{ id: string }>;
}

const DetailsPage = async ({ params }: DetailsPageProps) => {
    const { id } = await params;

    const data = await getData<ArticleResponse>(
        `https://news-api-v2.vercel.app/api/article/${id}`
    );
    const detail = data?.data;

    // Fallback: if the article API has no data, find the news in the sections API
    if (!detail) {
        const data2 = await getData<SectionsResponse>(
            "https://news-api-v2.vercel.app/api/news/sections"
        );

        const allNews: SectionArticle[] =
            data2?.data?.flatMap((section) => section.articles) ?? [];
        const news = allNews.find((n) => n.id === id);

        if (!news) {
            return <p className="p-5">এই খবরটি পাওয়া যায়নি।</p>;
        }

        return (
            <div className="max-w-4xl mx-auto p-5">
                <h1 className="text-3xl font-bold">{news.title}</h1>

                {news.imageUrl && (
                    <Image
                        src={news.imageUrl}
                        alt={news.imageAlt || news.title}
                        width={900}
                        height={500}
                        className="w-full rounded-xl mt-5"
                    />
                )}

                <p className="mt-4 leading-8">{news.description}</p>
            </div>
        );
    }

    const date = detail.firstPublished
        ? new Date(detail.firstPublished).toLocaleDateString("bn-BD", {
            dateStyle: "full",
        })
        : "";

    return (
        <div className="max-w-6xl mx-auto p-5">
            <h1 className="text-3xl font-bold">{detail.title}</h1>

            <div className="text-gray-500 mt-3 flex gap-3 text-sm">
                {detail.byline?.[0] && <span>{detail.byline[0].name}</span>}
                <span>{date}</span>
            </div>

            {detail.body?.map((item, index) => {
                if (item.type === "image" && item.url) {
                    return (
                        <figure key={index} className="mt-5">
                            <Image
                                src={item.url}
                                alt={item.altText || detail.title}
                                width={item.width ?? 900}
                                height={item.height ?? 500}
                                className="w-full rounded-xl"
                            />
                            {item.caption && (
                                <figcaption className="text-sm text-gray-500 mt-2">
                                    {item.caption}
                                </figcaption>
                            )}
                        </figure>
                    );
                }

                if (item.type === "subheading") {
                    return (
                        <h2 key={index} className="text-2xl font-bold mt-6">
                            {item.text}
                        </h2>
                    );
                }

                return (
                    <p key={index} className="mt-4 leading-8 whitespace-pre-line">
                        {item.text}
                    </p>
                );
            })}
        </div>
    );
};

export default DetailsPage;