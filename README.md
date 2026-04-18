# Quran Web Application

A Quran web application built with Next.js (App Router), TypeScript, and Tailwind CSS. Displays all 114 surahs with Arabic text, English and Bengali translations, search, and customizable settings.

## Features

- All 114 surahs with Arabic text and translations (English & Bengali)
- Search across translations with highlighted matches
- Navigation sidebar with Surah, Juz, and Go To tabs
- Go To tab: search/select any surah, enter an ayah number, and jump directly to it
- Juz navigation: all 30 juz with correct starting points (according to current data, unmatched with our Hifz Quran), scrolls to the exact ayah
- Paginated ayah reading (15 per page)
- Verse bookmarking: save any verse, view all bookmarks at `/bookmarks`, click to jump back
- Smooth page transitions with fade animation on route changes
- Customizable Arabic fonts (Amiri, Scheherazade New, Noto Naskh Arabic)
- Adjustable font sizes for Arabic and translation text
- Dark/light mode toggle (navbar on desktop, settings panel on mobile)
- All settings and bookmarks persist in localStorage
- Responsive design (mobile, tablet, desktop)
- API routes: `/api/surahs`, `/api/surah/[id]`, `/api/search?q=...`

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
npm run build
npm start
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Data**: [quran-json](https://github.com/risan/quran-json) by Risan Bagja Pradana

## Deploy on Vercel

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
