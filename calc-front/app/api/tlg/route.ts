import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const tgbot = process.env.NEXT_TELEGRAM_TOKEN;
    const channelId = process.env.NEXT_TELEGRAM_CHANNEL_ID;

    if (!tgbot) {
        return NextResponse.json({ message: 'Telegram token not provided' }, { status: 500 });
    }

    const data = await req.json();
    const messageToBot = `
<b>Name:</b> ${data?.name}%0A
<b>Email:</b> ${data?.email}%0A
<b>Message:</b> ${data?.message}%0A
<b>Created At:</b> ${data?.createdAt}
`;

    try {
        const response = await fetch(
            `https://api.telegram.org/bot${tgbot}/sendMessage?chat_id=${channelId}&text=${messageToBot}&parse_mode=HTML`
        );

        if (!response.ok) {
            throw new Error(`Telegram API error: ${response.statusText}`);
        }

        const result = await response.json();
        return NextResponse.json({ data: result });
    } catch (error) {
        console.error('Error sending message to Telegram:', error);
        return NextResponse.json({ message: 'Failed to send message' }, { status: 500 });
    }
}
