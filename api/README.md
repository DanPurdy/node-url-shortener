# Node-url-shortener Api client

This is the express backend for the node-url-shortener task.

## To run

To run the project as a whole please move to the root of this repo and run `docker-compose up`

To run the api in isolation you can create a docker image using the dockerfile provided or you can run with nodemon for development

Please note that you should have mongodb server running or provide the client with the mongoDb credentials required

You must already have mongodb running in order for the api to boot correctly.

see [https://docs.mongodb.com/manual/administration/install-community/](https://docs.mongodb.com/manual/administration/install-community/)

For development

```
npm i

npm run dev

```

For production build

```
npm i

npm run build

npm run start
```

The default url is http://localhost:4000

## Tests

The unit tests utilise an in memory mongodb client and therefore do not need mongodb running in order to run. The unit tests use the Jest framework

```
npm i

npm test
```
