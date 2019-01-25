import {
    GET_MEDIUM_ARTICLE_SUCCESS,
    GET_MEDIUM_ARTICLE_FAILURE,
    LOAD_MORE_ARTICLE,
} from "../types";

export const getMediumArticles = () => {
    return dispatch => {
        return FPTUSDK.crawl
            .getArticles("medium")
            .then(data => {
                dispatch({
                    type   : GET_MEDIUM_ARTICLE_SUCCESS,
                    payload: data,
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

export const loadMoreArticle = () => {
    return dispatch => {
        dispatch({
            type: LOAD_MORE_ARTICLE,
        });
    };
};
