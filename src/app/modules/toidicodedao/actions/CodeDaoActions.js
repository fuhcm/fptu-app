import {
    GET_CODEDAO_ARTICLE_SUCCESS,
    GET_CODEDAO_ARTICLE_FAILURE,
} from "../types";

import CrawlService from "../../../utils/service/Crawl";

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
