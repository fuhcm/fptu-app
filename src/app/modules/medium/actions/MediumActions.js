import CrawlService from "service/Crawl";
import {
    GET_MEDIUM_ARTICLE_SUCCESS,
    GET_MEDIUM_ARTICLE_FAILURE,
} from "../types";


export const getMediumArticles = () => {
    return dispatch => {
        return CrawlService.getArticles("medium")
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
