"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

type NavItem = {
  title: string;
  url: string;
  icon?: any;
  items?: { title: string; url: string }[];
};

export function useBreadcrumbs(navMain: NavItem[]) {
  const pathname = usePathname();

  return useMemo(() => {
    let breadcrumbs: { title: string; url?: string }[] = [];

    for (const section of navMain) {
      // If direct match
      if (section.url === pathname) {
        breadcrumbs.push({ title: section.title, url: section.url });
        return breadcrumbs;
      }

      // If match inside children
      if (section.items) {
        const match = section.items.find((item) => item.url === pathname);

        if (match) {
          breadcrumbs.push({
            title: section.title,
            url: section.url !== "#" ? section.url : undefined,
          });

          breadcrumbs.push({
            title: match.title,
            url: match.url,
          });

          return breadcrumbs;
        }
      }
    }

    return breadcrumbs;
  }, [pathname, navMain]);
}
