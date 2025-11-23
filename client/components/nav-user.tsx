"use client"

import {
  LogOutIcon,
  User,
} from "lucide-react"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Spinner } from "./ui/spinner"
import { useLogout } from "@/hooks/use-logout"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { logout, loading } = useLogout()

  return (
    <>
      {/* Logout Progress Dialog */}
      <Dialog open={loading}>
        <DialogContent className="sm:max-w-md border border-border/50 shadow-lg" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-center flex items-center justify-start gap-x-2">
              <Spinner />
              Logging out
            </DialogTitle>
            <DialogDescription className="text-left text-muted-foreground">
              Please wait while we securely end your session.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog >

      {/* Sidebar User Menu */}
      <SidebarMenu >
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex items-center justify-center shadow-inner border p-2 h-auto"
          >
            <div className="border py-2 px-1 h-full rounded-sm bg-muted">
              <User className="h-[14px]  " />
            </div>
            <div className="grid flex-1 text-left text-[13px] tracking-wide">
              <span className="truncate font-semibold text-primary-foreground">{user.name}</span>
              <span className="truncate text-[10px] text-muted-foreground">{user.email}</span>
            </div>
            <LogOutIcon className="ml-auto size-3 text-emerald-100/80" onClick={logout} />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu >
    </>
  )
}
