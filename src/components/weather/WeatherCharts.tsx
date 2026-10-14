"use client";
import TriangleBarChart from "./TriangleBarCharts";
import type { ReactNode } from "react";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

type Hourly = {
    label: string;
    temp: number;
    feels: number;
    humidity: number;
    rainProb: number;
    wind: number;
};

type Daily = {
    label: string;
    max: number;
    min: number;
    rainProb: number;
    rainSum: number;
};

const COLORS = {
    temp: "#f97316",
    feels: "#a855f7",
    max: "#ef4444",
    min: "#3b82f6",
    humidity: "#06b6d4",
    rain: "#2563eb",
    wind: "#10b981",
};

const tooltipStyle = {
    borderRadius: 12,
    border: "1px solid #e5e7eb",
    fontSize: 13,
};

function ChartCard({
    title,
    subtitle,
    children,
}: {
    title: string;
    subtitle?: string;
    children: ReactNode;
}) {
    return (
        <section className="rounded-2xl border p-4 shadow-sm">
            <h2 className="text-lg font-semibold">{title}</h2>
            {subtitle && <p className="mb-3 text-xs text-gray-500">{subtitle}</p>}
            <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    {children as React.ReactElement}
                </ResponsiveContainer>
            </div>
        </section>
    );
}

export default function WeatherCharts({
    hourly,
    daily,
}: {
    hourly: Hourly[];
    daily: Daily[];
}) {
    return (
        <div className="space-y-6">
            {/* ১. ঘণ্টাভিত্তিক তাপমাত্রা - Area chart */}
            <ChartCard
                title="🌡️ তাপমাত্রা (আগামী ২৪ ঘণ্টা)"
                subtitle="তাপমাত্রা ও অনুভূত তাপমাত্রা (°সে.)"
            >
                <AreaChart data={hourly}>
                    <defs>
                        <linearGradient id="tempFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={COLORS.temp} stopOpacity={0.5} />
                            <stop offset="95%" stopColor={COLORS.temp} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="label" interval={2} fontSize={12} />
                    <YAxis unit="°" domain={["dataMin - 2", "dataMax + 2"]} fontSize={12} />
                    <Tooltip contentStyle={tooltipStyle} formatter={(v) => `${v}°সে.`} />
                    <Legend />
                    <Area
                        type="monotone"
                        dataKey="temp"
                        name="তাপমাত্রা"
                        stroke={COLORS.temp}
                        fill="url(#tempFill)"
                        strokeWidth={2}
                    />
                    <Line
                        type="monotone"
                        dataKey="feels"
                        name="অনুভূত"
                        stroke={COLORS.feels}
                        strokeDasharray="5 5"
                        dot={false}
                    />
                </AreaChart>
            </ChartCard>

            {/* ২. ৭ দিনের সর্বোচ্চ-সর্বনিম্ন - Line chart */}
            <ChartCard
                title="📈 ৭ দিনের সর্বোচ্চ ও সর্বনিম্ন তাপমাত্রা"
                subtitle="°সে."
            >
                <LineChart data={daily}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="label" fontSize={12} />
                    <YAxis unit="°" domain={["dataMin - 2", "dataMax + 2"]} fontSize={12} />
                    <Tooltip contentStyle={tooltipStyle} formatter={(v) => `${v}°সে.`} />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="max"
                        name="সর্বোচ্চ"
                        stroke={COLORS.max}
                        strokeWidth={3}
                        activeDot={{ r: 7 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="min"
                        name="সর্বনিম্ন"
                        stroke={COLORS.min}
                        strokeWidth={3}
                        activeDot={{ r: 7 }}
                    />
                </LineChart>
            </ChartCard>
            <TriangleBarChart data={daily.map((d) => ({ label: d.label, max: d.max }))} />

            {/* ৩. বৃষ্টির সম্ভাবনা - Bar chart */}
            <div className="grid gap-6 lg:grid-cols-2">
                <ChartCard
                    title="🌧️ বৃষ্টির সম্ভাবনা (৭ দিন)"
                    subtitle="দিনের সর্বোচ্চ সম্ভাবনা (%)"
                >
                    <BarChart data={daily}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="label" fontSize={12} />
                        <YAxis unit="%" domain={[0, 100]} fontSize={12} />
                        <Tooltip contentStyle={tooltipStyle} formatter={(v) => `${v}%`} />
                        <Bar
                            dataKey="rainProb"
                            name="সম্ভাবনা"
                            fill={COLORS.rain}
                            radius={[8, 8, 0, 0]}
                        />
                    </BarChart>
                </ChartCard>

                {/* ৪. মোট বৃষ্টিপাত - Bar chart */}
                <ChartCard
                    title="☔ মোট বৃষ্টিপাত (৭ দিন)"
                    subtitle="পূর্বাভাসিত বৃষ্টির পরিমাণ (মিমি)"
                >
                    <BarChart data={daily}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="label" fontSize={12} />
                        <YAxis unit="মিমি" fontSize={12} width={60} />
                        <Tooltip contentStyle={tooltipStyle} formatter={(v) => `${v} মিমি`} />
                        <Bar
                            dataKey="rainSum"
                            name="বৃষ্টিপাত"
                            fill={COLORS.humidity}
                            radius={[8, 8, 0, 0]}
                        />
                    </BarChart>
                </ChartCard>
            </div>

            {/* ৫. আর্দ্রতা - Line chart */}
            <ChartCard title="💧 আর্দ্রতা (আগামী ২৪ ঘণ্টা)" subtitle="শতাংশ (%)">
                <LineChart data={hourly}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="label" interval={2} fontSize={12} />
                    <YAxis unit="%" domain={[0, 100]} fontSize={12} />
                    <Tooltip contentStyle={tooltipStyle} formatter={(v) => `${v}%`} />
                    <Line
                        type="monotone"
                        dataKey="humidity"
                        name="আর্দ্রতা"
                        stroke={COLORS.humidity}
                        strokeWidth={3}
                        dot={false}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ChartCard>

            {/* ৬. বাতাসের গতি - Area chart */}
            <ChartCard
                title="💨 বাতাসের গতি (আগামী ২৪ ঘণ্টা)"
                subtitle="কিমি/ঘণ্টা"
            >
                <AreaChart data={hourly}>
                    <defs>
                        <linearGradient id="windFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={COLORS.wind} stopOpacity={0.5} />
                            <stop offset="95%" stopColor={COLORS.wind} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="label" interval={2} fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip contentStyle={tooltipStyle} formatter={(v) => `${v} কিমি/ঘণ্টা`} />
                    <Area
                        type="monotone"
                        dataKey="wind"
                        name="বাতাস"
                        stroke={COLORS.wind}
                        fill="url(#windFill)"
                        strokeWidth={2}
                    />
                </AreaChart>
            </ChartCard>
        </div>
    );
}