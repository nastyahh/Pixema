import { Link, useLocation } from "react-router-dom";
import styles from "./Movies.module.scss";
import { ReactComponent as Fire } from "../../assets/fire.svg";
import { useContext } from "react";
import { ThemeContext } from "../../Context/context";
import { MovieInfo, MoviesProps } from "../../utility/types";

const Movies = ({ data, movieInfos }: MoviesProps) => {
  const { isDark } = useContext(ThemeContext);
  const location = useLocation();

  const moviesToRender = data.map(({ imdbID, Title, Poster }) => {
    // let movieInfo = Array<{}>;
    let movieInfo: MovieInfo = {
      imdbID: "",
      Title: "",
      Poster: "",
      Genre: "",
      imdbRating: "",
      Runtime: "",
      Plot: "",
      Year: "",
      Released: "",
      BoxOffice: "",
      Country: "",
      Production: "",
      Actors: "",
      Director: "",
      Writer: "",
    };

    if (Array.isArray(movieInfos)) {
      movieInfo =
        movieInfos.find((info) => info.imdbID === imdbID) || movieInfo;
    }
    const ratingClass =
      movieInfo.imdbRating &&
      parseFloat(movieInfo.imdbRating) <= 6.5 &&
      parseFloat(movieInfo.imdbRating) > 5
        ? styles.middle
        : movieInfo.imdbRating && parseFloat(movieInfo.imdbRating) < 5
        ? styles.low
        : "";

    return (
      <div
        key={imdbID}
        className={`${styles.movies__item} ${!isDark ? styles.light : ""}`}
      >
        <div className={styles.movies__item__poster}>
          <img
            src={Poster}
            alt="Movie Poster"
            className={styles.movies__item__img}
          />
        </div>
        <div className={styles.movies__item__title}>
          <Link to={`/${imdbID}`}>{Title}</Link>
        </div>
        <span
          className={`${styles.movies__item__rating} ${
            location.pathname === "/trends" ? styles.trends : ""
          } ${ratingClass}`}
        >
          {location.pathname === "/trends" ? (
            <Fire className={styles.fire} />
          ) : (
            ""
          )}
          {movieInfo.imdbRating || ""}
        </span>
        <div className={styles.movies__item__genres}>
          {movieInfo.Genre ? movieInfo.Genre.split(",").join(" •") : ""}
        </div>
      </div>
    );
  });
  return <>{moviesToRender}</>;
};

export default Movies;
