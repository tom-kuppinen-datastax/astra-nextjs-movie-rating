import {exec} from "child_process";
import {statSync} from "fs";

const { createClient } = require("@astrajs/rest");


let astraClient = null;
const getAstraClient = async () => {
  if (astraClient === null) {
    astraClient = await createClient(
      {
        astraDatabaseId: process.env.ASTRA_DB_ID,
        astraDatabaseRegion: process.env.ASTRA_DB_REGION,
        applicationToken: process.env.ASTRA_DB_TOKEN,
      },
      30000
    );
  }
  return astraClient;
};

export const getUsers = async() => {
    const client = await getAstraClient();
    const { status, data}  = await client.get(
        '/api/rest/v1/keyspaces/movies/tables/users/rows'
    );
    return data;
}
export const addReview = async (movie_id, user_id, score) => {
    const client = await getAstraClient();
    var dateTime = new Date().toISOString();
    const status = await client.post(
        '/api/rest/v2/keyspaces/movies/movie_rating_by_movie_id',
        {
            "user_id" : user_id,
            "movie_id" : movie_id,
            "rating" : score,
            "date_created": dateTime
        }

    );
    return status;



}

export const getReviews = async (movie_id) => {
  const client = await getAstraClient();
  const queryData = "query reviews_by_movie_id { " +
         " movie_rating_by_movie_id(value: { movie_id: " + movie_id + " }) { " +
          "  values { " +
           "   movie_id " +
      "  user_id  " +
      "  rating  " +
      " date_created " +
      "} " +
      "} " +
    "}";

  const queryUrl = '/api/graphql/movies';
  const { status, data } = await client.post(
    queryUrl,
    {
      query: queryData,
    }
  );
  console.log(data);
  if (status === 404) {
    throw new Error("Astra GraphQL endpoint is invalid");
  }
  return data.movie_rating_by_movie_id.values;
};
