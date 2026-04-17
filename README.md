# Quran Web Application

A Quran web application built with Next.js (App Router), TypeScript, and Tailwind CSS. Displays all 114 surahs with Arabic text, English and Bengali translations, search, and customizable settings.

## Features

- All 114 surahs with Arabic text and translations (English & Bengali)
- Search across translations with highlighted matches
- Navigation sidebar with Surah and Juz tabs
- Paginated ayah reading (20 per page)
- Customizable Arabic fonts (Amiri, Scheherazade New, Noto Naskh Arabic)
- Adjustable font sizes for Arabic and translation text
- Settings persist in localStorage
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
