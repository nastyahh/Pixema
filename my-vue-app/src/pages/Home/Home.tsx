import { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getMovieInfo, getMovies } from "../../store/moviesSlice";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import Movies from "../../ui-components/Movies/Movies";
import { fetchMovies } from "../../store/paginationSlice";

const Home = () => {
  const dispatch = useDispatch<ThunkDispatch<unknown, unknown, Action>>();

  const data = useSelector((state) => state.movies.movies);
  const movies = useSelector((state) => state.pagination.movies);
  const status = useSelector((state) => state.pagination.status);
  const searchResults = useSelector((state) => state.search.searchMovies) || [];

  const movieInfos = useSelector((state) => state.movies.movieInfos);

  const [page, setPage] = useState(2);

  //   const info = data.map((movie) => {
  //     const id = movie.imdbID;
  //     const obj = dispatch(getMovieInfo(id));
  //     return obj;
  //   });

  useEffect(() => {
    dispatch(getMovies());
  }, []);
  useEffect(() => {
    const allMovies = [...data, ...movies];
    if (allMovies.length > 0) {
      Promise.all(
        allMovies.map((movie) => dispatch(getMovieInfo(movie.imdbID)))
      );
    }
  }, [data, movies]);

  const loadMoreMovies = () => {
    dispatch(fetchMovies(page));
    setPage(page + 1);
  };

  //   console.log(movieInfos);
  //   const displayMovies = searchResults.length > 0 ? searchResults : movies;
  return (
    <div className={styles.movies}>
      {/* <div className={styles.movies__wrapper}> */}
      {/* <Movies data={data} />
        <Movies data={movies} /> */}
      {searchResults.length > 0 ? (
        <div className={styles.movies__wrapper}>
          <Movies data={searchResults} movieInfos={movieInfos} />
        </div>
      ) : (
        <>
          {" "}
          <div className={styles.movies__wrapper}>
            <Movies data={data} movieInfos={movieInfos} />
            <Movies data={movies} movieInfos={movieInfos} />
          </div>
          <div className={styles.movies__btnWrapper}>
            <button
              className={styles.movies__show_btn}
              onClick={loadMoreMovies}
            >
              Show more{" "}
              {status === "loading" ? (
                <span className={styles.spinner}></span>
              ) : (
                ""
              )}
            </button>
          </div>
        </>
      )}
      {/* </div> */}
      {/* <div className={styles.movies__btnWrapper}>
        {searchResults.length > 0 ? (
          ""
        ) : (
          <button className={styles.movies__show_btn} onClick={loadMoreMovies}>
            Show more{" "}
            {status === "loading" ? (
              <span className={styles.spinner}></span>
            ) : (
              ""
            )}
          </button>
        )}
      </div> */}
    </div>
  );
};

export default Home;
