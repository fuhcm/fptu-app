import moment from "moment";
import {
    GET_MEDIUM_ARTICLE_SUCCESS,
    GET_MEDIUM_ARTICLE_FAILURE,
    LOAD_MORE_ARTICLE,
} from "../types";

const initialState = {
    loading: true,
    posts  : [],
    load   : 9,
    error  : null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_MEDIUM_ARTICLE_SUCCESS:
            // Sort posts by pubDate
            action.payload.sort((left, right) => {
                return moment.utc(right.pubDate).diff(moment.utc(left.pubDate));
            });

            return {
                ...state,
                loading: false,
                posts  : action.payload,
            };
        case GET_MEDIUM_ARTICLE_FAILURE:
            return {
                ...state,
                loading: false,
                error  : action.payload,
            };
        case LOAD_MORE_ARTICLE:
            return {
                ...state,
                load: state.load + 9,
            };
        default:
            return state;
    }
};
