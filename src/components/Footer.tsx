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

// Replace "#" with real pages when they are available
const infoLinks: FooterLink[] = [
    { title: "আমাদের সম্পর্কে", href: "#" },
    { title: "যোগাযোগ", href: "#" },
    { title: "গোপনীয়তা নীতি", href: "#" },
    { title: "ব্যবহারের শর্তাবলী", href: "#" },
];

const Footer = () => {
    const year = new Date().getFullYear().toLocaleString("bn-BD", {
        useGrouping: false,
    });

    return (
        <footer className="mt-16 w-full border-t-4 border-red-600 bg-gray-900 text-gray-400">
            <div className="max-w-7xl mx-auto px-5 py-10">

                <div className="grid grid-cols-1 gap-8 text-sm md:grid-cols-3">

                    {/* Brand */}
                    <div>
                        <h2 className="text-xl font-bold text-white">
                            Bangla News 24
                        </h2>

                        <p className="mt-3 leading-7">
                            দেশ ও বিশ্বের সর্বশেষ খবর, বিশ্লেষণ ও প্রতিবেদন এক
                            জায়গায়।
                        </p>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="mb-3 font-bold text-white">বিভাগসমূহ</h3>

                        <ul className="grid grid-cols-2 gap-2">
                            {categories.map((item) => (
                                <li key={item.href}>
                                    <Link href={item.href} className="hover:text-red-400">
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Info links */}
                    <div>
                        <h3 className="mb-3 font-bold text-white">গুরুত্বপূর্ণ লিংক</h3>

                        <ul className="flex flex-col gap-2">
                            {infoLinks.map((item) => (
                                <li key={item.title}>
                                    <Link href={item.href} className="hover:text-red-400">
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* Bottom bar */}
                <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-gray-800 pt-5 text-xs text-gray-500 sm:flex-row">
                    <p>© {year} Bangla News 24. সর্বস্বত্ব সংরক্ষিত।</p>
                    <p>খবরের উৎস: BBC Bangla</p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;