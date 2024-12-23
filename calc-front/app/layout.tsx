import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Header } from '@/components/Header';
import cn from 'classnames';
import { Footer } from '@/components/Footer';
import { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';

const montserrat = localFont({
    src: [
        { path: './fonts/Montserrat-Regular.woff', weight: '400', style: 'normal' },
        { path: './fonts/Montserrat-Regular.woff2', weight: '400', style: 'normal' },
        { path: './fonts/Montserrat-SemiBold.woff', weight: '600', style: 'normal' },
        { path: './fonts/Montserrat-SemiBold.woff2', weight: '600', style: 'normal' },
        { path: './fonts/Montserrat-Bold.woff', weight: '700', style: 'normal' },
        { path: './fonts/Montserrat-Bold.woff2', weight: '700', style: 'normal' },
    ],
    variable: '--montserrat',
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
                url: '/e-calc.png',
                width: 652,
                height: 287,
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
        <html lang="uk">
            <head>
                {/* Google Tag Manager */}
                <Script
                    id="gtm-script"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
            (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),
                    dl=l!='dataLayer' ? '&l='+l : '';
                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id=' + '${process.env.NEXT_PUBLIC_GTM_ID}' + dl;
                f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
        `,
                    }}
                />
            </head>
            <body className={cn(montserrat.variable, 'antialiased')}>
                <noscript>
                    <iframe
                        src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
                        height="0"
                        width="0"
                        className="hidden"
                    ></iframe>
                </noscript>
                <Header />
                {children}
                <Analytics />
                <SpeedInsights />
                <Footer />
            </body>
        </html>
    );
}
