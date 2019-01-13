import BaseHTTP from "./index";

class MyConfessService extends BaseHTTP {
    getMyConfess = async numLoad => {
        await setTimeout(async () => {
            try {
                const { data } = await this.caller.post(
                    this.endpoints.GUEST__GET_MY_CONFESS + "?load=" + numLoad,
                    {
                        token: this.localStorage.getSenderToken(),
                    }
                );

                return data || [];
            } catch (err) {
                // Catch error
                return null;
            }
        }, 100);
    };
}

export default new MyConfessService();
