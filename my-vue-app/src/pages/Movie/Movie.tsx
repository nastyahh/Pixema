import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMovieInfo } from "../../store/moviesSlice";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { ReactComponent as Share } from "../../assets/share-icon.svg";
import { ReactComponent as Favorite } from "../../assets/navbar/favorites-icon.svg";
import { ReactComponent as IMDB } from "../../assets/imdb-icon.svg";
import styles from "./Movie.module.scss";
import { addFavoriteMovie } from "../../store/favoritesSlice";

const Movie = () => {
  const { imdbID } = useParams();
  const dispatch = useDispatch<ThunkDispatch<unknown, unknown, Action>>();

  useEffect(() => {
    dispatch(getMovieInfo(imdbID));
  }, []);

  const movieInfo = useSelector((state) => state.movies.movieInfo);
  const modifyGenre =
    movieInfo && movieInfo.Genre ? movieInfo.Genre.split(",").join(" •") : "";

  return (
    <div className={styles.movie}>
      <div className={styles.movie__preview}>
        <img src={movieInfo.Poster} alt="" />
        <div className={styles.movie__preview__actions}>
          <button onClick={() => dispatch(addFavoriteMovie(movieInfo))}>
            <Favorite />
          </button>
          <button>
            <Share />
          </button>
        </div>
      </div>
      <div className={styles.movie__desc}>
        <div className={styles.movie__genre}>{modifyGenre}</div>
        <h1 className={styles.movie__title}>{movieInfo.Title}</h1>
        <div className={styles.movie__rating}>
          <div className={styles.movie__rating__number}>
            {movieInfo.imdbRating}
          </div>
          <div className={styles.movie__rating__imdb}>
            <IMDB />
            {movieInfo.imdbRating}
          </div>
          <div className={styles.movie__rating__time}>{movieInfo.Runtime}</div>
        </div>
        <p className={styles.movie__plot}>{movieInfo.Plot}</p>
        <div className={styles.movie__details}>
          <ul>
            <li>Year</li>
            <li>Released</li>
            <li>BoxOffice</li>
            <li>Country</li>
            <li>Production</li>
            <li>Actors</li>
            <li>Director</li>
            <li>Writers</li>
          </ul>
          <ul>
            <li>{movieInfo.Year}</li>
            <li>{movieInfo.Released}</li>
            <li>{movieInfo.BoxOffice}</li>
            <li>{movieInfo.Country}</li>
            <li>{movieInfo.Production}</li>
            <li>{movieInfo.Actors}</li>
            <li>{movieInfo.Director}</li>
            <li>{movieInfo.Writer}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Movie;
