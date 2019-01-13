import BaseHTTP from "./index";

class OverviewService extends BaseHTTP {
    getOverview = async () => {
        try {
            const { data } = this.caller.get(
                this.endpoints.GUEST__GET_OVERVIEW
            );

            return data || {};
        } catch (err) {
            // Catch error
            return null;
        }
    };
}

export default new OverviewService();
