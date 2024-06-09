import "../../App.css";
import styles from "./Header.module.scss";
import { ReactComponent as Logo } from "../../assets/pixemaLogo.svg";
import { ReactComponent as Filter } from "../../assets/filter.svg";
import Profile from "../../ui-components/Profile/Profile";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  clearSearchMovies,
  searchMovies,
  setSearchMovie,
} from "../../store/searchSlice";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";

const Header = () => {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch<ThunkDispatch<unknown, unknown, Action>>();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
    // if (value.trim().length > 2) {
    // Начинаем поиск после ввода 3 и более символов
    dispatch(searchMovies(value));
    // dispatch(setSearchMovie(value));

    // } else
    if (value.trim() === "") {
      dispatch(clearSearchMovies());
    }
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.header__container}`}>
        <div className={styles.header__logo}>
          <Logo />
        </div>
        <div className={styles.header__search}>
          <input
            value={search}
            onChange={handleSearch}
            type="text"
            placeholder="Search"
            className={styles.header__search__input}
          />
          <button className={styles.header__search__filter}>
            <Filter />
          </button>
        </div>{" "}
        <Profile />
      </div>
    </header>
  );
};

export default Header;
