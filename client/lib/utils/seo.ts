import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; // <-- change to your production domain
const DEFAULT_IMAGE = `${BASE_URL}/og-default.jpg`;

function isAbsoluteUrl(u: string): boolean {
    return /^https?:\/\//i.test(u);
}

const defaultMetadata: Metadata = {
    metadataBase: new URL(BASE_URL),
    title: {
        default: "AlphaFusion Terminal",
        template: "%s - AlphaFusion Terminal",
    },
    description:
        "AlphaFusion Terminal – Your AI-powered trading ecosystem for equities, assets and more. Analyze live markets, forecast AI-driven signals, manage portfolios, and automate trades seamlessly.",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: BASE_URL,
        siteName: "AlphaFusion Terminal",
        title: "AlphaFusion Terminal",
        description:
            "Your AI-powered trading ecosystem for equities, assets, and more — combining real-time analytics with autonomous trading intelligence.",
        images: [
            {
                url: DEFAULT_IMAGE,
                width: 1200,
                height: 630,
                alt: "AlphaFusion Terminal - AI Trading Platform",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        site: "@AlphaFusionAI",
        creator: "@AlphaFusionAI",
        title: "AlphaFusion Terminal",
        description:
            "Your AI-powered trading ecosystem for equities, assets, and more — combining real-time analytics with autonomous trading intelligence.",
        images: [DEFAULT_IMAGE],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    icons: {
        icon: "/favicon.ico",
        apple: "/apple-touch-icon.png",
    },
    alternates: {
        canonical: BASE_URL,
    },
    category: "Finance & Technology",
};


export function generatePageMetadata(options?: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    schemaType?: "WebPage" | "Article" | "Product" | "SoftwareApplication";
}): Metadata {
    const {
        title,
        description,
        image = DEFAULT_IMAGE,
        url = BASE_URL,
        schemaType = "WebPage",
    } = options || {};

    const fullTitle = title
        ? `${title} - AlphaFusion Terminal`
        : "AlphaFusion Terminal";

    const metaDescription =
        description ||
        "AlphaFusion Terminal – AI-powered trading ecosystem for equities, assets and more.";

    // Structured data (JSON-LD)
    const structuredData = {
        "@context": "https://schema.org",
        "@type": schemaType,
        name: title || "AlphaFusion Terminal",
        description: metaDescription,
        url: isAbsoluteUrl(url) ? url : `${BASE_URL}${url}`,
        image: isAbsoluteUrl(image) ? image : `${BASE_URL}${image}`,
        publisher: {
            "@type": "Organization",
            name: "AlphaFusion Corporation",
            logo: {
                "@type": "ImageObject",
                url: `${BASE_URL}/public/alphafusion.png`,
            },
        },
        inLanguage: "en",
    };

    return {
        ...defaultMetadata,
        title: fullTitle,
        description: metaDescription,
        openGraph: {
            ...defaultMetadata.openGraph,
            title: fullTitle,
            description: metaDescription,
            url,
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: title || "AlphaFusion Terminal",
                },
            ],
        },
        twitter: {
            ...defaultMetadata.twitter,
            title: fullTitle,
            description: metaDescription,
            images: [image],
        },
        alternates: {
            canonical: url,
        },
        // Inject JSON-LD script for Google + AI crawlers
        other: {
            "script:type:application/ld+json": JSON.stringify(structuredData),
        },
    };
}

export default generatePageMetadata;