export const config = {
    apis: {
        base_url            : "https://api.fptu.tech",
        mocogateway_base_url: "",
    },
    meta: {
        name      : "FPTU Tech",
        short_name: "fptu.tech",
        fb_tagname: "fptuc",
    },
    assets: {
        server_url   : "",
        public_folder: process.env.PUBLIC_URL,
    },
    social: {
        facebook: {
            page: "https://www.facebook.com/gosu.team",
        },
        instagram: {
            page: "https://www.instagram.com/gosu.team",
        },
    },
    facebook_app: {
        enabled: false,
        app_id : "1524500647849245",
    },
};
