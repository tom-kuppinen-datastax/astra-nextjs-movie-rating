CREATE KEYSPACE movies IF NOT EXISTS
WITH replication = {'class': 'NetworkTopologyStrategy', 'us-east-1': '3'}
AND durable_writes = true;

use movies;
CREATE TABLE IF NOT EXISTS
movies.movie_rating_by_movie_id (
    movie_id int,
    user_id text,
    rating decimal,
    date_created timestamp,
    PRIMARY KEY ((movie_id), user_id)
);
CREATE TABLE IF NOT EXISTS
movies.users (
    user_id text,
    date_created timestamp,
    PRIMARY KEY ((user_id))
);

INSERT INTO movies.users( user_id, date_created ) VALUES ('quentintarantula', toTimeStamp(now()));
INSERT INTO movies.users( user_id, date_created ) VALUES ('rogerebert', toTimeStamp(now()));
INSERT INTO movies.users( user_id, date_created ) VALUES ('billsmith', toTimeStamp(now()));
INSERT INTO movies.users( user_id, date_created ) VALUES ('meanjoegreene', toTimeStamp(now()));
INSERT INTO movies.users( user_id, date_created ) VALUES ('albsure', toTimeStamp(now()));
