import CrawlService from "service/Crawl";
import {
    GET_CODEDAO_ARTICLE_SUCCESS,
    GET_CODEDAO_ARTICLE_FAILURE,
} from "../types";


export const getCodedaoArticles = () => {
    return dispatch => {
        return CrawlService.getArticles("codedao")
            .then(data => {
                dispatch({
                    type   : GET_CODEDAO_ARTICLE_SUCCESS,
                    payload: data,
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
