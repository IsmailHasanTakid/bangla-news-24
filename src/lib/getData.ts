export async function getData<T>(url: string): Promise<T | null> {
    try {
        const res = await fetch(url);

        const text = await res.text();

        return JSON.parse(text) as T;
    } catch {
        return null;
    }
}