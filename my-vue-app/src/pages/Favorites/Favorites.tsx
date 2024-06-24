import { useSelector } from "react-redux";
import styles from "./Favorites.module.scss";
import Movies from "../../ui-components/Movies/Movies";
import { ReactComponent as Empty } from "../../assets/empty.svg";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites.favoriteMovies);
  const movieInfos = useSelector((state) => state.movies.movieInfos);

  return (
    <>
      {favorites.length > 0 ? (
        <div className={styles.favorites}>
          <Movies data={favorites} movieInfos={movieInfos} />
        </div>
      ) : (
        <div className={styles.favoritesEmpty}>
          <Empty />
          <span className={styles.favoritesEmpty__text}>Empty state text</span>
        </div>
      )}
    </>
  );
};

export default Favorites;
