"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { districts, findNearestDistrict } from "@/lib/districts";

export default function DistrictSelect({
    current,
    basePath = "/weather",
}: {
    current: string;
    basePath?: string;
}) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [locating, setLocating] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const divisions = Array.from(new Set(districts.map((d) => d.division)));

    const go = (id: string) =>
        startTransition(() => router.push(`${basePath}?district=${id}`));

    const locate = () => {
        setMessage(null);

        if (!("geolocation" in navigator)) {
            setMessage("আপনার ব্রাউজার লোকেশন সাপোর্ট করে না।");
            return;
        }

        setLocating(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setLocating(false);
                const { district, km } = findNearestDistrict(
                    pos.coords.latitude,
                    pos.coords.longitude
                );

                // বাংলাদেশের বাইরে থাকলে
                if (km > 150) {
                    setMessage("আপনি সম্ভবত বাংলাদেশের বাইরে আছেন। তালিকা থেকে জেলা বেছে নিন।");
                    return;
                }

                setMessage(`📍 আপনার নিকটতম জেলা: ${district.bn}`);
                go(district.id);
            },
            (err) => {
                setLocating(false);
                if (err.code === err.PERMISSION_DENIED) {
                    setMessage("লোকেশনের অনুমতি দেওয়া হয়নি। ব্রাউজারের সেটিংস থেকে অনুমতি দিন।");
                } else if (err.code === err.POSITION_UNAVAILABLE) {
                    setMessage("আপনার অবস্থান পাওয়া যায়নি। আবার চেষ্টা করুন।");
                } else {
                    setMessage("অবস্থান খুঁজতে বেশি সময় লাগছে। আবার চেষ্টা করুন।");
                }
            },
            { enableHighAccuracy: false, timeout: 10000, maximumAge: 5 * 60 * 1000 }
        );
    };

    return (
        <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
                <select
                    value={current}
                    disabled={isPending}
                    onChange={(e) => go(e.target.value)}
                    className="w-full max-w-xs rounded-xl border bg-white px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60 dark:bg-gray-900"
                >
                    {divisions.map((div) => (
                        <optgroup key={div} label={div}>
                            {districts
                                .filter((d) => d.division === div)
                                .map((d) => (
                                    <option key={d.id} value={d.id}>
                                        {d.bn}
                                    </option>
                                ))}
                        </optgroup>
                    ))}
                </select>

                <button
                    type="button"
                    onClick={locate}
                    disabled={locating || isPending}
                    className="rounded-xl border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60 dark:hover:bg-gray-800"
                >
                    {locating ? "খোঁজা হচ্ছে..." : "📍 আমার অবস্থান"}
                </button>
            </div>

            {isPending && (
                <p className="text-sm text-gray-500">⏳ নতুন তথ্য লোড হচ্ছে...</p>
            )}
            {message && !isPending && (
                <p className="text-sm text-gray-600 dark:text-gray-300">{message}</p>
            )}
        </div>
    );
}