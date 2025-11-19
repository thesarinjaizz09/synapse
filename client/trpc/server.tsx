import 'server-only';
import { cache } from 'react';
import { createTRPCContext } from './init';
import { appRouter } from './routers/_app';
import { makeQueryClient } from './query-client';
import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query';

export const getQueryClient = cache(makeQueryClient);
export const trpc = createTRPCOptionsProxy({
  ctx: createTRPCContext,
  router: appRouter,
  queryClient: getQueryClient,
});