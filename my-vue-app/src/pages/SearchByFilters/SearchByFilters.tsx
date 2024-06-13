import { useDispatch, useSelector } from "react-redux";
import styles from "./SearchByFilters.module.scss";
import { useEffect } from "react";
import { getMovieInfo } from "../../store/searchSlice";
import FilteredMovies from "../../ui-components/FilteredMovies/FilteredMovies";

const SearchByFilters = () => {
  const searchResults = useSelector((state) => state.search.searchByFilters);

  const searchFull = useSelector((state) => state.search.searchFull);

  //   const dispatch = useDispatch();

  //   useEffect(() => {
  //     searchResults.forEach((movie) => {
  //       dispatch(getMovieInfo(movie.imdbID));
  //     });
  //   }, []);

  console.log("searchByFilters:", searchResults);
  console.log("searchFull:", searchFull);

  return (
    <>
      {searchResults === "Movie not found!" ? (
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
