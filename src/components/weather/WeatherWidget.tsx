"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import Link from "next/link";
import { districts } from "@/lib/bangladesh-district";

interface GeoPlace {
    name: string;
    latitude: number;
    longitude: number;
    country_code?: string;
}

interface GeoResponse {
    results?: GeoPlace[];
}

interface CurrentWeather {
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    precipitation: number;
    weather_code: number;
    wind_speed_10m: number;
}

interface DailyWeather {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: (number | null)[];
}

interface HourlyWeather {
    time: string[];
    relative_humidity_2m: number[];
    wind_speed_10m: number[];
}

interface WeatherResponse {
    current?: CurrentWeather;
    daily?: DailyWeather;
    hourly?: HourlyWeather;
}

interface WeatherWidgetProps {
    compact?: boolean;
}

const weatherDescriptions: Record<number, string> = {
    0: "পরিষ্কার আকাশ",
    1: "প্রায় পরিষ্কার",
    2: "আংশিক মেঘলা",
    3: "মেঘলা",
    45: "কুয়াশা",
    48: "ঘন কুয়াশা",
    51: "হালকা গুঁড়ি গুঁড়ি বৃষ্টি",
    53: "গুঁড়ি গুঁড়ি বৃষ্টি",
    55: "ঘন গুঁড়ি গুঁড়ি বৃষ্টি",
    56: "হিমশীতল গুঁড়ি গুঁড়ি বৃষ্টি",
    57: "ঘন হিমশীতল গুঁড়ি গুঁড়ি বৃষ্টি",
    61: "হালকা বৃষ্টি",
    63: "মাঝারি বৃষ্টি",
    65: "ভারী বৃষ্টি",
    66: "হিমশীতল বৃষ্টি",
    67: "ভারী হিমশীতল বৃষ্টি",
    71: "হালকা তুষারপাত",
    73: "মাঝারি তুষারপাত",
    75: "ভারী তুষারপাত",
    77: "তুষারকণা",
    80: "হালকা বৃষ্টির ঝরনা",
    81: "মাঝারি বৃষ্টির ঝরনা",
    82: "প্রবল বৃষ্টির ঝরনা",
    85: "হালকা তুষার ঝরনা",
    86: "ভারী তুষার ঝরনা",
    95: "বজ্রসহ বৃষ্টি",
    96: "শিলাসহ বজ্রঝড়",
    99: "প্রবল শিলাসহ বজ্রঝড়"
};

function getWeatherDescription(code: number): string {
    return weatherDescriptions[code] ?? "আবহাওয়ার তথ্য পাওয়া গেছে";
}

function getWeatherIcon(code: number): string {
    if (code === 0) return "☀️";
    if (code <= 2) return "🌤️";
    if (code === 3) return "☁️";
    if (code === 45 || code === 48) return "🌫️";
    if (code >= 95) return "⛈️";
    if (code >= 85 && code <= 86) return "🌨️";
    if (code >= 51 && code <= 82) return "🌧️";

    return "☁️";
}

