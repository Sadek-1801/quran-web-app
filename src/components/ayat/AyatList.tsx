"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AyatCard } from "./AyatCard";
import { AYAHS_PER_PAGE } from "@/lib/constants";
import type { Surah } from "@/types";

interface AyatListProps {
  surahEn: Surah;
  surahBn: Surah | null;
  currentPage: number;
  totalPages: number;
}

export function AyatList({ surahEn, surahBn, currentPage, totalPages }: AyatListProps) {
  const topRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const startIndex = (currentPage - 1) * AYAHS_PER_PAGE;
  const endIndex = Math.min(startIndex + AYAHS_PER_PAGE, surahEn.verses.length);
  const verses = surahEn.verses.slice(startIndex, endIndex);
  const versesBn = surahBn?.verses.slice(startIndex, endIndex);

  const showPagination = totalPages > 1;

  // Scroll to top on page change (but not on first render)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);

  function pageHref(page: number) {
    return page === 1
      ? `/surah/${surahEn.id}`
      : `/surah/${surahEn.id}?page=${page}`;
  }

  return (
    <div className="container mx-auto px-4 py-6" ref={topRef}>
      {/* Surah header */}
      <div className="mb-6">
        <Link href="/" className="text-sm text-primary hover:underline mb-2 inline-block">
          &larr; All Surahs
        </Link>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">{surahEn.transliteration}</h1>
          <p className="text-3xl font-amiri text-primary mt-1" dir="rtl" lang="ar">
            {surahEn.name}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {surahEn.translation} &middot; {surahEn.total_verses} verses &middot;{" "}
            <span className="capitalize">{surahEn.type}</span>
          </p>
        </div>
      </div>

      {/* Bismillah — only on page 1, not for Al-Fatihah (1) or At-Tawbah (9) */}
      {currentPage === 1 && surahEn.id !== 1 && surahEn.id !== 9 && (
        <div className="text-center py-4 mb-2">
          <p className="text-2xl font-amiri text-primary" dir="rtl" lang="ar">
            بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
          </p>
        </div>
      )}

      {/* Ayah range indicator */}
      {showPagination && (
        <p className="text-center text-xs text-gray-400 mb-4">
          Ayahs {startIndex + 1}–{endIndex} of {surahEn.total_verses}
        </p>
      )}

      {/* Verses */}
      <div className="max-w-3xl mx-auto">
        {verses.map((verse, i) => (
          <AyatCard
            key={verse.id}
            verse={verse}
            verseBn={versesBn?.[i]}
            verseNumber={startIndex + i + 1}
          />
        ))}
      </div>

      {/* Pagination controls */}
      {showPagination && (
        <div className="flex items-center justify-center gap-1 mt-8 pt-4 border-t border-border flex-wrap">
          {/* Previous */}
          {currentPage > 1 ? (
            <Link
              href={pageHref(currentPage - 1)}
              className="cursor-pointer flex items-center gap-1 rounded-md px-3 py-2 text-sm text-primary hover:bg-primary-light transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Prev</span>
            </Link>
          ) : (
            <span className="flex items-center gap-1 rounded-md px-3 py-2 text-sm text-gray-300">
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Prev</span>
            </span>
          )}

          {/* Page numbers */}
          <PageNumbers
            currentPage={currentPage}
            totalPages={totalPages}
            surahId={surahEn.id}
          />

          {/* Next */}
          {currentPage < totalPages ? (
            <Link
              href={pageHref(currentPage + 1)}
              className="cursor-pointer flex items-center gap-1 rounded-md px-3 py-2 text-sm text-primary hover:bg-primary-light transition-colors"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <span className="flex items-center gap-1 rounded-md px-3 py-2 text-sm text-gray-300">
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4" />
            </span>
          )}
        </div>
      )}

      {/* Surah navigation */}
      <nav className="flex items-center justify-between mt-6 pt-4 border-t border-border">
        {surahEn.id > 1 ? (
          <Link
            href={`/surah/${surahEn.id - 1}`}
            className="flex items-center gap-1 text-sm text-primary hover:underline"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous Surah
          </Link>
        ) : (
          <span />
        )}
        {surahEn.id < 114 ? (
          <Link
            href={`/surah/${surahEn.id + 1}`}
            className="flex items-center gap-1 text-sm text-primary hover:underline"
          >
            Next Surah
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}

/** Renders page number buttons with ellipsis for large page counts */
function PageNumbers({
  currentPage,
  totalPages,
  surahId,
}: {
  currentPage: number;
  totalPages: number;
  surahId: number;
}) {
  function pageHref(page: number) {
    return page === 1 ? `/surah/${surahId}` : `/surah/${surahId}?page=${page}`;
  }

  const pages = getVisiblePages(currentPage, totalPages);

  return (
    <div className="flex items-center gap-1">
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="px-1 text-sm text-gray-400">
            &hellip;
          </span>
        ) : (
          <Link
            key={p}
            href={pageHref(p as number)}
            className={`cursor-pointer min-w-[2rem] rounded-md px-2 py-1.5 text-center text-sm transition-colors ${
              p === currentPage
                ? "bg-primary text-white font-medium"
                : "text-gray-600 hover:bg-gray-100 hover:text-primary"
            }`}
          >
            {p}
          </Link>
        )
      )}
    </div>
  );
}

/**
 * Returns an array of page numbers and "..." to display.
 * Always shows first, last, current, and 1 neighbor on each side.
 * Mobile-friendly: max ~7 items.
 */
function getVisiblePages(current: number, total: number): (number | "...")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [];
  const nearby = new Set<number>();

  nearby.add(1);
  nearby.add(total);
  for (let d = -1; d <= 1; d++) {
    const p = current + d;
    if (p >= 1 && p <= total) nearby.add(p);
  }

  const sorted = [...nearby].sort((a, b) => a - b);

  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
      pages.push("...");
    }
    pages.push(sorted[i]);
  }

  return pages;
}
