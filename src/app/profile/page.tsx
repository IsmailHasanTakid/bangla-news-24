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
            <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />

            <div className="relative mx-auto max-w-4xl px-4 pb-20 pt-6 sm:px-6">
                {/* Top bar */}
                <header className="mb-8 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-md">
                    <div>
                        <p className="text-base font-bold tracking-tight text-white">
                            Bangla News 24
                        </p>
                        <p className="text-xs text-slate-400">My Profile</p>
                    </div>

                    <Link
                        href="/"
                        className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-blue-400/40 hover:bg-blue-500/10 hover:text-white"
                    >
                        <Home className="h-4 w-4" />
                        Home
                    </Link>
                </header>

                {/* Profile card */}
                <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                        {/* Avatar */}
                        <div className="shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-[3px]">
                            {user.image ? (

                                <img
                                    src={user.image}
                                    alt={user.name || "User"}
                                    referrerPolicy="no-referrer"
                                    className="h-24 w-24 rounded-full border-4 border-slate-950 object-cover"
                                />
                            ) : (
                                <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-slate-950 bg-slate-900 text-4xl font-bold text-white">
                                    {(user.name || user.email || "U")
                                        .charAt(0)
                                        .toUpperCase()}
                                </div>
                            )}
                        </div>

                        {/* User info */}
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                                <h1 className="truncate text-2xl font-bold text-white sm:text-3xl">
                                    {user.name}
                                </h1>
                                {user.emailVerified && (
                                    <BadgeCheck className="h-6 w-6 shrink-0 text-blue-400" />
                                )}
                            </div>

                            <div className="mt-3 space-y-1.5 text-sm text-slate-400">
                                <p className="flex items-center gap-2 break-all">
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

                                <p className="flex items-center gap-2">
                                    <CalendarDays className="h-4 w-4 shrink-0" />
                                    Joined {formatDate(user.createdAt)}
                                </p>
                            </div>
                        </div>

                        {/* News read count */}
                        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 px-5 py-4">
                            <BookOpen className="h-7 w-7 text-blue-300" />
                            <div>
                                <p className="text-3xl font-bold leading-none text-white">
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
                <section className="mt-10">
                    <div className="mb-5 flex items-end justify-between gap-3">
                        <div>
                            <h2 className="text-xl font-bold text-white">
                                Reading History
                            </h2>
                            <p className="mt-1 text-sm text-slate-400">
                                আপনার পড়া খবরগুলো এখানে দেখতে পারবেন
                            </p>
                        </div>

                        {items.length > 0 && (
                            <form action={handleClear}>
                                <button
                                    type="submit"
                                    className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-300"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    Clear all
                                </button>
                            </form>
                        )}
                    </div>

                    {items.length === 0 ? (
                        // Empty state
                        <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 px-6 py-14 text-center backdrop-blur-md">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-300">
                                <Clock className="h-7 w-7" />
                            </div>

                            <h3 className="mt-4 text-lg font-semibold text-white">
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
                        <ul className="space-y-3">
                            {items.map((item) => (
                                <li
                                    key={item.newsId}
                                    className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition hover:border-blue-400/30 hover:bg-white/10"
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

                                        <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                                            <Clock className="h-3.5 w-3.5" />
                                            Read on {formatDate(item.readAt)}
                                        </p>
                                    </Link>

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