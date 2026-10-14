"use client";

import {
    Bar,
    BarChart,
    CartesianGrid,
    LabelList,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

type DailyMax = { label: string; max: number };

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#ef4444", "#ec4899", "#8b5cf6"];

type ShapeProps = {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    index?: number;
    isActive?: boolean;
};

// পাহাড়ের মতো বাঁকা ত্রিভুজ আকৃতি
const getPath = (x: number, y: number, width: number, height: number) =>
    `M${x},${y + height}
   C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2},${y}
   C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width},${y + height}
   Z`;

const TriangleBar = (props: ShapeProps) => {
    const { x = 0, y = 0, width = 0, height = 0, index = 0, isActive } = props;
    const color = colors[index % colors.length];

    return (
        <path
            d={getPath(Number(x), Number(y), Number(width), Number(height))}
            fill={color}
            stroke={color}
            strokeWidth={isActive ? 5 : 0}
            style={{ transition: "stroke-width 0.3s ease-out" }}
        />
    );
};

// বারের উপরে রঙিন লেখা
const ColorLabel = (props: any) => {
    const { x = 0, y = 0, width = 0, value, index = 0 } = props;
    return (
        <text
            x={Number(x) + Number(width) / 2}
            y={Number(y) - 8}
            textAnchor="middle"
            fontSize={13}
            fontWeight={600}
            fill={colors[index % colors.length]}
        >
            {value}°
        </text>
    );
};

export default function TriangleBarChart({ data }: { data: DailyMax[] }) {
    return (
        <section className="rounded-2xl border p-4 shadow-sm">
            <h2 className="text-lg font-semibold">🏔️ দৈনিক সর্বোচ্চ তাপমাত্রা</h2>
            <p className="mb-3 text-xs text-gray-500">৭ দিনের পূর্বাভাস (°সে.)</p>

            <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 25, right: 10, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="label" fontSize={12} />
                        <YAxis unit="°" fontSize={12} />
                        <Tooltip
                            cursor={{ fillOpacity: 0.2 }}
                            formatter={(v) => `${v}°সে.`}
                            contentStyle={{ borderRadius: 12, fontSize: 13 }}
                        />
                        <Bar
                            dataKey="max"
                            name="সর্বোচ্চ"
                            shape={(p: any) => <TriangleBar {...p} />}
                            activeBar
                        >
                            <LabelList dataKey="max" content={ColorLabel} />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
}