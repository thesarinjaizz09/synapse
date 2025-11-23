import React from "react";
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { isAuthenticated } from "@/lib/auth/utils";
import type { User } from "better-auth";

export default async function UserDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user } = await isAuthenticated();

    return (
        <div className="[--header-height:calc(--spacing(14))]">
            <SidebarProvider className="flex flex-col">
                <SiteHeader />
                <div className="flex flex-1">
                    <AppSidebar {...user} />
                    <SidebarInset>
                        {children}
                    </SidebarInset>
                </div>
            </SidebarProvider>
        </div>
    );
}
