import moment from "moment";
import { getPure } from "./ApiCaller";
import LocalStorageUtils, { LOCAL_STORAGE_KEY } from "./LocalStorage";
import { CRAWL__URL } from "./ApiEndpoint";

const defaultSources = [
    "https://codeburst.io",
    "https://medium.freecodecamp.org",
    "https://hackernoon.com",
    "https://medium.com/javascript-scene",
    "https://medium.com/dev-channel",
];

export const getArticles = async (
    sources = defaultSources,
    sync = true,
    target = "medium"
) => {
    const listPromise = sources.map(item => {
        return parseUrl(item);
    });

    try {
        const promiseArr = await Promise.all(listPromise);

        let posts = [];
        promiseArr.forEach(arr => {
            posts = posts.concat(arr);
        });

        // Sort posts by pubDate
        posts.sort((left, right) => {
            return moment.utc(right.pubDate).diff(moment.utc(left.pubDate));
        });

        if (sync) {
            syncNews(posts, target);
        }
        return posts;
    } catch (err) {
        //eslint-disable-next-line
        console.log(err);
    }
};

const parseUrl = async url => {
    const res = await getPure(CRAWL__URL + "?url=" + url);

    if (res && res.data && res.data.items) {
        return res.data.items;
    } else {
        return [];
    }
};

const syncNews = (posts, target) => {
    if (posts.length) {
        let news = "",
            expire = "";

        switch (target) {
            case "medium":
                news = LOCAL_STORAGE_KEY.MEDIUM_NEWS;
                expire = LOCAL_STORAGE_KEY.MEDIUM_NEWS_EXPIRE;
                break;
            case "toidicodedao":
                news = LOCAL_STORAGE_KEY.TOIDICODEDAO_NEWS;
                expire = LOCAL_STORAGE_KEY.TOIDICODEDAO_NEWS_EXPIRE;
                break;
            default:
                news = LOCAL_STORAGE_KEY.MEDIUM_NEWS;
                expire = LOCAL_STORAGE_KEY.MEDIUM_NEWS_EXPIRE;
        }

        const expireTime = moment()
            .add(30, "minutes")
            .unix();
        LocalStorageUtils.setItem(expire, JSON.stringify(expireTime));
        LocalStorageUtils.setItem(news, JSON.stringify(posts));
    }
};
