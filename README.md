# Falling Water Field Notes

A no-build, local-first trail tracker for 11 waterfall hikes in Great Smoky Mountains National Park. It is plain HTML, CSS, and JavaScript designed to publish directly from a GitHub Pages repository.

## Local preview

Browser location and some remote requests work most reliably from an HTTP origin rather than a `file://` URL. From this directory, run either:

```sh
python3 -m http.server 8000
```

or any equivalent static file server, then open <http://localhost:8000/>. There is no install or build step.

## Publish with GitHub Pages

1. Create a GitHub repository and place these files at its repository root.
2. Push the repository to GitHub. The included `.nojekyll` file tells Pages to serve the static files directly.
3. On GitHub, open **Settings**, then **Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch** as the source.
5. Select the publishing branch (usually `main`), select `/ (root)`, and click **Save**.
6. Wait for the Pages deployment to finish, then use the URL shown in the Pages settings. Project-repository paths are supported because all local assets use relative URLs.

No GitHub Actions workflow, npm package, framework, or custom domain is required.

## Data and conditions

- Trail records, destinations, fallback routes, YouTube search URLs, advisories, and photo metadata live in `data.js`.
- The current status review date is `2026-07-31`. Update both `HIKES_CONFIG.statusUpdated` and individual status/advisory fields when reviewing [NPS temporary closures and warnings](https://www.nps.gov/grsm/planyourvisit/temproadclose.htm).
- `Open / recheck` means no closure was named in the cited status review. It is not a guarantee. Visitors must recheck official conditions before departure.
- Trail mileage and elevation figures are planning references, not survey-grade measurements. Mouse Creek displays the current temporary-access mileage separately from its base route.
- Laurel Falls is retained for reference but marked closed and excluded by the open-only filter.

## Routing and privacy

The initial origin is `35.960, -83.920`. The page immediately displays supplied fixed-origin fallback drive estimates, then makes one matrix request for all destinations to the public OSRM demo server using OpenStreetMap data. Results have no live traffic and are cached by rounded origin for no more than six hours.

If OSRM fails, fallback values are used only for the fixed home origin. A custom-origin failure is shown as unavailable; the application does not substitute misleading straight-line distance.

Browser GPS is opt-in. Coordinates are rounded to three decimal places before routing, display, or local storage, and no precise location history is retained. A user can manually enter coordinates or reset the origin. Public OSRM receives the rounded origin and listed trailhead coordinates when route calculation runs.

Completion state and the optional rounded custom origin are stored only in browser `localStorage`. JSON/CSV exports are generated locally. JSON import validates its format and known trail identifiers before replacing completion state.

## Photos and external services

Every trail has two credited Wikimedia Commons photos. `data.js` stores the exact Commons filename, photographer/source, license, and caption. Images load through Commons `Special:Redirect/file`; each detail caption links to the corresponding Commons file page for source and license context. A text fallback appears if a remote image cannot load.

The application also links or sends requests to:

- National Park Service pages for current conditions, maps, waterfall guidance, and parking tags
- `router.project-osrm.org` for optional route matrices
- OpenStreetMap for detail maps and navigation
- Google Maps and Apple Maps for user-initiated navigation links
- YouTube search results; these are explicitly search fallbacks, not curated videos or embeds

## File map

- `index.html`: semantic page structure, controls, table shell, dialogs, and official-source links
- `styles.css`: responsive field-guide presentation, desktop table, mobile cards, focus and reduced-motion behavior
- `data.js`: all trail and site-source data
- `app.js`: rendering, URL state, completion tracking, imports/exports, detail history, geolocation, and OSRM routing
- `.nojekyll`: direct static-file publishing on GitHub Pages

## Maintenance checks

After editing JavaScript, run:

```sh
node --check data.js
node --check app.js
```

Then preview through a local server and exercise filtering, browser back/forward from a detail view, completion reload persistence, import/export, location reset, and both desktop and mobile layouts. Remote images, route responses, maps, and external status pages depend on their respective providers and network availability.
