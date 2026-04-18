"use client";
import { Bookmark } from "lucide-react";
import { useSettingsContext } from "@/context/SettingsContext";
import { useBookmarks } from "@/context/BookmarkContext";
import { getArabicFontClass } from "@/lib/utils";
import type { Verse } from "@/types";

interface AyatCardProps {
  verse: Verse;
  verseBn?: Verse;
  verseNumber: number;
  surahId: number;
  surahName: string;
}

export function AyatCard({ verse, verseBn, verseNumber, surahId, surahName }: AyatCardProps) {
  const { settings, isLoaded } = useSettingsContext();
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const fontClass = getArabicFontClass(settings.arabicFont);
  const translation = settings.translationLang === "bn" && verseBn
    ? verseBn.translation
    : verse.translation;
  const bookmarked = isBookmarked(surahId, verseNumber);

  return (
    <article id={`ayah-${verseNumber}`} className="group border-b border-border py-6 last:border-b-0 scroll-mt-16">
      <div className="flex items-start gap-3">
        <div className="flex flex-col items-center gap-1.5 shrink-0 mt-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-light text-primary text-xs font-semibold">
            {verseNumber}
          </div>
          <button
            onClick={() => toggleBookmark(surahId, surahName, verseNumber)}
            className={`cursor-pointer p-1 rounded transition-colors ${
              bookmarked
                ? "text-accent"
                : "text-foreground/15 hover:text-accent"
            }`}
            aria-label={bookmarked ? "Remove bookmark" : "Bookmark this verse"}
          >
            <Bookmark className={`h-4 w-4 ${bookmarked ? "fill-current" : ""}`} />
          </button>
        </div>
        <div className="flex-1 min-w-0 space-y-3">
          <p
            className={`arabic-text transition-font ${fontClass} ${!isLoaded ? "opacity-0" : "opacity-100"}`}
            dir="rtl"
            lang="ar"
            style={{ fontSize: `${settings.arabicFontSize}px` }}
          >
            {verse.text}
          </p>
          <p
            className={`text-foreground/70 leading-relaxed transition-font ${!isLoaded ? "opacity-0" : "opacity-100"}`}
            style={{ fontSize: `${settings.translationFontSize}px` }}
          >
            {translation}
          </p>
        </div>
      </div>
    </article>
  );
}
