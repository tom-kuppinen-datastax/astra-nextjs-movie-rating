import Head from "next/head";
import styles from "../styles/Home.module.css";
import { getTopMovies } from "../lib/astraCollections";


export default function Home({ movies, pageState, reviews }) {

  const list = [];
  var nextUrl = '?pageState=' + pageState;
  for (const index in movies.data) {
      if( index != null ){
          var title = movies.data[index].title;
          var src = movies.data[index].posterUrl;
          var detailUrl = 'movie-details?movieId=' + index;
          list.push(
              <a href={detailUrl}>
                  <div className="divTableCell alignCenter">
                      <span className="movieCardTitle">{title}</span>
                      <br/>
                      <img src={src} alt={title} title={title}/>
                  </div>
              </a>

          );
      }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>AstraDB - movie rating app</title>
        <link rel="icon" href="/public/favicon.ico" />
      </Head>

      <main className={styles.main}>

        <div className="divTable">


              <div className="divTableBody">
                <div className="divTableRow"> {list}</div>
                  <div class="nextNav"><a href ={nextUrl}>next</a></div>
              </div>



        </div>
      </main>

    </div>
  );
}

export async function getServerSideProps({ preview = false , query}) {
  var pageState = query.pageState;
  //var pageState = null;
  const movies = (await getTopMovies(pageState, 3)) || [];
  pageState = movies.pageState;
  //console.log(movies);
  return {
    props: { movies, pageState }
  };
}
