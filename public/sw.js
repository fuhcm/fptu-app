var urlsToCache = [];

urlsToCache.push("");

urlsToCache.push("/");

urlsToCache.push("/send");

urlsToCache.push("/my-confess");

urlsToCache.push("/login");

urlsToCache.push("/admin-cp");

var CACHE_NAME = "cache-cf-fptu-v1";

self.addEventListener("install", function(event) {
    // Perform install steps
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
            .catch(function(err) {
                console.log("cache add err", err);
            })
    );
});

// strategies from the offline cookbook by jake archibald
// https://jakearchibald.com/2014/offline-cookbook/#serving-suggestions-responding-to-requests

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches.open(CACHE_NAME).then(function(cache) {
            return fetch(event.request).then(function(response) {
                cache.put(event.request, response.clone());
                return response;
            });
        })
    );
});
