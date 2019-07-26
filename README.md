## FPTU Tech Insights — "[isomorphic](http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/)" web app &nbsp; <a href="https://github.com/gosu-team/fptu-app/stargazers"><img src="https://img.shields.io/github/stars/gosu-team/fptu-app.svg?style=social&label=Star&maxAge=3600" height="20"></a>

[fptu-app](https://fuhcm.com) is an isomorphic web app built on top of [Node.js](https://nodejs.org/),
[Express](http://expressjs.com/) and [React](https://facebook.github.io/react/), containing modern web development
tools such as [Webpack](http://webpack.github.io/) and [Babel](http://babeljs.io/).

The webpack configuration now support both Babel and TypeScript, so you can have both `.js` and `.ts` files in the source code.

## Environment

Assuming you have a working `DockerCE`.

## Development

Run with develop container:

`$ docker-compose up`

## Production

Build production image:

`$ docker build -t fptu-app .`

Run production container:

`$ docker run -d --name fptu-app -p 3001:3000 fptu-app:latest`

## License

Copyright © 2018-present **Huynh Minh Tu**. This source code is licensed under the MIT
license found in the [LICENSE.txt](https://github.com/gosu-team/fptu-app/blob/master/LICENSE.txt)
file. The documentation to the project is licensed under the
[CC BY-SA 4.0](http://creativecommons.org/licenses/by-sa/4.0/) license.

Made with ♥ by Huynh Minh Tu ([https://mrhmt.com](mrhmt.com))
