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
        console.log("Token: ", token);

        return token;
    } catch (err) {
        // Catch error
        console.log(err);
        return null;
    }
};
