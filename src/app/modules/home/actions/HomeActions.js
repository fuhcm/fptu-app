import { getPure } from "../../../utils/ApiCaller";
import { CRAWL__URL } from "../../../utils/ApiEndpoint";

import { GET_HOME_ARTICLE_SUCCESS, GET_HOME_ARTICLE_FAILURE } from "../types";

export const getHomeArticles = () => {
    return dispatch => {
        return getPure(CRAWL__URL + "/fpt")
            .then(res => {
                dispatch({
                    type   : GET_HOME_ARTICLE_SUCCESS,
                    payload: res.data,
                });
            })
            .catch(err => {
                dispatch({
                    type   : GET_HOME_ARTICLE_FAILURE,
                    payload: err,
                });
            });
    };
};
