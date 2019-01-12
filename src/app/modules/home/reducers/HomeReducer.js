import { GET_HOME_ARTICLE_SUCCESS, GET_HOME_ARTICLE_FAILURE } from "../types";

const initialState = {
    loading: true,
    posts  : [],
    error  : null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_HOME_ARTICLE_SUCCESS:
            return {
                ...state,
                loading: false,
                posts  : action.payload,
            };
        case GET_HOME_ARTICLE_FAILURE:
            return {
                ...state,
                loading: false,
                error  : action.payload,
            };
        default:
            return state;
    }
};
