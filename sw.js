// Trening Pro - Service Worker
// Strategia: cache-first dla statycznych zasobów, network-first dla API

const CACHE_VERSION = 'trening-pro-v8';
const CACHE_NAME = `${CACHE_VERSION}`;

// Pliki do zachowania w cache (działanie offline)
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './db.js',
  // CDN-y
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap',
  'https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.19.0/dist/tabler-icons.min.css',
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js'
];

// Instalacja - cache statycznych zasobów
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // Cache pliki jeden po drugim - jeśli któryś nie zadziała, reszta będzie OK
        return Promise.allSettled(
          STATIC_ASSETS.map(url => cache.add(url).catch(err => {
            console.warn('SW: failed to cache:', url, err);
          }))
        );
      })
      .then(() => self.skipWaiting())
  );
});

// Aktywacja - czyszczenie starych cache
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Strategia fetch
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // NIGDY nie cache'uj zapytań do API Anthropic - zawsze online
  if (url.hostname === 'api.anthropic.com') {
    event.respondWith(fetch(request));
    return;
  }

  // POST i inne metody nie-GET pomijamy
  if (request.method !== 'GET') {
    event.respondWith(fetch(request));
    return;
  }

  // Strategia: cache-first dla wszystkich zasobów statycznych
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) {
        // Mamy w cache - zwróć od razu, ale spróbuj odświeżyć w tle
        fetch(request).then((response) => {
          if (response && response.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, response.clone()).catch(() => {});
            });
          }
        }).catch(() => {});
        return cached;
      }
      // Brak w cache - pobierz z sieci i zapisz
      return fetch(request).then((response) => {
        if (!response || response.status !== 200) return response;
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseClone).catch(() => {});
        });
        return response;
      }).catch(() => {
        // Offline + brak w cache - zwróć stronę główną dla nawigacji
        if (request.mode === 'navigate') {
          return caches.match('./index.html');
        }
        return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
      });
    })
  );
});
