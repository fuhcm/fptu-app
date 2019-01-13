import BaseHTTP from "./index";

class CrawlService extends BaseHTTP {
    getArticles = async name => {
        try {
            const { data } = await this.caller.get(
                this.endpoints.CRAWL__URL + "/" + name
            );

            return data || [];
        } catch (err) {
            // Catch error
            return null;
        }
    };

    getArticleDetails = async (name, guid) => {
        try {
            const { data } = await this.caller.get(
                this.endpoints.CRAWL__URL + "/" + name + "/" + guid
            );

            return data || {};
        } catch (err) {
            // Catch error
            return null;
        }
    };
}

export default new CrawlService();
