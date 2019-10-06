import * as contentful from "contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

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

            const client = contentful.createClient({
                space      : "421w0fsh4dri",
                accessToken: "7HOOTT94pK3MmaosD5X6_ypZiw1tfRIDg1XTmI-BDJY",
            });

            const contentfulDataRaw = await client.getEntries();
            const contentfulData = await contentfulDataRaw.items.map(e => {
                return {
                    title      : e.fields.title,
                    thumbnail  : e.fields.thumbnail.fields.file.url,
                    pubDate    : e.fields.pub_date,
                    description: e.fields.description,
                    guid       : e.sys.id,
                    type       : "contentful",
                };
            });

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
