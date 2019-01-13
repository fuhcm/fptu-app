import * as endpoints from "./Endpoints";
import caller from "./Caller";

import localStorage, {
    LOCAL_STORAGE_KEY as keys,
} from "../browser/LocalStorage";

class BaseHTTP {
    constructor() {
        this.endpoints = endpoints;
        this.caller = caller;
        this.localStorage = localStorage;
        this.keys = keys;
    }
}

export default BaseHTTP;
