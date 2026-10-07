import Link from "next/link";

interface FooterLink {
    title: string;
    href: string;
}

const categories: FooterLink[] = [
    { title: "রাজনীতি", href: "/category/politics" },
    { title: "বিশ্ব", href: "/category/world" },
    { title: "অর্থনীতি", href: "/category/economy" },
    { title: "স্বাস্থ্য", href: "/category/health" },
    { title: "খেলা", href: "/category/sports" },
    { title: "প্রযুক্তি", href: "/category/technology" },
];

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="mt-8 w-full border-t border-red-600 bg-gray-900 text-gray-400 sm:mt-10">
            <div className="mx-auto max-w-7xl px-4 py-5 sm:px-5 sm:py-6">

                <div className="flex flex-col gap-4 sm:gap-5 md:flex-row md:items-center md:justify-between">

                    <h2 className="text-base font-bold text-white sm:text-lg">
                        Bangla News 24
                    </h2>

                    <ul className="flex flex-wrap gap-x-4 gap-y-2 text-[13px] sm:gap-x-5 sm:text-sm">
                        {categories.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className="inline-block py-1 transition hover:text-red-400"
                                >
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>

                </div>

                <div className="mt-4 border-t border-gray-800 pt-4 text-center text-[11px] leading-5 text-gray-500 sm:mt-5 sm:text-xs">
                    <p>© {year} Bangla News 24. সর্বস্বত্ব সংরক্ষিত।</p>
                    <p>খবরের উৎস: BBC Bangla</p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;