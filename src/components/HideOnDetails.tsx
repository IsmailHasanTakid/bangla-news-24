"use client";

import { usePathname } from "next/navigation";

const hiddenRoutes = ["/profile", "/signin", "/signup"];

const HideOnDetails = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    const hidden = hiddenRoutes.some(
        (route) => pathname === route || pathname.startsWith(`${route}/`)
    );

    if (hidden) return null;

    return <>{children}</>;
};

export default HideOnDetails;