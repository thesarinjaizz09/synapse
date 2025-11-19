import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prismaClient from "../db";
import { UserRole } from "../generated/prisma/enums";

export const auth = betterAuth({
    database: prismaAdapter(prismaClient, {
        provider: 'postgresql'
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: true
    },
    user: {
        additionalFields: {
            role: {
                type: ["USER", "ADMIN"] as Array<UserRole>,
                input: false
            }
        }
    }
});