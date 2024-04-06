# GQL Service

This is a component of the swap-ease mono-repo. It is the back-end service to the swap-ease client. All data from the DBs can be accessed using this service.

# Getting started

## Environment variables

Create a `.env` file and copy and paste the below into that file. Replace the links with the actual environment variable value.

```
MONGO_DB_NAME=swapEase
MONGO_DB_CONNECTION_STRING=[Go here](https://cloud.mongodb.com/v2/63126bef095c44751357180b#/overview?connectCluster=Cluster0)
RABBIT_MQ_URL=[Go here]()
```

## Building the service

The gql-service is a subgraph. To build the service, we can use:

```
npm run build
```

This will run graphql-codegen and build all of the typescript files

## Running the service

You can run from the build using:

```
npm run start
```

Or run in dev mode using:

```
npm run dev
```
