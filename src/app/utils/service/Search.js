import BaseHTTP from "./index";

class SearchService extends BaseHTTP {
    getPostedConfess = async numLoad => {
        try {
            const { data } = await this.caller.get(
                this.endpoints.GUEST__GET_APPROVED + "?load=" + numLoad
            );

            return data || [];
        } catch (err) {
            // Catch error
            return null;
        }
    };

    searchConfess = async keyword => {
        try {
            const { data } = await this.caller.get(
                this.endpoints.GUEST__GET_SEARCH + "?q=" + keyword
            );

            return data || [];
        } catch (err) {
            // Catch error
            return null;
        }
    };
}

export default new SearchService();
