self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("static").then(cache => {
      console.log("Caching all resourcesssss")
      return cache.addAll(["./", "index.css", "index.js", "icons/icon-512x512.png", "icons/icon-384x384.png", "icons/icon-256x256.png", "icons/icon-192x192.png", "manifest.json", "favicon.ico"])
    })
  )
})

// below employs reliance on network first / cache later approach. 
self.addEventListener("fetch", e => {
  if (navigator.onLine) {
    // If browser is online, fetch from internet
    console.log("fetching from server")
    e.respondWith(fetch(e.request));
  } else {
    // If browser is offline, try to fetch from cache
    e.respondWith(
      caches.match(e.request).then(response => {
        if (response) {
          console.log('serving from cachee');
          return response;
        }
      })
    );
  }
});
