import "../../App.css";
import styles from "./Header.module.scss";
import { ReactComponent as LogoDark } from "../../assets/pixemaLogo.svg";
import { ReactComponent as LogoLight } from "../../assets/logo-light.svg";
import { ReactComponent as Filter } from "../../assets/filter.svg";
import Profile from "../../ui-components/Profile/Profile";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearSearchMovies, searchMovies } from "../../store/searchSlice";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { useFilterMenu } from "../../HOC/FilterMenuProvider";
import { useLocation } from "react-router-dom";
import { ThemeContext } from "../../Context/context";
import { useDebounce } from "../../hook/useDebounce";

const Header = () => {
  const [search, setSearch] = useState("");
  const { toggleFilterMenu } = useFilterMenu();
  const { isDark } = useContext(ThemeContext);

  const debouncedSearch = useDebounce(search);

  const location = useLocation();
  const dispatch = useDispatch<ThunkDispatch<unknown, unknown, Action>>();

  useEffect(() => {
    dispatch(searchMovies(debouncedSearch));
  }, [debouncedSearch]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);

    if (value.trim() === "") {
      dispatch(clearSearchMovies());
    }
  };

  const isSearchByFiltersPage = location.pathname === "/search-by-filters";
  const isAuthPage =
    location.pathname === "/sign-in" || location.pathname === "/sign-up";

  return (
    <header className={styles.header}>
      <div className={`container ${styles.header__container}`}>
        <div className={styles.header__logo}>
          {isDark ? <LogoDark /> : <LogoLight />}
        </div>
        {isAuthPage ? null : (
          <>
            <div className={styles.header__search}>
              <input
                value={search}
                onChange={handleSearch}
                type="text"
                placeholder="Search"
                className={styles.header__search__input}
                disabled={isSearchByFiltersPage}
              />
              <button
                className={styles.header__search__filter}
                onClick={toggleFilterMenu}
              >
                <Filter />
              </button>
            </div>
            <Profile />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
