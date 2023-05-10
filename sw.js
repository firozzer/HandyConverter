self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll(["./", "index.css", "index.js", "icons/icon-512x512.png", "icons/icon-384x384.png", "icons/icon-256x256.png", "icons/icon-192x192.png"])
        })
    )
})

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            console.log('serving from cache')
            return response || fetch(e.request)
        })
    )
})