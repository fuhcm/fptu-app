import BaseHTTP from "./index";

class SendService extends BaseHTTP {
    sendConfes = async (content, captcha) => {
        this.localStorage.generateSenderToken();

        try {
            await this.caller.post(this.endpoints.GUEST__POST_CONFESS, {
                content,
                sender : this.localStorage.getSenderToken(),
                status : 0,
                captcha: captcha,
            });

            return true;
        } catch (err) {
            // Catch error
            return null;
        }
    };
}

export default new SendService();
