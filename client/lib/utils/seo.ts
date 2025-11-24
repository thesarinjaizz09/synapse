import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const DEFAULT_IMAGE = `${BASE_URL}/og-synapse-default.jpg`;

function isAbsoluteUrl(u: string): boolean {
    return /^https?:\/\//i.test(u);
}

const defaultMetadata: Metadata = {
    metadataBase: new URL(BASE_URL),
    title: {
        default: "Synapse – AI Agentic Workflow Builder",
        template: "%s - Synapse",
    },
    description:
        "Synapse is an advanced AI agentic workflow builder that lets you create automated, intelligent, multi-step workflows powered by real-time AI reasoning, tools, APIs, and data orchestration.",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: BASE_URL,
        siteName: "Synapse",
        title: "Synapse – AI Agentic Workflow Builder",
        description:
            "Build autonomous agent workflows that think, plan, act, and execute complex tasks across APIs, data pipelines, and integrations.",
        images: [
            {
                url: DEFAULT_IMAGE,
                width: 1200,
                height: 630,
                alt: "Synapse – AI Agentic Workflow Builder",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        site: "@AlphaFusionAI",
        creator: "@AlphaFusionAI",
        title: "Synapse – AI Agentic Workflow Builder",
        description:
            "Create intelligent agent workflows that automate tasks, orchestrate APIs, and perform autonomous actions with AI-driven reasoning.",
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
    category: "AI Automation & Workflow Orchestration",
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

    const fullTitle = title ? `${title} - Synapse` : "Synapse";

    const metaDescription =
        description ||
        "Synapse is the AI agentic workflow builder that lets you design autonomous, intelligent workflows with real-time reasoning and automation.";

    // JSON-LD structured data
    const structuredData = {
        "@context": "https://schema.org",
        "@type": schemaType,
        name: title || "Synapse – AI Agentic Workflow Builder",
        description: metaDescription,
        url: isAbsoluteUrl(url) ? url : `${BASE_URL}${url}`,
        image: isAbsoluteUrl(image) ? image : `${BASE_URL}${image}`,
        publisher: {
            "@type": "Organization",
            name: "AlphaFusion Corporation",
            logo: {
                "@type": "ImageObject",
                url: `${BASE_URL}/alphafusion.png`,
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
                    alt: title || "Synapse – AI Agentic Workflow Builder",
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
        other: {
            "script:type:application/ld+json": JSON.stringify(structuredData),
        },
    };
}

export default generatePageMetadata;
