"use client"

import { useState } from "react"
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
  User,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { signOut } from "@/lib/auth/client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Spinner } from "./ui/spinner"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await signOut({
        fetchOptions: {
          onError: (ctx) => {
            toast.error(ctx.error.message)
            setIsLoggingOut(false)
          },
          onSuccess: () => {
            router.push("/auth")
            setIsLoggingOut(false)
            toast.success("Logged out successfully")
          },
        },
      })
    } catch (error) {
      setIsLoggingOut(false)
      toast.error("Something went wrong while logging out.")
    }
  }

  return (
    <>
      {/* Logout Progress Dialog */}
      <Dialog open={isLoggingOut}>
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
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
                <ChevronsUpDown className="ml-auto size-3 text-emerald-100/80" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            {/* <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Sparkles />
                  Upgrade to Pro
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <BadgeCheck />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell />
                  Notifications
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent> */}
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu >
    </>
  )
}
