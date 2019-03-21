/* eslint-disable */
importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/4.1.1/workbox-sw.js"
);

if (workbox) {
    workbox.routing.registerRoute("/", new workbox.strategies.NetworkFirst());
    workbox.routing.registerRoute(
        "/send",
        new workbox.strategies.NetworkFirst()
    );
} else {
    console.log(`Boo! Workbox didn't load 😬`);
}
