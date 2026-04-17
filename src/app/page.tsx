import { getAllChapters } from "@/lib/quran";
import { SurahList } from "@/components/surah/SurahList";

export default function HomePage() {
  const chapters = getAllChapters();
  return (
    <main className="min-h-screen">
      <section className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2 text-foreground">The Holy Quran</h1>
        <p className="text-foreground/60 mb-8">Read and search with Arabic text and translation</p>
        <SurahList chapters={chapters} />
      </section>
    </main>
  );
}
