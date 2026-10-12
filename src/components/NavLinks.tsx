"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
}

const NavLink = ({ href, children }: NavLinkProps) => {
    const pathname = usePathname();

    const isActive =
        href === "/"
            ? pathname === "/"
            : pathname === href || pathname.startsWith(`${href}/`);

    return (
        <Link
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`group relative shrink-0 overflow-hidden rounded-full px-4 py-2 text-sm transition-all duration-300 sm:px-5 ${isActive
                ? "border border-red-400/30 bg-gradient-to-b from-red-500/25 via-red-500/15 to-orange-500/10 font-bold text-white shadow-[0_6px_22px_-4px_rgba(239,68,68,0.55),0_1px_0_rgba(255,255,255,0.18)_inset] ring-1 ring-red-500/20 backdrop-blur-xl"
                : "border border-transparent font-medium text-slate-300 hover:border-white/10 hover:bg-white/[0.07] hover:text-white hover:shadow-[0_1px_0_rgba(255,255,255,0.1)_inset] hover:backdrop-blur-md"
                }`}
        >
            {/* Hover sheen */}
            <span className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent transition-all duration-700 group-hover:left-[120%]" />

            <span className="relative">{children}</span>

            {/* Active indicator */}
            <span
                className={`absolute bottom-[3px] left-1/2 h-[2px] w-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-red-400 to-orange-400 shadow-[0_0_10px_rgba(248,113,113,0.9)] transition-all duration-300 ${isActive
                    ? "scale-x-100 opacity-100"
                    : "scale-x-0 opacity-0"
                    }`}
            />
        </Link>
    );
};

export default NavLink;