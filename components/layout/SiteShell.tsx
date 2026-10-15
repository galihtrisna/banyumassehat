"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { AmbientGlow } from "./AmbientGlow";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  const isAdmin = pathname.startsWith("/admin");
  const isLogin = pathname.startsWith("/login");

  // Dashboard & Admin Workspace layout: Dedicated workspace with custom sidebar, no public navbar/footer
  if (isDashboard || isAdmin) {
    return (
      <div className="min-h-screen bg-slate-50/70 text-on-surface relative">
        <AmbientGlow />
        {children}
      </div>
    );
  }

  // Standalone Login layout: No public navbar
  if (isLogin) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-on-surface relative">
        <AmbientGlow />
        <main className="w-full flex-1 flex flex-col">{children}</main>
      </div>
    );
  }

  // Public portal layout
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface relative">
      <AmbientGlow />
      <Header />
      <main className="w-full pt-20 flex-1">{children}</main>
      <Footer />
    </div>
  );
}
