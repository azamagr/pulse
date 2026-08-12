# Pulse — Dashboard with Data Visualization

A sales analytics dashboard with server-computed stats and interactive charts, built for Week 4 · Task B (Dashboard with Data Visualization).

**Live frontend:** https://azamagr.github.io/pulse/ *(after deploy — see below)*
**Backend API:** deployed separately (Vercel/Render/Railway) — see "Deploying the backend"

This is a **monorepo**: `backend/` and `frontend/` are two independent apps in one repo.

```
pulse/
├── backend/     # Express + MongoDB aggregation API
├── frontend/    # React + Vite + Tailwind + Recharts UI
└── .github/workflows/deploy.yml   # Deploys frontend/ to GitHub Pages
```

## The dashboard (3+ visualizations)

1. **Stat cards** — Total Revenue, Total Orders, Avg Order Value, each with a "% vs previous period" trend badge.
2. **Line chart** — revenue per day across the selected range.
3. **Bar chart** — order count by product category, color-coded.
4. **Donut chart** — revenue share by category.

## Aggregation happens server-side, not in the browser

`backend/src/controllers/dashboardController.js` runs MongoDB aggregation pipelines directly against the `orders` collection — the frontend never receives raw order documents and computes totals itself. This matters at scale: with thousands of orders, shipping every row to the browser just to sum it client-side would be slow and wasteful. Four aggregations run in parallel per request (`Promise.all`):

- Current-period totals (revenue, order count, completed-order count)
- **Previous**-period totals, for the trend percentage on each stat card
- Revenue grouped by day (gaps filled with $0 so the line chart has no holes)
- Orders grouped by category, and revenue grouped by category

## The interactive filter

The date-range pills in the header (**Last 7 / 30 / 90 days**) are the required interactive filter. Changing the range updates a single piece of state in `App.jsx`, which `useDashboard.js` picks up and re-fetches `GET /api/dashboard?range=<n>` — every chart and stat card re-renders with genuinely different, freshly-aggregated data, not a client-side re-slice of the same dataset.

## Responsive charts

Every chart is wrapped in Recharts' `<ResponsiveContainer>`, so it resizes fluidly with its parent instead of overflowing or clipping on smaller screens. The layout itself also adapts: stat cards go from 3-across to stacked, and the line/bar charts go from side-by-side to stacked, below the `lg` breakpoint (`frontend/src/App.jsx`).

## Loading, empty, and error states

- **Skeleton loaders** shaped like the real stat cards and charts while `GET /api/dashboard` is in flight (`LoadingState.jsx`) — never a blank screen.
- **Empty state** specifically for "zero orders in this date range" (`EmptyState.jsx`), distinct from a loading or error state — this is realistic and reachable simply by picking a 7-day window on a freshly-seeded database if all the seed data happened to land outside it.
- **Error state** with retry (`ErrorState.jsx`) if the fetch fails outright.

## Seed data

`backend/scripts/seed.js` generates ~260 realistic orders spread randomly across the last 90 days, across 5 categories (Electronics, Apparel, Home, Beauty, Sports), with weighted order statuses (82% completed, 10% pending, 8% refunded) so the charts have believable shape and the revenue calculations (which only count `completed` orders) have something meaningful to filter.

## Running locally

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env   # fill in your own MONGO_URI
npm run seed              # populates ~260 sample orders
npm run dev                # http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env   # VITE_API_URL=http://localhost:5000
npm run dev              # http://localhost:5173
```

## Deploying the backend

**Vercel** (files already included: `backend/api/index.js`, `backend/vercel.json`):
1. Push this repo to GitHub.
2. [vercel.com](https://vercel.com) → Add New → Project → import the repo.
3. Root Directory: `backend`.
4. Environment Variables: `MONGO_URI`.
5. Deploy, then run `npm run seed` locally against the same `MONGO_URI` to populate the live database (or run it from a one-off script — the seed script isn't exposed as an API route on purpose).

**Render/Railway** also work: root directory `backend`, build command `npm install`, start command `npm start`, same environment variable.

## Deploying the frontend

1. Repo **Settings → Secrets and variables → Actions → Variables** → add `VITE_API_URL` set to your deployed backend URL.
2. Repo **Settings → Pages → Source** → select **"GitHub Actions"**.
3. Push to `main` — `.github/workflows/deploy.yml` builds `frontend/` with that API URL and publishes it.

`frontend/vite.config.js` sets `base: '/pulse/'` to match this repo's name — **keep the repo name all-lowercase**.
