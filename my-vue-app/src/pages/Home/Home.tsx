import { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import { getMovieInfo, getMovies } from "../../store/moviesSlice";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import Movies from "../../ui-components/Movies/Movies";
import { fetchMovies } from "../../store/paginationSlice";
import { State } from "../../utility/types";
import { ReactComponent as NotFound } from "../../assets/empty.svg";

const Home = () => {
  const dispatch = useDispatch<ThunkDispatch<unknown, unknown, Action>>();

  const data = useSelector((state: State) => state.movies.movies);
  const movies = useSelector((state: State) => state.pagination.movies);
  const status = useSelector((state: State) => state.pagination.status);
  const searchResults =
    useSelector((state: State) => state.search.searchMovies) || [];
  const movieInfos = useSelector((state: State) => state.movies.movieInfos);
  const searchQuery = useSelector((state: State) => state.search.query);
  const searchStatus = useSelector((state) => state.search.status);

  const [page, setPage] = useState(2);

  useEffect(() => {
    // dispatch(clearMovies());
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

  useEffect(() => {
    if (searchResults.length > 0) {
      Promise.all(
        searchResults.map((movie) => dispatch(getMovieInfo(movie.imdbID)))
      );
    }
  }, [searchResults]);

  const loadMoreMovies = () => {
    dispatch(fetchMovies(page));
    setPage(page + 1);
  };

  return (
    <div className={styles.movies}>
      {searchStatus === "loading" ? (
        <div className={styles.spinner__wrapper}>
          <span className={styles.spinner}></span>
        </div>
      ) : searchResults.length > 0 ? (
        <div className={styles.movies__wrapper}>
          <Movies data={searchResults} movieInfos={movieInfos} />
        </div>
      ) : searchQuery && searchResults.length === 0 ? (
        <div className="search__notFound">
          <NotFound className="search__notFound__img" />
          <div className="search__notFound__text">Movies not found</div>
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
    </div>
  );
};

export default Home;
