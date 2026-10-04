export async function getData(url: string) {
    try {
        const res = await fetch(url);
        const text = await res.text();
        return JSON.parse(text);
    } catch {
        return null;
    }
}