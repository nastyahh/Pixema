import { useFilterMenu } from "../../HOC/FilterMenuProvider";
import styles from "./FilterMenu.module.scss";
import { ReactComponent as CloseFilters } from "../../assets/close-filters.svg";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSearchFull, searchByFilters } from "../../store/searchSlice";
import { useNavigate } from "react-router-dom";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";

const FilterMenu = () => {
  const { isFilterMenuOpen, toggleFilterMenu } = useFilterMenu();

  const dispatch = useDispatch<ThunkDispatch<unknown, unknown, Action>>();
  const navigate = useNavigate();

  const initialSearchQuery = {
    title: "",
    year: "",
    genre: "",
    minRating: "",
    maxRating: "",
    country: "",
  };

  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);

  if (!isFilterMenuOpen) return null;

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSearchQuery({ ...searchQuery, [name]: value });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      searchByFilters({
        ...searchQuery,
        rating: `${searchQuery.minRating}-${searchQuery.maxRating}`,
      })
    );
    toggleFilterMenu();
    navigate("/search-by-filters");
  };

  const clearFilters = () => {
    setSearchQuery(initialSearchQuery);
  };

  return (
    <div className={styles.filterMenu}>
      <h1 className={styles.filterMenu__title}>Filters</h1>
      <button className={styles.closeBtn} onClick={toggleFilterMenu}>
        {" "}
        <CloseFilters />
      </button>
      <form onSubmit={handleSearch}>
        <label htmlFor="">Full or short movie name</label>{" "}
        <input
          type="text"
          name="title"
          value={searchQuery.title}
          onChange={handleInput}
          placeholder="Your text"
        />
        <label htmlFor="">Year</label>{" "}
        <input
          type="text"
          name="year"
          value={searchQuery.year}
          onChange={handleInput}
        />
        <label htmlFor="">Genre</label>{" "}
        <input
          type="text"
          name="genre"
          value={searchQuery.genre}
          onChange={handleInput}
        />
        <label htmlFor="">Rating</label>
        <div className={styles.filterMenu__inputWrapper}>
          <div>
            <input
              type="text"
              name="minRating"
              value={searchQuery.minRating}
              onChange={handleInput}
              placeholder="From"
            />
          </div>
          <div>
            <input
              type="text"
              name="maxRating"
              value={searchQuery.maxRating}
              onChange={handleInput}
              placeholder="To"
            />
          </div>
        </div>
        <label>Country</label>
        <input
          type="text"
          name="country"
          value={searchQuery.country}
          onChange={handleInput}
          placeholder="Country"
        />
      </form>
      <div className={styles.filterMenu__actions}>
        <button
          type="submit"
          className={styles.filterMenu__searchBtn}
          onClick={handleSearch}
        >
          Show results
        </button>
        <button
          onClick={clearFilters}
          className={styles.filterMenu__clearFilters}
        >
          Clear filter
        </button>
      </div>
    </div>
  );
};

export default FilterMenu;
