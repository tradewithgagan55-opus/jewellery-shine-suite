## Plan: Integrate Google Analytics 4 (G-0GEV9X09B1)

Scope: tracking only. No design, layout, or feature changes.

### Changes

1. **`src/routes/__root.tsx`** — inject GA4 once via the route `head()`:
   - Add to `links`: `{ rel: "preconnect", href: "https://www.googletagmanager.com" }`
   - Add to `scripts`:
     - `{ src: "https://www.googletagmanager.com/gtag/js?id=G-0GEV9X09B1", async: true }`
     - An inline script initializing `dataLayer`, defining `gtag`, calling `gtag('js', new Date())` and `gtag('config', 'G-0GEV9X09B1', { send_page_view: false })` — we disable auto page_view so SPA navigations aren't double-counted.
   - Inside `RootComponent`, add a small effect that subscribes to router state changes and fires `gtag('event', 'page_view', { page_path, page_location, page_title })` on every route change (including the first match). Uses `useRouter()` from `@tanstack/react-router` and its `subscribe('onResolved', ...)`.

2. **`src/lib/gtag.ts`** (new, tiny) — typed `window.gtag` declaration and a `trackPageview(url)` helper, so the root effect stays clean and there's a single source of truth.

### Technical notes

- Script is declared in `head()`, which TanStack Start renders server-side into the HTML shell — loads once per full page load, no duplication across route changes.
- `send_page_view: false` on config + manual `page_view` events on route resolve is the GA4-recommended SPA pattern; avoids the double-hit that occurs when both gtag auto-tracking and manual tracking fire on first load.
- Works identically on Lovable hosting and Netlify (pure client script; no server env needed).
- No secrets required — GA Measurement ID is a public identifier, safe to commit.

### Out of scope
Design, components, existing analytics, consent banner (not requested), GitHub/Netlify operations (handled by the user's existing GitHub → Netlify pipeline once these commits land).
