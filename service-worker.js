const CACHE_NAME = "inventory-cache-v1";
const urlsToCache = [
  "/FWarehouse/",
  "/FWarehouse/index.html",
  "/FWarehouse/app.js",
  "/FWarehouse/manifest.json",
  "https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      )
    )
  );
});
