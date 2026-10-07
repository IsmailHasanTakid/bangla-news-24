"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
}

const NavLink = ({ href, children }: NavLinkProps) => {
    const pathname = usePathname();

    // Home is active only on "/", other links are active on their own path
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={`shrink-0 px-3 sm:px-4 py-2.5 sm:py-3 text-[13px] sm:text-sm border-b-2 ${isActive
                ? "font-bold text-red-600 border-red-600"
                : "font-semibold text-gray-700 border-transparent hover:text-red-600 hover:bg-gray-50"
                }`}
        >
            {children}
        </Link>
    );
};

export default NavLink;