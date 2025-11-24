import generatePageMetadata from "@/lib/utils/seo";

export const metadata = generatePageMetadata({
  title: "Dashboards",
  description:
    "Explore real-time dashboards in Synapse to visualize workflow activity, agent performance, execution metrics, and system health. Gain deep insights into your automation ecosystem at a glance.",
  image: "/og-dashboards.jpg",
  url: "/boards",
  schemaType: "WebPage",
});

export default function Page() {
  return (
    <>Dashboard</>
  )
}
