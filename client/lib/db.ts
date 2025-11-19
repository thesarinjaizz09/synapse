import { PrismaClient } from "./generated/prisma/client";

const globalPrismaClient = global as unknown as {
    prismaClient?: PrismaClient;
};

const prismaClient = globalPrismaClient.prismaClient || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalPrismaClient.prismaClient = prismaClient;

export default prismaClient;