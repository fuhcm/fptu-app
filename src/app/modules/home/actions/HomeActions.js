import { getAllEntries } from "@utils/contentful";

import {
    GET_HOME_ARTICLE_LOADING,
    GET_HOME_ARTICLE_SUCCESS,
    GET_HOME_ARTICLE_FAILURE,
} from "../types";

export const getHomeArticles = () => {
    return async dispatch => {
        dispatch({
            type: GET_HOME_ARTICLE_LOADING,
        });

        try {
            const sdkData = await FPTUSDK.crawl.getArticles("fpt");
            const contentfulData = await getAllEntries();

            dispatch({
                type   : GET_HOME_ARTICLE_SUCCESS,
                payload: contentfulData.concat(sdkData),
            });
        } catch (err) {
            dispatch({
                type   : GET_HOME_ARTICLE_FAILURE,
                payload: err,
            });
        }
    };
};
