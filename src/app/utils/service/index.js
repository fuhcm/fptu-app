import localStorage, { LOCAL_STORAGE_KEY as keys } from "browser/LocalStorage";
import * as endpoints from "./common/Endpoints";
import caller from "./common/Caller";

class BaseHTTP {
    constructor() {
        this.endpoints = endpoints;
        this.caller = caller;
        this.localStorage = localStorage;
        this.keys = keys;
    }
}

export default BaseHTTP;
