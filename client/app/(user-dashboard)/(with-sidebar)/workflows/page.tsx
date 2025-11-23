import { WorkflowsContainer, WorkflowsTable } from "@/features/workflows/components/workflows"
import { prefetchWorkflows } from "@/features/workflows/server/prefetch"
import { HydrateClient } from "@/trpc/server"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

export default async function Page() {
  prefetchWorkflows()

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
