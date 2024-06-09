import { useSelector } from "react-redux";
import styles from "./Favorites.module.scss";
import Movies from "../../ui-components/Movies/Movies";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites.favoriteMovies);
  const movieInfos = useSelector((state) => state.movies.movieInfos);

  return (
    <div className={styles.favorites}>
      <Movies data={favorites} movieInfos={movieInfos} />
    </div>
  );
};

export default Favorites;
