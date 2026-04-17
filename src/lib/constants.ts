import type { AppSettings, JuzInfo } from "@/types";

export const STORAGE_KEY = "quran-app-settings";

export const DEFAULT_SETTINGS: AppSettings = {
  arabicFont: "amiri",
  arabicFontSize: 28,
  translationFontSize: 16,
  translationLang: "en",
  darkMode: false,
};

export const FONT_OPTIONS = [
  { value: "amiri", label: "Amiri", description: "Classic Naskh" },
  { value: "scheherazade", label: "Scheherazade New", description: "Elegant" },
  { value: "noto-naskh", label: "Noto Naskh Arabic", description: "Modern" },
] as const;

export const FONT_SIZE_RANGE = {
  arabic: { min: 20, max: 48, step: 2 },
  translation: { min: 12, max: 28, step: 1 },
} as const;

export const AYAHS_PER_PAGE = 20;

export const TRANSLATION_OPTIONS = [
  { value: "en", label: "English", source: "Saheeh International" },
  { value: "bn", label: "বাংলা (Bengali)", source: "Muhiuddin Khan" },
] as const;

export const JUZ_DATA: JuzInfo[] = [
  { juz: 1,  surahId: 1,  verseId: 1,   name: "Alif Lam Mim" },
  { juz: 2,  surahId: 2,  verseId: 142, name: "Sayaqul" },
  { juz: 3,  surahId: 2,  verseId: 253, name: "Tilkar Rusul" },
  { juz: 4,  surahId: 3,  verseId: 93,  name: "Lan Tanaloo" },
  { juz: 5,  surahId: 4,  verseId: 24,  name: "Wal Muhsanat" },
  { juz: 6,  surahId: 4,  verseId: 148, name: "La Yuhibbullah" },
  { juz: 7,  surahId: 5,  verseId: 82,  name: "Wa Iza Samiu" },
  { juz: 8,  surahId: 6,  verseId: 111, name: "Wa Lau Annana" },
  { juz: 9,  surahId: 7,  verseId: 88,  name: "Qalal Malau" },
  { juz: 10, surahId: 8,  verseId: 41,  name: "Wa A'lamu" },
  { juz: 11, surahId: 9,  verseId: 93,  name: "Ya'tazirun" },
  { juz: 12, surahId: 11, verseId: 6,   name: "Wa Mamin Dabbah" },
  { juz: 13, surahId: 12, verseId: 53,  name: "Wa Ma Ubarri'u" },
  { juz: 14, surahId: 15, verseId: 1,   name: "Rubama" },
  { juz: 15, surahId: 17, verseId: 1,   name: "Subhanallazi" },
  { juz: 16, surahId: 18, verseId: 75,  name: "Qal Alam" },
  { juz: 17, surahId: 21, verseId: 1,   name: "Iqtaraba" },
  { juz: 18, surahId: 23, verseId: 1,   name: "Qad Aflaha" },
  { juz: 19, surahId: 25, verseId: 21,  name: "Wa Qalallazina" },
  { juz: 20, surahId: 27, verseId: 56,  name: "A'man Khalaqa" },
  { juz: 21, surahId: 29, verseId: 46,  name: "Utlu Ma Uhiya" },
  { juz: 22, surahId: 33, verseId: 31,  name: "Wa Mayyaqnut" },
  { juz: 23, surahId: 36, verseId: 28,  name: "Wa Mali" },
  { juz: 24, surahId: 39, verseId: 32,  name: "Faman Azlamu" },
  { juz: 25, surahId: 41, verseId: 47,  name: "Ilaihi Yuraddu" },
  { juz: 26, surahId: 46, verseId: 1,   name: "Ha Mim" },
  { juz: 27, surahId: 51, verseId: 31,  name: "Qala Fama" },
  { juz: 28, surahId: 58, verseId: 1,   name: "Qad Sami Allah" },
  { juz: 29, surahId: 67, verseId: 1,   name: "Tabarakallazi" },
  { juz: 30, surahId: 78, verseId: 1,   name: "Amma Yatasa'alun" },
];
