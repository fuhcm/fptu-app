export const BASE_URL = APP_ENV.API_BASE_URL;
export const AUTH_BASE_URL = BASE_URL + "/auth";
export const API_BASE_URL = BASE_URL + "/api/v1";

// Authentication
export const AUTH__LOGIN = AUTH_BASE_URL + "/login";
export const AUTH__LOGIN_FACEBOOK = AUTH_BASE_URL + "/login_facebook";
export const AUTH__SIGN_UP = AUTH_BASE_URL + "/signup";

// AdminCP
export const ADMINCP__GET_CONFESS = API_BASE_URL + "/admincp/confessions";
export const ADMINCP__APPROVE_CONFESS =
    API_BASE_URL + "/admincp/confessions/approve";
export const ADMINCP__REJECT_CONFESS =
    API_BASE_URL + "/admincp/confessions/reject";
export const ADMINCP__GET_NEXT_ID = API_BASE_URL + "/next_confession_id";

// Guest
export const GUEST__POST_CONFESS = API_BASE_URL + "/confessions";
export const GUEST__GET_MY_CONFESS = API_BASE_URL + "/myconfess";
export const GUEST__GET_OVERVIEW = API_BASE_URL + "/confessions/overview";
export const GUEST__GET_APPROVED = API_BASE_URL + "/confessions/approved";

// Crawl
export const CRAWL__URL = BASE_URL + "/crawl";
