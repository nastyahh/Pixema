import { Link } from "react-router-dom";
import styles from "./FilteredMovies.module.scss";
import { FilteredMoviesProps } from "../../utility/types";

const FilteredMovies = ({ data }: FilteredMoviesProps) => {
  const moviesToRender = data.map(({ imdbID, Title, Poster }) => {
    return (
      <div key={imdbID} className={styles.movies__item}>
        <div className={styles.movies__item__poster}>
          <img
            src={Poster}
            alt="Poster"
            className={styles.movies__item__img}
            loading="lazy"
          />
        </div>
        <div className={styles.movies__item__title}>
          <Link to={`/${imdbID}`}>{Title}</Link>
        </div>
      </div>
    );
  });
  return <>{moviesToRender}</>;
};

export default FilteredMovies;
