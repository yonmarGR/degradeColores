const CACHE_NAME = "v1_cache_degradado"
const urlsToCache = [
  "./",
  "./?umt_source=web_app_manifest",
  "./pages/fallback.html",
  "./pages/css/style.css",
  "./img/deg16.png",
  "./img/deg32.png",
  "./img/deg64.png",
  "./img/deg128.png",
  "./img/maskable.png",
  "./img/deg256.png",
  "./img/deg512.png",
  "./img/deg1024.png",
  "./js/main.js",
  "https://unpkg.com/vue@next",
  "./js/mountApp.js",
  "./css/style.css",
  "./manifest.json",
  "https://fonts.googleapis.com/css2?family=Roboto&display=swap"
];

// para almacenar en cache todos los datos
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
    cache
      .addAll(urlsToCache)
      .then(() => self.skipWaiting())
      .catch((err) => console.log(err))
    )
  );
});

// activar y comparar caches
self.addEventListener("activate", (e) => {
  const cacheWhitelist = [CACHE_NAME];

  e.waitUntil(
    caches
    .keys()
    .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
              if (cacheWhitelist.indexOf(cacheName) === -1){
                return caches.delete(cacheName);
              }
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

// se encarga de hacer las peticiones
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
        if (res) {
          return res;
        }
        return fetch(e.request);
      }).catch(
        () => caches.match("./pages/fallback.html")
      )
  );
});
