import styles from "./SearchByFilters.module.scss";
import FilteredMovies from "../../ui-components/FilteredMovies/FilteredMovies";
import { useSelector } from "react-redux";

const SearchByFilters = () => {
  const searchResults = useSelector((state) => state.search.searchByFilters);
  const error = useSelector((state) => state.search.error);
  const searchFull = useSelector((state) => state.search.searchFull);

  console.log("searchByFilters:", searchResults);
  console.log("searchFull:", searchFull);

  return (
    <>
      {error ? (
        "Movies not found"
      ) : (
        <div className={styles.search__wrapper}>
          <FilteredMovies data={searchFull} />
        </div>
      )}
    </>
  );
};

export default SearchByFilters;
