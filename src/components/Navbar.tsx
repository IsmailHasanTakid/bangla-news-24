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

    // Skip the first and the 8th category, fall back to an empty list if the API failed
    const NavData: Category[] = (data?.data ?? []).filter(
        (_, index) => index !== 0 && index !== 7
    );

    return (
        <div className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 border-t-2 border-t-red-600 shadow-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-center gap-1 px-5">
                <NavLink href="/">হোম</NavLink>

                {NavData.map((n) => (
                    <NavLink key={n.slug} href={`/category/${n.slug}`}>
                        {n.title}
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default Navbar;