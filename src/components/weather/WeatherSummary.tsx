import { buildSummary } from "@/lib/weatherSummary";

type Props = {
    districtName: string;
    hourly: Parameters<typeof buildSummary>[1];
    daily: Parameters<typeof buildSummary>[2];
};

export default function WeatherSummary({ districtName, hourly, daily }: Props) {
    const summary = buildSummary(districtName, hourly, daily);
    if (!summary) return null;

    return (
        <section
            id="summary"
            className="scroll-mt-6 space-y-5 rounded-2xl border bg-blue-50/60 p-5 shadow-sm dark:bg-gray-900">
            <header>
                <h2 className="text-xl font-semibold">📝 সহজ ভাষায় সারসংক্ষেপ</h2>
                <p className="text-sm text-gray-500">
                    এখান থেকে সহজেই জেনে নিন
                </p>
            </header>

            <p className="text-base leading-relaxed">{summary.intro}</p>

            <div className="grid gap-4 md:grid-cols-2">
                {summary.items.map((item) => (
                    <div key={item.title} className="rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800">
                        <h3 className="mb-1 font-medium">
                            {item.icon} {item.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                            {item.text}
                        </p>
                    </div>
                ))}
            </div>

            {summary.tips.length > 0 && (
                <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:bg-gray-800">
                    <h3 className="mb-2 font-medium">💡 পরামর্শ</h3>
                    <ul className="list-disc space-y-1 pl-5 text-sm">
                        {summary.tips.map((t) => (
                            <li key={t}>{t}</li>
                        ))}
                    </ul>
                </div>
            )}

            <p className="text-xs text-gray-500">
                * এটি পূর্বাভাস, তাই বাস্তব আবহাওয়া কিছুটা ভিন্ন হতে পারে।
            </p>
        </section>
    );
}