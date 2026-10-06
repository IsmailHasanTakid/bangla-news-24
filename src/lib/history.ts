import { db } from "@/lib/auth";

const history = db.collection("read_history");

export type HistoryItem = {
    newsId: string;
    title: string;
    image: string | null;
    readAt: Date;
};

// কেউ details পেজ খুললে এটা চলবে। আবার পড়লে নতুন entry না হয়ে সময় আপডেট হবে।
export async function recordRead(params: {
    userId: string;
    newsId: string;
    title: string;
    image?: string | null;
}) {
    const { userId, newsId, title, image } = params;

    await history.updateOne(
        { userId, newsId },
        { $set: { title, image: image ?? null, readAt: new Date() } },
        { upsert: true }
    );
}

export async function getHistory(userId: string, limit = 50): Promise<HistoryItem[]> {
    const docs = await history
        .find({ userId })
        .sort({ readAt: -1 })
        .limit(limit)
        .toArray();

    return docs.map((d) => ({
        newsId: d.newsId as string,
        title: d.title as string,
        image: (d.image as string | null) ?? null,
        readAt: d.readAt as Date,
    }));
}

export async function removeFromHistory(userId: string, newsId: string) {
    await history.deleteOne({ userId, newsId });
}

export async function clearHistory(userId: string) {
    await history.deleteMany({ userId });
}