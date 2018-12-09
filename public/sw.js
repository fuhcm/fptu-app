var urlsToCache = [];

urlsToCache.push("/");

var CACHE_NAME = "cache-cf-fptu-v2";

self.addEventListener("install", function(event) {
    // Perform install steps
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
            .catch(function(err) {
                console.log("Cache add err", err);
            })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        fetch(event.request).catch(function() {
            return caches.match(event.request);
        })
    );
});
