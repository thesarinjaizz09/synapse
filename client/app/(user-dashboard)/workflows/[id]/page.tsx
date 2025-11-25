import { CanvasContainer, CanvasError, CanvasLoader } from "@/features/canvas/components/canvas"
import { prefetchWorkflow } from "@/features/workflows/server/prefetch"
import { HydrateClient } from "@/trpc/server"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

interface PageProps {
  params: Promise<{
    id: string
  }>
}
const page = async ({ params }: PageProps) => {
  const { id } = await params
  prefetchWorkflow(id)

  return (
    <HydrateClient>
      <CanvasContainer id={id}>
        <ErrorBoundary fallback={<CanvasError />}>
          <Suspense fallback={<CanvasLoader />}>
            <div>Workflow Canvas : {id}</div>
          </Suspense>
        </ErrorBoundary>
      </CanvasContainer>
    </HydrateClient >
  )
}

export default page