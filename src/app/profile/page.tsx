import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { Home } from "lucide-react";
import {
    clearHistory,
    getHistory,
    removeFromHistory,
} from "@/lib/history";

// Date কে Bangla format-এ দেখানোর জন্য এই function ব্যবহার করা হয়েছে
const formatDate = (date: Date | string) =>
    new Date(date).toLocaleString("bn-BD", {
        dateStyle: "medium",
        timeStyle: "short",
    });

const ProfilePage = async () => {

    // বর্তমানে login করা user-এর session বের করা হচ্ছে
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    // User login করা না থাকলে signin page-এ পাঠিয়ে দেওয়া হবে
    if (!session) {
        redirect("/signin");
    }

    // Session থেকে user information নেওয়া হচ্ছে
    const user = session.user;

    // User-এর reading history database থেকে নেওয়া হচ্ছে
    const items = await getHistory(user.id);

    // ==============================
    // CLEAR ALL READING HISTORY
    // ==============================
    // এই server action দিয়ে user-এর সব reading history delete করা হয়
    async function handleClear() {
        "use server";

        const s = await auth.api.getSession({
            headers: await headers(),
        });

        if (!s) return;

        await clearHistory(s.user.id);

        // History clear হওয়ার পর profile page আবার refresh করা হয়
        revalidatePath("/profile");
    }

    // ==============================
    // REMOVE SINGLE HISTORY ITEM
    // ==============================
    // নির্দিষ্ট একটি news history থেকে remove করার server action
    async function handleRemove(formData: FormData) {
        "use server";

        const s = await auth.api.getSession({
            headers: await headers(),
        });

        if (!s) return;

        await removeFromHistory(
            s.user.id,
            String(formData.get("newsId"))
        );

        // Remove করার পর profile page-এর data refresh করা হয়
        revalidatePath("/profile");
    }

    return (
        <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-6 sm:px-6">

            {/* Profile page navigation */}
            <div className="mb-6 flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm">

                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-red-500">
                        Bangla News 24
                    </p>

                    <p className="mt-0.5 text-sm font-semibold text-gray-700">
                        My Profile
                    </p>
                </div>

                <Link
                    href="/"
                    className="group flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-bold text-gray-700 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                >
                    <Home
                        className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
                    />

                    Home
                </Link>

            </div>

            {/* =========================================
                BACKGROUND DECORATION
                শুধু UI decoration, functionality নেই
            ========================================== */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-red-500/10 blur-3xl" />
                <div className="absolute -right-32 top-72 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
            </div>


            {/* =========================================
                PROFILE HEADER
            ========================================== */}
            <section className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl shadow-gray-200/50">

                {/* Top red gradient decoration */}
                <div className="h-2 bg-gradient-to-r from-red-600 via-red-500 to-orange-400" />

                <div className="relative p-6 sm:p-8">

                    {/* Decorative background glow */}
                    <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-red-500/10 blur-3xl" />

                    <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center">

                        {/* =========================
                            USER AVATAR
                        ========================== */}
                        <div className="shrink-0">

                            {user.image ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={user.image}
                                    alt={user.name || "User"}
                                    referrerPolicy="no-referrer"
                                    className="h-28 w-28 rounded-3xl object-cover shadow-lg ring-4 ring-red-50 sm:h-32 sm:w-32"
                                />
                            ) : (
                                <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-red-500 via-red-600 to-red-800 text-5xl font-bold text-white shadow-xl shadow-red-200 ring-4 ring-red-50 sm:h-32 sm:w-32">
                                    {(user.name || user.email || "U")
                                        .charAt(0)
                                        .toUpperCase()}
                                </div>
                            )}

                        </div>


                        {/* =========================
                            USER INFORMATION
                        ========================== */}
                        <div className="min-w-0 flex-1">

                            <div className="mb-2 flex flex-wrap items-center gap-2">

                                <span className="rounded-full bg-red-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-red-600">
                                    My Profile
                                </span>

                                {user.emailVerified && (
                                    <span className="flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-[10px] font-bold text-green-600">
                                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                        Verified
                                    </span>
                                )}

                            </div>

                            <h1 className="truncate text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
                                {user.name}
                            </h1>

                            <p className="mt-2 break-all text-sm text-gray-500">
                                {user.email}
                            </p>


                            {/* User status information */}
                            <div className="mt-5 flex flex-wrap gap-2">

                                <span
                                    className={`rounded-xl border px-3 py-2 text-xs font-semibold ${user.emailVerified
                                        ? "border-green-100 bg-green-50 text-green-700"
                                        : "border-yellow-100 bg-yellow-50 text-yellow-700"
                                        }`}
                                >
                                    {user.emailVerified
                                        ? "Email verified"
                                        : "Email not verified"}
                                </span>

                                <span className="rounded-xl border border-gray-100 bg-gray-50 px-3 py-2 text-xs font-medium text-gray-600">
                                    Joined {formatDate(user.createdAt)}
                                </span>

                            </div>

                        </div>


                        {/* =========================
                            NEWS READ STATISTIC
                        ========================== */}
                        <div className="relative overflow-hidden rounded-2xl border border-red-100 bg-gradient-to-br from-red-50 to-orange-50 px-7 py-5 text-center shadow-sm">

                            <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-red-500/10" />

                            <p className="relative text-4xl font-black text-red-600">
                                {items.length}
                            </p>

                            <p className="relative mt-1 text-xs font-bold uppercase tracking-wider text-red-700">
                                News Read
                            </p>

                        </div>

                    </div>
                </div>
            </section>


            {/* =========================================
                READING HISTORY SECTION
            ========================================== */}
            <section className="mt-10">

                {/* Section heading */}
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

                    <div>
                        <div className="mb-2 flex items-center gap-3">

                            <div className="h-7 w-1 rounded-full bg-red-600" />

                            <p className="text-xs font-black uppercase tracking-[0.2em] text-red-600">
                                Your Activity
                            </p>

                        </div>

                        <h2 className="text-2xl font-black tracking-tight text-gray-900">
                            Reading History
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            আপনার পড়া খবরগুলো এখানে দেখতে পারবেন
                        </p>
                    </div>


                    {/* Clear all button */}
                    {items.length > 0 && (
                        <form action={handleClear}>
                            <button
                                type="submit"
                                className="group flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-600 shadow-sm transition-all duration-300 hover:border-red-200 hover:bg-red-50 hover:text-red-600 hover:shadow-md"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    className="h-4 w-4 transition-transform group-hover:rotate-12"
                                >
                                    <path d="M3 6h18" />
                                    <path d="M8 6V4h8v2" />
                                    <path d="M19 6l-1 14H6L5 6" />
                                </svg>

                                Clear all
                            </button>
                        </form>
                    )}

                </div>


                {/* =========================================
                    EMPTY HISTORY
                ========================================== */}
                {items.length === 0 ? (

                    <div className="relative overflow-hidden rounded-3xl border border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-white px-6 py-16 text-center">

                        <div className="absolute left-1/2 top-0 h-32 w-32 -translate-x-1/2 rounded-full bg-red-500/5 blur-3xl" />

                        <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={1.8}
                                className="h-8 w-8"
                            >
                                <path d="M12 6v6l4 2" />
                                <circle cx="12" cy="12" r="9" />
                            </svg>

                        </div>

                        <h3 className="relative mt-5 text-lg font-bold text-gray-800">
                            No reading history yet
                        </h3>

                        <p className="relative mt-2 text-sm text-gray-500">
                            আপনি কোনো খবর পড়লে সেটি এখানে দেখা যাবে।
                        </p>

                        <Link
                            href="/"
                            className="relative mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-red-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-red-200 transition-all duration-300 hover:-translate-y-0.5 hover:from-red-600 hover:to-red-700 hover:shadow-xl"
                        >
                            Browse News

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                className="h-4 w-4"
                            >
                                <path d="M5 12h14" />
                                <path d="m13 6 6 6-6 6" />
                            </svg>

                        </Link>

                    </div>

                ) : (

                    /* =========================================
                       HISTORY LIST
                    ========================================== */
                    <ul className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg shadow-gray-100">

                        {items.map((item, index) => (

                            <li
                                key={item.newsId}
                                className="group relative flex items-center gap-4 border-b border-gray-100 p-4 last:border-b-0 sm:p-5"
                            >

                                {/* Hover indicator */}
                                <div className="absolute left-0 top-0 h-full w-1 origin-left scale-y-0 bg-red-600 transition-transform duration-300 group-hover:scale-y-100" />


                                {/* =========================
                                    NEWS IMAGE
                                ========================== */}
                                {item.image && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={item.image}
                                        alt=""
                                        className="hidden h-20 w-28 shrink-0 rounded-xl object-cover shadow-sm transition-transform duration-300 group-hover:scale-[1.03] sm:block"
                                    />
                                )}


                                {/* =========================
                                    NEWS INFORMATION
                                ========================== */}
                                <Link
                                    href={`/details/${item.newsId}`}
                                    className="min-w-0 flex-1"
                                >

                                    <div className="mb-1 flex items-center gap-2">

                                        <span className="text-[10px] font-black uppercase tracking-wider text-red-500">
                                            #{index + 1}
                                        </span>

                                        <span className="h-1 w-1 rounded-full bg-gray-300" />

                                        <span className="text-[10px] font-medium text-gray-400">
                                            News
                                        </span>

                                    </div>

                                    <p className="line-clamp-2 text-sm font-bold leading-6 text-gray-900 transition-colors group-hover:text-red-600 sm:text-base">
                                        {item.title}
                                    </p>

                                    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-gray-400">

                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={1.8}
                                            className="h-3.5 w-3.5"
                                        >
                                            <circle cx="12" cy="12" r="9" />
                                            <path d="M12 7v5l3 2" />
                                        </svg>

                                        Read on {formatDate(item.readAt)}

                                    </p>

                                </Link>


                                {/* =========================
                                    REMOVE BUTTON
                                ========================== */}
                                <form action={handleRemove}>

                                    <input
                                        type="hidden"
                                        name="newsId"
                                        value={item.newsId}
                                    />

                                    <button
                                        type="submit"
                                        title="Remove from history"
                                        aria-label="Remove from history"
                                        className="group/remove cursor-pointer rounded-xl border border-transparent p-2.5 text-gray-400 transition-all duration-300 hover:border-red-100 hover:bg-red-50 hover:text-red-500"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="h-5 w-5 transition-transform duration-300 group-hover/remove:rotate-90"
                                            aria-hidden="true"
                                        >
                                            <line
                                                x1="18"
                                                y1="6"
                                                x2="6"
                                                y2="18"
                                            />
                                            <line
                                                x1="6"
                                                y1="6"
                                                x2="18"
                                                y2="18"
                                            />
                                        </svg>
                                    </button>

                                </form>

                            </li>

                        ))}

                    </ul>

                )}

            </section>

        </div>
    );
};

export default ProfilePage;
