const { createClient } = require("@astrajs/collections");
const axios = require("axios");
const DS_NAMESPACE = 'movies';
const DS_COLLECTION_NAME = 'moviecatalog';
const ASTRA_DB_ID = 'c496b0bf-de46-4a0d-9391-bfb049d8bd40';
const ASTRA_DB_REGION = 'us-east-1';
const ASTRA_DB_TOKEN = 'AstraCS:cUmqFxGSNvZkXoGiIfEZPPFz:56bc7cfcf9fe13454aedf8e09f77ecc0ca5dea00710541dfb9e183a8d0e3a9a7';
// create an Astra client
const astraCollectionsClient =  createClient({
    astraDatabaseId: ASTRA_DB_ID,
    astraDatabaseRegion: ASTRA_DB_REGION,
    applicationToken: ASTRA_DB_TOKEN,
});


const options ={
        headers: {'X-Cassandra-Token': ASTRA_DB_TOKEN},
};


//const moviesCollection = astraClient.namespace["userdata"].collection("movies");

export const getTopMovies = async (pageState, pageSize) => {
    var movies;
    var pageStateUrl ='';

    movies =  (await astraCollectionsClient).namespace(DS_NAMESPACE).collection(DS_COLLECTION_NAME).find(
        {},{"page-size": pageSize, "page-state": pageState, "raw": false, }
    );

    //console.log(movies);
    return movies;

}

export const getMovieDetails = async (movieId) => {
    const movie = (await astraCollectionsClient).namespace(DS_NAMESPACE).collection(DS_COLLECTION_NAME).get(movieId);
    return movie;
}

