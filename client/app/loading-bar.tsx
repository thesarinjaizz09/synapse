"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export default function LoadingBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Customize speed & style
  NProgress.configure({
    showSpinner: false,  // remove spinner
    trickleSpeed: 200,
  });

  useEffect(() => {
    NProgress.start();

    // slight timeout to simulate smooth transition
    const timer = setTimeout(() => {
      NProgress.done();
    }, 150);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return null;
}
