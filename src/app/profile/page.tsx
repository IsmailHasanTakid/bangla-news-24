import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import {
    Home,
    Trash2,
    X,
    Clock,
    BadgeCheck,
    BookOpen,
    CalendarDays,
    Mail,
    ChevronRight,
} from "lucide-react";
import {
    clearHistory,
    getHistory,
    removeFromHistory,
} from "@/lib/history";


const formatDate = (date: Date | string) =>
    new Date(date).toLocaleString("bn-BD", {
        dateStyle: "medium",
        timeStyle: "short",
    });

const ProfilePage = async () => {

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/signin");
    }

    const user = session.user;


    const items = await getHistory(user.id);


    async function handleClear() {
        "use server";

        const s = await auth.api.getSession({
            headers: await headers(),
        });

        if (!s) return;

        await clearHistory(s.user.id);
        revalidatePath("/profile");
    }


    async function handleRemove(formData: FormData) {
        "use server";

        const s = await auth.api.getSession({
            headers: await headers(),
        });

        if (!s) return;

        await removeFromHistory(s.user.id, String(formData.get("newsId")));
        revalidatePath("/profile");
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
            {/* Background glow */}
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl sm:h-96 sm:w-96" />
            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-purple-600/20 blur-3xl sm:h-96 sm:w-96" />

            <div className="relative mx-auto max-w-4xl px-3 pb-14 pt-4 sm:px-6 sm:pb-20 sm:pt-6">
                {/* Top bar */}
                <header className="mb-5 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 backdrop-blur-md sm:mb-8 sm:px-5 sm:py-3">
                    <div className="min-w-0">
                        <p className="truncate text-sm font-bold tracking-tight text-white sm:text-base">
                            Bangla News 24
                        </p>
                        <p className="text-xs text-slate-400">My Profile</p>
                    </div>

                    <Link
                        href="/"
                        className="flex shrink-0 items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:border-blue-400/40 hover:bg-blue-500/10 hover:text-white sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
                    >
                        <Home className="h-4 w-4" />
                        Home
                    </Link>
                </header>

                {/* Profile card */}
                <section className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl sm:rounded-3xl sm:p-8">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
                        {/* Avatar */}
                        <div className="mx-auto shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-[3px] sm:mx-0">
                            {user.image ? (

                                <img
                                    src={user.image}
                                    alt={user.name || "User"}
                                    referrerPolicy="no-referrer"
                                    className="h-20 w-20 rounded-full border-4 border-slate-950 object-cover sm:h-24 sm:w-24"
                                />
                            ) : (
                                <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-slate-950 bg-slate-900 text-3xl font-bold text-white sm:h-24 sm:w-24 sm:text-4xl">
                                    {(user.name || user.email || "U")
                                        .charAt(0)
                                        .toUpperCase()}
                                </div>
                            )}
                        </div>

                        {/* User info */}
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-center gap-2 sm:justify-start">
                                <h1 className="truncate text-xl font-bold text-white sm:text-3xl">
                                    {user.name}
                                </h1>
                                {user.emailVerified && (
                                    <BadgeCheck className="h-5 w-5 shrink-0 text-blue-400 sm:h-6 sm:w-6" />
                                )}
                            </div>

                            <div className="mt-3 space-y-1.5 text-xs text-slate-400 sm:text-sm">
                                <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 break-all sm:justify-start">
                                    <Mail className="h-4 w-4 shrink-0" />
                                    {user.email}
                                    <span
                                        className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${user.emailVerified
                                            ? "bg-emerald-500/15 text-emerald-300"
                                            : "bg-amber-500/15 text-amber-300"
                                            }`}
                                    >
                                        {user.emailVerified
                                            ? "Verified"
                                            : "Not verified"}
                                    </span>
                                </p>

                                <p className="flex items-center justify-center gap-2 sm:justify-start">
                                    <CalendarDays className="h-4 w-4 shrink-0" />
                                    Joined {formatDate(user.createdAt)}
                                </p>
                            </div>
                        </div>

                        {/* News read count */}
                        <div className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 px-5 py-3 sm:justify-start sm:py-4">
                            <BookOpen className="h-6 w-6 text-blue-300 sm:h-7 sm:w-7" />
                            <div>
                                <p className="text-2xl font-bold leading-none text-white sm:text-3xl">
                                    {items.length}
                                </p>
                                <p className="mt-1 text-xs text-slate-300">
                                    News read
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Reading history */}
                <section className="mt-8 sm:mt-10">
                    <div className="mb-4 flex items-end justify-between gap-3 sm:mb-5">
                        <div className="min-w-0">
                            <h2 className="text-lg font-bold text-white sm:text-xl">
                                Reading History
                            </h2>
                            <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                                আপনার পড়া খবরগুলো এখানে দেখতে পারবেন
                            </p>
                        </div>

                        {items.length > 0 && (
                            <form action={handleClear} className="shrink-0">
                                <button
                                    type="submit"
                                    className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-300 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    Clear all
                                </button>
                            </form>
                        )}
                    </div>

                    {items.length === 0 ? (
                        // Empty state
                        <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 px-4 py-10 text-center backdrop-blur-md sm:rounded-3xl sm:px-6 sm:py-14">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-300">
                                <Clock className="h-7 w-7" />
                            </div>

                            <h3 className="mt-4 text-base font-semibold text-white sm:text-lg">
                                No reading history yet
                            </h3>

                            <p className="mt-1 text-sm text-slate-400">
                                আপনি এখনও কোনো আর্টিকেল পড়েননি।

                            </p>

                            <Link
                                href="/"
                                className="mt-6 inline-flex items-center gap-1 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-900/40 transition hover:opacity-90"
                            >
                                Browse News
                                <ChevronRight className="h-4 w-4" />
                            </Link>
                        </div>
                    ) : (
                        <ul className="space-y-2.5 sm:space-y-3">
                            {items.map((item) => (
                                <li
                                    key={item.newsId}
                                    className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-md transition hover:border-blue-400/30 hover:bg-white/10 sm:gap-4 sm:p-4"
                                >
                                    {item.image && (

                                        <img
                                            src={item.image}
                                            alt=""
                                            className="hidden h-16 w-24 shrink-0 rounded-xl object-cover sm:block"
                                        />
                                    )}

                                    <Link
                                        href={`/details/${item.newsId}`}
                                        className="min-w-0 flex-1"
                                    >
                                        <p className="line-clamp-2 text-sm font-semibold leading-6 text-slate-100 transition group-hover:text-blue-300 sm:text-base">
                                            {item.title}
                                        </p>

                                        <p className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-500 sm:text-xs">
                                            <Clock className="h-3.5 w-3.5 shrink-0" />
                                            Read on {formatDate(item.readAt)}
                                        </p>
                                    </Link>

                                    <form action={handleRemove} className="shrink-0">
                                        <input
                                            type="hidden"
                                            name="newsId"
                                            value={item.newsId}
                                        />

                                        <button
                                            type="submit"
                                            title="Remove from history"
                                            aria-label="Remove from history"
                                            className="cursor-pointer rounded-xl p-2 text-slate-500 transition hover:bg-red-500/10 hover:text-red-400"
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                    </form>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </div>
    );
};

export default ProfilePage;