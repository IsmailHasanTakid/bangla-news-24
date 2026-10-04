import Image from "next/image";
import React from "react";

const Header = () => {
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    return (
        <div className="max-w-7xl mx-auto px-5 py-6">
            <div className="flex items-center justify-between gap-6">

                {/* Logo and Website Info */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white shadow-sm border border-gray-100">
                        <Image
                            className="w-11 h-11 object-contain"
                            height={50}
                            width={50}
                            src="/logo.webp"
                            alt="Bangla News 24 Logo"
                        />
                    </div>

                    <div>
                        <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-gray-900">
                            Bangla News <span className="text-red-500">24</span>
                        </h1>

                        <p className="text-xs md:text-sm text-gray-500 mt-1 font-medium">
                            {date}
                        </p>
                    </div>
                </div>

                {/* Authentication Buttons */}
                <div className="flex items-center gap-2 sm:gap-3">
                    <button className="px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200">
                        Sign in
                    </button>

                    <button className="px-4 sm:px-5 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold shadow-sm shadow-red-200 hover:bg-red-600 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                        Sign up
                    </button>
                </div>

            </div>

            {/* Bottom Divider */}
            <div className="mt-7 border-b border-gray-200"></div>
        </div>
    );
};

export default Header;

