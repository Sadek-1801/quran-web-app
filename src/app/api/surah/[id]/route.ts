import { NextRequest, NextResponse } from "next/server";
import { getSurahById } from "@/lib/quran";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam, 10);
    if (isNaN(id) || id < 1 || id > 114) {
      return NextResponse.json({ error: "Invalid surah ID (1-114)" }, { status: 400 });
    }
    const lang = request.nextUrl.searchParams.get("lang") === "bn" ? "bn" : "en";
    const surah = getSurahById(id, lang);
    if (!surah) return NextResponse.json({ error: "Surah not found" }, { status: 404 });
    return NextResponse.json({ data: surah });
  } catch {
    return NextResponse.json({ error: "Failed to fetch surah" }, { status: 500 });
  }
}
