const manifest =
    ENVIRONMENT === "staging"
        ? //eslint-disable-next-line
          require("../../dist/staging/client/manifest.json")
        : //eslint-disable-next-line
          require("../../dist/production/client/manifest.json");

const vendorCss = [manifest["vendors.css"], manifest["browser.css"]];
const vendorJs = [manifest["vendors.js"], manifest["browser.js"]];

export default ({ html, preState, helmet, bundles }) => {
    let styles = bundles.filter(bundle => bundle.file.endsWith(".css"));
    let scripts = bundles.filter(bundle => bundle.file.endsWith(".js"));

    return `<!doctype html>
<html lang="en" ${helmet.htmlAttributes.toString()}>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <meta name="description" content="FPTU Technology Insider">
    <meta name="keywords" content="FPTU, FPTU University, FPTU Technology, FPTU HCM Confession">
    <meta name="author" content="Huynh Minh Tu [React - NodeJS + Golang]">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <link rel="apple-touch-icon" href="/assets/images/fptuhcm-confessions.png">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <link rel="manifest" href="/assets/manifest.json">
    <meta property="og:type" content="article" />
    <meta property="og:description" content="FPT University Tech Insider, How much does culture influence creative thinking?" />
    <meta property="og:image" content="https://cdn-images-1.medium.com/max/1024/1*hMHI6laZkdZMdZNnSQg5AA.jpeg" />
    ${helmet.title.toString()}
    ${helmet.link.toString()}
    ${helmet.meta.toString()}
    ${styles
        .map(style => {
            return `<link href="/client/${style.file}" rel="stylesheet">`;
        })
        .join("\n")}
    ${vendorCss
        .map(style => {
            return `<link href="${style}" rel="stylesheet">`;
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
    ${scripts
        .map(script => {
            return `<script type="text/javascript" src="/client/${
                script.file
            }"></script>`;
        })
        .join("\n")}
    ${vendorJs
        .map(style => {
            return `<script type="text/javascript" src="${style}"></script>`;
        })
        .join("\n")}
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
