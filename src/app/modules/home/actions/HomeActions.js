import CrawlService from "service/Crawl";
import { GET_HOME_ARTICLE_SUCCESS, GET_HOME_ARTICLE_FAILURE } from "../types";

export const getHomeArticles = () => {
    return dispatch => {
        return CrawlService.getArticles("fpt")
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
