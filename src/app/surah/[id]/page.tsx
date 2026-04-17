import { notFound } from "next/navigation";
import { getAllSurahIds, getSurahById } from "@/lib/quran";
import { AyatList } from "@/components/ayat/AyatList";
import { AYAHS_PER_PAGE } from "@/lib/constants";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getAllSurahIds().map((id) => ({ id: id.toString() }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const surah = getSurahById(parseInt(id));
  if (!surah) return { title: "Surah Not Found" };
  return {
    title: `${surah.transliteration} (${surah.name}) — Quran`,
    description: `Read Surah ${surah.transliteration} — ${surah.total_verses} verses`,
  };
}

export default async function SurahPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { id: idParam } = await params;
  const { page: pageParam } = await searchParams;
  const surahId = parseInt(idParam, 10);
  if (isNaN(surahId) || surahId < 1 || surahId > 114) notFound();

  const surahEn = getSurahById(surahId, "en");
  const surahBn = getSurahById(surahId, "bn");
  if (!surahEn) notFound();

  const totalPages = Math.ceil(surahEn.total_verses / AYAHS_PER_PAGE);
  const rawPage = parseInt(pageParam || "1", 10);
  const currentPage = Math.max(1, Math.min(isNaN(rawPage) ? 1 : rawPage, totalPages));

  return (
    <main className="min-h-screen">
      <AyatList
        surahEn={surahEn}
        surahBn={surahBn || null}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </main>
  );
}
