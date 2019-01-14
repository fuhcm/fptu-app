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
        FPTUSDk.push.syncPush(token);

        return token;
    } catch (err) {
        //eslint-disable-next-line
        console.log(err);
        return null;
    }
};
