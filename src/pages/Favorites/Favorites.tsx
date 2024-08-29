import { useSelector } from "react-redux";
import styles from "./Favorites.module.scss";
import Movies from "../../ui-components/Movies/Movies";
import { ReactComponent as Empty } from "../../assets/empty.svg";
import { useContext } from "react";
import { ThemeContext } from "../../Context/context";

const Favorites = () => {
  const { isDark } = useContext(ThemeContext);
  const favorites = useSelector((state) => state.favorites.favoriteMovies);
  const movieInfos = useSelector((state) => state.movies.movieInfos);

  return (
    <>
      {favorites.length > 0 ? (
        <div className={styles.favorites}>
          <div
            className={`${styles.favorites__wrapper} ${
              favorites.length < 5 ? styles.few : ""
            }`}
          >
            <Movies data={favorites} movieInfos={movieInfos} />
          </div>
        </div>
      ) : (
        <div
          className={`${styles.favoritesEmpty} ${isDark ? "" : styles.light}`}
        >
          <Empty />
          <span className={styles.favoritesEmpty__text}>
            Favorites are empty
          </span>
        </div>
      )}
    </>
  );
};

export default Favorites;
