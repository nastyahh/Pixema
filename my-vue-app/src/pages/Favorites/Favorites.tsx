import { useSelector } from "react-redux";
import styles from "./Favorites.module.scss";
import Movies from "../../ui-components/Movies/Movies";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites.favoriteMovies);
  return (
    <div className={styles.favorites}>
      <Movies data={favorites} />
    </div>
  );
};

export default Favorites;
