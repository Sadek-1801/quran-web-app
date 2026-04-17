import { NextRequest, NextResponse } from "next/server";
import { searchVerses } from "@/lib/quran";

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get("q") || "";
    const lang = request.nextUrl.searchParams.get("lang") === "bn" ? "bn" : "en";
    const limit = Math.min(parseInt(request.nextUrl.searchParams.get("limit") || "20", 10), 50);

    if (query.length < 3) {
      return NextResponse.json({ error: "Query must be at least 3 characters" }, { status: 400 });
    }
    const results = searchVerses(query, lang, limit);
    return NextResponse.json({ data: results, total: results.length, query });
  } catch {
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
