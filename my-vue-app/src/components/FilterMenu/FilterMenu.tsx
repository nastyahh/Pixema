import { useFilterMenu } from "../../HOC/FilterMenuProvider";
import styles from "./FilterMenu.module.scss";
import "../../App.css";
import { ReactComponent as CloseFilters } from "../../assets/close-filters.svg";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { searchByFilters } from "../../store/searchSlice";
import { useNavigate } from "react-router-dom";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import Select from "react-select";
import countryList from "react-select-country-list";
import { customStyles } from "./filterCustomStyles";
import { options } from "./filterGenreOptions";

const FilterMenu = () => {
  const { isFilterMenuOpen, toggleFilterMenu } = useFilterMenu();
  const filterMenu = useRef(null);

  const dispatch = useDispatch<ThunkDispatch<unknown, unknown, Action>>();
  const navigate = useNavigate();

  const countryOptions = countryList().getData();

  const [titleValid, setTitleValid] = useState(true);
  const [yearValid, setYearValid] = useState(true);

  const initialSearchQuery = {
    title: "",
    year: "",
    genres: [],
    minRating: "",
    maxRating: "",
    country: [],
  };

  const handleClick = (event: React.ChangeEvent<HTMLElement>) => {
    if (filterMenu.current && !filterMenu.current.contains(event.target))
      toggleFilterMenu();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);

  if (!isFilterMenuOpen) return null;

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSearchQuery({ ...searchQuery, [name]: value });

    if (name === "title") {
      setTitleValid(!!value);
    } else if (name === "year") {
      setYearValid(!!value);
    }
  };
  const handleSelectChange = (selectedOptions, name: string) => {
    if (name === "country") {
      setSearchQuery({
        ...searchQuery,
        [name]: selectedOptions
          ? selectedOptions.map((option) => option.label)
          : [],
      });
    } else {
      setSearchQuery({
        ...searchQuery,
        [name]: selectedOptions
          ? selectedOptions.map((option) => option.value)
          : [],
      });
    }
  };
  const handleSearch = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!searchQuery.title || !searchQuery.year) {
      setTitleValid(!!searchQuery.title);
      setYearValid(!!searchQuery.year);
    } else {
      const minRating = searchQuery.minRating ? searchQuery.minRating : "0";
      const maxRating = searchQuery.maxRating ? searchQuery.maxRating : "10";

      dispatch(
        searchByFilters({
          ...searchQuery,
          rating: `${minRating}-${maxRating}`,
        })
      );
      toggleFilterMenu();
      navigate("/search-by-filters");
      console.log(searchQuery);
    }
  };

  const clearFilters = () => {
    setSearchQuery(initialSearchQuery);
  };

  return (
    <div className={styles.filterMenu} ref={filterMenu}>
      <h1 className={styles.filterMenu__title}>Filters</h1>
      <button className={styles.closeBtn} onClick={toggleFilterMenu}>
        {" "}
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
            className={!titleValid ? styles.invalid__input : ""}
          />
          {titleValid ? (
            ""
          ) : (
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
            className={!yearValid ? styles.invalid__input : ""}
          />
          {yearValid ? (
            ""
          ) : (
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
          value={searchQuery.genres.map((genre) => ({
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
        {/* <input
          type="text"
          name="country"
          value={searchQuery.country}
          onChange={handleInput}
          placeholder="Country" */}
        {/* /> */}
      </form>{" "}
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
