"use client"
import React from 'react';
import { User } from 'lucide-react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';

const SignInUp = () => {
    const { data: session } = authClient.useSession();
    const handleLogOut = async () => {
        await authClient.signOut();
    }

    const user = session?.user;

    return (
        <div>
            {session ? (
                <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white py-1 pl-1 pr-1.5 shadow-sm">


                    <Link
                        href="/profile"
                        title="My Profile"
                        className="block rounded-full transition hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                    >
                        {user?.image ? (

                            <img
                                src={user.image}
                                alt={user.name || "User"}
                                referrerPolicy="no-referrer"
                                className="h-10 w-10 rounded-full object-cover ring-2 ring-red-100"
                            />
                        ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-red-400 to-red-600 font-semibold text-white ring-2 ring-red-100">
                                {(user?.name || user?.email || "U").charAt(0).toUpperCase()}
                            </div>
                        )}
                    </Link>


                    <Link
                        href="/profile"
                        className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition-all duration-200 hover:border-red-300 hover:bg-red-50 hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2"
                    >
                        <User className='h-4 w-4' />
                        <span className="hidden sm:inline">Profile</span>
                    </Link>

                    <button
                        className="flex cursor-pointer items-center gap-2 rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-red-200 transition-all duration-200 hover:bg-red-600 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 active:scale-95"
                        onClick={handleLogOut}
                    >
                        Sign Out
                    </button>
                </div>

            ) : (
                <div className="flex items-center gap-3">
                    <Link href="/signin"
                        className="rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-200 hover:border-red-300 hover:bg-red-50 hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2">
                        Sign in
                    </Link>

                    <Link href="/signup"
                        className="rounded-full bg-gradient-to-r from-red-500 to-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-red-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 active:translate-y-0">
                        Sign up
                    </Link>
                </div>
            )}
        </div>
    );
};

export default SignInUp;