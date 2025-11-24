import generatePageMetadata from "@/lib/utils/seo";


export const metadata = generatePageMetadata({
  title: "Executions",
  description:
    "View and analyze workflow executions in Synapse. Monitor run history, inspect agent activity, debug failures, and track real-time automation performance across your AI workflows.",
  image: "/og-executions.jpg",
  url: "/executions",
  schemaType: "WebPage",
});

export default function Page() {
  return (
    <>Executions</>
  )
}
