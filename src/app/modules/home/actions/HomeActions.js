import {
    GET_HOME_ARTICLE_LOADING,
    GET_HOME_ARTICLE_SUCCESS,
    GET_HOME_ARTICLE_FAILURE,
} from "../types";

export const getHomeArticles = () => {
    return dispatch => {
        dispatch({
            type: GET_HOME_ARTICLE_LOADING,
        });

        return FPTUSDK.crawl
            .getArticles("fpt")
            .then(data => {
                dispatch({
                    type   : GET_HOME_ARTICLE_SUCCESS,
                    payload: data,
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
