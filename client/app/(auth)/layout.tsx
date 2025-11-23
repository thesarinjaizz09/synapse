
import React from "react";
import Image from "next/image";
import appLogo from "@/public/alphafusion.png"
import { generatePageMetadata } from "@/lib/utils/seo"
import Link from "next/link";

export const metadata = generatePageMetadata({
  title: "Authentication",
  description:
    "Access your secure AlphaFusion Terminal account using your credentials. Enterprise-grade encryption ensures complete data protection for traders and institutions.",
  image: "/og-auth.jpg",
  url: "/auth",
  schemaType: "WebPage",
});

const AuthLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="grid min-h-svh grid-cols-1 lg:grid-cols-[37fr_63fr]">
      <div className="flex flex-col gap-4 p-6 md:p-10 w-full h-full rounded-sm">
        <div className="flex justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <Image src={appLogo} alt="AlphaFusion Corporation" width={32} className="p-2 border-none rounded-sm bg-primary" />
            <div className="grid flex-1 text-left leading-tight text-primary-foreground">
              <span className="truncate text-md text-primary-foreground">Alphafusion</span>
              <span className="truncate text-xs text-gray-400">Synapse</span>
            </div>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full">
            {children}
          </div>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground border-t pt-4 border-primary">
          <span>© {new Date().getFullYear()} AlphaFusion Corporation</span>
          <span>v1.0.0 • Secure Login</span>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <video
          src="/backgrounds/auth/auth.bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.6] dark:grayscale"
        />
      </div>
    </div>
  )
}

export default AuthLayout