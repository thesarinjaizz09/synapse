import { WorkflowsContainer, WorkflowsTable } from "@/features/workflows/components/workflows"
import { workflowParamsLoader } from "@/features/workflows/server/params-loader"
import { prefetchWorkflows } from "@/features/workflows/server/prefetch"
import { HydrateClient } from "@/trpc/server"
import type { SearchParams } from "nuqs/server"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

type PageProps = {
  searchParams: Promise<SearchParams>
}

export default async function Page({ searchParams }: PageProps) {
  const params = await workflowParamsLoader(searchParams)
  prefetchWorkflows(params)

  return (
    <WorkflowsContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<div>Failed to load workflows.</div>}>
          <Suspense fallback={<div>Loading workflows...</div>}>
            <WorkflowsTable />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient >
    </WorkflowsContainer>
  )
}
