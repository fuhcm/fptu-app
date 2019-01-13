import BaseHTTP from "./index";

class AdminService extends BaseHTTP {
    getListConfession = async numLoad => {
        await setTimeout(async () => {
            try {
                const { data } = await this.caller.get(
                    this.endpoints.ADMINCP__GET_CONFESS + "?load=" + numLoad
                );

                return data || [];
            } catch (err) {
                if (err.reponse.status === 401) {
                    // Do logout
                    this.localStorage.clear();

                    return null;
                }
            }
        }, 100);
    };

    approveConfess = async id => {
        try {
            const { data } = await this.caller.put(
                this.endpoints.ADMINCP__APPROVE_CONFESS,
                { id }
            );

            return data || {};
        } catch (err) {
            // Catch error
            return null;
        }
    };

    rejectConfess = async (id, reason) => {
        try {
            const { data } = await this.caller.put(
                this.endpoints.ADMINCP__REJECT_CONFESS,
                { id, reason }
            );

            return data || {};
        } catch (err) {
            // Catch error
            return null;
        }
    };
}

export default new AdminService();
