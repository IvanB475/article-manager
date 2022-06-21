## Description
Api available for testing at: http://3.71.82.164:3050/
Small code challenge written in nest.js(express.js) using typeorm&postgres. To start the app please create .env file and provide env variables as per .env.example file. Note: this code does not create database, so you do have to create it on your own or have it already.

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
