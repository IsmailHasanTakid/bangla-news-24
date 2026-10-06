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


                        <div className="group">
                            <div className="flex items-baseline gap-2">
                                <h1 className="text-xl font-black tracking-tight text-gray-950 md:text-2xl">
                                    Barta
                                    <span className="ml-0.5 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                                        24
                                    </span>
                                </h1>

                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 md:text-xs">
                                    by Takid
                                </span>
                            </div>

                            <div className="mt-1 flex items-center gap-2">
                                <span className="h-px w-5 bg-red-500" />

                                <p className="text-[11px] font-medium tracking-wide text-gray-500 md:text-xs">
                                    খবরের সাথে, সবসময়
                                </p>
                            </div>
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

