import { useFilterMenu } from "../../HOC/FilterMenuProvider";
import styles from "./FilterMenu.module.scss";
import "../../App.css";
import { ReactComponent as CloseFilters } from "../../assets/close-filters.svg";
import { useMemo, useRef } from "react";
import { useDispatch } from "react-redux";
import { clearFilters, searchByFilters } from "../../store/searchSlice";
import { useNavigate } from "react-router-dom";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import Select from "react-select";
import countryList from "react-select-country-list";
import { customStyles } from "./filterCustomStyles";
import { options } from "./filterGenreOptions";
import { useSearchFilterForm } from "../../hook/useSearchFilterForm";

const FilterMenu = () => {
  const { isFilterMenuOpen, toggleFilterMenu } = useFilterMenu();
  const filterMenu = useRef(null);

  const dispatch = useDispatch<ThunkDispatch<unknown, unknown, Action>>();
  const navigate = useNavigate();

  const countryOptions = useMemo(() => countryList().getData(), []);

  const initialSearchQuery = {
    title: "",
    year: "",
    genres: [],
    minRating: "",
    maxRating: "",
    country: [],
  };

  const {
    searchQuery,
    validity,
    handleInput,
    handleSelectChange,
    setValidity,
    setSearchQuery,
  } = useSearchFilterForm(initialSearchQuery);

  const classMenu = isFilterMenuOpen
    ? `${styles.filterMenu} ${styles.open}`
    : `${styles.filterMenu}`;

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValid = !!searchQuery.title && !!searchQuery.year;
    if (!isValid) {
      setValidity({ title: !!searchQuery.title, year: !!searchQuery.year });
      return;
    }
    const rating = `${searchQuery.minRating || 0}-${
      searchQuery.maxRating || 10
    }`;
    dispatch(searchByFilters({ ...searchQuery, rating }));
    toggleFilterMenu();
    navigate("/search-by-filters");
  };

  const clearAllFilters = () => {
    dispatch(clearFilters());
    setSearchQuery(initialSearchQuery);
    toggleFilterMenu();
    navigate("/");
  };

  return (
    <div className={classMenu} ref={filterMenu}>
      <h1 className={styles.filterMenu__title}>Filters</h1>
      <button className={styles.closeBtn} onClick={toggleFilterMenu}>
        <CloseFilters />
      </button>
      <form onSubmit={handleSearch} name="searchForm">
        <label htmlFor="">Full or short movie name</label>{" "}
        <div className={styles.invalidWrapper}>
          <input
            type="text"
            name="title"
            value={searchQuery.title}
            onChange={handleInput}
            placeholder="Enter movie name..."
            required
            className={!validity.title ? styles.invalid__input : ""}
          />
          {!validity.title && (
            <div className={styles.invalid__message}>
              This field is required
            </div>
          )}
        </div>
        <label htmlFor="">Year</label>{" "}
        <div className={styles.invalidWrapper}>
          <input
            type="number"
            name="year"
            value={searchQuery.year}
            onChange={handleInput}
            placeholder="Enter year..."
            required
            className={!validity.year ? styles.invalid__input : ""}
          />
          {!validity.year && (
            <div className={styles.invalid__message}>
              This field is required
            </div>
          )}
        </div>
        <label htmlFor="">Genre</label>{" "}
        <Select
          styles={customStyles}
          isMulti
          name="genres"
          options={options}
          className="basic-multi-select"
          isSearchable
          classNamePrefix="select"
          onChange={(selectedOptions) => {
            handleSelectChange(selectedOptions, "genres");
          }}
          value={searchQuery.genres.map((genre: string) => ({
            value: genre,
            label: genre,
          }))}
        />
        <label htmlFor="">Rating</label>
        <div className={styles.filterMenu__inputWrapper}>
          <div>
            <input
              type="number"
              name="minRating"
              value={searchQuery.minRating}
              onChange={handleInput}
              placeholder="From"
            />
          </div>
          <div>
            <input
              type="number"
              name="maxRating"
              value={searchQuery.maxRating}
              onChange={handleInput}
              placeholder="To"
            />
          </div>
        </div>
        <label>Country</label>
        <Select
          styles={customStyles}
          isMulti
          name="country"
          options={countryOptions}
          className="basic-multi-select"
          isSearchable
          onChange={(selectedOptions) => {
            handleSelectChange(selectedOptions, "country");
          }}
          value={countryOptions.filter((option) =>
            searchQuery.country.includes(option.label)
          )}
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
          onClick={clearAllFilters}
          className={styles.filterMenu__clearFilters}
        >
          Clear filter
        </button>
      </div>
    </div>
  );
};

export default FilterMenu;
