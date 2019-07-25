//eslint-disable-next-line
const manifest = require("../../dist/client/manifest.json");

const vendorCss = [manifest["vendors.css"], manifest["browser.css"]];
const vendorJs = [manifest["vendors.js"], manifest["browser.js"]];

export default ({ html, preState, helmet, bundles }) => {
    let styles = bundles.filter(bundle => bundle.file.endsWith(".css"));
    let scripts = bundles.filter(bundle => bundle.file.endsWith(".js"));

    return `<!doctype html>
<html lang="en" ${helmet.htmlAttributes.toString()}>
<head>
    <meta charset="UTF-8">
    <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1, minimum-scale=1, user-scalable=0"
    />
    <meta name="description" content="FPTU HCM">
    <meta name="keywords" content="FPTU, FPTU University, FPTU Technology, FPTU HCM Confession">
    <meta name="author" content="Huynh Minh Tu [React - NodeJS + Golang]">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <link rel="apple-touch-icon" href="/assets/images/fptuhcm-confessions.png">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <link rel="manifest" href="/assets/manifest.json">
    <meta property="og:type" content="article" /><meta property="og:description" content="FPT University HCM - Official Community"/><meta property="og:image" content="https://i.imgur.com/edylBR6.jpg"/>
    <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Montserrat:300,300i,400&amp;subset=vietnamese"
    />
    ${helmet.title.toString()}
    ${helmet.link.toString()}
    ${helmet.meta.toString()}
    ${vendorCss
        .map(style => {
            return `<link href="${style}" rel="stylesheet">`;
        })
        .join("\n")}
    ${styles
        .map(style => {
            return `<link href="/client/${style.file}" rel="stylesheet">`;
        })
        .join("\n")}
    <link rel="shortcut icon" href="/assets/favicon.ico">
</head>
<body ${helmet.bodyAttributes.toString()}>
    <div id="root">${html}</div>
    <script>
        window.__PRELOADED_STATE__ = ${JSON.stringify(preState).replace(
            /</g,
            "\\u003c"
        )}
    </script>
    <!-- FPTU Tech Javascript SDK -->
    <script>
        window.APP_ENV = {
            API_BASE_URL: "${APP_ENV.API_BASE_URL}",
        };
    </script>
    <script src="https://cdn.jsdelivr.net/npm/fptu-sdk@1.0.2/dist/fptu-sdk.js"></script>
    ${scripts
        .map(script => {
            return `<script type="text/javascript" src="/client/${script.file}"></script>`;
        })
        .join("\n")}
    ${vendorJs
        .map(style => {
            return `<script type="text/javascript" src="${style}"></script>`;
        })
        .join("\n")}
    <script>
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            navigator.serviceWorker.register("/sw.js");
        });
    }
    </script>
    <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=UA-123979019-2"
    ></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }
        gtag("js", new Date());

        gtag("config", "UA-123979019-2");
    </script>
</body>
</html>`;
};
