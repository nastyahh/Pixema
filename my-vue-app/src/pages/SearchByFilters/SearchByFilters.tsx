import styles from "./SearchByFilters.module.scss";
import "../../App.css";
import { useSelector } from "react-redux";
import { ReactComponent as NotFound } from "../../assets/empty.svg";
import Movies from "../../ui-components/Movies/Movies";

const SearchByFilters = () => {
  const searchByFilters = useSelector((state) => state.search.searchByFilters);
  const searchFull = useSelector((state) => state.search.searchFull);
  const status = useSelector((state) => state.search.searchFullStatus);

  console.log("searchByFilters:", searchByFilters);
  console.log("searchFull:", searchFull);

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
          {/* <FilteredMovies data={searchFull} /> */}
          <Movies data={searchFull} movieInfos={searchFull} />
        </div>
      )}
    </>
  );
};

export default SearchByFilters;
