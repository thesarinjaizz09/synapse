import { createTRPCRouter } from '../init';
import { workflowsRouter } from '@/server/workflows/router';


export const appRouter = createTRPCRouter({
  workflows: workflowsRouter
});

export type AppRouter = typeof appRouter;