const CACHE_NAME = 'pixelplayer-web-v6';
const APP_SHELL = ['./', './index.html', './manifest.json', './prism-icon.svg', './apple-touch-icon.png', './icon-192.png', './icon-512.png'];

const cacheResponse = (event, request, response) => {
  if (!response.ok) return response;
  const copy = response.clone();
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.put(request, copy)));
  return response;
};

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
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

  if (request.mode === 'navigate' || url.pathname.endsWith('/index.html')) {
    event.respondWith(
      fetch(request)
        .then((response) => cacheResponse(event, request, response))
        .catch(() => caches.match(request)
          .then((cached) => cached || caches.match('./index.html'))
          .then((cached) => cached || Response.error()))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => cacheResponse(event, request, response))
        .catch(() => cached || Response.error());
      return cached || network;
    })
  );
});
