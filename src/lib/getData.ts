export async function getData<T>(url: string): Promise<T | null> {
    try {
        const res = await fetch(url, {
            next: { revalidate: 600 },
        });
        if (!res.ok) return null;

        return (await res.json()) as T;
    } catch {
        return null;
    }
}