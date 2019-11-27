import {
  GET_HOME_ARTICLE_LOADING,
  GET_HOME_ARTICLE_SUCCESS,
  GET_HOME_ARTICLE_FAILURE,
} from "../types";

const initialState = {
  loading: true,
  posts  : [],
  error  : null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_HOME_ARTICLE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_HOME_ARTICLE_SUCCESS:
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
