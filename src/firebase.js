import firebase from "firebase";

export const initializeFirebase = () => {
    firebase.initializeApp({
        messagingSenderId: "292520951559",
    });
};

export const askForPermissioToReceiveNotifications = async () => {
    try {
        const messaging = firebase.messaging();
        await messaging.requestPermission();
        const token = await messaging.getToken();

        //eslint-disable-next-line
        await FPTUSDK.push.syncPush(token);

        return token;
    } catch (err) {
        //eslint-disable-next-line
        console.log(err);
        return null;
    }
};

export const initialServiceWorker = () => {
    if (typeof window !== "undefined") {
        navigator.serviceWorker
            .register("/assets/firebase-messaging-sw.js")
            .then(registration => {
                firebase.messaging().useServiceWorker(registration);
            });
    }
};
