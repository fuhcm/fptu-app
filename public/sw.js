/* eslint-disable */
importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/4.1.1/workbox-sw.js"
);

if (workbox) {
    // Force production builds
    workbox.setConfig({ debug: false });

    workbox.routing.registerRoute("/", new workbox.strategies.NetworkFirst());
    workbox.routing.registerRoute(
        "/home",
        new workbox.strategies.NetworkFirst()
    );
    workbox.routing.registerRoute(
        "/send",
        new workbox.strategies.NetworkFirst()
    );
    workbox.routing.registerRoute(
        "/my-confess",
        new workbox.strategies.NetworkFirst()
    );
    workbox.routing.registerRoute(
        "/search",
        new workbox.strategies.NetworkFirst()
    );
    workbox.routing.registerRoute(
        "/login",
        new workbox.strategies.NetworkFirst()
    );
    workbox.routing.registerRoute(
        "/medium",
        new workbox.strategies.NetworkFirst()
    );
    workbox.routing.registerRoute(
        "/toidicodedao",
        new workbox.strategies.NetworkFirst()
    );
    workbox.routing.registerRoute(
        "/radio",
        new workbox.strategies.NetworkFirst()
    );
    workbox.routing.registerRoute(
        new RegExp(".+\\.js$"),
        new workbox.strategies.NetworkFirst()
    );
    workbox.routing.registerRoute(
        new RegExp(".+\\.css$"),
        new workbox.strategies.NetworkFirst()
    );
    workbox.routing.registerRoute(
        new RegExp(".+\\.jpg$"),
        new workbox.strategies.CacheFirst()
    );
    workbox.routing.registerRoute(
        new RegExp(".+\\.png$"),
        new workbox.strategies.CacheFirst()
    );
    workbox.routing.registerRoute(
        new RegExp(".+\\.ico$"),
        new workbox.strategies.CacheFirst()
    );
    workbox.routing.registerRoute(
        new RegExp(".+\\.json$"),
        new workbox.strategies.NetworkFirst()
    );
    workbox.routing.registerRoute(
        new RegExp(".+\\.woff2$"),
        new workbox.strategies.CacheFirst()
    );
} else {
    console.log(`Boo! Workbox didn't load 😬`);
}
