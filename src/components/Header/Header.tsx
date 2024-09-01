import "../../App.css";
import styles from "./Header.module.scss";
import { ReactComponent as LogoDark } from "../../assets/pixemaLogo.svg";
import { ReactComponent as LogoLight } from "../../assets/logo-light.svg";
import { ReactComponent as Filter } from "../../assets/filter.svg";
import Profile from "../../ui-components/Profile/Profile";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSearchMovies,
  searchMovies,
  updateSearchQuery,
} from "../../store/searchSlice";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { useFilterMenu } from "../../HOC/FilterMenuProvider";
import { useLocation } from "react-router-dom";
import { ThemeContext } from "../../Context/context";
import { useDebounce } from "../../hook/useDebounce";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import Menu from "../Menu/Menu";

const Header = () => {
  const [search, setSearch] = useState("");
  const { isFilterMenuOpen, toggleFilterMenu } = useFilterMenu();
  const { isDark } = useContext(ThemeContext);
  const filtersIsApplied = useSelector(
    (state) => state.search.filtersIsApplied
  );

  const debouncedSearch = useDebounce(search);

  const location = useLocation();
  const dispatch = useDispatch<ThunkDispatch<unknown, unknown, Action>>();

  useEffect(() => {
    if (location.pathname === "/") {
      dispatch(updateSearchQuery(debouncedSearch));
      dispatch(searchMovies(debouncedSearch));
    } else {
      dispatch(clearSearchMovies());
    }
  }, [debouncedSearch]);

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setSearch(value);
      if (value.trim() === "") {
        dispatch(clearSearchMovies());
      }
    },
    []
  );

  const locationState = useMemo(() => {
    const { pathname } = location;
    return {
      isSearchByFiltersPage: pathname === "/search-by-filters",
      showFilterButton:
        pathname === "/" || location.pathname === "/search-by-filters",
      isAuthPage: pathname === "/sign-in" || location.pathname === "/sign-up",
    };
  }, [location.pathname]);
  const { isSearchByFiltersPage, showFilterButton, isAuthPage } = locationState;

  return (
    <header className={`${styles.header} ${isDark ? "" : styles.light}`}>
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
                disabled={isSearchByFiltersPage || location.pathname !== "/"}
              />
              <div className={styles.header__search__filterWrap}>
                <button
                  className={styles.header__search__filter}
                  onClick={() => {
                    showFilterButton ? toggleFilterMenu() : null;
                  }}
                >
                  <Filter />
                  {filtersIsApplied ? (
                    <span
                      className={styles.header__search__filterIndicator}
                    ></span>
                  ) : null}
                </button>
              </div>
            </div>
            <div className={styles.profileWrapper}>
              <Profile />
              <HamburgerMenu className={styles.hamburger_menu} />
            </div>
          </>
        )}
      </div>
      <Menu />
    </header>
  );
};

export default Header;
