import { Link } from "react-router-dom";
import styles from "./Movies.module.scss";

const Movies = ({ data }) => {
  const moviesToRender = data.map(({ imdbID, Title, Poster }) => {
    return (
      <div key={imdbID} className={styles.movies__item}>
        <div className={styles.movies__item__poster}>
          <img src={Poster} alt="" className={styles.movies__item__img} />
        </div>
        <div className={styles.movies__item__title}>
          <Link to={`/${imdbID}`}>{Title}</Link>
        </div>
      </div>
    );
  });
  console.log(moviesToRender);
  return <>{moviesToRender}</>;
};

export default Movies;
