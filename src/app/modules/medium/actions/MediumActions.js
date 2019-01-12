import { getPure } from "../../../utils/ApiCaller";
import { CRAWL__URL } from "../../../utils/ApiEndpoint";

import {
    GET_MEDIUM_ARTICLE_SUCCESS,
    GET_MEDIUM_ARTICLE_FAILURE,
} from "../types";

export const getMediumArticles = () => {
    return dispatch => {
        return getPure(CRAWL__URL + "/medium")
            .then(res => {
                dispatch({
                    type   : GET_MEDIUM_ARTICLE_SUCCESS,
                    payload: res.data,
                });
            })
            .catch(err => {
                dispatch({
                    type   : GET_MEDIUM_ARTICLE_FAILURE,
                    payload: err,
                });
            });
    };
};
