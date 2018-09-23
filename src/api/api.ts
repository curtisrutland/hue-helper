export async function get<T>(url: string) {
    const response = await fetch(url);
    return await response.json() as T
}

export async function put<T>(url: string, data: any) {
    const response = await fetch(url, {
        body: JSON.stringify(data),
        method: "PUT",
        mode: "cors"
    });
    return await response.json() as T;
}

export function delay(ms: number): Promise<void> {
    return new Promise(res => setTimeout(res, ms));
}