import {
    BookOpen,
    Bot,
    Settings2,
    SquareTerminal,
    LifeBuoy,
    Send,
} from "lucide-react"

export const SIDEBAR_MAIN_NAVIGATION = [
    {
        title: "Playground",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: [
            {
                title: "Dashboard",
                url: "/boards",
            },
            {
                title: "Workflows",
                url: "/workflows",
            },
            {
                title: "Executions",
                url: "/executions",
            },
        ],
    },
    {
        title: "Assistants",
        url: "#",
        icon: Bot,
        items: [
            {
                title: "Genesis",
                url: "#",
            },
            {
                title: "Explorer",
                url: "#",
            },
            {
                title: "Quantum",
                url: "#",
            },
        ],
    },
    {
        title: "Documentation",
        url: "#",
        icon: BookOpen,
        items: [
            {
                title: "Introduction",
                url: "#",
            },
            {
                title: "Get Started",
                url: "#",
            },
            {
                title: "Tutorials",
                url: "#",
            },
            {
                title: "Changelog",
                url: "#",
            },
        ],
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings2,
        items: [
            {
                title: "Team",
                url: "#",
            },
            {
                title: "General",
                url: "#",
            },
            {
                title: "Credentials",
                url: "#",
            },
        ],
    },
]

export const SIDEBAR_SECONDARY_NAVIGATION = [
    {
        title: "Support",
        url: "#",
        icon: LifeBuoy,
    },
    {
        title: "Feedback",
        url: "#",
        icon: Send,
    },
]