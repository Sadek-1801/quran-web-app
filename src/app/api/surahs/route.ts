import { NextResponse } from "next/server";
import { getAllChapters } from "@/lib/quran";

export async function GET() {
  try {
    const chapters = getAllChapters();
    return NextResponse.json({ data: chapters, total: chapters.length });
  } catch {
    return NextResponse.json({ error: "Failed to fetch surahs" }, { status: 500 });
  }
}
