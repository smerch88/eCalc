import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Header } from '@/components/Header';
import cn from 'classnames';
import { Footer } from '@/components/Footer';
import { ReactNode } from 'react';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
});

export const metadata: Metadata = {
    title: 'E-calculator. Легко контролюйте своє споживання електроенергії.',
    description:
        'E-calculator допомагає вам відстежувати та оптимізувати споживання електроенергії. Використовуйте наші інструменти для розрахунку енергоспоживання різних приладів та заощаджуйте на комунальних платежах.',
    icons: [
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '96x96',
            url: '/favicon/favicon-96x96.png',
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '192x192',
            url: '/favicon/web-app-manifest-192x192.png',
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '512x512',
            url: '/favicon/web-app-manifest-512x512.png',
        },
        {
            rel: 'apple-touch-icon',
            sizes: '180x180',
            url: '/favicon/apple-touch-icon.png',
        },
    ],
    manifest: '/favicon/site.webmanifest',
    openGraph: {
        images: [
            {
                url: '/favicon/web-app-manifest-512x512.png',
                width: 512,
                height: 512,
                alt: 'logo E-calculator',
            },
        ],
        title: 'E-calculator. Легко контролюйте своє споживання електроенергії.',
        description:
            'E-calculator допомагає вам відстежувати та оптимізувати споживання електроенергії. Використовуйте наші інструменти для розрахунку енергоспоживання різних приладів та заощаджуйте на комунальних платежах.',
        siteName: 'E-calculator',
        locale: 'uk-UA',
        type: 'website',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={cn(geistSans.variable, geistMono.variable, 'antialiased')}>
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}
