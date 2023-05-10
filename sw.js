self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("static").then(cache => {
      return cache.addAll(["./", "index.css", "index.js", "icons/icon-512x512.png", "icons/icon-384x384.png", "icons/icon-256x256.png", "icons/icon-192x192.png"])
    })
  )
})

self.addEventListener("fetch", e => {
  if (navigator.onLine) {
    // If browser is online, fetch from internet
    e.respondWith(fetch(e.request));
  } else {
    // If browser is offline, try to fetch from cache
    e.respondWith(
      caches.match(e.request).then(response => {
        if (response) {
          console.log('serving from cache');
          return response;
        } else {
          // If resource is not found in cache, return a fallback response
          return new Response("You are offline. Please check your internet connection.");
        }
      })
    );
  }
});
