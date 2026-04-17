export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-6 mt-auto">
      <div className="container mx-auto px-4 text-center text-sm text-foreground/50">
        <p>Quran App &mdash; Read the Holy Quran with translations</p>
        <p className="mt-1">
          Data source:{" "}
          <a
            href="https://github.com/risan/quran-json"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            quran-json
          </a>
        </p>
      </div>
    </footer>
  );
}
