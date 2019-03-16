import moment from "moment";
import {
    GET_CODEDAO_ARTICLE_SUCCESS,
    GET_CODEDAO_ARTICLE_FAILURE,
} from "../types";

const initialState = {
    loading: true,
    posts  : [],
    error  : null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_CODEDAO_ARTICLE_SUCCESS:
            if (action.payload && action.payload.length) {
                // Sort posts by pubDate
                action.payload.sort((left, right) => {
                    return moment
                        .utc(right.pubDate)
                        .diff(moment.utc(left.pubDate));
                });

                return {
                    ...state,
                    loading: false,
                    posts  : action.payload,
                    error  : null,
                };
            }

            return {
                ...state,
                loading: false,
                error  : "Null list",
            };
        case GET_CODEDAO_ARTICLE_FAILURE:
            return {
                ...state,
                loading: false,
                error  : action.payload,
            };
        default:
            return state;
    }
};
