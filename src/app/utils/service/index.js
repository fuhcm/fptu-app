import * as endpoints from "./common/Endpoints";
import caller from "./common/Caller";

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
