import {
    GET_MEDIUM_ARTICLE_LOADING,
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
        case GET_MEDIUM_ARTICLE_LOADING:
            return {
                ...state,
                loading: true,
            };
        case GET_MEDIUM_ARTICLE_SUCCESS:
            if (action.payload && action.payload.length) {
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
