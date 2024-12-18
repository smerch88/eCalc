import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './page-sections/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                sm: '480px',
                md: '768px',
                xl: '1200px',
                smOnly: { max: '767.98px' },
                mdOnly: { min: '768px', max: '1199.98px' },
                notXl: { max: '1199.98px' },
            },
        },
        backgroundImage: {
            hero: "image-set(url('/bgImages/hero.png') 1x,url('/bgImages/hero@2x.png') 2x);",
            heroMd: "image-set(url('/bgImages/heroMd.png') 1x,url('/bgImages/heroMd@2x.png') 2x);",
            heroLg: "image-set(url('/bgImages/heroLg.png') 1x,url('/bgImages/heroLg@2x.png') 2x);",
        },
        extend: {
            colors: {
                success: '#225C07',
                failure: 'red',
                background: 'hsl(var(--background))',
                background_header: '#ADADAD',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                footer_title: 'hsl(var(--footer-text))',
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                placeholder: 'hsl(var(--placeholder))',
                tooltip: 'hsl(var(--tooltip))',
                ring: 'hsl(var(--ring))',
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))',
                },
            },
            borderRadius: {
                xlg: 'var(--header-radius)',
                lg: 'var(--radius)',
                xmd: 'var(--mobile-radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            spacing: {
                header_spacing: 'var(--header-spacing)',
            },
            backgroundPosition: {
                'center-right': 'calc(100% - 15%) center',
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
};
export default config;
