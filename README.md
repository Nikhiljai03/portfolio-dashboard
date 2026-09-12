# Portfolio Dashboard

A live dashboard for 26 Indian stocks, grouped by sector.

**Live Demo:** https://portfolio-dashboard-theta-dusky.vercel.app/

## Features

* 11-column stock table
* Live CMP from Yahoo Finance
* P/E and EPS from Google
* Auto-refreshes every 15 seconds
* Green/red gain and loss indicators
* Sector-wise summaries
* Error handling for missing data
* Mobile-friendly layout

## Tech Stack

* Next.js 16 (App Router)
* React 19
* TypeScript
* Tailwind CSS 4
* `yahoo-finance2` — Yahoo Finance data
* `cheerio` — Google data scraping
* `@tanstack/react-table` v9 — Table management

## Setup

```bash
git clone https://github.com/Nikhiljai03/portfolio-dashboard.git
cd portfolio-dashboard
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

No API keys or `.env` file are required.

## How It Works

* The browser calls `/api/portfolio` every 15 seconds.
* The server gets stock prices from Yahoo Finance using one batched request, cached for 10 seconds.
* P/E and EPS are fetched from Google and cached for 1 hour.
* `lib/portfolio.ts` calculates portfolio values and groups stocks by sector.

### Project Structure

* `app/` — Pages and API routes
* `components/` — Reusable UI components
* `lib/` — Portfolio calculations and data logic
* `data/` — Stock holdings data
* `types/` — TypeScript type definitions

## Data Notes

* Holdings are taken from the provided Excel sheet and stored in `data/holdings.json`.
* Tata Consumer's code was corrected from `532540` (TCS) to `500800`.
* Yahoo Finance symbols are used because Yahoo does not recognise BSE number codes.
* LTIMindtree is now listed as `LTM`.
* HDFC Bank, Bajaj Finance, and Pidilite show large losses because their purchase prices in the original sheet are from before their bonus or split. The data was kept unchanged.
* Some stocks, including LTM, Gensol, and Savani, do not have P/E data on Google, so they are shown as `—`.
* Stock prices change only during market hours: 9:15 AM to 3:30 PM IST, Monday to Friday.

## Disclaimer

The data comes from unofficial sources and may be delayed or inaccurate.
