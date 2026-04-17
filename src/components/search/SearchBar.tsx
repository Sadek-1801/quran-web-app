"use client";
import { Search, Loader2, X } from "lucide-react";
import { useSearch } from "@/hooks/useSearch";
import { SearchResults } from "./SearchResults";

export function SearchBar() {
  const { query, setQuery, results, isSearching } = useSearch();

  return (
    <div className="relative mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search translations (min 3 characters)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-10 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          aria-label="Search the Quran"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isSearching && (
        <div className="absolute inset-x-0 top-full mt-1 rounded-lg border border-border bg-card p-4 shadow-lg z-30 flex items-center justify-center gap-2 text-sm text-gray-500">
          <Loader2 className="h-4 w-4 animate-spin" />
          Searching...
        </div>
      )}

      {!isSearching && query.length >= 3 && (
        <SearchResults results={results} query={query} onClear={() => setQuery("")} />
      )}
    </div>
  );
}
