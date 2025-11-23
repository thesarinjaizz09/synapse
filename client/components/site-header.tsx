"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { SIDEBAR_MAIN_NAVIGATION } from "@/constants/sidebar";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import { SidebarIcon } from "lucide-react";

export function SiteHeader() {
  const { toggleSidebar } = useSidebar();
  const breadcrumbs = useBreadcrumbs(SIDEBAR_MAIN_NAVIGATION);

  console.log("Breadcrumbs:", breadcrumbs);

  return (
    <header className="bg-background sticky top-0 z-50 w-full border-b">
      <div className="flex h-(--header-height) items-center w-full">
        <Button
          className="h-8 w-8 ml-2"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>

        <Separator orientation="vertical" className="h-4 mx-2" />

        <Breadcrumb className="hidden sm:block ml-2">
          <BreadcrumbList>
            {breadcrumbs.map((crumb, i) => (
              <>
                <BreadcrumbItem key={i} className="text-white text-[12.5px]">
                  {crumb.url ? (
                    <BreadcrumbLink href={crumb.url} key={i}>
                      <span className="hover:underline tracking-wide ">

                        {crumb.title}
                      </span>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage key={i}>
                      <span className="tracking-wide text-muted-foreground">{crumb.title}</span></BreadcrumbPage>
                  )}
                </BreadcrumbItem>

                {i < breadcrumbs.length - 1 && <BreadcrumbSeparator key={`sep-${i}`} />}
              </>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}
