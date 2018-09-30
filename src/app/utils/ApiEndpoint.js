export const BASE_URL      = "https://fptucf-api.gosu.team";
export const AUTH_BASE_URL = BASE_URL + "/auth";
export const API_BASE_URL  = BASE_URL + "/api/v1";

// Authentication
export const AUTH__LOGIN   = AUTH_BASE_URL + "/login";
export const AUTH__SIGN_UP = AUTH_BASE_URL + "/signup";

// AdminCP
export const ADMINCP__GET_CONFESS = API_BASE_URL + "/admincp/confessions";

// Guest
export const GUEST__POST_CONFESS   = API_BASE_URL + "/confessions";
export const GUEST__GET_MY_CONFESS = API_BASE_URL + "/myconfess";