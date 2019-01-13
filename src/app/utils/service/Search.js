import BaseHTTP from "./index";

class SearchService extends BaseHTTP {
    getPostedConfess = async numLoad => {
        await setTimeout(async () => {
            try {
                const { data } = await this.caller.get(
                    this.endpoints.GUEST__GET_APPROVED + "?load=" + numLoad
                );

                return data || [];
            } catch (err) {
                // Catch error
                return null;
            }
        }, 200);
    };

    searchConfess = async keyword => {
        await setTimeout(async () => {
            try {
                const { data } = await this.caller.get(
                    this.endpoints.GUEST__GET_SEARCH + "?q=" + keyword
                );

                return data || [];
            } catch (err) {
                // Catch error
                return null;
            }
        }, 200);
    };
}

export default new SearchService();
