"use client";
import { useSettingsContext } from "@/context/SettingsContext";
import { getArabicFontClass } from "@/lib/utils";
import type { Verse } from "@/types";

interface AyatCardProps {
  verse: Verse;
  verseBn?: Verse;
  verseNumber: number;
}

export function AyatCard({ verse, verseBn, verseNumber }: AyatCardProps) {
  const { settings, isLoaded } = useSettingsContext();

  const fontClass = getArabicFontClass(settings.arabicFont);
  const translation = settings.translationLang === "bn" && verseBn
    ? verseBn.translation
    : verse.translation;

  return (
    <article className="border-b border-border py-6 last:border-b-0">
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary text-xs font-semibold mt-2">
          {verseNumber}
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
            className={`text-gray-700 leading-relaxed transition-font ${!isLoaded ? "opacity-0" : "opacity-100"}`}
            style={{ fontSize: `${settings.translationFontSize}px` }}
          >
            {translation}
          </p>
        </div>
      </div>
    </article>
  );
}
