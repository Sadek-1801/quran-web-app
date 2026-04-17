export interface Verse {
  id: number;
  text: string;
  translation: string;
  transliteration?: string;
}

export interface Surah {
  id: number;
  name: string;
  transliteration: string;
  translation: string;
  type: "meccan" | "medinan";
  total_verses: number;
  verses: Verse[];
}

export interface ChapterInfo {
  id: number;
  name: string;
  transliteration: string;
  translation: string;
  type: "meccan" | "medinan";
  total_verses: number;
}

export interface AppSettings {
  arabicFont: "amiri" | "scheherazade" | "noto-naskh";
  arabicFontSize: number;
  translationFontSize: number;
  translationLang: "en" | "bn";
}

export interface JuzInfo {
  juz: number;
  surahId: number;
  verseId: number;
  name: string;
}

export interface SearchResult {
  surahId: number;
  surahTransliteration: string;
  verseNumber: number;
  text: string;
  translation: string;
}
