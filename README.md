# Walmart Product Lookup API 

- Hapi based REST application using boilerplate from https://github.com/Codigami/hapi-starter-kit, uses async/await

[![MIT License](https://img.shields.io/npm/l/stack-overflow-copy-paste.svg?style=flat-square)](http://opensource.org/licenses/MIT)


## Overview

A lean boilerplate application for building RESTful APIs (Microservice) in Node.js using [hapi.js](https://github.com/hapijs/hapi).
Follows industry standard best practices, and uses latest [async/await](https://blog.risingstack.com/mastering-async-await-in-nodejs/) ES8 feature.
Bring your own front-end.
Plug-in your own Database.

## Requirements
 - [node.js](https://nodejs.org/en/download/current/) >= `8.4.0`
 - [yarn](https://yarnpkg.com/en/docs/install) >= `0.27.5`
 - [docker](https://docs.docker.com/engine/installation/#supported-platforms)
    - Docker is optional and is required only if you want to develop and deploy using Docker

## Getting Started
```bash
# Install dependencies
$ yarn

```bash
# Start Server
# Set environment variables defined in `config/custom-environment-variables.json` like `"urlWalmart": "http://api.walmartlabs.com/v1/items/{itemId}",
    "apiKey": "kjybrqfdgp3u4yv2qzcnjndj",`
$ yarn start
```

```bash
# Try GET /ping to make sure server is up
$ curl http://localhost:3030/ping
```

## Docker

#### Docker
- Docker 
- Start Docker Container
    - `docker run -d -p 3030:3030 --name hapi-starter-kit-oss hapi-starter-kit-oss` 

## Documentation
- `hapi-swagger` self documents all the APIs.
- Visit `http://localhost:3030/documentation` to access the documentation after starting the server.
![Documentation](https://raw.githubusercontent.com/shrivardhan92/product-lookup-api/master/documentation.PNG)

## Miscellaneous
- To turn off logs getting logged via `good-console` in development environment, remove it from `plugins.js`

## Issues
Please feel free to open an issue if you can have any questions or trouble using this starter kit.

## Contributions
Contributions are all welcome and encouraged. For code contributions submit a pull request with unit test.

## License
This project is licensed under the [MIT License](https://github.com/Codigami/hapi-starter-kit/blob/master/LICENSE)

