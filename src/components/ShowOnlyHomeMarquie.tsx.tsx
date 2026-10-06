"use client";

import { usePathname } from "next/navigation";

const ShowOnlyHomeMarquie = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    if (pathname !== "/") {
        return null;
    }

    return <>{children}</>;
};

export default ShowOnlyHomeMarquie;