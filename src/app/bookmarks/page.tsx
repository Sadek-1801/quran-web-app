"use client";
import Link from "next/link";
import { Bookmark, Trash2 } from "lucide-react";
import { useBookmarks } from "@/context/BookmarkContext";
import { AYAHS_PER_PAGE } from "@/lib/constants";
import { getJuzHref } from "@/lib/utils";

export default function BookmarksPage() {
  const { bookmarks, removeBookmark, clearBookmarks } = useBookmarks();

  const sorted = [...bookmarks].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <main className="min-h-screen">
      <section className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Bookmarks</h1>
            <p className="text-sm text-foreground/50 mt-1">
              {sorted.length} saved verse{sorted.length !== 1 ? "s" : ""}
            </p>
          </div>
          {sorted.length > 0 && (
            <button
              onClick={clearBookmarks}
              className="cursor-pointer flex items-center gap-1.5 text-sm text-foreground/50 hover:text-red-600 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Clear all
            </button>
          )}
        </div>

        {sorted.length === 0 ? (
          <div className="text-center py-16">
            <Bookmark className="h-12 w-12 text-foreground/20 mx-auto mb-4" />
            <p className="text-foreground/50 mb-2">No bookmarks yet</p>
            <p className="text-sm text-foreground/40">
              Tap the bookmark icon on any verse to save it here
            </p>
            <Link
              href="/"
              className="inline-block mt-4 text-sm text-primary hover:underline"
            >
              Browse Surahs
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {sorted.map((b) => {
              const page = Math.ceil(b.verseNumber / AYAHS_PER_PAGE);
              const href = getJuzHref(b.surahId, b.verseNumber, AYAHS_PER_PAGE);
              return (
                <div
                  key={`${b.surahId}-${b.verseNumber}`}
                  className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 group"
                >
                  <Link
                    href={href}
                    className="flex-1 min-w-0"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-primary">
                        {b.surahName}
                      </span>
                      <span className="text-xs text-foreground/40">
                        {b.surahId}:{b.verseNumber}
                      </span>
                    </div>
                    <p className="text-xs text-foreground/40 mt-0.5">
                      Page {page} &middot; Saved {new Date(b.timestamp).toLocaleDateString()}
                    </p>
                  </Link>
                  <button
                    onClick={() => removeBookmark(b.surahId, b.verseNumber)}
                    className="cursor-pointer p-1.5 rounded text-foreground/30 opacity-0 group-hover:opacity-100 hover:text-red-600 transition-all"
                    aria-label="Remove bookmark"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
