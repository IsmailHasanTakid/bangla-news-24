import { getData } from "@/lib/getData";
import NavLink from "./NavLinks";

interface Category {
    slug: string;
    title: string;
}

interface CategoryResponse {
    data: Category[];
}

const Navbar = async () => {
    const data = await getData<CategoryResponse>(
        "https://news-api-v2.vercel.app/api/categories"
    );

    const navData: Category[] = (data?.data ?? []).filter(
        (_, index) => index !== 0 && index !== 7
    );

    return (
        <nav className="sticky top-0 z-50 w-full">
            {/* Soft dark fade so content blends under the bar */}
            <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-gradient-to-b from-[#0b0d14]/90 via-[#0b0d14]/50 to-transparent backdrop-blur-sm [mask-image:linear-gradient(to_bottom,black_60%,transparent)]" />

            {/* Top gradient line */}
            <div className="h-[3px] w-full bg-gradient-to-r from-red-700 via-red-500 to-orange-400 shadow-[0_2px_14px_rgba(239,68,68,0.55)]" />

            <div className="mx-auto max-w-7xl px-2 pt-2 sm:px-6 lg:px-8">
                {/* Floating glass bar */}
                <div className="relative overflow-hidden rounded-full border border-white/10 bg-[#11141d]/70 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.7),0_1px_0_rgba(255,255,255,0.1)_inset] ring-1 ring-white/[0.04] backdrop-blur-2xl backdrop-saturate-200">
                    {/* Specular highlight */}
                    <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.06] to-transparent" />

                    <div className="relative flex items-center gap-1 overflow-x-auto whitespace-nowrap px-2 py-1.5 sm:px-3 lg:justify-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        <NavLink href="/">হোম</NavLink>

                        {navData.map((category) => (
                            <NavLink
                                key={category.slug}
                                href={`/category/${category.slug}`}
                            >
                                {category.title}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>

            <div className="h-2" />
        </nav>
    );
};

export default Navbar;