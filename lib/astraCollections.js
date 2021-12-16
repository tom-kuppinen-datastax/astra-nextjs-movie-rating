const { createClient } = require("@astrajs/collections");


let astraCollectionsClient = null;
const getAstraCollectionsClient = async () => {
    if (astraCollectionsClient === null) {
        astraCollectionsClient = await createClient(
            {
                astraDatabaseId: process.env.ASTRA_DB_ID,
                astraDatabaseRegion: process.env.ASTRA_DB_REGION,
                applicationToken: process.env.ASTRA_DB_TOKEN,
            },
            30000
        );
    }
    return astraCollectionsClient;
};

export const getTopMovies = async (pageState, pageSize) => {
    var movies;
    const collectionsClient = await getAstraCollectionsClient();
    //console.log(collectionsClient);
    movies =  collectionsClient.namespace('movies').collection('moviecatalog').find(
        {},{"page-size": pageSize, "page-state": pageState, "raw": false, }
    );

    return movies;

}

export const getMovieDetails = async (movieId) => {
    const collectionsClient = await getAstraCollectionsClient();
    const movie = collectionsClient.namespace('movies').collection('moviecatalog').get(movieId);
    return movie;
}

