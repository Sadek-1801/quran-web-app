export function highlightMatch(text: string, query: string): Array<{ text: string; highlighted: boolean }> {
  if (!query || query.length < 3) return [{ text, highlighted: false }];
  const parts: Array<{ text: string; highlighted: boolean }> = [];
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  let lastIndex = 0;
  let index = lowerText.indexOf(lowerQuery);

  while (index !== -1) {
    if (index > lastIndex) parts.push({ text: text.slice(lastIndex, index), highlighted: false });
    parts.push({ text: text.slice(index, index + query.length), highlighted: true });
    lastIndex = index + query.length;
    index = lowerText.indexOf(lowerQuery, lastIndex);
  }
  if (lastIndex < text.length) parts.push({ text: text.slice(lastIndex), highlighted: false });
  return parts;
}

export function formatSurahNumber(num: number): string {
  return num.toString().padStart(3, "0");
}

export function getArabicFontClass(font: "amiri" | "scheherazade" | "noto-naskh"): string {
  return { amiri: "font-amiri", scheherazade: "font-scheherazade", "noto-naskh": "font-noto-naskh" }[font] || "font-amiri";
}

export function getJuzHref(surahId: number, verseId: number, ayahsPerPage: number): string {
  const page = Math.ceil(verseId / ayahsPerPage);
  const params = new URLSearchParams();
  if (page > 1) params.set("page", String(page));
  params.set("verse", String(verseId));
  const qs = params.toString();
  return `/surah/${surahId}${qs ? `?${qs}` : ""}`;
}
