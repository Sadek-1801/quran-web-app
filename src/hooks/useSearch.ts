"use client";
import { useState, useEffect } from "react";
import { useDebounce } from "./useDebounce";
import type { SearchResult } from "@/types";

export function useSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery.length < 3) {
      setResults([]);
      return;
    }

    const controller = new AbortController();

    const fetchResults = async () => {
      setIsSearching(true);
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(debouncedQuery)}&limit=20`,
          { signal: controller.signal }
        );
        const json = await res.json();
        setResults(json.data || []);
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") return;
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    };
    fetchResults();

    return () => controller.abort();
  }, [debouncedQuery]);

  return { query, setQuery, results, isSearching };
}
