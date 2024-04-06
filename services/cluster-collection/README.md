# Cluster Collection

This is a component of the swap-ease mono-repo. It is a service that processes a collection into clusters. It will specifically perform these actions in this order:

- Get all stored data for a processed collection
- Transform the data into a Pandas table
- Normalize the data for clustering
- Cluster the data using a clustering algorithm
- Retrieve all transaction data for the collection from the last 90 days
- Aggregate all transaction data
- Insert all data into the DB
- Alert the sale-ingestor of a newly processed collection by sending it the contract address

It is connected to Rabbit MQ and receives messages with new contract addresses to process AFTER add-collection initially processes the collection.

# Getting Started

## Environment variables

Create a `.env` file and copy and paste the below into that file. Replace the links with the actual environment variable value.

```
MONGO_DB_NAME=swapEase
MONGO_DB_CONNECTION_STRING=[Go here](https://cloud.mongodb.com/v2/63126bef095c44751357180b#/overview?connectCluster=Cluster0)
RESERVOIR_API_URL=https://api.reservoir.tools
RESERVOIR_API_KEY=[Go here](https://dashboard.reservoir.tools/)
RABBIT_MQ_URL=[Go here]()
SALE_INGESTOR_URL=[Go here]()
```

## Install Dependencies

Make sure your python version is < 3.10. Preferably 3.8.

At the project root, we run this command below. It will create our python virtual environment

```
python3 -m venv .venv
```

Next we need to activate the virtual env using

```
. .venv/bin/activate
```

Using the requirements.txt file, we can install all necessary dependencies on the virtual env using

```
pip install -r requirements.txt

// If top fails, upgrade pip and re-run
pip install --upgrade pip
```

All dependencies should now be in the virtual environment. If we want to update the dependencies list in requirements.txt we can use the line below. We need to have the necessary updates installed before freezing though.

```
pip freeze > requirements.txt
```

## Starting API

To start, run (from root)

```
python3 src/app.py
```

## Testing

To run the testing suite, run from root

```
pytest

# For coverage report in html
pytest --cov --cov-config=.coveragerc --cov-report=html
```

## Trouble shooting

If a problem occurs with pip, say "No module name pip found", run this command

```
python3 -m ensurepip --default-pip
```

If you need to deactivate the virtual environment

```
deactivate
```

If you absolutely can't figure out whats going on with the packages (for some reason it's just not working), you can delete venv and run through installing the dependencies from scratch
