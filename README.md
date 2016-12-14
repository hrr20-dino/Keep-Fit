# Keep-Fit

A fitness app for you and your friends to have fun, get fit and stay accountable.

## Team

  - __Product Owner__: [Jordan M. Scholten](https://github.com/JackHermes)
  - __Scrum Master__: [Jordan Mason](https://github.com/JPMase)
  - __Development Team Members__: [Neville Challinger](https://github.com/Internev), [Andrew Chung](https://github.com/achung89), [Raj Desai](https://github.com/RADesai)

## Table of Contents

1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [List of Dependencies](#list-of-dependencies)
1. [Usage](#usage)
1. [Team](#team)
1. [Contributing](#contributing)

## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g webpack
npm install
```

If you want to test out any mySQL queries follow the installation instructions here for [Mac](https://dev.mysql.com/doc/refman/5.6/en/osx-installation-pkg.html) or here for [Windows](http://dev.mysql.com/doc/refman/5.7/en/windows-installation.html).

#### List of Dependencies
- Babel-core 6.20.x
- Babel-loader 6.2.x
- Babel-preset-es2015 6.18.x
- Babel-preset-react 6.16.x
- Bluebird 3.4.x
- Express 4.14.x
- Morgan 1.7.x
- Mysql 2.12.x
- Node 6.9.x
- Nodemon 1.11.x
- Path 0.12.x
- React 15.4.x
- React-dom 15.4.x
- React-router 3.0.x
- Webpack 1.14.x

### Usage
To run Keep-Fit on your local machine:
Import database by running:

1. `mysql -u root`
2. At the `mysql>` prompt enter `CREATE DATABASE keepFit`
3. `exit`
4. `mysql -u root -p keepFit < schema.sql`
5. when prompted for the password, just hit <enter>

Password is defined in [server/db/index.js](server/db/index.js) (default is: 1214).

After installing dependencies run:
``` sh
nodemon server/server.js
```
and navigate to [localhost:8000](https://127.0.0.1:8000)

Webpack development notes:
- Start with ``webpack -w`` to continue watching files. Use ``webpack -p`` to minify for production version. NB: occasionally ``webpack -w`` won't hear latest changes. Restart it occasionally/if your bug seems weird.

## Roadmap

View the project roadmap [here](https://github.com/Keep-Fit/Keep-Fit/issues)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
