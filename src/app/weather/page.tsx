
import type { Metadata } from "next";
import WeatherWidget from "@/components/weather/WeatherWidget";

export const metadata: Metadata = {
    title: "আবহাওয়া | Barta24",
    description:
        "বাংলাদেশের বিভিন্ন জেলার বর্তমান আবহাওয়া ও আগামী ৫ দিনের পূর্বাভাস দেখুন।"
};

export default function WeatherPage() {
    return (
        <main className="min-h-screen bg-slate-50 px-4 py-8">
            <div className="mx-auto max-w-6xl">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-slate-900">
                        বাংলাদেশের আবহাওয়া
                    </h1>

                    <p className="mt-2 text-slate-600">
                        আপনার পছন্দের জেলা নির্বাচন করে আবহাওয়ার বিস্তারিত তথ্য দেখুন।
                    </p>
                </div>

                <WeatherWidget />
            </div>
        </main>
    );
}
