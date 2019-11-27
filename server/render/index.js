import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import Loadable from "react-loadable";
import { getBundles } from "react-loadable/webpack";
import axios from "axios";
import striptags from "striptags";
import Engine from "../engine";
import Main from "../../src/app/Main";

//eslint-disable-next-line
const stats = require("../../dist/react-loadable.json");

class Renderer {
  constructor(app, store) {
    app.get("*", this.renderApp(store));
  }

  renderApp = store => async (req, res) => {
    let context = {};
    let helmetContext = {};
    let modules = [];

    const html = renderToString(
      <Loadable.Capture report={moduleName => modules.push(moduleName)}>
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <HelmetProvider context={helmetContext}>
              <Main />
            </HelmetProvider>
          </StaticRouter>
        </Provider>
      </Loadable.Capture>
    );

    const preState = store.getState();
    let bundles = getBundles(stats, modules);

    if (
      req.originalUrl.includes("/fpt/") ||
      req.originalUrl.includes("/medium/") ||
      req.originalUrl.includes("/toidicodedao/")
    ) {
      const feedName =
        req.originalUrl.split("/")[1] === "toidicodedao"
          ? "codedao"
          : req.originalUrl.split("/")[1];
      const articleID =
        feedName === "codedao"
          ? req.originalUrl.split("/")[3]
          : req.originalUrl.split("/")[2];

      try {
        const data = await getData(feedName, articleID);

        const shortDesc = data.description
          ? striptags(data.description)
              .trim()
              .substring(0, 250) + "..."
          : "FPT University Tech Insights, How much does culture influence creative thinking?";

        helmetContext.helmet.title = {
          toComponent: function() {
            return null;
          },
          toString: function() {
            return `<title data-rh="true">${data.title ||
              "FPTU dot Tech"}</title>`;
          },
        };

        helmetContext.helmet.meta = {
          toComponent: function() {
            return null;
          },
          toString: function() {
            return `<meta property="og:type" content="article" /><meta property="og:description" content="${shortDesc}" /><meta property="og:image" content="${data.thumbnail ||
              "https://cdn-images-1.medium.com/max/1024/1*hMHI6laZkdZMdZNnSQg5AA.jpeg"}" />`;
          },
        };
      } catch (err) {
        // Log error
      }
    }

    res.send(
      Engine({
        html,
        preState,
        helmet: helmetContext.helmet,
        bundles,
      })
    );
  };
}

async function getData(feedName, articleID) {
  if (feedName === "fpt" && articleID.length === 24) {
    const { data } = await axios.get(
      "https://api.fuhcm.com/api/v1/posts/" + articleID
    );

    return data;
  } else {
    const { data } = await axios.get(
      "https://api.fuhcm.com/api/v1/crawl/" + feedName + "/" + articleID
    );

    return data;
  }
}

export default Renderer;
