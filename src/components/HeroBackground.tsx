"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const images = [
    "/hero/10.jpg",
    "/hero/2.jpg",
    "/hero/8.jpg",
    "/hero/4.jpg",
    "/hero/5.jpg",
    "/hero/6.jpg",
    "/hero/7.jpg",
    "/hero/3.jpg",
    "/hero/1.jpg",
    "/hero/9.jpg"
];

export default function HeroBackground({ interval = 2000 }: { interval?: number }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((i) => (i + 1) % images.length);
        }, interval);
        return () => clearInterval(timer);
    }, [interval]);

    return (
        <div className="absolute inset-0 -z-10 overflow-hidden">
            {images.map((src, i) => (
                <Image
                    key={src}
                    src={src}
                    alt=""
                    fill
                    priority={i === 0}
                    sizes="100vw"

                    className={`object-cover scale-[1.02] blur-[2px] transition-opacity duration-1000 ${i === index ? "opacity-100" : "opacity-0"
                        }`}

                />
            ))}
            {/* লেখা পড়ার সুবিধার জন্য হালকা কালো ওভারলে */}
            <div className="absolute inset-0 bg-black/40" />
        </div>
    );
}