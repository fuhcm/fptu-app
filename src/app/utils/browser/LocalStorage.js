import uuidv4 from "uuid/v4";

export const LOCAL_STORAGE_KEY = {
    JWT         : "cfapp_jwt",
    EMAIL       : "cfapp_email",
    NICKNAME    : "cfapp_nickname",
    SENDER      : "cfapp_sendertoken",
    NOTIFICATION: "cfapp_notification_v1",
};

class LocalStorageUtils {
    getItem(key, defaultValue) {
        if (typeof localStorage !== "undefined") {
            return localStorage.getItem(key) || defaultValue;
        }

        return "undefined";
    }

    setItem(key, value) {
        if (typeof localStorage !== "undefined") {
            localStorage.setItem(key, value);
        }
    }

    removeItem(key) {
        if (typeof localStorage !== "undefined") {
            localStorage.removeItem(key);
        }
    }

    clear() {
        if (typeof localStorage !== "undefined") {
            localStorage.clear();
        }
    }

    isAuthenticated() {
        const jwt = this.getItem(LOCAL_STORAGE_KEY.JWT);
        return jwt && jwt !== "undefined";
    }

    getJWT() {
        return this.getItem(LOCAL_STORAGE_KEY.JWT, "");
    }

    getEmail() {
        return this.getItem(LOCAL_STORAGE_KEY.EMAIL, "");
    }

    getName() {
        const email = this.getItem(LOCAL_STORAGE_KEY.EMAIL, "");

        return email.substring(0, email.lastIndexOf("@"));
    }

    getNickName() {
        return this.getItem(LOCAL_STORAGE_KEY.NICKNAME, "");
    }

    generateSenderToken() {
        const token = this.getItem(LOCAL_STORAGE_KEY.SENDER);

        if (!token || token === "undefined") {
            const newSenderToken = uuidv4();

            this.setItem(LOCAL_STORAGE_KEY.SENDER, newSenderToken);
        }
    }

    getSenderToken() {
        return this.getItem(LOCAL_STORAGE_KEY.SENDER, "guest");
    }

    setNotificationLoaded() {
        this.setItem(LOCAL_STORAGE_KEY.NOTIFICATION, true);
    }

    isNotificationLoaded() {
        const loaded = this.getItem(LOCAL_STORAGE_KEY.NOTIFICATION);
        return loaded && loaded !== "undefined";
    }
}

export default new LocalStorageUtils();
