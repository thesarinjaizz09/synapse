import { WorkflowsError, WorkflowsLoader, WorkflowsContainer, WorkflowsTable } from "@/features/workflows/components/workflows"
import { workflowParamsLoader } from "@/features/workflows/server/params-loader"
import { prefetchWorkflows } from "@/features/workflows/server/prefetch"
import generatePageMetadata from "@/lib/utils/seo"
import { HydrateClient } from "@/trpc/server"
import type { SearchParams } from "nuqs/server"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

export const metadata = generatePageMetadata({
  title: "Workflows",
  description:
    "Create, manage, and automate intelligent workflows in Synapse. Build multi-step agentic processes, orchestrate AI reasoning, and streamline automation across your entire workspace.",
  image: "/og-workflows.jpg",
  url: "/workflows",
  schemaType: "WebPage",
});


type PageProps = {
  searchParams: Promise<SearchParams>
}

export default async function Page({ searchParams }: PageProps) {
  const params = await workflowParamsLoader(searchParams)
  prefetchWorkflows(params)

  return (
    <HydrateClient>
      <WorkflowsContainer>
        <ErrorBoundary fallback={<WorkflowsError />}>
          <Suspense fallback={<WorkflowsLoader />}>
            <WorkflowsTable />
          </Suspense>
        </ErrorBoundary>
      </WorkflowsContainer>
    </HydrateClient >
  )
}
