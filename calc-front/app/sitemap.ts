import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: process.env.HOSTNAME || 'https://www.e-calc.tech/',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: process.env.HOSTNAME || 'https://www.e-calc.tech/about-us',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: process.env.HOSTNAME || 'https://www.e-calc.tech/contacts',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
    ];
}
