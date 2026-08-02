"use strict";

(() => {
  const trails = window.HIKES;
  const config = window.HIKES_CONFIG;
  const bySlug = new Map(trails.map((trail) => [trail.slug, trail]));
  const completionKey = "smokies-hikes-completed-v1";
  const originKey = "smokies-hikes-origin-v1";
  const routeCachePrefix = "smokies-hikes-routes-v1:";
  const sixHours = 6 * 60 * 60 * 1000;
  const externalRel = 'target="_blank" rel="noopener noreferrer"';

  const elements = {
    form: document.querySelector("#filters"),
    search: document.querySelector("#search"),
    maxDrive: document.querySelector("#max-drive"),
    maxHike: document.querySelector("#max-hike"),
    difficulty: document.querySelector("#difficulty"),
    minCoolness: document.querySelector("#min-coolness"),
    done: document.querySelector("#completed-filter"),
    sort: document.querySelector("#sort"),
    openOnly: document.querySelector("#open-only"),
    rows: document.querySelector("#trail-rows"),
    cards: document.querySelector("#trail-cards"),
    empty: document.querySelector("#empty-state"),
    count: document.querySelector("#result-count"),
    detailDialog: document.querySelector("#trail-dialog"),
    detail: document.querySelector("#detail-content"),
    locationDialog: document.querySelector("#location-dialog"),
    locationStatus: document.querySelector("#location-status"),
    originLabel: document.querySelector("#origin-label"),
    routeNote: document.querySelector("#route-note"),
    latitude: document.querySelector("#latitude"),
    longitude: document.querySelector("#longitude"),
    importFile: document.querySelector("#import-file"),
    importStatus: document.querySelector("#import-status")
  };

  let completed = loadCompleted();
  let origin = loadOrigin();
  let routes = homeOrigin(origin) ? seededRoutes() : unavailableRoutes();
  let routeController = null;
  let suppressDialogClose = false;
  let activeDetailSlug = null;
  let detailReturnTarget = null;
  let detailReturnSlug = null;
  let pendingFocusRestore = false;

  function escapeHtml(value) {
    return String(value).replace(/[&<>"]/g, (character) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"
    })[character]);
  }

  function readJson(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return value ?? fallback;
    } catch (_error) {
      return fallback;
    }
  }

  function loadCompleted() {
    const stored = readJson(completionKey, []);
    return new Set(Array.isArray(stored) ? stored.filter((slug) => bySlug.has(slug)) : []);
  }

  function loadOrigin() {
    const stored = readJson(originKey, null);
    if (stored && validCoordinate(stored.lat, stored.lon)) {
      return { lat: roundCoordinate(stored.lat), lon: roundCoordinate(stored.lon), custom: true };
    }
    return { ...config.homeOrigin, custom: false };
  }

  function validCoordinate(lat, lon) {
    return Number.isFinite(lat) && Number.isFinite(lon) && lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180;
  }

  function roundCoordinate(number) {
    return Number(Number(number).toFixed(3));
  }

  function homeOrigin(value) {
    return roundCoordinate(value.lat) === config.homeOrigin.lat && roundCoordinate(value.lon) === config.homeOrigin.lon;
  }

  function seededRoutes() {
    return Object.fromEntries(trails.map((trail) => [trail.slug, {
      miles: trail.fallbackMiles, minutes: trail.fallbackMinutes, source: "seeded"
    }]));
  }

  function unavailableRoutes() {
    return Object.fromEntries(trails.map((trail) => [trail.slug, null]));
  }

  function validateRouteCache(cache, now = Date.now()) {
    if (!cache || typeof cache !== "object" || Array.isArray(cache)) return null;
    if (!Number.isFinite(cache.savedAt) || cache.savedAt < 0 || cache.savedAt > now || now - cache.savedAt > sixHours) return null;
    if (!cache.routes || typeof cache.routes !== "object" || Array.isArray(cache.routes)) return null;
    const validated = {};
    for (const trail of trails) {
      if (!Object.prototype.hasOwnProperty.call(cache.routes, trail.slug)) return null;
      const route = cache.routes[trail.slug];
      if (!route || typeof route !== "object" || Array.isArray(route)) return null;
      if (!Number.isFinite(route.miles) || route.miles < 0 || !Number.isFinite(route.minutes) || route.minutes < 0) return null;
      validated[trail.slug] = { miles: route.miles, minutes: route.minutes, source: "cache" };
    }
    return validated;
  }

  function loadRouteCache(key) {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? { present: false, value: null } : { present: true, value: JSON.parse(raw) };
    } catch (_error) {
      return { present: true, value: null };
    }
  }

  function removeRouteCache(key) {
    try {
      localStorage.removeItem(key);
    } catch (_error) {
      // Storage may be unavailable; the invalid value is still ignored.
    }
  }

  function photoUrl(filename, width) {
    return `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(filename)}?width=${width}`;
  }

  function photoSource(filename) {
    return `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(filename)}`;
  }

  function trailMapUrl(trail) {
    const delta = 0.012;
    const bbox = [trail.lon - delta, trail.lat - delta, trail.lon + delta, trail.lat + delta].map((value) => value.toFixed(5)).join("%2C");
    return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${trail.lat}%2C${trail.lon}`;
  }

  function navigationUrls(trail) {
    const destination = `${trail.lat},${trail.lon}`;
    return {
      google: `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving`,
      apple: `https://maps.apple.com/?daddr=${destination}&dirflg=d`,
      osm: `https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=${origin.lat}%2C${origin.lon}%3B${trail.lat}%2C${trail.lon}`
    };
  }

  function overviewMapUrl(trail) {
    return `https://www.openstreetmap.org/?mlat=${trail.lat}&mlon=${trail.lon}#map=15/${trail.lat}/${trail.lon}`;
  }

  function currentState() {
    return {
      q: elements.search.value.trim(),
      drive: elements.maxDrive.value,
      hike: elements.maxHike.value,
      diff: elements.difficulty.value,
      cool: elements.minCoolness.value,
      done: elements.done.value,
      sort: elements.sort.value,
      open: elements.openOnly.checked
    };
  }

  function applyUrlState() {
    const params = new URLSearchParams(location.search);
    elements.search.value = params.get("q") || "";
    elements.maxDrive.value = params.get("drive") || "";
    elements.maxHike.value = params.get("hike") || "";
    elements.difficulty.value = params.get("diff") || "";
    elements.minCoolness.value = params.get("cool") || "";
    elements.done.value = params.get("done") || "";
    elements.sort.value = params.get("sort") || "rank";
    elements.openOnly.checked = params.get("open") === "1";
  }

  function updateUrl() {
    const state = currentState();
    const params = new URLSearchParams(location.search);
    ["q", "drive", "hike", "diff", "cool", "done", "sort", "open"].forEach((key) => params.delete(key));
    Object.entries(state).forEach(([key, value]) => {
      if (key === "open" && value) params.set(key, "1");
      else if (key === "sort" && value !== "rank") params.set(key, value);
      else if (key !== "open" && key !== "sort" && value) params.set(key, value);
    });
    const query = params.toString();
    history.replaceState(history.state, "", `${location.pathname}${query ? `?${query}` : ""}${location.hash}`);
  }

  function filteredTrails() {
    const state = currentState();
    const query = state.q.toLowerCase();
    const result = trails.filter((trail) => {
      const route = routes[trail.slug];
      const searchable = `${trail.name} ${trail.feature} ${trail.parking} ${trail.difficulty}`.toLowerCase();
      const currentHikeMiles = trail.currentMiles || trail.miles;
      if (query && !searchable.includes(query)) return false;
      if (state.drive && (!route || route.minutes > Number(state.drive))) return false;
      if (state.hike && currentHikeMiles > Number(state.hike)) return false;
      if (state.diff && trail.difficultyOrder !== Number(state.diff)) return false;
      if (state.cool && trail.coolness < Number(state.cool)) return false;
      if (state.open && trail.status === "closed") return false;
      if (state.done === "yes" && !completed.has(trail.slug)) return false;
      if (state.done === "no" && completed.has(trail.slug)) return false;
      return true;
    });
    const routeValue = (trail, key) => routes[trail.slug]?.[key] ?? Number.MAX_SAFE_INTEGER;
    const sorts = {
      rank: (a, b) => a.rank - b.rank,
      coolness: (a, b) => b.coolness - a.coolness,
      nearest: (a, b) => routeValue(a, "miles") - routeValue(b, "miles"),
      drive: (a, b) => routeValue(a, "minutes") - routeValue(b, "minutes"),
      hike: (a, b) => (a.currentMiles || a.miles) - (b.currentMiles || b.miles),
      easy: (a, b) => a.difficultyOrder - b.difficultyOrder || a.miles - b.miles
    };
    return result.sort(sorts[state.sort] || sorts.rank);
  }

  function statusHtml(trail, extraClass = "") {
    return `<span class="status-badge status-${trail.status} ${extraClass}">${escapeHtml(trail.statusLabel)}</span>`;
  }

  function distanceText(trail) {
    if (trail.currentMiles) {
      return `<strong>~${trail.currentMiles.toFixed(1)} mi now</strong><span>${trail.miles.toFixed(1)} mi base &middot; ${trail.elevation.toLocaleString()} ft gain</span>`;
    }
    return `<strong>${trail.miles.toFixed(1)} mi</strong><span>${trail.elevation.toLocaleString()} ft gain</span>`;
  }

  function driveHtml(trail) {
    const route = routes[trail.slug];
    if (!route) return `<strong>Unavailable</strong><span>Routing failed</span>`;
    const source = route.source === "live" ? "OSM/OSRM estimate" : route.source === "cache" ? "Cached OSM/OSRM" : "Fixed-origin fallback";
    return `<strong>${route.miles.toFixed(1)} mi</strong><span>about ${Math.round(route.minutes)} min</span><abbr class="drive-source" title="${source}; no live traffic">${route.source === "seeded" ? "fallback" : "OSM/OSRM"}</abbr>`;
  }

  function rowHtml(trail) {
    const photo = trail.photos[0];
    const checked = completed.has(trail.slug);
    return `<tr data-status="${trail.status}">
      <td><label class="complete-box"><input type="checkbox" data-complete="${trail.slug}" ${checked ? "checked" : ""}><span class="visually-hidden">Mark ${escapeHtml(trail.name)} completed</span></label></td>
      <td><div class="trail-name"><span class="rank">${trail.rank}</span><div><a class="detail-link" href="?trail=${trail.slug}">${escapeHtml(trail.name)}</a><small>${escapeHtml(trail.routeType)} &middot; <span class="coolness">${trail.coolness.toFixed(1)} cool</span></small></div></div></td>
      <td><div class="highlight"><div class="thumb"><img src="${photoUrl(photo[0], 240)}" alt="${escapeHtml(photo[3])}" loading="lazy"></div><p>${escapeHtml(trail.feature)}</p></div></td>
      <td><div class="metric">${distanceText(trail)}<span>${escapeHtml(trail.difficulty)}</span></div></td>
      <td><div class="metric">${driveHtml(trail)}</div></td>
      <td>${statusHtml(trail)}</td>
      <td><div class="plan-links"><a class="detail-link" href="?trail=${trail.slug}">Details</a><a href="${overviewMapUrl(trail)}" ${externalRel}>Map</a><a href="${trail.youtube}" ${externalRel} aria-label="YouTube search for ${escapeHtml(trail.name)}">YouTube search</a></div></td>
      <td class="updated"><time datetime="${config.statusUpdated}">Jul 31, 2026</time></td>
    </tr>`;
  }

  function cardHtml(trail) {
    const photo = trail.photos[0];
    const route = routes[trail.slug];
    const checked = completed.has(trail.slug);
    const hikeMiles = trail.currentMiles ? `~${trail.currentMiles.toFixed(1)} now` : trail.miles.toFixed(1);
    return `<article class="trail-card" data-status="${trail.status}">
      <div class="card-photo"><img src="${photoUrl(photo[0], 800)}" alt="${escapeHtml(photo[3])}" loading="lazy"><span class="card-rank">#${trail.rank}</span>${statusHtml(trail, "card-status")}</div>
      <div class="card-body">
        <div class="card-title-row"><h3><a class="detail-link" href="?trail=${trail.slug}">${escapeHtml(trail.name)}</a></h3><label class="complete-box"><input type="checkbox" data-complete="${trail.slug}" ${checked ? "checked" : ""}><span class="visually-hidden">Mark ${escapeHtml(trail.name)} completed</span></label></div>
        <p class="card-copy">${escapeHtml(trail.feature)}</p>
        <div class="card-metrics"><div><span>Hike distance</span><strong>${hikeMiles} mi</strong></div><div><span>Elevation</span><strong>${trail.elevation.toLocaleString()} ft</strong></div><div><span>Drive estimate</span><strong>${route ? `${Math.round(route.minutes)} min` : "Unavailable"}</strong></div><div><span>Difficulty</span><strong>${escapeHtml(trail.difficulty)}</strong></div><div><span>Coolness</span><strong>${trail.coolness.toFixed(1)} / 10</strong></div><div><span>Updated</span><strong>Jul 31, 2026</strong></div></div>
        <details class="card-advisory"><summary>Current access note</summary><p>${escapeHtml(trail.advisory)}</p></details>
        <div class="card-footer"><a class="detail-link" href="?trail=${trail.slug}">Field notes</a><a href="${overviewMapUrl(trail)}" ${externalRel}>Map</a><a href="${trail.youtube}" ${externalRel}>YouTube search</a></div>
      </div>
    </article>`;
  }

  function bindPhotoFallbacks(container) {
    container.querySelectorAll("img").forEach((image) => {
      image.addEventListener("error", () => {
        const frame = image.parentElement;
        if (!frame) return;
        frame.classList.add("photo-failed");
        if (!frame.querySelector(".photo-error")) {
          const message = document.createElement("span");
          message.className = "photo-error";
          message.textContent = "Photo unavailable";
          frame.append(message);
        }
      }, { once: true });
    });
  }

  function render() {
    const visible = filteredTrails();
    elements.rows.innerHTML = visible.map(rowHtml).join("");
    elements.cards.innerHTML = visible.map(cardHtml).join("");
    elements.empty.hidden = visible.length !== 0;
    elements.count.textContent = `${visible.length} of ${trails.length} trails shown`;
    bindPhotoFallbacks(elements.rows);
    bindPhotoFallbacks(elements.cards);
    renderProgress();
  }

  function renderProgress() {
    const doneTrails = trails.filter((trail) => completed.has(trail.slug));
    const miles = doneTrails.reduce((sum, trail) => sum + (trail.currentMiles || trail.miles), 0);
    const elevation = doneTrails.reduce((sum, trail) => sum + trail.elevation, 0);
    const percent = Math.round((doneTrails.length / trails.length) * 100);
    document.querySelector("#progress-count").textContent = `${doneTrails.length} of ${trails.length}`;
    document.querySelector("#progress-percent").textContent = `${percent}%`;
    document.querySelector("#progress-miles").textContent = miles.toFixed(1);
    document.querySelector("#progress-elevation").textContent = elevation.toLocaleString();
    document.querySelector("#progress-bar").style.width = `${percent}%`;
  }

  function toggleCompletion(slug, value) {
    if (!bySlug.has(slug)) return;
    if (value) completed.add(slug);
    else completed.delete(slug);
    localStorage.setItem(completionKey, JSON.stringify([...completed]));
    render();
    const detailTrail = new URLSearchParams(location.search).get("trail");
    if (detailTrail === slug && elements.detailDialog.open) renderDetail(bySlug.get(slug), true);
  }

  function detailUrl(slug) {
    const params = new URLSearchParams(location.search);
    params.set("trail", slug);
    return `${location.pathname}?${params.toString()}${location.hash}`;
  }

  function closestTrails(trail) {
    return trails.filter((candidate) => candidate.slug !== trail.slug).map((candidate) => ({
      trail: candidate,
      distance: Math.hypot(candidate.lat - trail.lat, candidate.lon - trail.lon)
    })).sort((a, b) => a.distance - b.distance).slice(0, 2).map((item) => item.trail);
  }

  function detailHtml(trail) {
    const firstPhoto = trail.photos[0];
    const nav = navigationUrls(trail);
    const route = routes[trail.slug];
    const checked = completed.has(trail.slug);
    const similar = closestTrails(trail);
    return `<article class="detail">
      <button class="dialog-close" data-close-detail type="button" aria-label="Close ${escapeHtml(trail.name)} details">&times;</button>
      <header class="detail-hero">
        <div class="detail-hero__photo"><img src="${photoUrl(firstPhoto[0], 1200)}" alt="${escapeHtml(firstPhoto[3])}"></div>
        <div class="detail-hero__copy"><p class="eyebrow">Field rank ${trail.rank} &middot; ${escapeHtml(trail.routeType)}</p><h2 id="detail-title">${escapeHtml(trail.name)}</h2><p>${escapeHtml(trail.feature)}</p></div>
      </header>
      <div class="detail-body">
        <section class="detail-alert ${trail.status}" aria-label="Current trail status"><strong>${escapeHtml(trail.statusLabel)}</strong><p>${escapeHtml(trail.advisory)}</p><small>Reviewed <time datetime="${config.statusUpdated}">July 31, 2026</time> &middot; <a href="${config.statusSource}" ${externalRel}>Verify current NPS status</a></small></section>
        <dl class="detail-stats">
          <div><dt>Hike distance</dt><dd>${trail.currentMiles ? `~${trail.currentMiles.toFixed(1)} mi now` : `${trail.miles.toFixed(1)} mi`}</dd></div>
          <div><dt>Elevation gain</dt><dd>${trail.elevation.toLocaleString()} ft</dd></div>
          <div><dt>Difficulty</dt><dd>${escapeHtml(trail.difficulty)}</dd></div>
          <div><dt>Coolness</dt><dd>${trail.coolness.toFixed(1)} / 10</dd></div>
          <div><dt>Drive estimate</dt><dd>${route ? `${route.miles.toFixed(1)} mi / ${Math.round(route.minutes)} min` : "Unavailable"}</dd></div>
        </dl>
        <div class="detail-grid">
          <section><h3>Trailhead &amp; access</h3><p><strong>${escapeHtml(trail.parking)}</strong><br>${trail.lat.toFixed(7)}, ${trail.lon.toFixed(7)}</p><p>${escapeHtml(trail.access)}</p><div class="detail-actions"><label class="button"><input class="visually-hidden" type="checkbox" data-complete="${trail.slug}" ${checked ? "checked" : ""}>${checked ? "Completed: yes" : "Mark completed"}</label><a class="button button--quiet" href="${trail.youtube}" ${externalRel}>YouTube search</a></div><p><small>The YouTube link opens search results, not a curated or direct video.</small></p></section>
          <section><h3>Parking map</h3><iframe class="detail-map" loading="lazy" title="OpenStreetMap at ${escapeHtml(trail.parking)}" src="${trailMapUrl(trail)}"></iframe><div class="nav-links"><a href="${nav.google}" ${externalRel}>Google directions</a><a href="${nav.apple}" ${externalRel}>Apple directions</a><a href="${nav.osm}" ${externalRel}>OSM directions</a><a href="${config.mapsSource}" ${externalRel}>NPS maps</a></div></section>
        </div>
        <section class="gallery" aria-labelledby="gallery-title"><h3 id="gallery-title">Waterfall study</h3><div class="gallery-grid">${trail.photos.map((photo) => `<figure><div class="gallery-image"><img src="${photoUrl(photo[0], 1000)}" alt="${escapeHtml(photo[3])}" loading="lazy"></div><figcaption>${escapeHtml(photo[3])}. <a href="${photoSource(photo[0])}" ${externalRel}>${escapeHtml(photo[1])}</a>, ${escapeHtml(photo[2])}, via Wikimedia Commons.</figcaption></figure>`).join("")}</div></section>
        <aside class="detail-reminders"><p><strong>Take care:</strong> parking tags are required for vehicles parked longer than 15 minutes. Never swim or climb near falls. Download an <a href="${config.mapsSource}" ${externalRel}>official map</a>, check <a href="${config.statusSource}" ${externalRel}>current conditions</a>, and treat all route times as estimates without live traffic.</p><p>Driving data &copy; OpenStreetMap contributors, routed through OSRM. ${route?.source === "seeded" ? "Currently showing the fixed-home fallback." : ""}</p></aside>
        <nav class="similar" aria-label="Similar nearby trails"><h3>Nearby in this field guide</h3>${similar.map((item) => `<a class="detail-link" href="${detailUrl(item.slug)}">${escapeHtml(item.name)}</a>`).join("")}</nav>
      </div>
    </article>`;
  }

  function renderDetail(trail, focusAfter = false) {
    elements.detail.innerHTML = detailHtml(trail);
    bindPhotoFallbacks(elements.detail);
    if (focusAfter) {
      requestAnimationFrame(() => {
        if (elements.detailDialog.open && activeDetailSlug === trail.slug) {
          elements.detail.querySelector("[data-close-detail]")?.focus({ preventScroll: true });
        }
      });
    }
  }

  function openDetail(slug, historyMode = "push", returnTarget = null) {
    const trail = bySlug.get(slug);
    if (!trail) return;
    const wasOpen = elements.detailDialog.open;
    if (!wasOpen) {
      detailReturnTarget = returnTarget;
      detailReturnSlug = slug;
    }
    activeDetailSlug = slug;
    renderDetail(trail, true);
    if (!wasOpen) elements.detailDialog.showModal();
    if (historyMode === "push") history.pushState({ ...(history.state || {}), trailEntry: true }, "", detailUrl(slug));
    if (historyMode === "replace") history.replaceState({ ...(history.state || {}), trailEntry: history.state?.trailEntry === true }, "", detailUrl(slug));
  }

  function removeTrailFromUrl() {
    const params = new URLSearchParams(location.search);
    params.delete("trail");
    const query = params.toString();
    history.replaceState(null, "", `${location.pathname}${query ? `?${query}` : ""}${location.hash}`);
  }

  function syncDetailFromUrl() {
    const slug = new URLSearchParams(location.search).get("trail");
    if (slug && bySlug.has(slug)) {
      if (!elements.detailDialog.open || activeDetailSlug !== slug) openDetail(slug, "none");
    }
    else if (elements.detailDialog.open) {
      pendingFocusRestore = true;
      suppressDialogClose = true;
      elements.detailDialog.close();
      suppressDialogClose = false;
      activeDetailSlug = null;
    }
  }

  function restoreDetailFocus() {
    pendingFocusRestore = false;
    requestAnimationFrame(() => {
      if (detailReturnTarget?.isConnected) {
        detailReturnTarget.focus();
      } else {
        const matchingLinks = [...document.querySelectorAll("a.detail-link")].filter((link) => new URL(link.href).searchParams.get("trail") === detailReturnSlug);
        const target = matchingLinks.find((link) => link.getClientRects().length > 0) || document.querySelector("#trail-list");
        target?.focus();
      }
      detailReturnTarget = null;
      detailReturnSlug = null;
    });
  }

  function clearFilters() {
    elements.form.reset();
    elements.sort.value = "rank";
    updateUrl();
    render();
  }

  function updateOriginDisplay() {
    elements.originLabel.textContent = origin.custom
      ? `Custom origin ${origin.lat.toFixed(3)}, ${origin.lon.toFixed(3)}`
      : `${config.homeOrigin.label} (${origin.lat.toFixed(3)}, ${origin.lon.toFixed(3)})`;
    elements.latitude.value = origin.lat.toFixed(3);
    elements.longitude.value = origin.lon.toFixed(3);
  }

  function routeCacheKey() {
    return `${routeCachePrefix}${origin.lat.toFixed(3)},${origin.lon.toFixed(3)}`;
  }

  async function calculateRoutes(force = false) {
    routeController?.abort();
    routeController = new AbortController();
    const cacheKey = routeCacheKey();
    const cached = loadRouteCache(cacheKey);
    const cachedRoutes = force ? null : validateRouteCache(cached.value);
    if (cachedRoutes) {
      routes = cachedRoutes;
      elements.routeNote.textContent = "Using a cached OpenStreetMap/OSRM estimate (under six hours old); no live traffic.";
      render();
      if (elements.detailDialog.open && activeDetailSlug) renderDetail(bySlug.get(activeDetailSlug), true);
      return;
    }
    if (cached.present) removeRouteCache(cacheKey);

    elements.routeNote.textContent = "Updating one route matrix through OpenStreetMap/OSRM; no live traffic...";
    const coordinates = [`${origin.lon},${origin.lat}`, ...trails.map((trail) => `${trail.lon},${trail.lat}`)].join(";");
    const destinations = trails.map((_trail, index) => index + 1).join(";");
    const url = `https://router.project-osrm.org/table/v1/driving/${coordinates}?sources=0&destinations=${destinations}&annotations=distance,duration`;
    try {
      const response = await fetch(url, { signal: routeController.signal });
      if (!response.ok) throw new Error(`Routing service returned ${response.status}`);
      const result = await response.json();
      if (result.code !== "Ok" || !result.distances?.[0] || !result.durations?.[0]) throw new Error("Routing response was incomplete");
      const calculated = {};
      trails.forEach((trail, index) => {
        const meters = result.distances[0][index];
        const seconds = result.durations[0][index];
        calculated[trail.slug] = Number.isFinite(meters) && meters >= 0 && Number.isFinite(seconds) && seconds >= 0
          ? { miles: meters / 1609.344, minutes: seconds / 60, source: "live" }
          : null;
      });
      routes = calculated;
      const cacheRoutes = Object.fromEntries(Object.entries(calculated).map(([slug, route]) => [slug, route ? { miles: route.miles, minutes: route.minutes } : null]));
      const cachePayload = { savedAt: Date.now(), origin: { lat: origin.lat, lon: origin.lon }, routes: cacheRoutes };
      if (validateRouteCache(cachePayload)) {
        try {
          localStorage.setItem(cacheKey, JSON.stringify(cachePayload));
        } catch (_error) {
          // A routing result remains usable when storage is unavailable.
        }
      }
      elements.routeNote.textContent = "OpenStreetMap/OSRM driving estimate; no live traffic. Cached for up to six hours.";
    } catch (error) {
      if (error.name === "AbortError") return;
      routes = homeOrigin(origin) ? seededRoutes() : unavailableRoutes();
      elements.routeNote.textContent = homeOrigin(origin)
        ? "OSRM is unavailable; showing fixed-home fallback estimates with no live traffic."
        : "Routing is unavailable for this custom origin. No straight-line estimate is substituted.";
    }
    render();
    if (elements.detailDialog.open && activeDetailSlug) renderDetail(bySlug.get(activeDetailSlug), true);
  }

  function saveOrigin(lat, lon, custom = true) {
    if (!validCoordinate(lat, lon)) {
      elements.locationStatus.textContent = "Enter a latitude from -90 to 90 and longitude from -180 to 180.";
      return;
    }
    origin = { lat: roundCoordinate(lat), lon: roundCoordinate(lon), custom };
    if (custom) localStorage.setItem(originKey, JSON.stringify({ lat: origin.lat, lon: origin.lon }));
    else localStorage.removeItem(originKey);
    routes = homeOrigin(origin) ? seededRoutes() : unavailableRoutes();
    elements.locationStatus.textContent = "";
    updateOriginDisplay();
    elements.locationDialog.close();
    render();
    calculateRoutes();
  }

  function useGps() {
    elements.locationStatus.textContent = "Waiting for browser location permission...";
    if (!navigator.geolocation) {
      elements.locationStatus.textContent = "This browser does not provide geolocation. Enter coordinates instead.";
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => saveOrigin(position.coords.latitude, position.coords.longitude, true),
      (error) => { elements.locationStatus.textContent = `Location was not used: ${error.message}`; },
      { enableHighAccuracy: false, timeout: 12000, maximumAge: 300000 }
    );
  }

  function download(filename, content, type) {
    const link = document.createElement("a");
    const url = URL.createObjectURL(new Blob([content], { type }));
    link.href = url;
    link.download = filename;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  function exportJson() {
    const payload = { format: "smokies-hikes-completions", version: 1, exportedAt: new Date().toISOString(), completed: [...completed].sort() };
    download("smokies-hikes-progress.json", `${JSON.stringify(payload, null, 2)}\n`, "application/json");
  }

  function exportCsv() {
    const lines = ["rank,slug,trail,completed,hike_miles,elevation_gain_ft,status"];
    trails.forEach((trail) => lines.push([trail.rank, trail.slug, `"${trail.name.replaceAll('"', '""')}"`, completed.has(trail.slug), trail.currentMiles || trail.miles, trail.elevation, trail.status].join(",")));
    download("smokies-hikes-progress.csv", `${lines.join("\n")}\n`, "text/csv;charset=utf-8");
  }

  async function importJson(file) {
    elements.importStatus.textContent = "";
    try {
      if (!file || file.size > 1024 * 1024) throw new Error("Choose a JSON export smaller than 1 MB.");
      const payload = JSON.parse(await file.text());
      if (payload?.format !== "smokies-hikes-completions" || payload.version !== 1 || !Array.isArray(payload.completed)) throw new Error("This is not a supported trail progress export.");
      if (payload.completed.some((slug) => typeof slug !== "string" || !bySlug.has(slug))) throw new Error("The export contains an unknown trail identifier.");
      completed = new Set(payload.completed);
      localStorage.setItem(completionKey, JSON.stringify([...completed]));
      elements.importStatus.textContent = `Imported ${completed.size} completed trail${completed.size === 1 ? "" : "s"}.`;
      render();
    } catch (error) {
      elements.importStatus.textContent = `Import failed: ${error.message}`;
    } finally {
      elements.importFile.value = "";
    }
  }

  elements.form.addEventListener("input", () => { updateUrl(); render(); });
  elements.form.addEventListener("change", () => { updateUrl(); render(); });
  document.querySelector("#clear-filters").addEventListener("click", clearFilters);
  document.querySelector("#empty-clear").addEventListener("click", clearFilters);
  document.querySelector("#location-button").addEventListener("click", () => {
    elements.locationStatus.textContent = "";
    updateOriginDisplay();
    elements.locationDialog.showModal();
  });
  document.querySelector("#refresh-routes").addEventListener("click", () => calculateRoutes(true));
  document.querySelector("#use-gps").addEventListener("click", useGps);
  document.querySelector("#location-form").addEventListener("submit", (event) => {
    event.preventDefault();
    saveOrigin(elements.latitude.valueAsNumber, elements.longitude.valueAsNumber, true);
  });
  document.querySelector("[data-close-location]").addEventListener("click", () => elements.locationDialog.close());
  document.querySelector("#reset-location").addEventListener("click", () => saveOrigin(config.homeOrigin.lat, config.homeOrigin.lon, false));
  document.querySelector("#export-json").addEventListener("click", exportJson);
  document.querySelector("#export-csv").addEventListener("click", exportCsv);
  document.querySelector("#import-button").addEventListener("click", () => elements.importFile.click());
  elements.importFile.addEventListener("change", () => importJson(elements.importFile.files[0]));

  document.addEventListener("click", (event) => {
    const detailLink = event.target.closest("a.detail-link");
    if (detailLink) {
      const slug = new URL(detailLink.href).searchParams.get("trail");
      if (bySlug.has(slug)) {
        event.preventDefault();
        openDetail(slug, elements.detailDialog.open ? "replace" : "push", detailLink);
      }
    }
    if (event.target.closest("[data-close-detail]")) elements.detailDialog.close();
  });

  document.addEventListener("change", (event) => {
    const checkbox = event.target.closest("[data-complete]");
    if (checkbox) toggleCompletion(checkbox.dataset.complete, checkbox.checked);
  });

  elements.detailDialog.addEventListener("click", (event) => {
    if (event.target === elements.detailDialog) elements.detailDialog.close();
  });

  elements.locationDialog.addEventListener("click", (event) => {
    if (event.target === elements.locationDialog) elements.locationDialog.close();
  });

  elements.detailDialog.addEventListener("close", () => {
    if (suppressDialogClose) return;
    activeDetailSlug = null;
    pendingFocusRestore = true;
    const hasTrail = new URLSearchParams(location.search).has("trail");
    if (hasTrail && history.state?.trailEntry) history.back();
    else {
      if (hasTrail) removeTrailFromUrl();
      restoreDetailFocus();
    }
  });

  window.addEventListener("popstate", () => {
    applyUrlState();
    render();
    syncDetailFromUrl();
    if (pendingFocusRestore && !elements.detailDialog.open) restoreDetailFocus();
  });

  applyUrlState();
  updateOriginDisplay();
  render();
  syncDetailFromUrl();
  calculateRoutes();
})();
