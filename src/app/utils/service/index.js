import * as endpoints from "./Endpoints";
import caller from "./Caller";

class BaseHTTP {
    constructor() {
        this.endpoints = endpoints;
        this.caller = caller;
    }
}

export default BaseHTTP;
