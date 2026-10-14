import DistrictSelect from "@/components/weather/DistrictSelect";
import { findDistrict } from "@/lib/districts";
import Link from "next/link";
export const revalidate = 600; // ১০ মিনিট পর পর নতুন ডেটা

type WeatherData = {
    current: {
        time: string;
        temperature_2m: number;
        apparent_temperature: number;
        relative_humidity_2m: number;
        wind_speed_10m: number;
        surface_pressure: number;
        precipitation: number;
        weather_code: number;
        is_day: number;
    };
    daily: {
        time: string[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
        weather_code: number[];
        precipitation_probability_max: number[];
    };
};

const weatherCodes: Record<number, { icon: string; label: string }> = {
    0: { icon: "☀️", label: "পরিষ্কার আকাশ" },
    1: { icon: "🌤️", label: "প্রায় পরিষ্কার" },
    2: { icon: "⛅", label: "আংশিক মেঘলা" },
    3: { icon: "☁️", label: "মেঘলা আকাশ" },
    45: { icon: "🌫️", label: "কুয়াশা" },
    48: { icon: "🌫️", label: "ঘন কুয়াশা" },
    51: { icon: "🌦️", label: "হালকা গুঁড়ি গুঁড়ি বৃষ্টি" },
    53: { icon: "🌦️", label: "গুঁড়ি গুঁড়ি বৃষ্টি" },
    55: { icon: "🌧️", label: "ঘন গুঁড়ি গুঁড়ি বৃষ্টি" },
    61: { icon: "🌧️", label: "হালকা বৃষ্টি" },
    63: { icon: "🌧️", label: "মাঝারি বৃষ্টি" },
    65: { icon: "🌧️", label: "ভারী বৃষ্টি" },
    80: { icon: "🌦️", label: "থেমে থেমে বৃষ্টি" },
    81: { icon: "🌧️", label: "ভারী বৃষ্টির ঝাপটা" },
    82: { icon: "⛈️", label: "প্রচণ্ড বৃষ্টি" },
    95: { icon: "⛈️", label: "বজ্রসহ বৃষ্টি" },
    96: { icon: "⛈️", label: "বজ্রসহ শিলাবৃষ্টি" },
    99: { icon: "⛈️", label: "প্রবল বজ্রঝড়" },
};

const describe = (code: number) =>
    weatherCodes[code] ?? { icon: "🌡️", label: "অজানা" };

// ইংরেজি সংখ্যাকে বাংলা সংখ্যায় রূপান্তর
const bn = (n: number, digits = 0) =>
    n.toLocaleString("bn-BD", { maximumFractionDigits: digits });

async function getWeather(lat: number, lon: number): Promise<WeatherData> {
    const url =
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
        `&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,surface_pressure,precipitation,weather_code,is_day` +
        `&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max` +
        `&timezone=Asia%2FDhaka&forecast_days=7`;

    const res = await fetch(url, { next: { revalidate: 600 } });
    if (!res.ok) throw new Error("Weather fetch failed");
    return res.json();
}

export default async function WeatherPage({
    searchParams,
}: {
    searchParams: Promise<{ district?: string }>;
}) {
    const params = await searchParams;
    const district = findDistrict(params.district);

    let data: WeatherData;
    try {
        data = await getWeather(district.lat, district.lon);
    } catch {
        return (
            <main className="mx-auto max-w-4xl space-y-4 p-6">
                <DistrictSelect current={district.id} />
                <p className="text-red-500">
                    আবহাওয়ার তথ্য লোড করা যায়নি। একটু পরে আবার চেষ্টা করুন।
                </p>
            </main>
        );
    }

    const c = data.current;
    const now = describe(c.weather_code);

    return (
        <main className="mx-auto max-w-4xl space-y-8 p-6">
            <header className="space-y-3">
                <div>
                    <h1 className="text-3xl font-bold">আবহাওয়া — {district.bn}</h1>
                    <p className="text-sm text-gray-500">
                        {district.division} • সরাসরি ডেটা (Open-Meteo)
                    </p>
                </div>
                <DistrictSelect current={district.id} />
            </header>

            {/* বর্তমান আবহাওয়া */}
            <section className="rounded-2xl border p-6 shadow-sm">
                <p className="text-6xl font-semibold">
                    {bn(Math.round(c.temperature_2m))}°সে.
                </p>
                <p className="mt-2 text-lg">
                    {now.icon} {now.label} {c.is_day ? "" : "(রাত)"}
                </p>
                <p className="text-sm text-gray-500">
                    অনুভূত হচ্ছে {bn(Math.round(c.apparent_temperature))}°সে.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <Stat label="আর্দ্রতা" value={`${bn(c.relative_humidity_2m)}%`} />
                    <Stat label="বাতাসের গতি" value={`${bn(c.wind_speed_10m, 1)} কিমি/ঘণ্টা`} />
                    <Stat label="বায়ুচাপ" value={`${bn(Math.round(c.surface_pressure))} হেক্টোপাস্কাল`} />
                    <Stat label="বৃষ্টিপাত" value={`${bn(c.precipitation, 1)} মিমি`} />
                </div>
            </section>

            {/* ৭ দিনের পূর্বাভাস */}
            <section>
                <h2 className="mb-3 text-xl font-semibold">৭ দিনের পূর্বাভাস</h2>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
                    {data.daily.time.map((day, i) => {
                        const d = describe(data.daily.weather_code[i]);
                        return (
                            <div key={day} className="rounded-xl border p-3 text-center">
                                <p className="text-sm font-medium">
                                    {i === 0
                                        ? "আজ"
                                        : new Date(day).toLocaleDateString("bn-BD", {
                                            weekday: "short",
                                        })}
                                </p>
                                <p className="my-1 text-2xl" title={d.label}>
                                    {d.icon}
                                </p>
                                <p className="text-sm">
                                    {bn(Math.round(data.daily.temperature_2m_max[i]))}° /{" "}
                                    <span className="text-gray-500">
                                        {bn(Math.round(data.daily.temperature_2m_min[i]))}°
                                    </span>
                                </p>
                                <p className="text-xs text-blue-500">
                                    💧 {bn(data.daily.precipitation_probability_max[i])}%
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>
            {/* চার্ট পেজের বাটন */}
            <div className="flex flex-wrap justify-center gap-4">
                <Link
                    href={`/weather/charts?district=${district.id}`}
                    className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white shadow transition hover:bg-blue-700"
                >
                    📊 বিস্তারিত জানতে এখানে ক্লিক করুন
                </Link>
            </div>
        </main>
    );
}

function Stat({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
            <p className="text-xs text-gray-500">{label}</p>
            <p className="text-lg font-medium">{value}</p>
        </div>
    );
}