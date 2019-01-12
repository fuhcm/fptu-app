import { getPure } from "../../../utils/ApiCaller";
import { CRAWL__URL } from "../../../utils/ApiEndpoint";

import {
    GET_CODEDAO_ARTICLE_SUCCESS,
    GET_CODEDAO_ARTICLE_FAILURE,
} from "../types";

export const getCodedaoArticles = () => {
    return dispatch => {
        return getPure(CRAWL__URL + "/codedao")
            .then(res => {
                dispatch({
                    type   : GET_CODEDAO_ARTICLE_SUCCESS,
                    payload: res.data,
                });
            })
            .catch(err => {
                dispatch({
                    type   : GET_CODEDAO_ARTICLE_FAILURE,
                    payload: err,
                });
            });
    };
};
