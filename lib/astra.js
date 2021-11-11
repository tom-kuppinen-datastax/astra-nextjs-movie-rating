import {exec} from "child_process";
import {statSync} from "fs";

const { createClient } = require("@astrajs/rest");
const DS_NAMESPACE = 'movies';


let astraClient = null;
const getAstraClient = async () => {
  if (astraClient === null) {
    astraClient = await createClient(
      {
        astraDatabaseId: process.env.ASTRA_DB_ID,
        astraDatabaseRegion: process.env.ASTRA_DB_REGION,
        applicationToken: process.env.ASTRA_DB_APPLICATION_TOKEN,
      },
      30000
    );
  }
  return astraClient;
};

export const getUsers = async() => {
    const client = await getAstraClient();
    const { status, data}  = await client.get(
        '/api/rest/v1/keyspaces/' + DS_NAMESPACE + '/tables/users/rows'
    );
    return data;
}
export const addReview = async (movie_id, user_id, score) => {
    const client = await getAstraClient();
    console.log(new Date().toISOString());
    var dateTime = new Date().toISOString();
    const status = await client.post(
        '/api/rest/v2/keyspaces/' + DS_NAMESPACE + '/movie_rating_by_movie_id',
        {
            "user_id" : user_id,
            "movie_id" : movie_id,
            "rating" : score,
            "date_created": dateTime
        }

    );
    //console.log(Date.now().toString());
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
  const { status, data } = await client.post(
    `/api/graphql/movies`,
    {
      query: queryData,
    }
  );
  if (status === 404) {
    throw new Error("Astra GraphQL endpoint is invalid");
  }
  //console.log(data);
  return data.movie_rating_by_movie_id.values;
};
