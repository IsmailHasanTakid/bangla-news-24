"use client";

import { usePathname } from "next/navigation";

const HideOnDetails = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    if (
        pathname.startsWith("/details") ||
        pathname === "/signin" ||
        pathname === "/signup" ||
        pathname === "/profile"
    ) {
        return null;
    }

    return <>{children}</>;
};

export default HideOnDetails;
