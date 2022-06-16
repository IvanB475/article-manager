## Description
Small code challenge written in nest.js(express.js) using typeorm&postgres.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

Current version has no test coverage


## Not implemented:
-slug doesnt allow dashes (should replace  current validation with regex)
- sorting (orderBy in queryBuilder)
- migrations
- protection to /create user endpoint

## This code is not production ready, need to do following to prep for production:
- handle errors better, add logger
- handle edge cases
- create migrations
- add validation(joi) to every endpoint
