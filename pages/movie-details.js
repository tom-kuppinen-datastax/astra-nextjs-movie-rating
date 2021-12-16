import Head from "next/head";
import styles from "../styles/Home.module.css";
import {getMovieDetails} from "../lib/astraCollections";
import {getReviews, getUsers, addReview} from "../lib/astra";

export default function Home({ movie, reviews, users, movieId}) {
    const reviewList = [];

    for( const index in reviews ) {
        reviewList.push(
            <li>User:{reviews[index].user_id}  Score: {reviews[index].rating}</li>
        )
    }
    //console.log(users);
    const userList = [];
    for (const index in users.rows) {
        userList.push(
            <option value={users.rows[index]["user_id"]}>{users.rows[index]["user_id"]}</option>
        )
    }
    const scoreOptions = [];
    const scoreList = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5,  5].forEach(
        v => {
            scoreOptions.push(
                <option value={v}>{v}</option>
            )
        }
    );

    return (
        <div className={styles.container}>
            <Head>
                <title>AstraDB - movie rating app</title>
                <link rel="icon" href="/public/favicon.ico" />
            </Head>

            <main className={styles.main}>

                <div className={styles.grid}>

                    <div className={styles.card}>
                        <h1>{movie.title}</h1>
                        <img src={movie.posterUrl} alt={movie.title} title={movie.title} />
                        <p>Release Year: {movie.year}</p>
                        <p>Directed By: {movie.director}</p>
                        <p>Plot: {movie.plot}</p>
                    </div>
                    <div class="reviewCard">

                        <h2>User Reviews</h2>
                        <ul>
                            {reviewList}
                        </ul>
                        <h3>Add Review</h3>
                        <div id="divReviewAdd" class="reviewForm">
                            <form id="frmReview" name="frmReview">
                                <span>
                                    <select id="selUser" name="selUser">
                                    {userList}
                                    </select>

                                </span>
                                <span>
                                    <select id="selScore" name="selScore">
                                        {scoreOptions}
                                    </select>
                                </span>
                                <span><input type="hidden" id="movieId" name="movieId" value={movieId}/></span>
                                <span><input type="submit" title="Submit"/></span>
                            </form>
                        </div>
                    </div>
                </div>

            </main>

        </div>
    );
}



export async function getServerSideProps({ preview = false , query}) {
    var movieId = query.movieId;
    const movie = (await getMovieDetails(movieId)) || [];
    console.log(movie);
    if(query.selScore != null) {
        const status = addReview(movie.movie_id, query.selUser, query.selScore)
    }
    const reviews = (await getReviews(movie.movie_id)) || [];
    const users = (await getUsers());
    //console.log(reviews);
    return {
        props: { movie, reviews, users, movieId }
    };
}