import type { ChapterInfo } from "@/types";
import { SurahCard } from "./SurahCard";

interface SurahListProps {
  chapters: ChapterInfo[];
}

export function SurahList({ chapters }: SurahListProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {chapters.map((chapter) => (
        <SurahCard key={chapter.id} chapter={chapter} />
      ))}
    </div>
  );
}
