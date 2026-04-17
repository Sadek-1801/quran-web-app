"use client";
import Link from "next/link";
import { highlightMatch } from "@/lib/utils";
import type { SearchResult } from "@/types";

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
  onClear: () => void;
}

export function SearchResults({ results, query, onClear }: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className="absolute inset-x-0 top-full mt-1 rounded-lg border border-border bg-card p-4 shadow-lg z-30 text-center text-sm text-foreground/50">
        No results found for &ldquo;{query}&rdquo;
      </div>
    );
  }

  return (
    <div className="absolute inset-x-0 top-full mt-1 rounded-lg border border-border bg-card shadow-lg z-30 max-h-96 overflow-y-auto">
      <div className="p-2 text-xs text-foreground/40 border-b border-border">
        {results.length} result{results.length !== 1 ? "s" : ""} found
      </div>
      {results.map((result, i) => {
        const parts = highlightMatch(result.translation, query);
        return (
          <Link
            key={`${result.surahId}-${result.verseNumber}-${i}`}
            href={`/surah/${result.surahId}`}
            onClick={onClear}
            className="block px-4 py-3 hover:bg-foreground/5 border-b border-border last:border-b-0 transition-colors"
          >
            <div className="flex items-center gap-2 text-xs text-primary font-medium mb-1">
              <span>{result.surahTransliteration}</span>
              <span className="text-foreground/40">{result.surahId}:{result.verseNumber}</span>
            </div>
            <p className="text-sm text-foreground/70 line-clamp-2">
              {parts.map((part, j) =>
                part.highlighted ? (
                  <mark key={j} className="bg-accent/30 text-foreground rounded px-0.5">
                    {part.text}
                  </mark>
                ) : (
                  <span key={j}>{part.text}</span>
                )
              )}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
