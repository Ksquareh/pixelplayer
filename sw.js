const CACHE_NAME = 'pixelplayer-web-v8';
const APP_SHELL = ['./', './index.html', './manifest.json', './pixelplayer-icon.svg', './apple-touch-icon.png', './icon-192.png', './icon-512.png'];

const cacheResponse = (event, request, response) => {
  if (!response.ok) return response;
  const copy = response.clone();
  const cacheUrl = new URL(request.url); cacheUrl.search = '';
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.put(cacheUrl.toString(), copy)));
  return response;
};

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => Promise.all(APP_SHELL.map((asset) => fetch(asset).then((response) => { if (!response.ok) throw new Error(`${asset} ${response.status}`); return cache.put(asset, response).then(() => true); }).catch(() => false))).then((results) => { if (!results.some(Boolean)) throw new Error('PixelPlayer shell could not be cached.'); if (results.some((result) => !result)) console.warn('PixelPlayer shell installed with missing optional files.'); })));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => (key.startsWith('pixelplayer-') || key.startsWith('prism-local-player-')) && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  const cacheUrl = new URL(url); cacheUrl.search = '';

  if (request.mode === 'navigate' || url.pathname.endsWith('/index.html')) {
    event.respondWith(
      fetch(request)
        .then((response) => cacheResponse(event, request, response))
        .catch(() => caches.match(cacheUrl.toString())
          .then((cached) => cached || caches.match('./index.html'))
          .then((cached) => cached || Response.error()))
    );
    return;
  }

  event.respondWith(
    caches.match(cacheUrl.toString()).then((cached) => {
      const network = fetch(request)
        .then((response) => cacheResponse(event, request, response))
        .catch(() => cached || Response.error());
      return cached || network;
    })
  );
});
