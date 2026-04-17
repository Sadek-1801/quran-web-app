import Link from "next/link";
import type { ChapterInfo } from "@/types";
import { formatSurahNumber } from "@/lib/utils";

interface SurahCardProps {
  chapter: ChapterInfo;
}

export function SurahCard({ chapter }: SurahCardProps) {
  return (
    <Link href={`/surah/${chapter.id}`}>
      <article className="cursor-pointer group rounded-lg border border-border bg-card p-4 hover:border-primary hover:shadow-md transition-all duration-200">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary text-sm font-semibold">
            {formatSurahNumber(chapter.id)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                {chapter.transliteration}
              </h3>
              <span className="text-right text-lg font-amiri text-primary shrink-0" dir="rtl" lang="ar">
                {chapter.name}
              </span>
            </div>
            <p className="text-sm text-foreground/50 mt-0.5">{chapter.translation}</p>
            <div className="flex items-center gap-2 mt-1.5 text-xs text-foreground/40">
              <span className="capitalize">{chapter.type}</span>
              <span>&middot;</span>
              <span>{chapter.total_verses} verses</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
