# Add Collection

This is a component of the swap-ease mono-repo. It is a service that processes a given contract address and stores processed information into our DBs. It will specifically perform these actions in this order:

- Get data for a collection by contract address
- Retrieve all tokens from the collection
- Aggregate all attribute data from teh collection
- Rank the tokens within the collection using a ranking algorithm
- Sort the tokens by rank
- Insert all data into the DB

It is connected to Rabbit MQ and receives messages with new contract addresses to process.

# Getting Started

## Environment variables

Create a `.env` file and copy and paste the below into that file. Replace the links with the actual environment variable value.

```
MONGO_DB_NAME=swapEase
MONGO_DB_CONNECTION_STRING=[Go here](https://cloud.mongodb.com/v2/63126bef095c44751357180b#/overview?connectCluster=Cluster0)
RESERVOIR_API_URL=https://api.reservoir.tools
RESERVOIR_API_KEY=[Go here](https://dashboard.reservoir.tools/)
RABBIT_MQ_URL=[Go here]()
```
