"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight, X } from "lucide-react";
import { formatSurahNumber, getJuzHref } from "@/lib/utils";
import { JUZ_DATA, AYAHS_PER_PAGE } from "@/lib/constants";
import type { ChapterInfo } from "@/types";

type Tab = "surahs" | "juz" | "goto";

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

  const tabs: { key: Tab; label: string }[] = [
    { key: "surahs", label: "Surahs" },
    { key: "juz", label: "Juz" },
    { key: "goto", label: "Go To" },
  ];

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
        <div className="flex items-center justify-between px-2 shrink-0 border-b border-border">
          <div className="flex items-center flex-1 justify-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`cursor-pointer text-sm font-medium px-3 py-3 border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? "border-primary text-primary"
                    : "border-transparent text-foreground/50 hover:text-foreground/70 hover:border-foreground/20"
                }`}
              >
                {tab.label}
              </button>
            ))}
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
          {activeTab === "surahs" && (
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
          )}

          {activeTab === "juz" && (
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

          {activeTab === "goto" && (
            <GoToPanel chapters={chapters} onNavigate={onClose} />
          )}
        </nav>
      </aside>
    </>
  );
}

function GoToPanel({ chapters, onNavigate }: { chapters: ChapterInfo[]; onNavigate: () => void }) {
  const router = useRouter();
  const [selectedSurah, setSelectedSurah] = useState(1);
  const [ayahInput, setAyahInput] = useState("");
  const [surahFilter, setSurahFilter] = useState("");

  const currentChapter = chapters.find((ch) => ch.id === selectedSurah);
  const maxVerse = currentChapter?.total_verses || 1;

  const filteredChapters = surahFilter
    ? chapters.filter(
        (ch) =>
          ch.transliteration.toLowerCase().includes(surahFilter.toLowerCase()) ||
          ch.name.includes(surahFilter) ||
          ch.id.toString() === surahFilter
      )
    : chapters;

  function handleGo() {
    const verse = parseInt(ayahInput, 10);
    const validVerse = !isNaN(verse) && verse >= 1 && verse <= maxVerse ? verse : undefined;

    if (validVerse) {
      const href = getJuzHref(selectedSurah, validVerse, AYAHS_PER_PAGE);
      router.push(href);
    } else {
      router.push(`/surah/${selectedSurah}`);
    }
    onNavigate();
  }

  return (
    <div className="p-4 space-y-4">
      <p className="text-xs text-foreground/50">Jump to a specific surah and ayah</p>

      {/* Surah search */}
      <div>
        <label className="block text-xs font-medium text-foreground/60 mb-1.5">Surah</label>
        <input
          type="text"
          placeholder="Search surah..."
          value={surahFilter}
          onChange={(e) => setSurahFilter(e.target.value)}
          className="w-full rounded-md border border-border bg-background text-foreground text-sm px-3 py-2 placeholder:text-foreground/30 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary mb-2"
        />
        <div className="max-h-48 overflow-y-auto rounded-md border border-border">
          {filteredChapters.map((ch) => (
            <button
              key={ch.id}
              onClick={() => {
                setSelectedSurah(ch.id);
                setAyahInput("");
                setSurahFilter("");
              }}
              className={`cursor-pointer w-full text-left px-3 py-2 text-sm flex items-center gap-2 transition-colors ${
                selectedSurah === ch.id
                  ? "bg-primary-light text-primary font-medium"
                  : "text-foreground/70 hover:bg-foreground/5"
              }`}
            >
              <span className="text-xs text-foreground/40 w-6 text-right shrink-0">{ch.id}</span>
              <span className="truncate">{ch.transliteration}</span>
              <span className="text-xs text-foreground/40 ml-auto shrink-0">{ch.total_verses}v</span>
            </button>
          ))}
          {filteredChapters.length === 0 && (
            <p className="px-3 py-4 text-sm text-foreground/40 text-center">No match</p>
          )}
        </div>
      </div>

      {/* Ayah input */}
      <div>
        <label className="block text-xs font-medium text-foreground/60 mb-1.5">
          Ayah <span className="text-foreground/30">(1–{maxVerse})</span>
        </label>
        <input
          type="number"
          min={1}
          max={maxVerse}
          placeholder="Optional"
          value={ayahInput}
          onChange={(e) => setAyahInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleGo(); }}
          className="w-full rounded-md border border-border bg-background text-foreground text-sm px-3 py-2 placeholder:text-foreground/30 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Selected info + Go button */}
      <div className="flex items-center gap-2 pt-1">
        <div className="flex-1 text-sm text-foreground/60 truncate">
          {currentChapter?.transliteration}
          {ayahInput && ` : ${ayahInput}`}
        </div>
        <button
          onClick={handleGo}
          className="cursor-pointer flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
        >
          Go
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
