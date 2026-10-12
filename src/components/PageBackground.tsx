"use client";

import { usePathname } from "next/navigation";

/* Height of one mesh "tile". It repeats down the whole page,
   and its top/bottom edges match, so there is no visible seam. */
const TILE = 1400;

const WASH = [
    // seam colour (same at top and bottom edge => seamless repeat)
    "radial-gradient(ellipse 70% 12% at 50% 0%, rgba(125,211,252,0.50), transparent)",
    "radial-gradient(ellipse 70% 12% at 50% 100%, rgba(125,211,252,0.50), transparent)",
    // colour spots through the tile
    "radial-gradient(ellipse 55% 16% at 0% 8%, rgba(196,181,253,0.60), transparent)",
    "radial-gradient(ellipse 50% 14% at 100% 20%, rgba(110,231,183,0.55), transparent)",
    "radial-gradient(ellipse 45% 14% at 0% 42%, rgba(253,224,171,0.55), transparent)",
    "radial-gradient(ellipse 50% 15% at 100% 55%, rgba(253,164,175,0.42), transparent)",
    "radial-gradient(ellipse 50% 14% at 5% 72%, rgba(196,181,253,0.50), transparent)",
    "radial-gradient(ellipse 50% 14% at 95% 88%, rgba(125,211,252,0.45), transparent)",
].join(",");

const GRAIN =
    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

export default function PageBackground({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Mesh gradient ONLY on the home page. Every other page stays plain.
    if (pathname !== "/") {
        return <>{children}</>;
    }

    return (
        <div className="relative isolate min-h-screen overflow-hidden bg-white">
            <style>{`
                @keyframes mesh-a { 0%,100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(7%,9%,0) scale(1.15); } }
                @keyframes mesh-b { 0%,100% { transform: translate3d(0,0,0) scale(1.05); } 50% { transform: translate3d(-8%,6%,0) scale(0.92); } }
                @keyframes mesh-c { 0%,100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(-6%,-8%,0) scale(1.18); } }
                @media (prefers-reduced-motion: reduce) { .mesh-blob { animation: none !important; } }
            `}</style>

            {/* Full-page mesh (covers every section of the home page) */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
            >
                {/* Repeating colour wash down the whole page */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: WASH,
                        backgroundSize: `100% ${TILE}px`,
                        backgroundRepeat: "repeat-y",
                    }}
                />

                {/* Extra animated blobs for the first screen */}
                <div className="absolute inset-x-0 top-0 h-[900px] overflow-hidden">
                    <div
                        className="mesh-blob absolute -left-24 -top-24 h-[520px] w-[520px] rounded-full bg-violet-400/40 blur-[100px]"
                        style={{ animation: "mesh-a 20s ease-in-out infinite" }}
                    />
                    <div
                        className="mesh-blob absolute left-[32%] -top-32 h-[460px] w-[460px] rounded-full bg-sky-400/35 blur-[100px]"
                        style={{ animation: "mesh-b 24s ease-in-out infinite" }}
                    />
                    <div
                        className="mesh-blob absolute -right-20 top-0 h-[500px] w-[500px] rounded-full bg-emerald-300/45 blur-[100px]"
                        style={{ animation: "mesh-c 22s ease-in-out infinite" }}
                    />
                </div>

                {/* Soft dotted texture */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(15,23,42,0.08)_1px,transparent_1px)] bg-[size:22px_22px]" />

                {/* Film grain */}
                <div
                    className="absolute inset-0 opacity-[0.22] mix-blend-overlay"
                    style={{ backgroundImage: GRAIN }}
                />
            </div>

            {children}
        </div>
    );
}