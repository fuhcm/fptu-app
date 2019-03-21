/* eslint-disable */
importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/4.1.1/workbox-sw.js"
);

if (workbox) {
    workbox.routing.registerRoute(
        /\.(?:js|css|html|png|jpg)$/,
        new workbox.strategies.NetworkFirst()
    );
    workbox.routing.registerRoute(
        "https://fptu.tech",
        new workbox.strategies.NetworkFirst()
    );
} else {
    console.log(`Boo! Workbox didn't load 😬`);
}
