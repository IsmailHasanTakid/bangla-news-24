import Image from "next/image";
import React from "react";
import SignInUp from "./SignInUp";

const Header = () => {
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    return (
        <div className="relative">
            <div className="max-w-7xl mx-auto px-5 py-6">
                <div className="flex items-center">

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

                </div>

                <div className="mt-7 border-b border-gray-200"></div>
            </div>


            <div className="absolute top-6 right-5 md:right-10 h-14 flex items-center">
                <SignInUp />
            </div>
        </div>
    );
};

export default Header;

