import { getPure } from "../utils/ApiCaller";
import LocalStorageUtils from "../utils/LocalStorage";
import moment from "moment";

const defaultSources = [
    "https://codeburst.io",
    "https://medium.freecodecamp.org",
    "https://hackernoon.com",
    "https://medium.com/javascript-scene",
    "https://medium.com/dev-channel",
    "https://medium.com/google-developers",
];

export const getArticles = async (sources = defaultSources) => {
    const listPromise = sources.map(item => {
        return parseUrl(item);
    });

    try {
        const promiseArr = await Promise.all(listPromise);

        let posts = [];
        promiseArr.forEach(arr => {
            posts = posts.concat(arr);
        });

        syncNews(posts);
        return posts;
    } catch (err) {
        console.log(err);
    }
};

const parseUrl = async url => {
    try {
        const res = await getPure("https://cf-api.fptu.tech/crawl?url=" + url);

        if (res && res.data && res.data.items) {
            return res.data.items;
        } else {
            return [];
        }
    } catch (err) {
        console.log(err);

        return [];
    }
};

const syncNews = posts => {
    const expireTime = moment()
        .add(30, "minutes")
        .unix();
    LocalStorageUtils.setItem("news_expire", JSON.stringify(expireTime));
    LocalStorageUtils.setItem("news", JSON.stringify(posts));
};
