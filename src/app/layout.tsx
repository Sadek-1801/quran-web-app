import type { Metadata } from "next";
import "./globals.css";
import { SettingsProvider } from "@/context/SettingsContext";
import { AppShell } from "@/components/layout/AppShell";
import { getAllChapters } from "@/lib/quran";

export const metadata: Metadata = {
  title: "Quran App — Read the Holy Quran",
  description: "Read the Holy Quran with Arabic text, English and Bengali translations, search, and customizable settings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const chapters = getAllChapters();

  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-bg text-foreground">
        <SettingsProvider>
          <AppShell chapters={chapters}>
            {children}
          </AppShell>
        </SettingsProvider>
      </body>
    </html>
  );
}
