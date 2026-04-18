"use client";
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { Bookmark } from "@/types";

const BOOKMARKS_KEY = "quran-app-bookmarks";

interface BookmarkContextType {
  bookmarks: Bookmark[];
  isBookmarked: (surahId: number, verseNumber: number) => boolean;
  toggleBookmark: (surahId: number, surahName: string, verseNumber: number) => void;
  removeBookmark: (surahId: number, verseNumber: number) => void;
  clearBookmarks: () => void;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(BOOKMARKS_KEY);
      if (stored) setBookmarks(JSON.parse(stored));
    } catch (e) {
      console.error("Failed to load bookmarks:", e);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
      } catch (e) {
        console.error("Failed to save bookmarks:", e);
      }
    }
  }, [bookmarks, isLoaded]);

  const isBookmarked = useCallback(
    (surahId: number, verseNumber: number) =>
      bookmarks.some((b) => b.surahId === surahId && b.verseNumber === verseNumber),
    [bookmarks]
  );

  const toggleBookmark = useCallback(
    (surahId: number, surahName: string, verseNumber: number) => {
      setBookmarks((prev) => {
        const exists = prev.some((b) => b.surahId === surahId && b.verseNumber === verseNumber);
        if (exists) {
          return prev.filter((b) => !(b.surahId === surahId && b.verseNumber === verseNumber));
        }
        return [...prev, { surahId, surahName, verseNumber, timestamp: Date.now() }];
      });
    },
    []
  );

  const removeBookmark = useCallback(
    (surahId: number, verseNumber: number) => {
      setBookmarks((prev) =>
        prev.filter((b) => !(b.surahId === surahId && b.verseNumber === verseNumber))
      );
    },
    []
  );

  const clearBookmarks = useCallback(() => {
    setBookmarks([]);
  }, []);

  return (
    <BookmarkContext.Provider
      value={{ bookmarks, isBookmarked, toggleBookmark, removeBookmark, clearBookmarks }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks(): BookmarkContextType {
  const context = useContext(BookmarkContext);
  if (!context) throw new Error("useBookmarks must be used within BookmarkProvider");
  return context;
}
