# Bangla News 24
Developed By Ismail Hasan Takid

A modern Bengali news website built with **Next.js** and **Tailwind CSS**. It shows the latest news, categories, most-read stories and full article pages using a public news API.

## Features

- Home page with a top story, main news list and most-read section
- Scrolling "latest news" ticker (marquee)
- Sticky navigation bar with an active link highlight
- Category pages with a responsive news grid
- Article details page with text, sub-headings, images and captions
- Fallback view when the full article is not available
- Safe data fetching: the site does not crash if the API fails
- Bengali fonts (Noto Serif Bengali) and Bengali date/number formatting
- Footer with category and information links

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router, Server Components)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [react-marquee-text](https://www.npmjs.com/package/react-marquee-text)

## API

News data comes from the following API:

| Endpoint | Purpose |
|---|---|
| `/api/categories` | Navigation categories |
| `/api/news/sections` | Home page sections and articles |
| `/api/news/most-read` | Most-read news |
| `/api/news?limit=10` | Latest news for the ticker |
| `/api/category/:slug` | News of a single category |
| `/api/article/:id` | Full article details |

Base URL: `https://news-api-v2.vercel.app`



### Prerequisites

- Node.js 18 or later
- npm, yarn or pnpm

### Installation

```bash
git clone <https://github.com/IsmailHasanTakid/bangla-news-24>
cd bangla-news-24
npm install
```

### Run in development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm start
```

## Configuration

News images are loaded from the BBC image server, so the host must be allowed in `next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "ichef.bbci.co.uk" },
    ],
  },
};

export default nextConfig;
```

Restart the development server after changing this file.

## How It Works

1. Pages are **Server Components**, so data is fetched on the server.
2. `getData<T>()` wraps `fetch` and returns `null` if the API sends an invalid response, so the page can show a message instead of crashing.
3. Clicking a news card opens `/details/[id]`, which loads the article from `/api/article/:id`.
4. If the article API has no data (for example video items), the page looks the news up in `/api/news/sections` and shows its title, image and description.
5. `NavLink` uses `usePathname()` to highlight the current page in the navbar.

## Known Limitations

- Some items (such as videos or live pages) do not have a full article body.
- The API is hosted on a free platform, so it may occasionally respond slowly or return an error.
- "About", "Contact", "Privacy Policy" and "Terms" links in the footer are placeholders.

## Future Improvements

- Search functionality
- Sign in and sign up pages
- Bookmark and share buttons
- Dark mode
- Loading skeletons and error pages

## Credits

News content is sourced from **BBC Bangla** through a public API. All rights to the content belong to the original publisher. This project is for learning purposes.

