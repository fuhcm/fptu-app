/* eslint-disable */
importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/4.1.1/workbox-sw.js"
);

if (workbox) {
    // Force production builds
    workbox.setConfig({ debug: false });

    workbox.routing.registerRoute(
        "/",
        new workbox.strategies.StaleWhileRevalidate()
    );
    workbox.routing.registerRoute(
        "/home",
        new workbox.strategies.StaleWhileRevalidate()
    );
    workbox.routing.registerRoute(
        "/send",
        new workbox.strategies.StaleWhileRevalidate()
    );
    workbox.routing.registerRoute(
        "/my-confess",
        new workbox.strategies.StaleWhileRevalidate()
    );
    workbox.routing.registerRoute(
        "/search",
        new workbox.strategies.StaleWhileRevalidate()
    );
    workbox.routing.registerRoute(
        "/login",
        new workbox.strategies.StaleWhileRevalidate()
    );
    workbox.routing.registerRoute(
        "/medium",
        new workbox.strategies.StaleWhileRevalidate()
    );
    workbox.routing.registerRoute(
        "/toidicodedao",
        new workbox.strategies.StaleWhileRevalidate()
    );
    workbox.routing.registerRoute(
        "/radio",
        new workbox.strategies.StaleWhileRevalidate()
    );
    workbox.routing.registerRoute(
        new RegExp(".+\\.js$"),
        new workbox.strategies.StaleWhileRevalidate()
    );
    workbox.routing.registerRoute(
        new RegExp(".+\\.css$"),
        new workbox.strategies.StaleWhileRevalidate()
    );
    workbox.routing.registerRoute(
        new RegExp(".+\\.jpg$"),
        new workbox.strategies.StaleWhileRevalidate()
    );
    workbox.routing.registerRoute(
        new RegExp(".+\\.png$"),
        new workbox.strategies.StaleWhileRevalidate()
    );
    workbox.routing.registerRoute(
        new RegExp(".+\\.ico$"),
        new workbox.strategies.StaleWhileRevalidate()
    );
    workbox.routing.registerRoute(
        new RegExp(".+\\.json$"),
        new workbox.strategies.StaleWhileRevalidate()
    );
    workbox.routing.registerRoute(
        new RegExp(".+\\.woff2$"),
        new workbox.strategies.StaleWhileRevalidate()
    );
} else {
    console.log(`Boo! Workbox didn't load 😬`);
}
