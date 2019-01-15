importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js");

//eslint-disable-next-line
firebase.initializeApp({
    messagingSenderId: "292520951559",
});

//eslint-disable-next-line
const messaging = firebase.messaging();
