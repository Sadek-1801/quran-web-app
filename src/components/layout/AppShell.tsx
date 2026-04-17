"use client";
import { useState, useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { NavigationSidebar } from "./NavigationSidebar";
import { Footer } from "./Footer";
import type { ChapterInfo } from "@/types";

interface AppShellProps {
  chapters: ChapterInfo[];
  children: ReactNode;
}

export function AppShell({ chapters, children }: AppShellProps) {
  const [navOpen, setNavOpen] = useState(false);
  const pathname = usePathname();

  // Close nav on route change (mobile/tablet)
  useEffect(() => {
    setNavOpen(false);
  }, [pathname]);

  return (
    <>
      <Header navOpen={navOpen} onToggleNav={() => setNavOpen((v) => !v)} />
      <div className="flex flex-1 min-h-0">
        <NavigationSidebar
          chapters={chapters}
          open={navOpen}
          onClose={() => setNavOpen(false)}
        />
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </div>
    </>
  );
}
