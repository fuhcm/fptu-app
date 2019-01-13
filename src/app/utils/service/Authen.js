import BaseHTTP from "./index";

import localStorage, {
    LOCAL_STORAGE_KEY as keys,
} from "../browser/LocalStorage";

class AuthenService extends BaseHTTP {
    constructor() {
        super();

        this.localStorage = localStorage;
        this.keys = keys;
    }

    basicLogin = async (email, password) => {
        try {
            const { data } = await this.caller.post(
                this.endpoints.AUTH__LOGIN,
                { email, password }
            );

            return data;
        } catch (err) {
            // Catch error
            return null;
        }
    };

    loginFacebook = async (email, token) => {
        try {
            const { data } = await this.caller.post(
                this.endpoints.AUTH__LOGIN_FACEBOOK,
                { email, token }
            );

            return data;
        } catch (err) {
            // Catch error
            return null;
        }
    };

    saveToken = (token, email, nickname) => {
        this.localStorage.setItem(this.keys.JWT, token);
        this.localStorage.setItem(this.keys.EMAIL, email);
        this.localStorage.setItem(this.keys.NICKNAME, nickname);
    };
}

export default new AuthenService();
