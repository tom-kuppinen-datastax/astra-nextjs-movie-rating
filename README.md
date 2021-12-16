
# AstraDB Movie Rating Application

A sample Next.js + [DataStax Astra DB](https://dtsx.io/3BzlUQU) starter app that leverages the AstraDB REST API, graphQL, and document API to explore a movie catalog and rate movies.

## Objectives
* Provide a fullstack development example using Astra DB as the storage backend

##Prequisites

1. Create a free [Astra account](https://astra.datastax.com/)
2. Create a serverless database in the cloud region of yor choice, this example used movie-rating-demo as the name and movies as the namespace.
3. To use the document API, you need to specify a collection name to hold your documents.  Recommend that you launch the Swagger UI and create a collection using the document API.
4. Install node.js and next.js if not already present.
    1. [Node.js](https://nodejs.org/en/)
    2. [Next.js](https://nextjs.org/docs)

##Load data
1. Using the CQL console within Astra, run the file `data/create-table.cql` witbin this repo.
2. Levaraging the Swagger UI within Astra or your REST client of choice, load the documents from `data/movies.json` using the batch endpoint. 

##Development App Configuration
To use the development Next.js app, you will need to create an .env.local file to store your connection information.

(*sample*)
```aidl
DS_NAMESPACE = 'movies'
DS_COLLECTION_NAME = 'moviecatalog'
ASTRA_DB_ID = <your DB ID>
ASTRA_DB_REGION = <region where Astra is deployed>
ASTRA_DB_TOKEN = <your token>
```

## How this works
Once the Astra DB credentials are provided, the necessary tables are created in the database and sample data is inserted. The webservice will be available on port 3000 by running the `npm run dev` command if running locally. Once the application is running, you can begin to make changes to this app by editing any of the pages under the `pages/*` directory.

[Next.js](https://nextjs.org/) is an open-source JavaScript framework that lets you build server-side rendering and static web applications using React. It is not nescessary to configuration of webpack or similar to start using Next.js, as it comes with its configuration. This make it very simple to start a project, as we only need to execute simple commands and the project is ready.


