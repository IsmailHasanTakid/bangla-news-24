import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import Link from "next/link";
import { getData } from "@/lib/getData";

interface LatestNews {
    id: string;
    title: string;
}

interface LatestNewsResponse {
    data: LatestNews[];
}

const Marquie = async () => {
    const data = await getData<LatestNewsResponse>(
        "https://news-api-v2.vercel.app/api/news?limit=10"
    );

    // Empty list if the API failed
    const marque: LatestNews[] = data?.data ?? [];

    return (
        <div className="w-full bg-gray-900 border-b-2 border-red-600">
            <div className="max-w-7xl mx-auto h-11 flex items-center">

                <div className="shrink-0 z-10 bg-red-600 h-full flex items-center">
                    <h1 className="text-white font-bold px-5 text-sm whitespace-nowrap">
                        সর্বশেষ
                    </h1>
                </div>

                <div className="flex-1 min-w-0 overflow-hidden flex items-center text-gray-100">
                    {marque.length > 0 && (
                        <MarqueeText direction="right" duration={10}>
                            {marque.map((m) => (
                                <Link
                                    href={`/details/${m.id}`}
                                    key={m.id}
                                    className="flex items-center whitespace-nowrap hover:underline"
                                >
                                    <h1 className="text-sm">{m.title}</h1>

                                    <span className="px-6 text-red-500">|</span>
                                </Link>
                            ))}
                        </MarqueeText>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Marquie;