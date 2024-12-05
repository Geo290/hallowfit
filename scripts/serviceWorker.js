// Name of the cache
const CACHE_NAME = "portfolio_cache_v1";

// Files to cache
const urlsToCache = [
  "./",
  "./index.html",
  "./styles/styles.css",
  "./scripts/main.js",
  "./imgs/icons/android-launchericon-48-48.png",
  "./imgs/icons/android-launchericon-72-72.png",
  "./imgs/icons/android-launchericon-96-96.png",
  "./imgs/icons/android-launchericon-144-144.png",
  "./imgs/icons/android-launchericon-192-192.png",
  "./imgs/icons/android-launchericon-512-512.png",
  "./imgs/backgrounds/city.jpg",
  "./imgs/logo/emmanuel_portfolio_logo.png",
  "./imgs/college/utna.jpg",
  "./imgs/skills/skills.avif",
  "./imgs/proyects/itosMansion.png",
  "./imgs/proyects/sopiletras.png",
  "./imgs/proyects/yournal-thumbnail.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    //le decimos que detenga el evento hasta que se ejecute lo siguiente
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache).then(() => {
        console.log("service installed");
        self.skipWaiting;
      });
    })
  );
});

self.addEventListener("activate", (e) => {
  const listaBlancaCache = [CACHE_NAME];

  e.waitUntil(
    caches
      .keys()
      .then((nombresCache) => {
        return Promise.all(
          nombresCache.map((nombresCache) => {
            if (listaBlancaCache.indexOf(nombresCache) === -1) {
              return caches.delete(nombresCache);
            }
          })
        );
      })
      //activamos la cache actualizada
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      if (res) {
        return res;
      }
      return fetch(e.request);
    })
  );
});
