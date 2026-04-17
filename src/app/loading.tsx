export default function Loading() {
  return (
    <main className="min-h-screen">
      <section className="container mx-auto px-4 py-8">
        <div className="h-8 w-48 bg-foreground/10 rounded animate-pulse mb-2" />
        <div className="h-5 w-80 bg-foreground/10 rounded animate-pulse mb-8" />
        <div className="h-10 w-full bg-foreground/10 rounded-lg animate-pulse mb-6" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-border p-4">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-foreground/10 animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 w-32 bg-foreground/10 rounded animate-pulse" />
                  <div className="h-4 w-24 bg-foreground/10 rounded animate-pulse" />
                  <div className="h-3 w-20 bg-foreground/10 rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
