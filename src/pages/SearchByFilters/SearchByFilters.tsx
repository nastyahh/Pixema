import styles from "./SearchByFilters.module.scss";
import "../../App.css";
import { useSelector } from "react-redux";
import { ReactComponent as NotFound } from "../../assets/empty.svg";
import Movies from "../../ui-components/Movies/Movies";
import { State } from "../../utility/types";

const SearchByFilters = () => {
  const searchFull = useSelector((state: State) => state.search.searchFull);
  const status = useSelector((state: State) => state.search.searchFullStatus);

  return (
    <>
      {status === "loading" ? (
        <div className={styles.spinner__wrapper}>
          <span className={styles.spinner}></span>
        </div>
      ) : searchFull.length === 0 ? (
        <div className="search__notFound">
          <NotFound className="search__notFound__img" />
          <div className="search__notFound__text">Movies not found</div>
        </div>
      ) : (
        <div className={styles.search__wrapper}>
          <Movies data={searchFull} movieInfos={searchFull} />
        </div>
      )}
    </>
  );
};

export default SearchByFilters;