export default function WeatherWidget({
    compact = false
}: WeatherWidgetProps) {
    const [district, setDistrict] = useState<string>("Dhaka");
    const [weather, setWeather] = useState<WeatherResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [retry, setRetry] = useState<number>(0);

    useEffect(() => {
        const controller = new AbortController();

        let intervalId: ReturnType<typeof setInterval> | undefined;
        let weatherController: AbortController | null = null;
        let hasWeather = false;

        async function fetchWeather(
            latitude: number,
            longitude: number
        ): Promise<void> {
            weatherController?.abort();

            const requestController = new AbortController();
            weatherController = requestController;

            try {
                const weatherUrl = new URL(
                    "https://api.open-meteo.com/v1/forecast"
                );

                weatherUrl.search = new URLSearchParams({
                    latitude: String(latitude),
                    longitude: String(longitude),
                    current:
                        "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m",
                    daily:
                        "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
                    hourly: "relative_humidity_2m,wind_speed_10m",
                    forecast_hours: "24",
                    timezone: "Asia/Dhaka",
                    forecast_days: "5"
                }).toString();

                const response = await fetch(weatherUrl.toString(), {
                    cache: "no-store",
                    signal: requestController.signal
                });

                if (!response.ok) {
                    throw new Error("আবহাওয়ার তথ্য আনা যায়নি।");
                }

                const data: WeatherResponse = await response.json();

                if (!data.current || !data.daily || !data.hourly) {
                    throw new Error("আবহাওয়ার তথ্য অসম্পূর্ণ।");
                }

                if (
                    controller.signal.aborted ||
                    requestController.signal.aborted
                ) {
                    return;
                }

                setWeather(data);
                setError("");
                setLoading(false);
                hasWeather = true;
            } catch (err: unknown) {
                if (
                    err instanceof Error &&
                    err.name === "AbortError"
                ) {
                    return;
                }

                if (
                    controller.signal.aborted ||
                    requestController.signal.aborted
                ) {
                    return;
                }

                if (!hasWeather) {
                    setError(
                        err instanceof Error
                            ? err.message
                            : "কিছু একটা সমস্যা হয়েছে।"
                    );
                }
            } finally {
                if (!controller.signal.aborted && !hasWeather) {
                    setLoading(false);
                }
            }
        }

        async function loadWeather(): Promise<void> {
            setLoading(true);
            setError("");
            setWeather(null);

            try {
                const selectedDistrict = districts.find(
                    (item) => item.name === district
                );

                if (!selectedDistrict) {
                    throw new Error("জেলা নির্বাচন সঠিক নয়।");
                }

                const geoUrl = new URL(
                    "https://geocoding-api.open-meteo.com/v1/search"
                );

                geoUrl.search = new URLSearchParams({
                    name: selectedDistrict.name,
                    count: "10",
                    language: "en",
                    format: "json"
                }).toString();

                const geoResponse = await fetch(geoUrl.toString(), {
                    cache: "no-store",
                    signal: controller.signal
                });

                if (!geoResponse.ok) {
                    throw new Error("জেলার অবস্থান খুঁজে পাওয়া যায়নি।");
                }

                const geoData: GeoResponse = await geoResponse.json();

                const place = geoData.results?.find(
                    (item) => item.country_code === "BD"
                );

                if (!place) {
                    throw new Error(
                        "এই জেলার অবস্থান পাওয়া যায়নি। অন্য জেলা নির্বাচন করো।"
                    );
                }

                if (controller.signal.aborted) {
                    return;
                }

                await fetchWeather(
                    place.latitude,
                    place.longitude
                );

                if (controller.signal.aborted) {
                    return;
                }

                intervalId = setInterval(() => {
                    void fetchWeather(
                        place.latitude,
                        place.longitude
                    );
                }, 60_000);
            } catch (err: unknown) {
                if (
                    err instanceof Error &&
                    err.name === "AbortError"
                ) {
                    return;
                }

                if (!controller.signal.aborted) {
                    setError(
                        err instanceof Error
                            ? err.message
                            : "কিছু একটা সমস্যা হয়েছে।"
                    );
                    setLoading(false);
                }
            }
        }

        void loadWeather();

        return () => {
            controller.abort();
            weatherController?.abort();

            if (intervalId !== undefined) {
                clearInterval(intervalId);
            }
        };
    }, [district, retry]);

    const current = weather?.current;
    const daily = weather?.daily;

    function handleDistrictChange(
        event: ChangeEvent<HTMLSelectElement>
    ): void {
        setDistrict(event.target.value);
    }

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">
                        আবহাওয়া
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        বাংলাদেশের জেলার আবহাওয়ার পূর্বাভাস
                    </p>
                </div>

                <select
                    value={district}
                    onChange={handleDistrictChange}
                    className="max-w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-sky-500"
                    aria-label="জেলা নির্বাচন করুন"
                >
                    {districts.map((item) => (
                        <option key={item.name} value={item.name}>
                            {item.label}
                        </option>
                    ))}
                </select>
            </div>

            {loading && (
                <p className="py-8 text-center text-slate-500">
                    আবহাওয়ার তথ্য লোড হচ্ছে...
                </p>
            )}

            {!loading && error && (
                <div
                    role="alert"
                    className="rounded-xl bg-red-50 p-4 text-sm text-red-700"
                >
                    <p>{error}</p>

                    <button
                        type="button"
                        onClick={() => setRetry((value) => value + 1)}
                        className="mt-2 font-semibold underline"
                    >
                        আবার চেষ্টা করুন
                    </button>
                </div>
            )}

            {!loading && !error && current && daily && (
                <>
                    <div className="rounded-xl bg-sky-50 p-5">
                        <p className="text-sm font-medium text-sky-900">
                            {
                                districts.find(
                                    (item) => item.name === district
                                )?.label
                            }
                        </p>

                        <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <p className="text-4xl font-bold text-slate-900">
                                    {Math.round(current.temperature_2m)}°C
                                </p>

                                <p className="mt-2 text-slate-700">
                                    {getWeatherDescription(
                                        current.weather_code
                                    )}
                                </p>
                            </div>

                            <div className="text-5xl" aria-hidden="true">
                                {getWeatherIcon(current.weather_code)}
                            </div>
                        </div>

                        <p className="mt-3 text-sm text-slate-600">
                            অনুভূত তাপমাত্রা:{" "}
                            {Math.round(current.apparent_temperature)}°C
                        </p>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                        <WeatherStat
                            label="আর্দ্রতা"
                            value={`${current.relative_humidity_2m}%`}
                        />

                        <WeatherStat
                            label="বাতাসের গতি"
                            value={`${current.wind_speed_10m} km/h`}
                        />

                        <WeatherStat
                            label="বৃষ্টিপাত"
                            value={`${current.precipitation} mm`}
                        />
                    </div>

                    {!compact && (
                        <div className="mt-6">
                            <h3 className="mb-3 font-bold text-slate-900">
                                আগামী ৫ দিনের পূর্বাভাস
                            </h3>

                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                                {daily.time.map((date, index) => (
                                    <div
                                        key={date}
                                        className="rounded-xl border border-slate-200 p-3"
                                    >
                                        <p className="text-sm text-slate-500">
                                            {new Date(
                                                `${date}T12:00:00`
                                            ).toLocaleDateString("bn-BD", {
                                                day: "numeric",
                                                month: "short"
                                            })}
                                        </p>

                                        <div className="my-2 flex items-center gap-2">
                                            <span
                                                className="text-2xl"
                                                aria-hidden="true"
                                            >
                                                {getWeatherIcon(
                                                    daily.weather_code[index]
                                                )}
                                            </span>

                                            <p className="text-sm font-medium text-slate-800">
                                                {getWeatherDescription(
                                                    daily.weather_code[index]
                                                )}
                                            </p>
                                        </div>

                                        <p className="font-bold text-slate-900">
                                            {Math.round(
                                                daily.temperature_2m_max[index]
                                            )}
                                            ° /{" "}
                                            {Math.round(
                                                daily.temperature_2m_min[index]
                                            )}
                                            °C
                                        </p>

                                        <p className="mt-2 text-xs text-slate-500">
                                            বৃষ্টির সম্ভাবনা:{" "}
                                            {daily.precipitation_probability_max[
                                                index
                                            ] ?? "—"}
                                            {daily.precipitation_probability_max[
                                                index
                                            ] == null
                                                ? ""
                                                : "%"}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {compact && (
                        <div className="mt-6 flex justify-center">
                            <Link
                                href="/weather"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 sm:w-auto"
                            >
                                বিস্তারিত জানতে এখানে ক্লিক করুন
                                <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                    )}

                    <p className="mt-5 text-xs text-slate-500">
                        Weather data by{" "}
                        <a
                            href="https://open-meteo.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline underline-offset-2"
                        >
                            Open-Meteo.com
                        </a>
                        {" · "}
                        <a
                            href="https://creativecommons.org/licenses/by/4.0/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline underline-offset-2"
                        >
                            CC BY 4.0
                        </a>
                    </p>
                </>
            )}
        </section>
    );
}

interface WeatherStatProps {
    label: string;
    value: string;
}

function WeatherStat({ label, value }: WeatherStatProps) {
    return (
        <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-1 font-bold text-slate-900">{value}</p>
        </div>
    );
}
