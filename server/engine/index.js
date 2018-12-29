import manifest from "../../dist/client/manifest.json";

const vendorCss = [manifest["vendors.css"], manifest["browser.css"]];
const vendorJs = [manifest["vendors.js"], manifest["browser.js"]];

export default ({ html, preState, helmet, bundles }) => {
    let styles = bundles.filter(bundle => bundle.file.endsWith(".css"));
    let scripts = bundles.filter(bundle => bundle.file.endsWith(".js"));

    return `<!doctype html>
<html lang="en" ${helmet.htmlAttributes.toString()}>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <meta name="description" content="FPTU Technology Insider">
    <meta name="keywords" content="FPTU, FPTU University, FPTU Technology, FPTU HCM Confession">
    <meta name="author" content="Huynh Minh Tu [React - NodeJS + Golang]">
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
    <script>
        (function(h, o, t, j, a, r) {
            h.hj =
                h.hj ||
                function() {
                    (h.hj.q = h.hj.q || []).push(arguments);
                };
            h._hjSettings = { hjid: 1126630, hjsv: 6 };
            a = o.getElementsByTagName("head")[0];
            r = o.createElement("script");
            r.async = 1;
            r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
            a.appendChild(r);
        })(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=");
    </script>
</body>
</html>`;
};
