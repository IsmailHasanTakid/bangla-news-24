import Image from "next/image";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getData } from "@/lib/getData";
import { recordRead } from "@/lib/history";

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


    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
        redirect("/signin");
    }

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
            notFound();
        }

    
        await recordRead({
            userId: session.user.id,
            newsId: id,
            title: news.title,
            image: news.imageUrl,
        });

        return (
            <div className="max-w-4xl mx-auto px-1 py-3 sm:p-5">
                <h1 className="text-2xl leading-snug font-bold break-words sm:text-3xl">
                    {news.title}
                </h1>

                {news.imageUrl && (
                    <Image
                        src={news.imageUrl}
                        alt={news.imageAlt || news.title}
                        width={900}
                        height={500}
                        className="w-full h-auto rounded-lg mt-4 sm:rounded-xl sm:mt-5"
                    />
                )}

                <p className="mt-3 text-[15px] leading-7 break-words sm:mt-4 sm:text-base sm:leading-8">
                    {news.description}
                </p>
            </div>
        );
    }


    const firstImage =
        detail.body?.find((b) => b.type === "image" && b.url)?.url ?? null;

    await recordRead({
        userId: session.user.id,
        newsId: id,
        title: detail.title,
        image: firstImage,
    });

    const date = detail.firstPublished
        ? new Date(detail.firstPublished).toLocaleDateString("bn-BD", {
            dateStyle: "full",
        })
        : "";

    return (
        <div className="max-w-6xl mx-auto px-1 py-3 sm:p-5">
            <h1 className="text-2xl leading-snug font-bold break-words sm:text-3xl">
                {detail.title}
            </h1>

            <div className="text-gray-500 mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs sm:mt-3 sm:text-sm">
                {detail.byline?.[0] && <span>{detail.byline[0].name}</span>}
                <span>{date}</span>
            </div>

            {detail.body?.map((item, index) => {
                if (item.type === "image" && item.url) {
                    return (
                        <figure key={index} className="mt-4 sm:mt-5">
                            <Image
                                src={item.url}
                                alt={item.altText || detail.title}
                                width={item.width ?? 900}
                                height={item.height ?? 500}
                                className="w-full h-auto rounded-lg sm:rounded-xl"
                            />
                            {item.caption && (
                                <figcaption className="text-xs text-gray-500 mt-2 sm:text-sm">
                                    {item.caption}
                                </figcaption>
                            )}
                        </figure>
                    );
                }

                if (item.type === "subheading") {
                    return (
                        <h2
                            key={index}
                            className="text-xl leading-snug font-bold mt-5 break-words sm:text-2xl sm:mt-6"
                        >
                            {item.text}
                        </h2>
                    );
                }

                return (
                    <p
                        key={index}
                        className="mt-3 text-[15px] leading-7 whitespace-pre-line break-words sm:mt-4 sm:text-base sm:leading-8"
                    >
                        {item.text}
                    </p>
                );
            })}
        </div>
    );
};

export default DetailsPage;