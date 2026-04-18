"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { formatSurahNumber, getJuzHref } from "@/lib/utils";
import { JUZ_DATA, AYAHS_PER_PAGE } from "@/lib/constants";
import type { ChapterInfo } from "@/types";

type Tab = "surahs" | "juz";

interface NavigationSidebarProps {
  chapters: ChapterInfo[];
  open: boolean;
  onClose: () => void;
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function NavigationSidebar({ chapters, open, onClose, activeTab, onTabChange: setActiveTab }: NavigationSidebarProps) {
  const pathname = usePathname();

  const activeSurahId = pathname.startsWith("/surah/")
    ? parseInt(pathname.split("/")[2], 10)
    : null;

  return (
    <>
      {/* Mobile/Tablet overlay backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 xl:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-14 bottom-0 left-0 z-40 w-72 bg-card border-r border-border
          flex flex-col transition-transform duration-300 ease-in-out
          xl:sticky xl:top-14 xl:z-0 xl:translate-x-0 xl:h-[calc(100vh-3.5rem)]
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header with tabs */}
        <div className="flex items-center justify-between px-4 shrink-0 border-b border-border">
          <div className="flex items-center flex-1 justify-center gap-4">
            <button
              onClick={() => setActiveTab("surahs")}
              className={`cursor-pointer text-sm font-medium px-4 py-3 border-b-2 transition-colors ${
                activeTab === "surahs"
                  ? "border-primary text-primary"
                  : "border-transparent text-foreground/50 hover:text-foreground/70 hover:border-foreground/20"
              }`}
            >
              Surahs
            </button>
            <button
              onClick={() => setActiveTab("juz")}
              className={`cursor-pointer text-sm font-medium px-4 py-3 border-b-2 transition-colors ${
                activeTab === "juz"
                  ? "border-primary text-primary"
                  : "border-transparent text-foreground/50 hover:text-foreground/70 hover:border-foreground/20"
              }`}
            >
              Juz
            </button>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer xl:hidden p-1 text-foreground/40 hover:text-foreground/60 transition-colors"
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable list */}
        <nav className="flex-1 overflow-y-auto overscroll-contain">
          {activeTab === "surahs" ? (
            <ul className="py-1">
              {chapters.map((ch) => {
                const isActive = activeSurahId === ch.id;
                return (
                  <li key={ch.id}>
                    <Link
                      href={`/surah/${ch.id}`}
                      onClick={onClose}
                      className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                        isActive
                          ? "bg-primary-light text-primary font-medium"
                          : "text-foreground/70 hover:bg-foreground/5 hover:text-primary"
                      }`}
                    >
                      <span className="w-8 text-center text-xs text-foreground/40 shrink-0">
                        {formatSurahNumber(ch.id)}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="truncate">{ch.transliteration}</span>
                          <span className="text-sm font-amiri text-primary/70 shrink-0" dir="rtl" lang="ar">
                            {ch.name}
                          </span>
                        </div>
                        <span className="text-xs text-foreground/40">
                          {ch.total_verses} ayahs &middot; <span className="capitalize">{ch.type}</span>
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <ul className="py-1">
              {JUZ_DATA.map((juz) => {
                const chapter = chapters.find((ch) => ch.id === juz.surahId);
                return (
                  <li key={juz.juz}>
                    <Link
                      href={getJuzHref(juz.surahId, juz.verseId, AYAHS_PER_PAGE)}
                      onClick={onClose}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground/70 hover:bg-foreground/5 hover:text-primary transition-colors"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary text-xs font-semibold">
                        {juz.juz}
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className="block font-medium truncate">{juz.name}</span>
                        <span className="text-xs text-foreground/40">
                          {chapter?.transliteration || `Surah ${juz.surahId}`} &middot; Ayah {juz.verseId}
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </nav>
      </aside>
    </>
  );
}
