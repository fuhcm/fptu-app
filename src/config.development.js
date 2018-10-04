export const config = {
    apis: {
        base_url: "http://localhost:3000",
        mocogateway_base_url: "",
    },
    meta: {
        name: "Confession App",
        short_name: "cfapp.gosu.team",
        fb_tagname: "fptuc",
    },
    assets: {
        server_url: "",
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
        app_id: "1524500647849245",
    },
};
