"use client";

import { usePathname } from "next/navigation";

const HideOnDetails = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    if (pathname.startsWith("/details")) {
        return null;
    }

    return <>{children}</>;
};

export default HideOnDetails;