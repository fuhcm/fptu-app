import {
  GET_HOME_ARTICLE_LOADING,
  GET_HOME_ARTICLE_SUCCESS,
  GET_HOME_ARTICLE_FAILURE,
} from "../types";

export const getHomeArticles = (numLoad = 9) => {
  return async dispatch => {
    dispatch({
      type: GET_HOME_ARTICLE_LOADING,
    });

    try {
      const crawlData = await FPTUSDK.crawl.getArticles(`fpt?load=${numLoad}`);
      const postData = await FPTUSDK.post.list();
      const postDataWithGUID = postData.map(e => ({
        ...e,
        guid: e._id,
      }));

      dispatch({
        type   : GET_HOME_ARTICLE_SUCCESS,
        payload: postDataWithGUID.reverse().concat(crawlData.reverse()),
      });
    } catch (err) {
      dispatch({
        type   : GET_HOME_ARTICLE_FAILURE,
        payload: err,
      });
    }
  };
};
