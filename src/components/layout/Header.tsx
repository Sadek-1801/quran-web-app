"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { BookOpen, Menu, Search, Settings, X, Loader2 } from "lucide-react";
import { SettingsPanel } from "@/components/settings/SettingsPanel";
import { SearchResults } from "@/components/search/SearchResults";
import { useSearch } from "@/hooks/useSearch";

interface HeaderProps {
  navOpen: boolean;
  onToggleNav: () => void;
}

export function Header({ navOpen, onToggleNav }: HeaderProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const { query, setQuery, results, isSearching } = useSearch();

  const closeSettings = useCallback(() => setSettingsOpen(false), []);

  useEffect(() => {
    if (!settingsOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSettings();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [settingsOpen, closeSettings]);

  useEffect(() => {
    if (!searchExpanded) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchExpanded(false);
        setQuery("");
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [searchExpanded, setQuery]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4 flex h-14 items-center justify-between">
          {/* Left: logo */}
          <Link
            href="/"
            className={`flex items-center gap-2 text-primary font-bold text-lg shrink-0 ${searchExpanded ? "hidden sm:flex" : "flex"}`}
          >
            <BookOpen className="h-5 w-5" />
            <span className="hidden sm:inline">Quran App</span>
          </Link>

          {/* Search bar: centered on mobile, right-aligned on desktop */}
          <div className={`relative w-full max-w-[300px] mx-auto sm:mx-4 sm:ml-auto sm:mr-2 ${searchExpanded ? "flex" : "hidden sm:flex"}`}>
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search translations..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-lg border border-border bg-background py-2 pl-10 pr-10 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                aria-label="Search the Quran"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {isSearching && (
              <div className="absolute inset-x-0 top-full mt-1 rounded-lg border border-border bg-card p-4 shadow-lg z-50 flex items-center justify-center gap-2 text-sm text-gray-500">
                <Loader2 className="h-4 w-4 animate-spin" />
                Searching...
              </div>
            )}

            {!isSearching && query.length >= 3 && (
              <SearchResults
                results={results}
                query={query}
                onClear={() => {
                  setQuery("");
                  setSearchExpanded(false);
                }}
              />
            )}
          </div>

          {/* Right: search toggle (mobile) + settings + nav toggle */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setSearchExpanded((v) => !v)}
              className="cursor-pointer sm:hidden rounded-md p-1.5 text-gray-600 hover:bg-gray-100 hover:text-primary transition-colors"
              aria-label="Toggle search"
            >
              {searchExpanded ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setSettingsOpen(true)}
              className="cursor-pointer rounded-md p-1.5 text-gray-600 hover:bg-gray-100 hover:text-primary transition-colors"
              aria-label="Open settings"
            >
              <Settings className="h-4 w-4" />
            </button>
            <button
              onClick={onToggleNav}
              className="cursor-pointer xl:hidden rounded-md p-1.5 text-gray-600 hover:bg-gray-100 hover:text-primary transition-colors"
              aria-label={navOpen ? "Close navigation" : "Open navigation"}
            >
              {navOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Settings dialog (centered) */}
      {settingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setSettingsOpen(false)}
          />
          <div
            className="relative w-full max-w-md max-h-[85vh] bg-card rounded-xl shadow-2xl overflow-hidden flex flex-col animate-scale-in"
            role="dialog"
            aria-label="Settings"
          >
            <div className="flex items-center justify-between p-4 border-b border-border shrink-0">
              <h2 className="text-lg font-semibold">Settings</h2>
              <button
                onClick={() => setSettingsOpen(false)}
                className="cursor-pointer rounded-md p-1 hover:bg-gray-100 transition-colors"
                aria-label="Close settings"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="overflow-y-auto">
              <SettingsPanel />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
