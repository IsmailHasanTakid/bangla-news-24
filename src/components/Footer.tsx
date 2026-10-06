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
        <footer className="mt-10 w-full border-t border-red-600 bg-gray-900 text-gray-400">
            <div className="mx-auto max-w-7xl px-5 py-6">

                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                    <h2 className="text-lg font-bold text-white">
                        Bangla News 24
                    </h2>

                    <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
                        {categories.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className="transition hover:text-red-400"
                                >
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>

                </div>

                <div className="mt-5 border-t border-gray-800 pt-4 text-center text-xs text-gray-500">
                    <p>© {year} Bangla News 24. সর্বস্বত্ব সংরক্ষিত।</p>
                    <p>খবরের উৎস: BBC Bangla</p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
