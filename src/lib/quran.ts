import quranEn from "@/data/quran_en.json";
import quranBn from "@/data/quran_bn.json";
import chaptersEn from "@/data/chapters_en.json";
import type { Surah, ChapterInfo } from "@/types";

const quranDataEn = quranEn as Surah[];
const quranDataBn = quranBn as Surah[];
const chapters = chaptersEn as ChapterInfo[];

export function getAllChapters(): ChapterInfo[] {
  return chapters;
}

export function getSurahById(id: number, lang: "en" | "bn" = "en"): Surah | undefined {
  const data = lang === "bn" ? quranDataBn : quranDataEn;
  return data.find((surah) => surah.id === id);
}

export function getAllSurahIds(): number[] {
  return chapters.map((ch) => ch.id);
}

export function searchVerses(query: string, lang: "en" | "bn" = "en", limit: number = 20) {
  if (query.length < 3) return [];
  const data = lang === "bn" ? quranDataBn : quranDataEn;
  const lowerQuery = query.toLowerCase();
  const results: Array<{
    surahId: number;
    surahTransliteration: string;
    verseNumber: number;
    text: string;
    translation: string;
  }> = [];

  for (const surah of data) {
    for (let i = 0; i < surah.verses.length; i++) {
      if (results.length >= limit) return results;
      const verse = surah.verses[i];
      if (verse.translation.toLowerCase().includes(lowerQuery)) {
        results.push({
          surahId: surah.id,
          surahTransliteration: surah.transliteration,
          verseNumber: i + 1,
          text: verse.text,
          translation: verse.translation,
        });
      }
    }
  }
  return results;
}
