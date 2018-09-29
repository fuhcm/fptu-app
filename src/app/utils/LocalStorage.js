export const LOCAL_STORAGE_KEY = {
    JWT: "fptucf_jwt",
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
}

export default new LocalStorageUtils();
