import Link from "next/link";
import DistrictSelect from "@/components/weather/DistrictSelect";
import WeatherCharts from "@/components/weather/WeatherCharts";
import { findDistrict } from "@/lib/districts";
import WeatherSummary from "@/components/weather/WeatherSummary";

export const revalidate = 600;
const bn = (n: number) => n.toLocaleString("bn-BD");

type ApiData = {
    current: { time: string };
    hourly: {
        time: string[];
        temperature_2m: number[];
        apparent_temperature: number[];
        relative_humidity_2m: number[];
        precipitation_probability: number[];
        wind_speed_10m: number[];
    };
    daily: {
        time: string[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
        precipitation_sum: number[];
        precipitation_probability_max: number[];
    };
};

const formatHour12 = (h: number) => {
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    const period =
        h < 5 ? "ভোর" : h < 12 ? "সকাল" : h < 16 ? "দুপুর" : h < 18 ? "বিকাল" : h < 20 ? "সন্ধ্যা" : "রাত";
    return `${period} ${bn(hour12)}টা`;
};

async function getData(lat: number, lon: number): Promise<ApiData> {
    const url =
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
        `&current=temperature_2m` +
        `&hourly=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation_probability,wind_speed_10m` +
        `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max` +
        `&timezone=Asia%2FDhaka&forecast_days=7`;

    const res = await fetch(url, { next: { revalidate: 600 } });
    if (!res.ok) throw new Error("fetch failed");
    return res.json();
}

export default async function ChartsPage({
    searchParams,
}: {
    searchParams: Promise<{ district?: string }>;
}) {
    const params = await searchParams;
    const district = findDistrict(params.district);

    let data: ApiData;
    try {
        data = await getData(district.lat, district.lon);
    } catch {
        return (
            <main className="mx-auto max-w-5xl space-y-4 p-6">
                <Link href={`/weather?district=${district.id}`} className="text-blue-600">
                    ← আবহাওয়া পেজে ফিরুন
                </Link>
                <p className="text-red-500">
                    ডেটা লোড করা যায়নি। একটু পরে আবার চেষ্টা করুন।
                </p>
            </main>
        );
    }

    // এখন থেকে পরের ২৪ ঘণ্টা
    const nowHour = data.current.time.slice(0, 13);
    const start = Math.max(
        data.hourly.time.findIndex((t) => t.slice(0, 13) >= nowHour),
        0
    );

    const hourly = data.hourly.time.slice(start, start + 24).map((t, k) => {
        const i = start + k;
        return {
            label: formatHour12(new Date(t).getHours()),
            temp: data.hourly.temperature_2m[i],
            feels: data.hourly.apparent_temperature[i],
            humidity: data.hourly.relative_humidity_2m[i],
            rainProb: data.hourly.precipitation_probability[i],
            wind: data.hourly.wind_speed_10m[i],
        };
    });

    const daily = data.daily.time.map((day, i) => ({
        label:
            i === 0
                ? "আজ"
                : new Date(day).toLocaleDateString("bn-BD", { weekday: "short" }),
        max: data.daily.temperature_2m_max[i],
        min: data.daily.temperature_2m_min[i],
        rainProb: data.daily.precipitation_probability_max[i],
        rainSum: data.daily.precipitation_sum[i],
    }));

    return (
        <main className="mx-auto max-w-5xl space-y-8 p-6">
            <header className="space-y-3">

                <Link
                    href={`/weather?district=${district.id}`}
                    className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 text-base font-semibold text-blue-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400 hover:bg-blue-600 hover:text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    <span className="text-lg">←</span>
                    আবহাওয়া পেজে ফিরুন
                </Link>

                <div>
                    <h1 className="text-3xl font-bold">আবহাওয়া চার্ট — {district.bn}</h1>
                    <p className="text-sm text-gray-500">
                        {district.division} • সরাসরি ডেটা (Open-Meteo)
                    </p>
                </div>
                {/* জেলা বদলালে চার্ট পেজেই থাকবে */}
                <DistrictSelect current={district.id} basePath="/weather/charts" />
                <a
                    href="#summary"
                    className="inline-flex items-center ml-8 gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3 text-base font-semibold text-emerald-700 shadow-sm  "
                >
                    <span className="text-lg">📝</span>
                    সহজ ভাষায় সারসংক্ষেপ দেখুন
                    <span className="text-lg">↓</span>
                </a>
            </header>

            <WeatherCharts hourly={hourly} daily={daily} />

            <WeatherSummary
                districtName={district.bn}
                hourly={hourly}
                daily={daily}
            />
        </main>
    );
}