import { Link } from "react-router-dom";
import styles from "./Movies.module.scss";

const Movies = ({ data, movieInfos }) => {
  const moviesToRender = data.map(({ imdbID, Title, Poster }) => {
    // const movieInfo = movieInfos.find((info) => info.imdbID === imdbID) || {};
    let movieInfo = Array<{}>;
    // console.log(data);
    // console.log(movieInfos);
    if (Array.isArray(movieInfos)) {
      movieInfo =
        movieInfos.find((info) => {
          // console.log("info", info.imdbID);
          // console.log(imdbID);
          return info.imdbID === imdbID;
        }) || {};
    }
    return (
      <div key={imdbID} className={styles.movies__item}>
        <div className={styles.movies__item__poster}>
          <img src={Poster} alt="" className={styles.movies__item__img} />
        </div>
        <div className={styles.movies__item__title}>
          <Link to={`/${imdbID}`}>{Title}</Link>
        </div>
        <span className={styles.movies__item__rating}>
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
