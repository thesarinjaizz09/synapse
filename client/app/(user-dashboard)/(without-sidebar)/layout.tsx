import React from "react";
import { isAuthenticated } from "@/lib/auth/utils";

export default async function UserDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    await isAuthenticated();
    
    return children;
}
