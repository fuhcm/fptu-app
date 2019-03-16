## FPTU Tech Insights — "[isomorphic](http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/)" web app &nbsp; <a href="https://github.com/gosu-team/fptu-fe/stargazers"><img src="https://img.shields.io/github/stars/gosu-team/fptu-fe.svg?style=social&label=Star&maxAge=3600" height="20"></a>

[FPTU-FE](https://fptu.tech) is an isomorphic web app built on top of [Node.js](https://nodejs.org/),
[Express](http://expressjs.com/) and [React](https://facebook.github.io/react/), containing modern web development
tools such as [Webpack](http://webpack.github.io/) and [Babel](http://babeljs.io/).

## Environment

Assuming you have a working NodeJS environment and Yarn installed.

## Installation

Fetch all dependencies of `npm`:

```
$ yarn
```

Generate & modify environment configuration file, make sure `NODE_ENV` is `development` or `production`.

```
$ mv .env.example .env
$ vim .env
```

## Development

Develop with hot reload

```
$ yarn dev
```

## Production

Run build

```
$ yarn build
```

Start express server:

```
$ yarn start
```

## Docker build

First, you need a docker environment installed.

Build image:

```
$ docker build -t fptu-fe .
```

Run image:

```
$ docker run -dit -p 3000:3000 fptu-fe:latest
```

## License

Copyright © 2018-present Gosu Team. This source code is licensed under the MIT
license found in the [LICENSE.txt](https://github.com/gosu-team/fptu-fe/blob/master/LICENSE.txt)
file. The documentation to the project is licensed under the
[CC BY-SA 4.0](http://creativecommons.org/licenses/by-sa/4.0/) license.

---

Made with ♥ by Tu Huynh ([fb.com/mr.huynhminhtu](https://fb.com/mr.huynhminhtu))
