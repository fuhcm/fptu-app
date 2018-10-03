import axios from "axios";
import objectAssign from 'object-assign';
import LocalStorage from "../utils/LocalStorage";

export const getHeaders = () => {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LocalStorage.getJWT()}`,
    };
};

export const request = (
    endpoint,
    method,
    headers = {},
    params = {},
    body = {}
) => {
    return axios({
        url: endpoint,
        method: method,
        headers: objectAssign(getHeaders(), headers),
        params: objectAssign(params),
        data: body,
    });
};

export const get = (endpoint, params = {}, headers = {}) => {
    return request(endpoint, "GET", headers, params);
};

export const post = (endpoint, body = {}, params = {}, headers = {}) => {
    return request(endpoint, "POST", headers, params, body);
};
