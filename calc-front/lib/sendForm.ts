export async function sendFormToTelegramBot(data: { [p: string]: string; createdAt: string }) {
    const res = await fetch('api/tlg', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error(`Помилка сервера: ${res.statusText}`);
    }

    return res.json();
}
