// Name of the cache
const CACHE_NAME = 'hallowfit-cache-v1';

// Files to cache
const urlsToCache = [
  './index.html',
  './styles/main.css',
  './scripts/main.js',
  './imgs/logo/Hallowfit_logo_pwa.png',
  './imgs/backgrounds/landscape_purple.jpg',
  './imgs/customes', // Add other images or files
  './fonts/',
];

// Install event: caches static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate event: cleans up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event: serves cached content when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // If found in cache, return it
        if (response) {
          return response;
        }
        // Otherwise fetch from network
        return fetch(event.request);
      })
  );
});
